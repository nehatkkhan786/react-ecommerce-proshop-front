import { useEffect, useState, useContext } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap"

import ProductContext from "../ContextAndReducer/ProductContext"
import axios from "axios"
import { toast } from "react-toastify"


const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const {UserDetail} = useContext(ProductContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(UserDetail){
            navigate('/')
        } 
    },[])

    const onSubmitHandler = async (e) =>{
        e.preventDefault()
        try {

            if (password != confirmPassword) {
                toast.error('Password Do not match')
            } else {
                const response = await axios.post('/api/users/register/',{'name':name, 'email':email, 'password':password},{'headers':{'Content-Type': 'application/json'}})
                navigate('/login')
                toast.success('Register Successfully')
                
            }    
        } catch (error) {
            console.log(error.response)
            toast.error('Something Went Wrong')
        }
    }


    return (
       <Container>
           <Row className='justify-content-center'>
                <Col xs={12} md={6}>
                    <h1 className='mt-4 text-center'>Register</h1>
                    <Form onSubmit={onSubmitHandler} >
                        <FormGroup controlId='name'>
                            <FormLabel>Name</FormLabel>
                            <FormControl type='name'
                            placeholder='Name'
                            value = {name}
                            onChange={(e)=>setName(e.target.value)}>
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='email'>
                            <FormLabel>Email</FormLabel>
                            <FormControl type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='password'>
                            <FormLabel>Password</FormLabel>
                            <FormControl type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}>
                            </FormControl>

                        </FormGroup>

                        <FormGroup controlId='confirm_password'>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}>
                            </FormControl>
                        </FormGroup>
                        <Button type='submit' className='mt-4' variant='primary'>Register</Button>
                    </Form>
                
                </Col>
           </Row>
       </Container>
    )
}

export default Register;