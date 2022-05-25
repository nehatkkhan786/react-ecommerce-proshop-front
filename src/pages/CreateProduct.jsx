import axios from 'axios'
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import ProductContext from '../ContextAndReducer/ProductContext'

function CreateProduct() {
    const naviagte = useNavigate()

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [countInStock, setCountInStock] = useState(0)

    const {UserDetail, dispatch} = useContext(ProductContext)
    const detail = {
        name:name,
        image:image,
        brand:brand,
        category:category,
        description:description,
        price:price,
        countInStock:countInStock
    }

    const onSubmitHandler = async (e)=>{
        e.preventDefault()
        const {data} = await axios.post('/api/products/create_product/',detail, {
            'headers':{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${UserDetail.token}`
            }
        })
        console.log(data)

        dispatch({
            type:'CREATE_PRODUCT',
            payload:data
        })
        setName('')
        setImage('')
        setBrand('')
        setCategory('')
        setDescription('')
        setPrice(0)
        setCountInStock(0)

     
        toast.success('Product Created Successfully')
    }


  
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const formdata = { name: name , e_mail: email , mobile:  phone_no};
    //     const newdata = await fetch('/post_api', {
    //       method: 'POST',
    //       headers: {
    //         'Content-type': 'application/json',
    //       },
    //       newdata=JSON.stringify(formdata),
    //     })
    //     setFormdata([newdata, ...formdata])
    //   }
    
    

    
  return (
    <Container>
         <Link to='/admin/productlist/' className='btn btn-light my-3'>
            Go Back
            </Link>
        <Row className='justify-content-center'>
            <Col sx={12} md={6}>
                <h1 className='text-center mt-4'>Create Product</h1>
                <Form onSubmit={onSubmitHandler}>
                    <FormGroup controlId='name'>
                        <FormLabel>Name:</FormLabel>
                        <FormControl type='text'
                         placeholder='Product Name'
                         value={name}
                         onChange={(e)=>setName(e.target.value)}
                         >
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId='image'>
                        <FormLabel>Image:</FormLabel>
                        <FormControl type='text'
                         placeholder='Upload Image'
                         value={image}
                         onChange={(e)=>setImage(e.target.value)}
                         >
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId='brand'>
                        <FormLabel>Brand:</FormLabel>
                        <FormControl type='text'
                         placeholder='Brand Name'
                         value={brand}
                         onChange={(e)=>setBrand(e.target.value)}
                         >
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId='category'>
                        <FormLabel>Category:</FormLabel>
                        <FormControl type='text'
                         placeholder='Category Name'
                         value={category}
                         onChange={(e)=>setCategory(e.target.value)}
                         >
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId='description'>
                        <FormLabel>Description:</FormLabel>
                        <FormControl type='text'
                         placeholder='Description'
                         value={description}
                         onChange={(e)=>setDescription(e.target.value)}
                         >
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId='price'>
                        <FormLabel>Price:</FormLabel>
                        <FormControl type='number'
                         placeholder='Price'
                         value={price}
                         onChange={(e)=>setPrice(e.target.value)}
                         >
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId='countInStock'>
                        <FormLabel>Stock:</FormLabel>
                        <FormControl type='number'
                         placeholder='Stock'
                         value={countInStock}
                         onChange={(e)=>setCountInStock(e.target.value)}
                         >
                        </FormControl>
                    </FormGroup>
                    <div className='d-grid gap-2'>
                    <Button variant='primary' className='mt-4' type='submit' >Create</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default CreateProduct