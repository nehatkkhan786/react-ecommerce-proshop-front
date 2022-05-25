import { createContext, useReducer } from "react";
import { useParams } from "react-router-dom";
import ProductReducer from "./productReducer";
import { useNavigate } from 'react-router-dom'


import axios from 'axios'
import { toast } from "react-toastify";

const ProductContext = createContext()

export const ProductProvider = ({children})=> {

    const localUserInfo = localStorage.getItem('UserDetail') ? JSON.parse(localStorage.getItem('UserDetail')) : null
    const shippingAddress = localStorage.getItem('shippingDetails') ? JSON.parse(localStorage.getItem('shippingDetails')) : null
    const paymentmethod = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : null
        const initialState = {
            products : [],
            productsByAdmin:[],
            product:[],
            cartItems : [],
            userInfo:[],
            usersList:[],
            myOrders:[],
            order:[],
            UserDetail :localUserInfo,
            shippingDetails:shippingAddress,
            paymentMethod :paymentmethod,
            singleOrderDetail:[],
            loading : true
        }
        const [state, dispatch] = useReducer(ProductReducer, initialState)
        

       


        // Fetch all  The product from the API and store it in the global state
        const fetchProducts = async() => {

            const {data} = await axios.get('http://localhost:8000/api/products/')

            dispatch({
                type: 'FETCH_PRODUCTS',
                payload : data
            })
        }


        // Fetch all  The product from the API and store it in the global state
        const fetchProductsbyAdmin = async() => {

            const {data} = await axios.get('http://localhost:8000/api/products/')

            dispatch({
                type: 'FETCH_PRODUCTS_BY_ADMIN',
                payload : data
            })
        }

        // Get single product from the backend
            const fetchProduct = async (id) => {
                const {data} = await axios.get(`http://localhost:8000/api/product/${id}`)
            
                dispatch({
                    type:'FETCH_PRODUCT',
                    payload : data
                })

            }

        // Add to cart Function 
        const addToCart = async (id, qty) => {
            const {data} = await axios.get(`/api/product/${id}`)
            dispatch ({
                type: 'ADD_TO_CART',
                payload: {
                    product:data._id,
                    name:data.name,
                    image:data.image,
                    price:data.price,
                    countInStock:data.countInStock,
                    qty
                }
            })
            
        }
        // Remove from Cart
        const removeFromCart = async(id) => {
            
            dispatch({
                type:'REMOVE_FROM_CART',
                payload:id
            })
        }

        // Login a User
        const userLogin = async (email, password) =>{
            try {
                const {data} = await axios.post('/api/users/login',{'username':email, 'password':password},
                    {
                        'headers':{
                            'Content-Type': 'application/json'
                        }
                })

                    dispatch({
                        type:'USER_LOGIN',
                        payload:data
                    })
                    
                    localStorage.setItem('UserDetail', JSON.stringify(data))
                    toast.success('Login successfully')
                   
                    
                   
            } catch (error) {
            console.log(error)
               toast.error('Something Went Wrong')
            }     
            
        }

        const userLogOut = () => {
            localStorage.removeItem('UserDetail')

            dispatch ({
                type:'USER_LOGOUT',
            })
            
        }



        // Get List of users for the admin section
        const getUsers = async(token)=>{
            try {
                const {data} = await axios.get('/api/getusers/', {
                    'headers':{
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                dispatch({
                    type :'GET_ALL_USERS', 
                    payload:data
                })
            } catch (error) {
                console.log(error)
            }
        }


        // Get the user details for profile page
        const getUserDetails = async (token)=>{
            try {
                
                const {data} = await axios.get('/api/users/profile/', {
                    'headers': {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }

                })
                dispatch({
                    type:'GET_USER_PROFILE',
                    payload:data
                })
                
                
            } catch (error) {
                console.log(error)
            }
        }

        // Add shipping Address to the local storage and in state
        const addShippingAddress = (data) =>{
            dispatch({
                type:'ADD_SHIPPING_ADDRESS',
                payload:data,
            })
            localStorage.setItem('shippingDetails', JSON.stringify(data))
        }

        // Add payment method to the state and local storage

        const addPaymentMethod = (data) =>{
            dispatch({
                type: 'ADD_PAYMENT_METHOD',
                payload:data,
            })
            localStorage.setItem('paymentMethod', JSON.stringify(data))
        }


        // Create a order for backend
        const createOrder = async(token, order) =>{
            try {
                const {data} = await axios.post('/api/orders/createorder/', order, 
                {
                    'headers': {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                }

                })
                dispatch({
                    type:'CREATE_ORDER',
                    payload:data,
                })
                
                // dispatch({
                //     type: 'CLEAR_THE_CART'
                // })
                toast.success('Order Placed Successfully')
                
                return data;
                
            } catch (error) {
                toast.error('Something Went Wrong')
            }
        }

        // Get Order of a user 
        const getOrder= async (token, id)=>{
            try {
                const {data} = await axios.get(`/api/order/${id}/`, {
                    'headers':{
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                dispatch({
                    type:'GET_ORDER',
                    payload:data,
                })
            } catch (error) {
                console.log(error)
            }

        }

        const getMyAllOrders = async (token)=>{
            try {
                const {data} = await axios.get('/api/myorders/', {
                    'headers':{
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })

                dispatch({
                    type:'MY_ALL_ORDERS',
                    payload:data,
                })
                
                return data
            } catch (error) {
                console.log(error)
            }
        }

        const deleteProduct = async (token, _id)=>{
            const {data} = axios.delete(`/api/deleteproduct/${_id}`, {
                'headers':{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({
                type:'UPDATE_PRODUCTS', 
                payload:_id,
            })
            
        }

        // const deletehandler = async (_id) =>{
    //     if(window.confirm('Are you sure you want to delete this?')){
    //         const {response} = await axios.delete(`/api/deleteproduct/${_id}`, {
    //             'headers':{
    //                 'content': 'application/json',
    //                 Authorization:`Bearer ${UserDetail.token}`

    //             }
    //         })
    //         toast.success('Item Deleted Successfully')
           

    //     }    
    // }


        

        return <ProductContext.Provider value={{
            fetchProducts:fetchProducts,
            products:state.products,

            fetchProduct:fetchProduct,
            product:state.product,
            cartItems:state.cartItems,
            UserDetail:state.userDetail,
            usersList:state.usersList,
            order:state.order,
            singleOrderDetail:state.singleOrderDetail,
            myOrders:state.myOrders,
            fetchProductsbyAdmin:fetchProductsbyAdmin,
            productsByAdmin:state.productsByAdmin,

            addToCart:addToCart,
            removeFromCart:removeFromCart,
            addShippingAddress:addShippingAddress,
            addPaymentMethod,
            createOrder,

            userLogin:userLogin,
            getUserDetails:getUserDetails,

            UserDetail:state.UserDetail,
            userLogOut,
            userInfo:state.userInfo,
            getUsers:getUsers,
            getOrder,
            getMyAllOrders,

            deleteProduct,

            shippingDetails:state.shippingDetails,
            paymentMethod:state.paymentMethod,
      

            loading:state.loading,
            dispatch:dispatch,
        }} >
            {children}
        </ProductContext.Provider>
}

export default ProductContext;