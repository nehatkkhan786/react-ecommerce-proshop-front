
import {useEffect, useContext,useState} from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import {Row, Col, ListGroup, FormControl, Image, Form, Button, Card, ListGroupItem} from 'react-bootstrap'
import ProductContext from '../ContextAndReducer/ProductContext'


const Cart = () => {
    const {cartItems, addToCart, removeFromCart} = useContext(ProductContext)
    console.log(cartItems)

   
    return (
        <Row>
            <Col md={8}>
            <h1>Shopping Cart</h1>

           {cartItems.length > 0 ? 
               <ListGroup variant='flush'>
                   {cartItems.map((item)=>{
                       return <ListGroupItem key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}> {item.name} </Link>
                                </Col>

                                <Col md={3}>
                                $ {item.price}
                                </Col>
                                <Col md={3}>
                                <FormControl as='select' value ={item.qty}
                                            onChange = {(e)=>addToCart(item.product, Number(e.target.value))}
                                            >
                                            {
                                                [...Array(item.countInStock).keys()].map((x)=>(
                                                    <option key = {x + 1} value={x + 1} >
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                            </FormControl>
                                
                                </Col>
                                <Col md={1}>

                                    <Button onClick={()=>removeFromCart(item.product)} type='button' variant='light'>
                                            <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>

                            </Row>
                       </ListGroupItem>
                   })}
               </ListGroup>
            : <div className="alert alert-info show">
            <strong>No Items in the cart!</strong>    
            </div>}


            </Col>

            <Col md={4}>
                   <Card>
                       <ListGroup variant='flush'>
                           <ListGroupItem>
                               <h2>Sub Total ({cartItems.reduce((acc, item)=> acc + item.qty, 0)}) </h2>
                                $ {cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0).toFixed(2)}
                           </ListGroupItem>
                           <ListGroupItem>

                               <Link to='/shipping'>
                               <Button type='button' disabled={cartItems.length === 0} className='btn-block'>
                                    Proceed To Checkout
                               </Button>
                               </Link>
                               
                           </ListGroupItem>

                       </ListGroup>
                   </Card>
            </Col>
        </Row>
    )
}

export default Cart;