import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Header from './Header';

function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        contactNumber: '',
        password: '',
        cartItems: [],
        sellerReviews: []
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const { firstName, lastName, email, age, contactNumber, password } = formData;
        if (!firstName || !lastName || !email || !age || !contactNumber || !password) {
            alert('Please fill out all fields.');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email.');
            return false;
        }
        if (!email.endsWith('iiit.ac.in')) {
            alert('Please enter a IIIT email.');
            return false;
        }
        if (isNaN(age) || age <= 0) {
            alert('Please enter a valid age.');
            return false;
        }
        if (!/^\d{10}$/.test(contactNumber)) {
            alert('Please enter a valid contact number.');
            return false;
        }
        if (password.length < 3) {
            alert('Password must be at least 3 characters long.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:8081/signup', formData);
            alert("Signup successful! Go to login page."); 
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <>
        <Header/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px', flexDirection: 'column',}}>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)' }}>
                <div>
                    <label>First Name:   </label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Age:</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                </div>
                <div>
                    <label>Contact Number:</label>
                    <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" style={{ padding: '10px 20px', marginTop: '10px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#007BFF', color: 'white', border: 'none' }}>Sign Up</button>
                <p>Already have an account? <a href="/login">Login here</a></p>
            </form>
        </div>
        </> 
    );
}

export default Signup;
