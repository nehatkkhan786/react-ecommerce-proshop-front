import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, FormCheck, FormGroup, FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import ProductContext from "../ContextAndReducer/ProductContext";




const Payment =() =>{
    const [payment, setPayment] = useState('Paypal')
    const {shippingDetails, addPaymentMethod} = useContext(ProductContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!shippingDetails.address){
            navigate('/shipping')
        }
    })

    const onSubmitHandler = (e) => {
        e.preventDefault();
        addPaymentMethod(payment)
        navigate('/placeorder')
    }

    return(
        <Container>
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={onSubmitHandler}>
                <FormGroup>
                    <FormLabel as='legend' >Select Payment Method</FormLabel>
                    <Col>
                    <FormCheck type='radio'
                    label='Paypal or Credit Card'
                    id='paypal'
                    name='paymentMethod'
                    checked
                    onChange={(e)=>setPayment(e.target.value)}>
                    </FormCheck>
                    </Col>
                </FormGroup>
                <Button type='submit' variant='primary' >Continue</Button>
            </Form>
        </Container>
    )
}

export default Payment;