import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ItemPage() {
    const { itemId } = useParams(); 
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [seller, setSeller] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/items/${itemId}`);
                setItem(response.data.item);
                setSeller(response.data.seller);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchItem();
    }, [itemId]);

    if (loading) return <div style={{ textAlign: 'center', fontSize: '18px', padding: '20px' }}>Loading...</div>;
    if (error) return <div style={{ textAlign: 'center', color: 'red', fontSize: '18px', padding: '20px' }}>Error: {error.message}</div>;
    if (!item) return <div style={{ textAlign: 'center', fontSize: '18px', padding: '20px' }}>Item not found</div>;

    const AddtoCart = async () => {
        try {
            const curruser = JSON.parse(localStorage.getItem('user'));
            if (item.SellerID === curruser._id) {
                alert("You cannot add your own item to the cart");
                return;
            }
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:8081/Mycart`, { item }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Item added to cart");
        } catch (err) {
            console.error(err);
            alert("Error adding item to cart");
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh',
            backgroundColor: '#f8f9fa'
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                width: '400px',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>{item.Name}</h1>
                <p style={{ fontSize: '16px', marginBottom: '8px' }}><strong>Price:</strong> ${item.Price}</p>
                <p style={{ fontSize: '16px', marginBottom: '8px' }}><strong>Description:</strong> {item.Description}</p>
                <p style={{ fontSize: '16px', marginBottom: '8px' }}><strong>Category:</strong> {item.category}</p>
                <p style={{ fontSize: '16px', marginBottom: '8px' }}><strong>Seller Name:</strong> {seller?.firstName}</p>
                <button 
                    onClick={AddtoCart} 
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '10px',
                        fontSize: '16px'
                    }}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ItemPage;
