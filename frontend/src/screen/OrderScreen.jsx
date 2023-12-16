import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import Error from '../components/Error'
import Loader from '../components/Loader'
import { useGetOrderDetailsQuery } from '../slices/orderApiSlice'

const OrderScreen = () => {
    const { id } = useParams()


    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(id)

    return (
        <>
            {
                isLoading ? <Loader /> : error ? <Error variant="danger" /> :
                    (
                        <>
                            <h1>Order {order._id}</h1>
                            <Row>
                                <Col md={8}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h1>Shipping</h1>
                                            <p>
                                                <strong>Name :</strong> {order.user.name}
                                            </p>
                                            <p>
                                                <strong>Email:</strong> {order.user.email}
                                            </p>
                                            <p>
                                                <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}
                                                , {order.shippingAddress.country}
                                                , {order.shippingAddress.postalCode}
                                            </p>
                                            {order.isDelivered ? (
                                                <Error variant="success">
                                                    Delivered on {order.deliveredAt}
                                                </Error>
                                            ) : (
                                                <Error variant="danger">
                                                    Not delivered!
                                                </Error>
                                            )}
                                        </ListGroup.Item>
                                        <ListGroupItem>
                                            <h2>Payment Method</h2>
                                            <p>
                                                <strong>Method: </strong>
                                                {order.paymentMethod}
                                            </p>
                                            {order.isPaid ? (
                                                <Error variant="success">
                                                    Paid on {order.paidAt}
                                                </Error>
                                            ) : (
                                                <Error variant="danger">
                                                    Not Paid!
                                                </Error>
                                            )}
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <h2>OrderItems:</h2>
                                            {
                                                order.orderItems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                            </Col>
                                                            <Col>
                                                                <Link to={`/products/${item.product}`}>
                                                                    {item.name}
                                                                </Link>
                                                            </Col>
                                                            <Col md={4}>
                                                                {item.qty} X ${item.price}= $
                                                                {item.qty * item.price}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))
                                            }
                                        </ListGroupItem>
                                    </ListGroup>
                                </Col>
                                <Col md={4}>
                                    <Card>
                                        <ListGroup variant='flish'>
                                            <ListGroup.Item>
                                                <h2>Order Summery</h2>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Items</Col>
                                                    <Col>${order.itemsPrice}</Col>
                                                </Row>
                                                <Row>
                                                    <Col>Shipping</Col>
                                                    <Col>${order.shippingPrice}</Col>
                                                </Row>
                                                <Row>
                                                    <Col>Tax Price</Col>
                                                    <Col>${order.taxPrice}</Col>
                                                </Row>
                                                <strong>
                                                <Row>
                                                    <Col>Total Price</Col>
                                                    <Col>${order.totalPrice}</Col>
                                                </Row>
                                                </strong>
                                            </ListGroup.Item>
                                          {/* pay oder placeholder */}
                                          {/* mask as delivered Placeholder */}
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                    )
            }
        </>
    )
}

export default OrderScreen