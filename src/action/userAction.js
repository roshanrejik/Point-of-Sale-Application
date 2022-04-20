import axios from "../config/axios";
import {startGetAllCustomer} from '../action/customersAction'
import {startGetAllProducts} from '../action/productsAction'
import {startShowAllBills} from '../action/billsAction'
export const startRegisterUser=(formData,redirectToLogin,handleError)=>{
    console.log(formData);
    return (dispatch)=>{
        axios.post('/users/register',formData)
        .then((response)=>{
            const data=response.data
            console.log(data);
           if(data.hasOwnProperty('errmsg')){
            handleError(response.data.errmsg)
           }
           else{
            redirectToLogin()
           }
        })
        .catch(err=>{
            console.log(err.message);
        })
    }
}
export const startLoginUser=(formData,redirectToHome,handleAuth,handleError)=>{
    console.log(formData);
    return (dispatch)=>{
        axios.post('/users/login',formData)
        .then((response)=>{
           if(response.data.hasOwnProperty('errors')){
            handleError(response.data.errors)
           }
           else{
            localStorage.setItem('token',response.data.token)
            dispatch(startgetUserInfo())
            dispatch(startGetAllCustomer())
            dispatch(startGetAllProducts())
            dispatch(startShowAllBills())
            redirectToHome()
            handleAuth()
           }
            })
        .catch(err=>{
            alert(err.message);
        })
    }
}
export const startgetUserInfo=()=>{
    return (dispatch)=>{
        axios.get('/users/account',{
           headers:{ Authorization : `Bearer ${localStorage.getItem('token')}`}
        }
        )
        .then((response)=>{
           console.log(response.data);
           const userinfo=response.data
                 dispatch(getUserInfo(userinfo))
        })
        .catch(err=>{
            console.log(err.message);
        })
    }
}

export const logoutUser=()=>{
    return {
         type:'LOGOUT_USER'
    }
}
export const getUserInfo=(userinfo)=>{
    return {
        type:"SET_USER_INFO",payload:userinfo
    }
}