import {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import ProductContext from '../ContextAndReducer/ProductContext';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';






const OrderDetail = ()=>{
    const  KEY =  'rzp_test_nkUWMpu73XcdmX'
    const secret = 'HUFOFw0z5dj24wmjoEF00Ycz'


    const {singleOrderDetail, UserDetail, loading, getOrder} = useContext(ProductContext)

    
    const navigate = useNavigate()
    const params = useParams()
    
   if(!loading){
    singleOrderDetail.itemsPrice = singleOrderDetail.orderItems?.reduce((acc, item)=> acc + item.price * item.qty, 0).toFixed(2)
   }

    useEffect(()=>{
        if(!UserDetail){
            navigate('/login')
        } 
        else{
            
            getOrder(UserDetail.token, params.id)
        }
    }, [UserDetail])


    const loadScript = (src) =>{
        return new Promise((resolve)=>{
            const script = document.createElement('script')
            script.src = src
            script.onload = ()=>{
                resolve(true)
            }
            script.onerror = ()=>{
                resolve(false)
            }
            document.body.appendChild(script)
        })

    }

    const dispalyRazorpay = async ()=>{
        const response = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if(!response){
            alert('Something is wrong')
            return 
        }
    }



    return loading ? (<Loader/>) : (
        <>
        <div>
            <h1 className='text-center mb-4'>Order {singleOrderDetail._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2>Shipping:</h2>
                            <p><strong>Name: </strong>{singleOrderDetail.users?.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${singleOrderDetail.users?.email}`}>{singleOrderDetail.users?.email}</a></p>
                            <p><strong>Phone: </strong>{singleOrderDetail.shippingAddress?.phone}</p>
                            <p>
                                <strong>Shipping: </strong>
                                {singleOrderDetail.shippingAddress?.address} {singleOrderDetail.shippingAddress?.city} <br/>
                                {singleOrderDetail.shippingAddress?.state} {singleOrderDetail.shippingAddress?.pincode}
                            </p>
                            {!singleOrderDetail.isDelivered ? (
                                 <div className="alert alert-info show">
                                 <strong>Not Delivered</strong>    
                                 </div>
                            ):(
                                <div className="alert alert-success show">
                                 <strong>Delivered</strong>    
                                 </div>
                            )}

                        </ListGroupItem>
                        <ListGroupItem>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method:  </strong>
                            {singleOrderDetail.payment_method}
                        </p>

                        {!singleOrderDetail.isPaid ? (
                            <div className="alert alert-info show">
                            <strong>Not Paid</strong>    
                            </div>
                        ):(
                            <div className="alert alert-success show">
                            <strong>Paid</strong>    
                            </div>
                        )}


                    </ListGroupItem>

                    <ListGroupItem>
                        <h2>Order Items:</h2>
                        <ListGroup variant='flush'>
                               {singleOrderDetail.orderItems?.map((item, index)=>(
                                   <ListGroupItem key={index}>
                                       <Row>
                                           <Col md={1}>
                                           <Image src={item.image} alt={item.name} fluid rounded/>
                                           </Col>
                                           <Col>
                                           <Link to={`/product/${item.id}`}>{item.name}</Link>
                                           </Col>
                                           <Col md={4}>
                                               {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                           </Col>
                                       </Row>
                                   </ListGroupItem>
                               ))}

                           </ListGroup>
                    </ListGroupItem>

                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                        <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>${singleOrderDetail.itemsPrice}</Col>
                                    
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>$ {singleOrderDetail.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${singleOrderDetail.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${singleOrderDetail.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            {!singleOrderDetail.isPaid && ( 
                                <ListGroupItem>
                                    <div className='d-grid gap-2'>
                                        <Button onClick={dispalyRazorpay} variant='success'>Pay Now</Button>
                                   </div>
                                </ListGroupItem>
                            )}

                        </ListGroup>
                    </Card>

                </Col>
            </Row>
        </div>
        </>
    )
}


export default OrderDetail;
