import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
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
            const response = await axios.post('http://localhost:8081/login', formData);
            if(response.status == 200){
                localStorage.setItem('token', response.data.jwttoken);
                localStorage.setItem('user', JSON.stringify(response.data.checkifUserExists));  
                window.location.href = '/home';
            }
        } catch (error) {
            console.error('There was an error!', error.message);
            alert(error.response?.data?.message);
        }
    };

    return (
       <> 
       <Header/>
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px', flexDirection: 'column' }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)' }}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" style={{ padding: '10px 20px', marginTop: '10px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#007BFF', color: 'white', border: 'none' }}>Login</button>
                <p>Do not have an account? <a href="/signup">Signup here</a></p>
            </form>
        </div>
        </>
    );
}

export default Login;
