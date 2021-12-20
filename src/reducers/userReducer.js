const INITIAL_STATE={
    id:null,
    username:'',
    email:'',
    role:'',
    status:'',
    chart:[],
}


export const userReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type){
        case 'LOGIN_SUCCESS':
            return {...state,...action.payload}
        case 'REGISTER_SUCCESS':
            return {...state,...action.payload}
        case 'UPDATE_CART_SUCCESS':
            return {...state,...action.payload}
        case 'LOGOUT':
            return INITIAL_STATE
        default:
            return state
    }
}