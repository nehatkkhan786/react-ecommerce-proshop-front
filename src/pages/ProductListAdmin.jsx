import React from 'react'
import {useState, useEffect, useContext} from 'react'
import {Table, Row, Col, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ProductContext from '../ContextAndReducer/ProductContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'

function ProductListAdmin() {
    const {fetchProducts, products, loading, UserDetail, deleteProduct} = useContext(ProductContext)
    const navigate = useNavigate()
    const paarams = useParams

    const deletehandler = (_id) =>{
        if(window.confirm('Are you sure, you want to delete this item!')){
            deleteProduct(UserDetail.token, _id)
            toast.success('Product Successfully Deleted')
        }
        
    }


  return loading ? <Loader/> : (
      <>
        <div>
          <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <LinkContainer to={'/admin/product/create_product/'}>
                    <Button className='my-3'>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                    </LinkContainer>
                    
                </Col>
         </Row>

         <Table  responsive hover >
             <thead>
                 <tr>
                     <th>ID</th>
                     <th>Name</th>
                     <th>Price</th>
                     <th>Category</th>
                     <th>BRAND</th>
                     <th></th>
                 </tr>
             </thead>

             <tbody>
                 {products?.map((product, index)=>(
                     <tr key={index}>
                         <td>{product._id}</td>
                         <td>{product.name}</td>
                         <td>{product.price}</td>
                         <td>{product.category}</td>
                         <td>{product.brand}</td> 
                         <td>
                             <LinkContainer to={`/admin/product/edit/${product._id}`}>
                             <Button variant='light' className='btn-sm'>
                                 <i className='fas fa-edit'></i>
                             </Button>
                             </LinkContainer>
                 
                                <Button variant='danger' className='btn-sm' onClick={()=>deletehandler(product._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                         
                         </td>
                     </tr>
                 ))}
             </tbody>

         </Table>
      </div>
      </>
  )
}

export default ProductListAdmin