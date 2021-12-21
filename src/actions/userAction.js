import axios from "axios"
import { API_URL } from "../helper"
import AsyncStorageLib from "@react-native-async-storage/async-storage"

export const onLogin = (username,password) =>{
    return async (dispatch)=>{
        try {
            let res = await axios.get(`${API_URL}/dataUser?username=${username}&password=${password}`)
            if(res.data.length>0){
                // menyimpan data ke reducer
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : res.data[0]
                })
                AsyncStorageLib.setItem('dataUser',JSON.stringify(res.data[0]))
                return {success : true}
            }
            
        } catch (error) {
            console.log(error)
        }
    }
}

export const onKeepLogin =()=>{
    return async (dispatch)=>{
        try {
            let dataUser = await AsyncStorageLib.getItem('dataUser')
            dataUser = JSON.parse(dataUser)
            if(dataUser){
                let res = await axios.get(`${API_URL}/dataUser?id=${dataUser.id}`)
                if(res.data.length>0){
                    dispatch({
                        type : 'LOGIN_SUCCESS',
                        payload : res.data[0]
                    })
                    AsyncStorageLib.setItem('dataUser',JSON.stringify(res.data[0]))
                    return {success : true}
                }
            }
        }catch (error){
            console.log(error)
        }
    }
}

export const onRegister = (email,username,pass)=>{
    return async (dispatch) => {
        try{
            if(username!='' && pass!='' && pass!=''){
            let res = await axios.post(`${API_URL}/dataUser`,{
                username : username,
                email : email,
                password : pass,
                role:"user",
                status:"Active",
                cart:[],
                photo:"https://www.clipartmax.com/png/middle/257-2572603_user-man-social-avatar-profile-icon-man-avatar-in-circle.png",
            })
            dispatch({
                type:'REGISTER_SUCCESS',
                payload:res.data
            })
            return{success:true}
        }
    }catch (error){
        console.log(error)
    }
}

}

export const updateUserChart =(id,data)=>{
    return async (dispatch) =>{
        try{
            let res = await axios.patch(`${API_URL}/dataUser/${id}`,{cart:data})
            dispatch({
                type:'UPDATE_CART_SUCCESS',
                payload:res.data
            })
            return{success:true}
        }
        catch(error){
            console.log(error)
        }
    }
}

export const logoutAction = ()=>{
    return async (dispatch) => {
        await AsyncStorageLib.removeItem('dataUser')
        dispatch({ type: "LOGOUT" })
    }
}

export const updateUserPhoto = (image,iduser) =>{
    return async (dispatch) =>{
        try {
            let res= await axios.patch(`${API_URL}/dataUser/${iduser}`,{photo:image})
            dispatch({
                type:'UPDATE_PHOTO',
                payload:res.data.photo
            })
            return {success:true}
        }
        catch(error){
            console.log(error)
        }
    }
}

export const updateUser = (editUsername,editEmail,editPassword,iduser) =>{
    return async (dispatch) =>{
        try {
            let data={
                username : editUsername,
                email : editEmail,
                password : editPassword
            }
            let res= await axios.patch(`${API_URL}/dataUser/${iduser}`,data)
            dispatch({
                type:'UPDATE_USER',
                payload:res.data
            })
            return {success:true}
        }
        catch(error){
            console.log(error)
        }
    }
}


