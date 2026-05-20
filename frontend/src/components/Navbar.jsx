import React from 'react';

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
}

const Navbar = () => {
    return (
        <nav style={{ backgroundColor: '#990011', padding: '25px 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginLeft: '20px' }}>
                Buy Sell
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
                <li style={{ display: 'inline', color: 'white' }}><a href="/home" style={{ textDecoration: 'none', color: 'white' }}>Home</a></li>
                <li style={{ display: 'inline', color: 'white' }}><a href="/Items" style={{ textDecoration: 'none', color: 'white' }}>Items Page</a></li>
                <li style={{ display: 'inline', color: 'white' }}><a href="/Mycart" style={{ textDecoration: 'none', color: 'white' }}>My Cart</a></li>
                <li style={{ display: 'inline', color: 'white' }}><a href="/sell" style={{ textDecoration: 'none', color: 'white' }}>Sell Items</a></li>
                <li style={{ display: 'inline', color: 'white' }}><a href="/Orders" style={{ textDecoration: 'none', color: 'white' }}>Orders Page</a></li>
                <li style={{ display: 'inline', color: 'white' }}><a href="/Delivery" style={{ textDecoration: 'none', color: 'white' }}>Delivery Page</a></li>
                <li style={{ display: 'inline', color: 'white', cursor: 'pointer' }} onClick={logout}>Logout</li>
            </ul>
        </nav>
    );
};

export default Navbar;
