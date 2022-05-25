const ProductReducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_PRODUCTS':
            return {
                ...state,
                products:action.payload,
                loading :false
            }

        case 'UPDATE_PRODUCTS':
            const deleted_product = action.payload
            return {
                ...state,
                products: state.products.filter((product)=>product._id !== deleted_product),
                loading : false 
            }
        case 'EDIT_PRODUCT':
        const edited_product = action.payload
        
        return {
            ...state,
            

        }



        case 'CREATE_PRODUCT':
            const new_product = action.payload
            return {
                ...state,
                products:[...state.products, new_product],
                loading : false,
            }

        case 'FETCH_PRODUCT':
            return {
                ...state,
                product:action.payload,
                loading:false
            }

        case 'ADD_TO_CART':
            const item = action.payload
            const existItem = state.cartItems.find((x)=> x.product === item.product)

            if (existItem){
                return {
                    ...state,
                    cartItems : state.cartItems.map((x)=>x.product === existItem.product ? item : x)
                }

            }else {
                return {
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }

        case 'REMOVE_FROM_CART':
            return {
                ...state, 
                cartItems: state.cartItems.filter((x)=>x.product !== action.payload)
            }

        case 'CLEAR_THE_CART':
            return {
                ...state,
                cartItems: [],
            }

        case 'CREATE_ORDER':
            return {
                ...state,
                order:action.payload,
            }

        case 'USER_LOGIN':
            return {
                ...state,
                loading:false,
                UserDetail : action.payload,
            }

        case 'USER_LOGOUT':
            return {
                ...state,
                loading:false,
                UserDetail :null,
                userInfo:null,
                myOrders:[],

            }

        case 'GET_ALL_USERS':
            return {
                ...state,
                loading:false,
                usersList:action.payload,
            }

        case 'GET_USER_PROFILE':
            return {
                ...state,
                loading:false,
                userInfo : action.payload,
            }

        case 'ADD_SHIPPING_ADDRESS':
            return {
                ...state, 
                shippingDetails:action.payload,
            }
        case 'ADD_PAYMENT_METHOD':
            return {
                ...state, 
                paymentMethod:action.payload,
            }

        // Get Orders By ID Reducer

        case 'GET_ORDER':
            return {
                ...state,
                singleOrderDetail:action.payload,
                loading :false,
            }

        case 'MY_ALL_ORDERS':
            return {
                ...state,
                myOrders:action.payload,
                loading:false,
            }

        default:
            return state
    }
}

export default ProductReducer;
