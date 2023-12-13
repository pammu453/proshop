import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormConatiner from '../components/FormConatiner'
import { saveShippingAddress } from '../slices/cartSlice'
import CheckOutSteps from '../components/CheckOutSteps'

const ShippingScreen = () => {
    const { shippingAddress } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingAddress?.address || "");
    const [city, setCity] = useState(shippingAddress?.city || "");
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "")
    const [country, setCountry] = useState(shippingAddress?.postalCode || "")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHanlder = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate("/payment")
    }
    return (
        <FormConatiner>
            <CheckOutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHanlder}>
                <Form.Group controlId='address' className='my-2'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter address'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='city' className='my-2'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter city'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='postalCode' className='my-2'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter postal code'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='country' className='my-2'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter country'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Form.Group>
                <Button type='submit' style={{ background: "grey", border: "None" }} className='my-2'>
                    Continue
                </Button>
            </Form>
        </FormConatiner>
    )
}

export default ShippingScreen
