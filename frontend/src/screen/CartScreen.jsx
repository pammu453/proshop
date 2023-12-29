import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Error from "../components/Error"

import { addToCart, removeFromCart } from '../slices/cartSlice'

const CartScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const addToCartHandler = async (item, qty) => {
        dispatch(addToCart({ ...item, qty }))
    }

    const remobeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id))
    }
    const checkOutHandler = async () => {
        navigate("/login?redirect=/shipping")
    }

    return (
        <Row>
            <Col md={8}>
                <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
                {
                    cartItems.length === 0 ? (
                        <Error>
                            Your cart is empty <Link to={"/"}>Go back</Link>
                        </Error>
                    ) : (
                        <ListGroup variant="flush">

                            {
                                cartItems.map((item) => (
                                    <ListGroup.Item key={item._id}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/products/${item._id}`} style={{ color: "black" }}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={2}>
                                                ${item.price}
                                            </Col>
                                            <Col md={2}>
                                                <Form.Control
                                                    as="select"
                                                    value={item.qty}
                                                    onChange={(e) => { addToCartHandler(item, Number(e.target.value)) }}
                                                >
                                                    {[...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                            <Col md={2} className="mt-2">
                                                <Button type="button" variant="light" onClick={() => remobeFromCartHandler(item._id)}>
                                                    <FaTrash />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Subtotal({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) items</h2>
                            <p>$ {cartItems.reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0)}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button onClick={checkOutHandler} type="button" style={{ background: "black" }} className="btn-block" disabled={cartItems.length === 0}>
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
