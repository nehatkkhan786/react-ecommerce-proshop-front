
import { useEffect, useContext } from "react"
import ProductContext from "../ContextAndReducer/ProductContext"
import CheckoutSteps from '../components/CheckoutSteps'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

const PlaceOrder = () => {
    const navigate = useNavigate()
    const {cartItems, shippingDetails, paymentMethod, UserDetail, createOrder, order} = useContext(ProductContext)
    const params = useParams()

   if (cartItems){
    cartItems.price = cartItems.reduce((acc, item)=> acc + item.price * item.qty, 0).toFixed(2)
    cartItems.shippingPrice = cartItems.length === 0 ? 0 :cartItems.price >100 ? 0 : 10
    cartItems.taxPrice = ((0.018) * cartItems.price).toFixed(2)
    cartItems.totalPrice = (Number(cartItems.price) + Number(cartItems.shippingPrice) + Number(cartItems.taxPrice)).toFixed(2)
   }
    
   
    const placeOrderHandler= async (e)=>{
        e.preventDefault()
        if(!UserDetail){
            navigate('/login')
            toast.error('Kindly Login First')
        }else {
        const data =  await createOrder(UserDetail.token, 
                        {orderItems:cartItems,
                        shippingAddress:shippingDetails,
                        paymentMethod:paymentMethod,
                        itemsPrice:cartItems.price,
                        shippingPrice:cartItems.shippingPrice,
                        taxPrice:cartItems.taxPrice,
                        totalPrice:cartItems.totalPrice,
                })  
                console.log(data) 
                navigate(`/order/${data._id}`)

                
                  
        }                    
    }
    return (

        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroupItem>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Shipping: </strong>
                            {shippingDetails.address}, {shippingDetails.city} <br/>
                            {shippingDetails.state}, {shippingDetails.pincode}
                        </p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method:  </strong>
                            {paymentMethod}
                        </p>
                    </ListGroupItem>

                    <ListGroupItem>
                        <h2>Order Items</h2>
                        {cartItems?.length === 0 ? (<>
                            <div className="alert alert-info   show">
                            <strong>No Items in the cart!</strong>    
                            </div>
                        </>): (
                           <ListGroup variant='flush'>
                               {cartItems?.map((item, index)=>(
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
                        )}
                        
                    </ListGroupItem>

                </ListGroup>
              </Col>  
<i className="fa fa-pagelines" aria-hidden="true"></i>
              <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>${cartItems.price}</Col>
                                    
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>$ {cartItems.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${cartItems.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${cartItems.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <div className='d-grid gap-2'>
                                <Button type="button" 
                                 disabled={cartItems.length === 0}
                                 onClick={placeOrderHandler}
                                >Place Order</Button>
                                </div>
                                
                            </ListGroupItem>

                        </ListGroup>
                    </Card>
              </Col>
            </Row>
        </div>
        
    )
}

export default PlaceOrder;