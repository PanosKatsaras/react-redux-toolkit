import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { getProducts } from "../store/productSlice";
import { useEffect, useState } from 'react';
import StatusCode from '../utils/StatusCode';
import Alert from 'react-bootstrap/Alert';
import { Spinner } from "react-bootstrap";


const Product = () => {
    const dispatch = useDispatch();
    const {data: products, status} = useSelector(state => state.products)
    const [showError, setShowError] = useState(true);

    // const [products, getProducts] = useState([]);
    // useEffect(() => {
    //     fetch("https://fakestoreapi.com/products")
    //     .then(data => data.json())
    //     .then(result => getProducts(result))
    // }, [])

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    if (status === StatusCode.LOADING) {
        return <Spinner animation="border" role="status">
            
        </Spinner>;
    }
    
    if (status === StatusCode.ERROR && showError) {
        return (
            <Alert 
                key="danger" 
                variant="danger" 
                dismissible 
                onClose={() => setShowError(false)}
                className="text-center"
            >
                <Alert.Heading>Error!</Alert.Heading>
                <p>An error occurred. Please try again later.</p>

            </Alert>
        );
    }


   

    const addToCart = (product) => {
        dispatch(add(product));
    }

    const cards = products.map(product => (
        <div className="col-md-3 mb-2 mt-2">
            <Card key={product.id} className="h-100">
                <div className="text-center">
                    <Card.Img variant="top" src={product.image} style={{width:'100px', height:'130px', marginTop:'20px'}} />
                </div>
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                    {product.description.split(' ').slice(0, 20).join(' ')}{product.description.split(' ').length > 20 && '...'}
                    </Card.Text>
                    <Card.Text>
                    <strong>Price:</strong> ${product.price}
                    </Card.Text>
                </Card.Body>
                <Card.Footer style={{background:'white'}}>
                  <Button variant="primary" onClick={() => addToCart(product)} className='custom-btn'>Add to Cart</Button>
                </Card.Footer>
            </Card>
        </div>
    ));

    return (
        <>
            <h1>Products Dashboard</h1>
            <div className="row">
                {cards}

            </div>
        </>
    )

};

export default Product;