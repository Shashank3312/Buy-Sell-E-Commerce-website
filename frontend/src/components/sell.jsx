import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';

const AddItemForm = () => {
    const [formData, setFormData] = useState({ name: '', description: '', price: '', category: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        
        try {
            const token = localStorage.getItem('token'); 
            const response = await axios.post('http://localhost:8081/additem', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error adding item');
        }
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px', flexDirection: 'column' }}>
                <h1>Add Item</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)', maxWidth: '500px', width: '100%' }}>
                    <div style={{ width: '100%' }}>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Item Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{
                                padding: '10px',
                                width: '100%',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                fontSize: '16px'
                            }}
                        />
                    </div>
                    <div style={{ width: '100%' }}>
                        <label>Description:</label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Item Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            style={{
                                padding: '10px',
                                width: '100%',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                fontSize: '16px'
                            }}
                        />
                    </div>
                    <div style={{ width: '100%' }}>
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Item Price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            style={{
                                padding: '10px',
                                width: '100%',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                fontSize: '16px'
                            }}
                        />
                    </div>
                    <div style={{ width: '100%' }}>
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            placeholder="Item Category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            style={{
                                padding: '10px',
                                width: '100%',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                fontSize: '16px'
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            marginTop: '10px',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            backgroundColor: '#007BFF',
                            color: 'white',
                            border: 'none',
                            fontSize: '16px'
                        }}
                    >
                        Add Item
                    </button>
                </form>
                {message && <p style={{ textAlign: 'center', marginTop: '20px', color: '#007BFF', fontWeight: 'bold' }}>{message}</p>}
            </div>
        </>
    );
};

export default AddItemForm;
