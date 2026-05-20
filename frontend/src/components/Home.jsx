import React from 'react';
import axios from 'axios';
import { useState } from 'react';

function Home() {
    const user = JSON.parse(localStorage.getItem('user'));

    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        contactNumber: user.contactNumber,
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('http://localhost:8081/home', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data.updatedUser));
                alert('Profile updated successfully');
                setShowForm(false);
            }
        } catch (error) {
            console.error('There was an error!', error);
            alert('Failed to update profile');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center', color: '#990011' }}>User Profile</h2>
            
            {!showForm && (
                <div style={{ lineHeight: '1.8', fontSize: '18px' }}>
                    <p><strong>First Name:</strong> {user.firstName}</p>
                    <p><strong>Last Name:</strong> {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Age:</strong> {user.age}</p>
                    <p><strong>Contact Number:</strong> {user.contactNumber}</p>
                </div>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                        <label style={{ fontWeight: 'bold' }}>First Name:</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    <div>
                        <label style={{ fontWeight: 'bold' }}>Last Name:</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    <div>
                        <label style={{ fontWeight: 'bold' }}>Age:</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    <div>
                        <label style={{ fontWeight: 'bold' }}>Contact Number:</label>
                        <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    <button type="submit" style={{ backgroundColor: '#007BFF', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Update Profile</button>
                </form>
            )}
            
            <button onClick={toggleForm} style={{ marginTop: '15px', backgroundColor: showForm ? '#990011' : '#007BFF', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>
                {showForm ? 'Cancel' : 'Edit Profile'}
            </button>
        </div>
    );
} 

export default Home;
