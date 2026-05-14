const router = require('express').Router();
const Users = require('../schemas/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Items = require('../schemas/items');
const mongoose = require('mongoose');
const Orders = require('../schemas/orders');


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkifUserExists = await Users.findOne({ email });
        if (checkifUserExists) {
            const checkPassword = await bcrypt.compare(password, checkifUserExists.password);
            if (checkPassword) {
                const jwttoken = jwt.sign({ email: checkifUserExists.email }, 'secretkey', { expiresIn: '10d' });
                res.status(200).json({ message: 'Login successful', jwttoken, checkifUserExists });
            }
            else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        }
        else {
            res.status(400).json({ message: 'Invalid email or password' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error', err });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, age, contactNumber, password } = req.body;
        const checkifUserExists = await Users.findOne({ email });
        if (checkifUserExists) {
            res.status(400).json({ message: 'User already exists' });
        }
        else {
            const hashpassword = await bcrypt.hash(password, 10);
            const user = new Users({
                firstName,
                lastName,
                email,
                age,
                contactNumber,
                password: hashpassword
            });
            await user.save();
            res.status(200).json({ message: 'User created successfully' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error', err });
    }
});

router.put('/home', async (req, res) => {
    try {
        const { firstName, lastName, email, age, contactNumber, password } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secretkey');
        const user = await Users.findOne({ email: decoded.email });

        if (user) {
            user.firstName = firstName;
            user.lastName = lastName;
            user.age = age;
            user.contactNumber = contactNumber;
            if (password) {
                user.password = await bcrypt.hash(password, 10);
            }
            await user.save();
            res.status(200).json({ message: 'Profile updated successfully', updatedUser: user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', err });
    }
});


router.get('/items', async (req, res) => {
    try {
        const items = await Items.find();
        res.status(200).json({ items });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', err });
    }
});

router.get('/items/:id', async (req, res) => {
    try {
        const item = await Items.findById(req.params.id);
        const seller = await Users.findById(item.SellerID);
        if (item) {
            res.status(200).json({ message: "Item found", item, seller });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', err });
    }
});

router.post('/Mycart', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secretkey');


        const user = await Users.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { item } = req.body;
        if (!item || !item._id) {
            return res.status(400).json({ message: 'Invalid item data' });
        }

        user.cartItems.push(item._id);
        await user.save();
        res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', err });
    }
});

router.post('/removeFromCart', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, 'secretkey');
        const user = await Users.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { itemId } = req.body;

        const objectIdItemId = new mongoose.Types.ObjectId(itemId);

        user.cartItems = user.cartItems.filter(cartItem => !cartItem.equals(objectIdItemId));
        await user.save();

        res.status(200).json({ message: 'Item removed from cart', cartItems: user.cartItems });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

router.post('/getCartItems', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; 
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, 'secretkey');
        const user = await Users.findOne({ email: decoded.email }).populate('cartItems'); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItemDetails = await Items.find({ _id: { $in: user.cartItems } });

        res.status(200).json({ cartItems: cartItemDetails });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

router.post("/placeOrder", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, 'secretkey');

        const { items } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items in order" });
        }

        const user = await Users.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = Math.floor(1000 + Math.random() * 9000);
        const hashedOTP = await bcrypt.hash(otp.toString(), 10);

        const orders = items.map(item => ({
            transactionID: new mongoose.Types.ObjectId(),
            buyerID: user._id,
            sellerID: item.SellerID,
            amount: item.Price,
            hashedOTP,
            status: "Pending"
        }));

        const savedOrders = await Orders.insertMany(orders);

        const orderedItemIds = items.map(item => item.itemId); 
        await Users.updateOne(
            { _id: user._id },
            { $pull: { cartItems: { itemId: { $in: orderedItemIds } } } }
        );

        return res.status(200).json({
            message: "Order placed successfully",
            orders: savedOrders,
            otp: otp
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


router.post('/additem', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, 'secretkey');
            const { name, description, price, category } = req.body;
            const id = await Users.findOne({ email: decoded.email });
            const item = new Items({
                Name: name,
                Price: price,
                Description: description,
                category,
                SellerID: id._id
            });
            await item.save();
            res.status(200).json({ message: 'Item added successfully' });
        } catch (err) {
            res.status(401).json({ message: 'Unauthorized', error: err.message });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error', err });
    }
});

module.exports = router;
