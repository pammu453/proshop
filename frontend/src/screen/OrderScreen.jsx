import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import Error from '../components/Error'
import Loader from '../components/Loader'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery, useDeliverOrderMutation } from '../slices/orderApiSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useSelector } from "react-redux"

const OrderScreen = () => {
    const { id: orderId } = useParams()
    const { userInfo } = useSelector(state => state.auth);

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()
    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation()
    const [{ isPending }, payPalDispatch] = usePayPalScriptReducer()
    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery()

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadingPayPalScript = async () => {
                payPalDispatch({
                    type: "resetOptions",
                    value: {
                        "clientId": paypal.clientId,
                        currency: "USD",
                    }
                })
                payPalDispatch({ type: "setLoadingStatus", value: "pending" })
            }
            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadingPayPalScript()
                }
            }
        }
    }, [order, paypal, payPalDispatch, loadingPayPal, errorPayPal])

    const onApprove = (data, actions) => {
        return actions.order.capture.then(async function (details) {
            try {
                await payOrder({ orderId, details })
                refetch()
                toast.success("Payment successfull")
            } catch (error) {
                toast.error(error?.data?.message || error.message)
            }
        })
    }
    const onApproveTest = async () => {
        await payOrder({ orderId, details: { payer: {} } })
        refetch()
        toast.success("Payment successfull")
    }

    const onError = (error) => {
        toast.error(error.message)
    }

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: order.totalPrice
                },
            },]
        }).then((orderId) => {
            return orderId
        })
    }

    const deliverHandler = async () => {
        try {
            await deliverOrder(orderId)
            refetch()
            toast.success("Order deliverd succefully!")
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }

    return (
        <>
            {
                isLoading ? <Loader /> : error ? <Error variant='danger'>{error?.data?.message || error.error}</Error> :
                    (
                        <>
                            <span style={{marginLeft:"15px"}}>Order {order._id}</span>
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
                                        <ListGroup.Item>
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
                                        </ListGroup.Item>
                                        <ListGroup.Item>
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
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={4}>
                                    <Card>
                                        <ListGroup variant='flush'>
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
                                            {
                                                !order.isPaid && (
                                                    <ListGroup.Item>
                                                        {loadingPay && <Loader />}
                                                        {isPending ? <Loader /> : (
                                                            <div>
                                                                <Button onClick={onApproveTest}
                                                                    style={{ background: "grey", border: "none", marginBottom: "13px" }}
                                                                >Test Pay Order
                                                                </Button>
                                                                <PayPalButtons
                                                                    createOrder={createOrder}
                                                                    onApprove={onApprove}
                                                                    onError={onError}
                                                                />
                                                            </div>
                                                        )}
                                                    </ListGroup.Item>
                                                )
                                            }
                                            <ListGroup.Item>
                                                {loadingDeliver && <Loader />}
                                            </ListGroup.Item>
                                            {
                                                userInfo && userInfo.isAdmin && order.isPaid &&
                                                !order.isDelivered && (
                                                    <ListGroup.Item>
                                                        <Button onClick={deliverHandler}
                                                            style={{ background: "grey", border: "none", marginBottom: "13px" }}>
                                                            Mark as Deliver
                                                        </Button>
                                                    </ListGroup.Item>
                                                )
                                            }
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