import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ItemsPage() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    
    const [categories] = useState(['clothing', 'grocery', 'electronics', 'furniture', 'books', 'sports', 'others']);
    const [selectedCategories, setSelectedCategories] = useState(new Set());
    
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:8081/items');
                setItems(response.data.items);
                setFilteredItems(response.data.items);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    useEffect(() => {
        filterItems();
    }, [search, selectedCategories]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories(prevSelectedCategories => {
            const newCategories = new Set(prevSelectedCategories);
            if (newCategories.has(category)) {
                newCategories.delete(category);
            } else {
                newCategories.add(category);
            }
            return newCategories;
        });
    };

    const filterItems = () => {
        let filtered = items;

        if (search) {
            filtered = filtered.filter(item =>
                item.Name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (selectedCategories.size > 0) {
            filtered = filtered.filter(item =>
                selectedCategories.has(item.category)
            );
        }

        setFilteredItems(filtered);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Items</h1>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search items..."
                    value={search}
                    onChange={handleSearchChange}
                    style={{ padding: '10px', width: '60%', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            </div>

            {showFilters && (
                <div style={{ marginBottom: '20px' }}>
                    <h3>Filter by Category</h3>
                    {categories.map(category => (
                        <div key={category} style={{ display: 'inline-block', marginRight: '10px' }}>
                            <input
                                type="checkbox"
                                checked={selectedCategories.has(category)}
                                onChange={() => handleCategoryChange(category)}
                            />
                            <label style={{ marginLeft: '5px' }}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
                        </div>
                    ))}
                </div>
            )}

            <button onClick={() => setShowFilters(!showFilters)}
                style={{ 
                    padding: '10px 20px', 
                    cursor: 'pointer', 
                    borderRadius: '5px', 
                    backgroundColor: '#007BFF', 
                    color: 'white', 
                    border: 'none',
                    marginBottom: '20px'
                }}>
                {showFilters ? 'Hide Filters' : 'Apply Filters'}
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {filteredItems.map(item => (
                    <div key={item._id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '10px',
                        padding: '15px',
                        boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
                        textAlign: 'center',
                        backgroundColor: '#fff'
                    }}>
                        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>{item.Name}</h2>
                        <p style={{ margin: '5px 0' }}><strong>Price:</strong> ${item.Price}</p>
                        <p style={{ margin: '5px 0' }}><strong>Description:</strong> {item.Description}</p>
                        <p style={{ margin: '5px 0' }}><strong>Category:</strong> {item.category}</p>
                        <button onClick={() => navigate(`/item/${item._id}`)}
                            style={{
                                marginTop: '10px',
                                padding: '10px 15px',
                                borderRadius: '5px',
                                backgroundColor: '#007BFF',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer'
                            }}>
                            View Item
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ItemsPage; 
