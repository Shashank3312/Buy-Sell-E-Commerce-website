import React, { useEffect, useState } from "react";
import axios from "axios";

function MyCart() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Unauthorized: No token found");
                }

                const response = await axios.post(
                    "http://localhost:8081/getCartItems",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.data.cartItems) {
                    throw new Error("Invalid response format");
                }

                setCart(response.data.cartItems);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const handleRemove = async (itemId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Unauthorized: No token found");
            }

            const response = await axios.post(
                "http://localhost:8081/removeFromCart",
                { itemId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                setCart(cart.filter(item => item._id !== itemId));
            }
        } catch (err) {
            console.error("Error removing item:", err);
        }
    };

    const handlePlaceOrder = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Unauthorized: No token found");
            }

            let response; 
            try {
                response = await axios.post(
                    "http://localhost:8081/placeOrder",
                    { items: cart },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 200) {
                    alert("Order placed successfully" + "Otp is: " + response.data.otp);
                }
            } catch (error) {
                console.error("Error placing order:", error.message);
            }

            if (response && response.status === 200) { 
                setCart([]); 
                setOrderSuccess(true);
            } else {
                setOrderSuccess(false);
            }
        } catch (err) {
            console.error("Error placing order:", err);
            setOrderSuccess(false);
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.Price, 0).toFixed(2);
    };

    if (loading) {
        return <div style={{ textAlign: 'center', fontSize: '18px', padding: '20px' }}>Loading...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', color: 'red', fontSize: '18px', padding: '20px' }}>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>My Cart</h1>

            {cart.length > 0 ? (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        {cart.map((item) => (
                            <div key={item._id} style={{
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                padding: '15px',
                                boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
                                textAlign: 'center',
                                backgroundColor: '#fff'
                            }}>
                                <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>{item.Name}</h2>
                                <p style={{ margin: '5px 0' }}><strong>Price:</strong> ${item.Price.toFixed(2)}</p>
                                <p style={{ margin: '5px 0' }}><strong>Description:</strong> {item.Description}</p>
                                <p style={{ margin: '5px 0' }}><strong>Category:</strong> {item.category}</p>
                                <button 
                                    onClick={() => handleRemove(item._id)} 
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: '#007BFF',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontSize: '16px'
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold', marginTop: '20px' }}>
                        Total Amount: ${calculateTotal()}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button 
                            onClick={handlePlaceOrder} 
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#007BFF',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            Place Order
                        </button>
                    </div>

                    {orderSuccess && <p style={{ color: "green", marginTop: '10px', textAlign: 'center' }}>Order placed successfully!</p>}
                </>
            ) : (
                <p style={{ fontSize: '18px', textAlign: 'center' }}>Your cart is empty.</p>
            )}
        </div>
    );
}

export default MyCart;
