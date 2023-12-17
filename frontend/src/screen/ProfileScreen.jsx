import { useState, useEffect } from "react"
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../components/Error'
import Loader from '../components/Loader'
import { useProfileMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import { useGetMyOrdersQuery } from "../slices/orderApiSlice"
import {FaTimes,FaCheck} from 'react-icons/fa'

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()
    const { data: myorders, isLoading, error } = useGetMyOrdersQuery()

    console.log(myorders)
    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [userInfo, userInfo.name, userInfo.email])

    const submitteHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("Password did't match!")
        } else {
            try {
                const res = await updateProfile({ name, email, password }).unwrap()
                dispatch(setCredentials(res))
                toast.success("Profile updated succefully!")
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                <Form onSubmit={submitteHandler}>
                    <Form.Group controlId="name" className="my-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="email" className="my-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="password" className="my-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="confirmPassword" className="my-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Re enter password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" style={{ background: "black", border: "none" }} className="mt-2">
                        Update
                    </Button>
                    {loadingUpdateProfile && <Loader />}
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {
                    isLoading ? (<Loader />) :
                        error ? (
                            <Error variant='danger'>
                                {error?.data?.message || error.error}
                            </Error>) : (
                            <Table striped hover responsive className="table-sm">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERD</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myorders.map((order)=>(
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(1,10)}</td>
                                            <td>${order.totalPrice}</td>
                                            <td>
                                                {
                                                    order.isPaid ? (
                                                        <FaCheck  style={{color:"green"}}/>
                                                    ) :(
                                                        <FaTimes style={{color:"red"}}/>
                                                    )
                                                }
                                            </td>
                                            <td>
                                                {
                                                    order.isDelivered ? (
                                                        <FaCheck  style={{color:"green"}}/>
                                                    ) :(
                                                        <FaTimes style={{color:"red"}}/>
                                                    )
                                                }
                                            </td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`} variant="light">
                                                    <Button>Details</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
