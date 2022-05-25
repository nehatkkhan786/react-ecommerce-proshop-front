const UserDetailsReducer = (state, action )=>{

    switch(action.type) {
        case 'USER_LOGIN':
            return {
                loading:false,
                UserDetail : action.payload,
            }
        case 'USER_LOGOUT':
            return {
                
            }

        default: 
        return state

    }

}

export default UserDetailsReducer;