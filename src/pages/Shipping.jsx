import { useState, useContext } from "react"
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import ProductContext from "../ContextAndReducer/ProductContext"

import CheckoutSteps from "../components/CheckoutSteps"



const Shipping =()=>{

    const {addShippingAddress, shippingDetails} = useContext(ProductContext)

    const [address, setAddress] = useState(shippingDetails.address)
    const [state, setState] = useState(shippingDetails.state)
    const [city, setCity] = useState(shippingDetails.city)
    const [phone, setPhone] = useState(shippingDetails.phone)
    const [pincode, setPincode] = useState(shippingDetails.pincode)

    const navigate = useNavigate()

    const onSubmitHandler =(e)=>{
        e.preventDefault()
        addShippingAddress({address, state, city, phone, pincode})
        navigate('/payment')
    }


    return (
        <Container>
            
            <CheckoutSteps step1 step2/>
                
                <h1 className='mt-4 text-center'>Shipping Address</h1>
                    <Form onSubmit={onSubmitHandler}>
                        <FormGroup controlId="address">
                            <FormLabel>Address</FormLabel>
                            <FormControl type="text"
                            placeholder='Enter your address'
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}>
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId='state'>
                            <FormLabel>State</FormLabel>
                            <FormControl type='text'
                            placeholder='Enter your state'
                            value={state}
                            onChange={(e)=>setState(e.target.value)}>
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId="city">
                            <FormLabel>City</FormLabel>
                            <FormControl type='text'
                            placeholder='Enter your city'
                            value={city}
                            onChange={(e)=>setCity(e.target.value)}>
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId="pincode">
                            <FormLabel>Pincode</FormLabel>
                            <FormControl type="text"
                            placeholder='Enter your pin code'
                            value={pincode}
                            onChange={(e)=>setPincode(e.target.value)}>
                            </FormControl>
                        </FormGroup>
                        
                        <FormGroup controlId="phone">
                            <FormLabel>Phone</FormLabel>
                            <FormControl type='tel'
                            placeholder='Enter your phone number'
                            value={phone}
                            onChange={(e)=>setPhone(e.target.value)}>
                            </FormControl>
                        </FormGroup>

                        <Button type='submit' className="mt-4" variant="primary">Continue</Button>

                    </Form>
                    </Container>
            
        
    )
}

export default Shipping;