import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function Delivery() {
    
    const [otp, setOtp] = useState('');
    const [pendingSoldOrders, setPendingSoldOrders] = useState([]);

    useEffect(() => {
        const getPendingSoldOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Unauthorized: No token found");
                }

                const response = await axios.post(
                    "http://localhost:8081/pendingSoldItems",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    setPendingSoldOrders(response.data.orders);
                }
            } catch (err) {
                console.error("Error fetching pending sold orders:", err);
            }
        };

        getPendingSoldOrders();
    }, []);

    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    }

    const handleOtpSubmit = async (orderId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Unauthorized: No token found");
            }

            const response = await axios.post(
                "http://localhost:8081/deliverOrder",
                { orderId, otp },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                alert("Order delivered successfully");
                setPendingSoldOrders(pendingSoldOrders.filter(order => order._id !== orderId));
            }
        } catch (err) {
            console.error("Error delivering order:", err);
            alert("Failed to deliver order");
        }
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Delivery</h1>
            <div>
                {pendingSoldOrders.map((order) => (
                    <div key={order._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
                        <h3>Transaction: {order.transactionID}</h3>
                        <h3>Order Amount: ${order.amount}</h3>
                        <h3>Seller ID: {order.sellerID}</h3>
                        <h3>Buyer ID: {order.buyerID}</h3>
                        <h3>Status: {order.status}</h3>
                        
                        <form onSubmit={(e) => { e.preventDefault(); handleOtpSubmit(order._id); }} style={{ marginTop: '15px' }}>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={selectedOrderId === order._id ? otp : ''}
                                onChange={handleOtpChange}
                                onFocus={() => setSelectedOrderId(order._id)}
                                style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px' }}
                            />
                            <button
                                type="submit"
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#007BFF',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                }}
                            >
                                Submit OTP
                            </button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Delivery;
