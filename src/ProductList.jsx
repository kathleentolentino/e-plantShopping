import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';

// ✅ REDUX
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {

    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);

    // ✅ REDUX HOOKS
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                },
                {
                    name: "Peace Lily",
                    image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
                    description: "Removes mold spores and purifies the air.",
                    cost: "$18"
                },
                {
                    name: "Boston Fern",
                    image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
                    description: "Adds humidity to the air and removes toxins.",
                    cost: "$20"
                },
                {
                    name: "Rubber Plant",
                    image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
                    description: "Easy to care for and effective at removing toxins.",
                    cost: "$17"
                },
                {
                    name: "Aloe Vera",
                    image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
                    description: "Purifies the air and has healing properties for skin.",
                    cost: "$14"
                }
            ]
        },
        // 👉 pwede mo na iwan lahat ng categories mo dito (hindi ko na binago)
    ];

    // ✅ ADD TO CART
    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>

            {/* NAVBAR */}
            <div className="navbar" style={{
                backgroundColor: '#4CAF50',
                color: '#fff',
                padding: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>

                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" onClick={handleHomeClick}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <a href="#" onClick={handlePlantsClick} style={{ color: 'white', fontSize: '20px' }}>
                        Plants
                    </a>

                    <a href="#" onClick={handleCartClick} style={{ color: 'white', fontSize: '20px' }}>
                        Cart ({cartItems.length})
                    </a>
                </div>
            </div>

            {/* PRODUCTS */}
            {!showCart ? (
                <div className="product-grid">

                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2>{category.category}</h2>

                            <div className="plants-container">
                                {category.plants.map((product, i) => {

                                    const isInCart = cartItems.some(
                                        item => item.name === product.name
                                    );

                                    return (
                                        <div className="product-card" key={i}>
                                            <img src={product.image} alt={product.name} />
                                            <h3>{product.name}</h3>
                                            <p>{product.description}</p>
                                            <p>{product.cost}</p>

                                            <button
                                                className="product-button"
                                                disabled={isInCart}
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                {isInCart ? 'Added to Cart' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}

        </div>
    );
}

export default ProductList;