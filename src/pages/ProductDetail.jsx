import {Link} from 'react-router-dom'
import {useEffect, useContext, useState} from 'react'
import {Button, Row, Col, ListGroup, Card, Image, ListGroupItem, FormControl} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useParams, useNavigate } from 'react-router-dom'
import ProductContext from '../ContextAndReducer/ProductContext'
import Loader from '../components/Loader'
import {toast} from 'react-toastify'



const ProductDetail = () => {
    const [qty, setQty] = useState(0)
    const params = useParams()
    const navigate = useNavigate()
    const {fetchProduct, loading, product, addToCart} = useContext(ProductContext)
    // const product = products.find((p) => p._id === params.id)

    useEffect(()=>{
        fetchProduct(params.id)
    }, [])

    const addToCartHandler = () => {
        addToCart(params.id, qty)
        navigate(`/cart/${params.id}?qty=${qty}`)
        toast.success('Item Added to Cart')
        
    }

    return (
        
        <div>
            <Link to='/' className='btn btn-light my-3'>
            Go Back
            </Link>
            {loading && <Loader/>}
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt='image' fluid />
                </Col>

                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Rating value={product.rating} color={'#f8e825'} text={product.numReviews}/>
                        </ListGroupItem>

                        <ListGroupItem>
                            Price: $ {product.price}
                        </ListGroupItem>

                        <ListGroupItem>
                            Description: {product.description}
                        </ListGroupItem>

                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>${product.price}</strong></Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                                </Row>
                            </ListGroupItem>

                            {product.countInStock > 0 && (
                                <ListGroupItem>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col xs='auto' className='my-1' >
                                            <FormControl as='select' value ={qty}
                                            onChange = {(e)=>setQty(e.target.value)}
                                            >
                                            {
                                                [...Array(product.countInStock).keys()].map((x)=>(
                                                    <option key = {x + 1} value={x + 1} >
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                            </FormControl>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )}


                            <ListGroupItem>
                                <Button onClick={addToCartHandler} className='btn btn-block' disabled={product.countInStock === 0} type='button'>Add to Cart</Button>
                            </ListGroupItem>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default ProductDetail;