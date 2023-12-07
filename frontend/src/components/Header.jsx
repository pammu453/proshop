import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { FaShoppingBag, FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'

import { useSelector } from 'react-redux'

const Header = () => {
    const { cartItems } = useSelector(state => state.cart)
    console.log(cartItems.length)
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand='md' collapseOnSelect>
                <Container>
                    <LinkContainer to="/" >
                        <Navbar.Brand >
                            <span className=''>Pro-Shop</span>
                            <span>
                                <FaShoppingBag style={{ fontSize: '20px',marginLeft:"1px" }}/>
                            </span>
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link >
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <FaShoppingCart className='mx-1' />
                                        <sapn>
                                            Cart {cartItems.length > 0 ? (
                                                <Badge bg='info' className='px-1'>
                                                    {cartItems.length}
                                                </Badge>
                                            ) : 0}
                                        </sapn>
                                    </div>
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <Nav.Link ><FaUser /> Sign In</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
