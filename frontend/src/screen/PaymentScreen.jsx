import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import CheckOutSteps from '../components/CheckOutSteps'
import FormConatiner from '../components/FormConatiner'
import { savePaymentMethod } from "../slices/cartSlice"


const PaymentScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [payMethod, setPayMethod] = useState("PayPal");

    const submiteHandler = async (e) => {
        e.preventDefault()
        await dispatch(savePaymentMethod(payMethod))
        navigate("/place-order")
    }

    return (
        <FormConatiner>
            <CheckOutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submiteHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            className="my-2"
                            label="PayPal or Credit Card"
                            id="PayPal"
                            name="payMethod"
                            value="PayPal"
                            checked
                            onChange={(e) => setPayMethod(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Button type='submit' style={{ background: "grey", border: "None" }} className='my-2'>
                    Continue
                </Button>
            </Form>
        </FormConatiner>
    )
}

export default PaymentScreen
