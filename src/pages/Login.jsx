import {useState, useEffect} from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductContext from '../ContextAndReducer/ProductContext'
import {Container, Col, Row, Button, Form, FormGroup, FormLabel, FormControl} from 'react-bootstrap'
import { toast } from 'react-toastify'







const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    const navigate = useNavigate()

    const {userLogin, UserDetail} = useContext(ProductContext)


    useEffect(()=>{
        if(UserDetail){
            navigate('/')
        }
    }, [])

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        userLogin(email, password) 
        navigate('/')
    }

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col xs={12} md={6}>

                <h1 className='mt-4 text-center'>Sing in</h1>
                <Form onSubmit={onSubmitHandler}>
                    <FormGroup controlId='email'>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl type='email'
                         placeholder='Email'
                         value={email}
                         onChange={(e)=>setEmail(e.target.value)}
                        >
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId='password' >
                        <FormLabel>Password</FormLabel>
                        <FormControl type='password'
                        placeholder='Enter Password'
                        value = {password}
                        onChange={(e)=>setPassword(e.target.value)}
                        >
                        </FormControl>
                    </FormGroup>
                    <Button type='submit' className='mt-4' variant='primary' >Login In</Button>
                </Form>


                </Col>
            </Row>
        </Container>
    )
}

export default Login;