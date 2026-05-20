import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [soldOrders, setSoldOrders] = useState([]);
    const [sellerNames, setSellerNames] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPending, setShowPending] = useState(true);
    const [showCompleted, setShowCompleted] = useState(false);
    const [showSold, setShowSold] = useState(false);

    useEffect(() => {
        const getPendingOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Unauthorized: No token found");
                }

                const response = await axios.post(
                    "http://localhost:8081/pendingOrders",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 200) {
                    setOrders(response.data.orders);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getPendingOrders();
    }, []);

    useEffect(() => {
        const getCompletedOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Unauthorized: No token found");
                }

                const response = await axios.post(
                    "http://localhost:8081/completedOrders",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 200) {
                    setCompletedOrders(response.data.orders);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getCompletedOrders();
    }, []);

    useEffect(() => {
        const getSoldOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Unauthorized: No token found");
                }

                const response = await axios.post(
                    "http://localhost:8081/soldItems",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 200) {
                    setSoldOrders(response.data.orders);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getSoldOrders();
    }, []);

    const getFirstName = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8081/getFirstName`, { id });
            if (response.status === 200) {
                return response.data.firstName;
            }
        } catch (err) {
            console.error(`Error fetching first name for ID ${id}:`, err);
        }
        return "Unknown"; 
    };

    useEffect(() => {
        const fetchSellerNames = async () => {
            if (orders.length === 0) return;

            const namesArray = await Promise.all(
                orders.map(async (order) => {
                    if (!sellerNames[order.sellerID]) { 
                        const name = await getFirstName(order.sellerID);
                        return { id: order.sellerID, name };
                    }
                    return null;
                })
            );

            const filteredNames = namesArray.filter(Boolean);

            const namesObject = {};
            filteredNames.forEach(({ id, name }) => {
                namesObject[id] = name;
            });

            setSellerNames((prev) => ({ ...prev, ...namesObject }));
        };

        fetchSellerNames();
    }, [orders]); 

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (name === "pending") {
            setShowPending(checked);
        } else if (name === "completed") {
            setShowCompleted(checked);
        } else if (name === "sold") {
            setShowSold(checked);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Orders</h1>

            <div style={{ marginBottom: '30px' }}>
                <label>
                    <input
                        type="checkbox"
                        name="pending"
                        checked={showPending}
                        onChange={handleCheckboxChange}
                        style={{ marginRight: '10px' }}
                    />
                    Show Pending Orders
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="completed"
                        checked={showCompleted}
                        onChange={handleCheckboxChange}
                        style={{ marginRight: '10px' }}
                    />
                    Show Completed Orders
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="sold"
                        checked={showSold}
                        onChange={handleCheckboxChange}
                    />
                    Show Sold Orders
                </label>
            </div>

            {showPending && (
                <>
                    <h2>Pending Orders</h2>
                    <div>
                        {orders.map((order) => (
                            <div key={order._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
                                <h3>Transaction: {order.transactionID}</h3>
                                <h3>Order Amount: ${order.amount}</h3>
                                <h3>Seller ID: {order.sellerID}</h3>
                                <h3>Seller name: {sellerNames[order.sellerID] || "Loading..."}</h3>
                                <h3>Status: {order.status}</h3>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {showCompleted && (
                <>
                    <h2>Completed Orders</h2>
                    <div>
                        {completedOrders.map((order) => (
                            <div key={order._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
                                <h3>Transaction: {order.transactionID}</h3>
                                <h3>Order Amount: ${order.amount}</h3>
                                <h3>Seller ID: {order.sellerID}</h3>
                                <h3>Status: {order.status}</h3>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {showSold && (
                <>
                    <h2>Sold Items</h2>
                    <div>
                        {soldOrders.map((order) => (
                            <div key={order._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
                                <h3>Transaction: {order.transactionID}</h3>
                                <h3>Order Amount: ${order.amount}</h3>
                                <h3>Buyer ID: {order.buyerID}</h3>
                                <h3>Seller name: {sellerNames[order.sellerID] || "Loading..."}</h3>
                                <h3>Status: {order.status}</h3>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Orders;
