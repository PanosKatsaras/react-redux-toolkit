import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { NavbarText } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';


const NavBar = () => {
    const cartProducts = useSelector(state => state.cart)
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand style={{color: '#8630c2'}}><strong>Redux Toolkit</strong></Navbar.Brand>
                    <Nav>
                        <Nav.Link to='/' as={Link} style={{  fontSize: '20px' }}>Products</Nav.Link>
                    </Nav>
                    <Navbar.Toggle  />
                    <Navbar.Collapse className='justify-content-end'>
                    <NavbarText>
                            <Nav.Link to="/cart" as={Link} className="d-flex align-items-center">
                                <FaShoppingCart style={{ marginRight: '5px', fontSize: '20px' }} />
                                My Cart <span style={{ fontWeight: 'bold', marginLeft: '5px', fontSize: '20px' }}>{cartProducts.length}</span>
                            </Nav.Link>
                        </NavbarText>
                    
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar;