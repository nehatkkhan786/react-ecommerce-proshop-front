import React from 'react'
import Rating from './Rating'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Product({product}) {
  return (
    <Card className='my-3 p-2 rounded'>
      <Link to={`/product/${product._id}`} >
      <Card.Img variant="top" src={product.image} />
      </Link>
        
  <Card.Body>
      <Link to={`/product/${product._id}`}>
        <Card.Title as='div' >{product.name}</Card.Title>
      </Link>
       
    <Card.Text as='div'>
        <div className='my-3'>
            
            <Rating value = {product.rating} text= {product.numReviews} color = {'f8e825'}/>
        </div>
    </Card.Text>

        <Card.Text as='h3'>
            ${product.price}
        </Card.Text>

  </Card.Body>
</Card>
  )
}

export default Product