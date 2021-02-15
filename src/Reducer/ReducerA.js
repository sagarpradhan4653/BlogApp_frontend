
const ReducerA= (state={},action)=>{
    switch(action.type){
        case 'TOKEN_SEND':{
            const { token ,user_id, username} = action.payload
            const userDetails = {
                user_token : token,
                user_id : user_id,
                username : username
            }
            localStorage.setItem('user_token', userDetails.user_token)
            localStorage.setItem('user_id', userDetails.user_id)
            localStorage.setItem('username', userDetails.username)
            return userDetails
            
        }




        case 'SEND_USER_DATA':{
            return {...state, user_data:action.payload}


        }

        case 'AUTH_START': {
            const authState = { user_token: null, user_id : null, username: null}
            authState.user_token = localStorage.getItem('user_token') ? localStorage.getItem('user_token') : null
            authState.user_id = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : null
            authState.username = localStorage.getItem('username') ? localStorage.getItem('username') : null


            return authState
        }

        case 'LOGOUT':{
            localStorage.clear() 
            return {user_token : null, user_id : null, username : null}
        }
            
        default:
            return state
    }
}

export default ReducerA