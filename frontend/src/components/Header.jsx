import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap'
import { FaShoppingBag, FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import SearchBox from './SearchBox'
import { resetCart } from '../slices/cartSlice';

const Header = () => {
    const { cartItems } = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            dispatch(resetCart());
            navigate("/login")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand='md' collapseOnSelect>
                <Container>
                    <LinkContainer to="/" >
                        <Navbar.Brand >
                            <span className=''>Pro-Shop</span>
                            <span>
                                <FaShoppingBag style={{ fontSize: '20px', marginLeft: "1px" }} />
                            </span>
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <SearchBox />
                            <LinkContainer to="/cart">
                                <Nav.Link >
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <FaShoppingCart className='mx-1' />
                                        <span>
                                            Cart {cartItems.length > 0 ? (
                                                <Badge bg='info' className='px-1'>
                                                    {cartItems.length}
                                                </Badge>
                                            ) : 0}
                                        </span>
                                    </div>
                                </Nav.Link>
                            </LinkContainer>
                            {
                                userInfo ? (
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <LinkContainer to="/login">
                                        <Nav.Link ><FaUser /> Sign In</Nav.Link>
                                    </LinkContainer>
                                )
                            }
                            {
                                userInfo && userInfo.isAdmin && (
                                    <NavDropdown title='Admin' id='adminmenu' variant='secondary'>
                                        <LinkContainer to='/admin/productlist'>
                                            <NavDropdown.Item >Products</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/orderlist'>
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </header >
    )
}

export default Header
