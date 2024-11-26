import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'; 
import { remove } from "../store/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.cart);

    const [showAlert, setShowAlert] = useState(false); 
    const [alertMessage, setAlertMessage] = useState(""); // State for alert message

    const removeFromCart = (id, title) => {
        dispatch(remove(id));
        setAlertMessage(`"${title}" has been removed from your cart.`);
        setShowAlert(true); 
        setTimeout(() => setShowAlert(false), 3000); // Automatically hide after 3 seconds
    };

    if (products.length === 0) {
        return (
            <div className="text-center mt-5">
                <h3>Your cart is empty!</h3>
                <Link to="/" className="btn btn-success success-btn">
                    Back to Dashboard
                </Link>
            </div>
        );
    }

    const cards = products.map(product => (
        <div className="col-md-4 mb-2" key={product.id}>
            <Card className="h-100">
                <div className="text-center pt-2">
                    <Card.Img variant="top" src={product.image} style={{ width: '100px', height: '130px' }} />
                </div>
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                        ${product.price} x <strong>{product.quantity}</strong>
                    </Card.Text>
                    <Card.Text>
                        <strong>Total:</strong> ${(product.price * product.quantity).toFixed(2)}
                    </Card.Text>
                </Card.Body>
                <Card.Footer style={{ background: 'white' }}>
                    <Button
                        variant="danger"
                        onClick={() => removeFromCart(product.id, product.title)} // Pass product title for alert
                        className="delete-btn"
                    >
                        Remove Product
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    ));

    return (
        <>
            {showAlert && (
                <div className="mt-3">
                    <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                        {alertMessage}
                    </Alert>
                </div>
            )}
            
            <div className="row">
                {cards}
            </div>
            
        </>
    );
};

export default Cart;
