import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row, TabContainer, Table } from "react-bootstrap";

import ProductContext from "../ContextAndReducer/ProductContext";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from '../components/Loader';
import { LinkContainer } from "react-router-bootstrap";




const Profile = () => {
    const {UserDetail,userInfo, getUserDetails, getMyAllOrders, myOrders, loading} = useContext(ProductContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

   
    const navigate = useNavigate()


    useEffect(()=>{
        if(!UserDetail){
            navigate('/login')
        }else{
            if(!userInfo || !userInfo.name){
                getUserDetails(UserDetail.token)
                getMyAllOrders(UserDetail.token)
            }else{
                setName(userInfo.name)
                setEmail(userInfo.email)
            }
     }
            
    },[UserDetail, userInfo, getUserDetails ])

    // const onSubmitHandler = async (e)=>{
    //     e.preventDefault();
    //     try {
    //         if(password != confirmPassword){
    //             toast.error('Password Did not Matched')
    //         }else{
    //             const response = await axios.put('/api/users/profile/update/',{'name':name, 'email':email, 'password':password},{'headers':{'Content-Type': 'application/json', Authorization: `Bearer ${UserDetail.token}`}})
                
    //             localStorage.setItem('UserDetail', JSON.stringify(response))
    //             getUserDetails(getUserDetails(UserDetail.token))
    //             toast.success('Successfully Updated')
    //         }
    //     } catch (error) {
    //         toast.error('Something went wrong')
    //     }
    // }




    return loading ? (<Loader/>) : (
        <>
            <Row>
            <Col md={3}>
                
                <h2>User Profile</h2>
                <Form>
                <FormGroup controlId="name">
                    <FormLabel>Name</FormLabel>
                    <FormControl 
                    type="text"
                    placeholder='Name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)
                    }>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="email" >
                    <FormLabel>Email</FormLabel>
                    <FormControl 
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    >
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="password">
                    <FormLabel>Password</FormLabel>
                    <FormControl type='text' 
                    placeholder='Password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="confirm_password">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl type='text'
                    placeholder='Confirm Password'
                    value = {confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}>
                    </FormControl>
                </FormGroup>

                {/* <Button type='submit' variant='primary' className="mt-4">Update</Button> */}
                </Form>

            </Col>

            <Col md={9}>
                <h2>Order Details</h2>
                <Table striped hover bordered>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Status</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                           
                           {myOrders?.map((order,index)=>(
                               <tr key={index}>
                                   <td>{order._id}</td>
                                   <td>{order.createdAt.substring(0,10)}</td>
                                   <td>{order.totalPrice}</td>
                                   <td>{order.isPaid ? 'Paid':(<i className="fas fa-times" style={{color:'red'}}></i>)}</td>
                                   <td>
                                       <LinkContainer to={`/order/${order._id}`}>
                                       <Button className='btn btn-sm'>Details</Button>
                                       </LinkContainer>
                                   </td>
                               </tr>
                           ))}
                            
                        </tbody>
                </Table>
            </Col>

        </Row>
         
        </>
        )}


export default Profile;