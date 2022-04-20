import axios from "../config/axios";
export const startCreateaCustomer=(formData,token,formReset)=>{
        console.log('hai',token,formData);
        return (dispatch)=>{
            axios.post('/customers',formData,{
               headers:{ Authorization : `Bearer ${token}`}
            }
            )
            .then((response)=>{
            const customer=response.data
               console.log(customer);
               dispatch(addCustomer(customer))
               formReset()
            })
            .catch(err=>{
                console.log(err.message);
            })
        }
    }
export const startGetAllCustomer=()=>{
        return (dispatch)=>{
            axios.get('/customers',{
               headers:{ Authorization : `Bearer ${localStorage.getItem('token')}`}
            }
            )
            .then((response)=>{
            const customers=response.data
            dispatch(getCustomer(customers))
            })
            .catch(err=>{
                console.log(err.message);
            })
        }
    }
export const startGetSingleCustomer=(_id)=>{
            axios.get(`/customers/${_id}`,{
               headers:{ Authorization : `Bearer ${localStorage.getItem('token')}`}
            }
            )
            .then((response)=>{
            const customer=response.data
            console.log(customer);
            })
            .catch(err=>{
                console.log(err.message);
            })
        }
export const startRemoveCustomer=(_id)=>{
    return(dispatch)=>{
        axios.delete(`/customers/${_id}`,{
            headers:{ Authorization : `Bearer ${localStorage.getItem('token')}`}
        })
        .then((response)=>{
            const _id=response.data._id
            dispatch(removeCustomer(_id))
        })
    }
}
export const startUpdateACustomer=(_id,formData,handleToggle)=>{
    return(dispatch)=>{
        axios.put(`/customers/${_id}`,formData,{
            headers:{ Authorization : `Bearer ${localStorage.getItem('token')}`}
        })
        .then((response)=>{
            const newCustomerObj=response.data
            dispatch(UpdateACustomer(newCustomerObj))
            handleToggle()
        })
        .catch(err=>console.log(err.message));
    }
}

export const UpdateACustomer=(newCustomerObj)=>{
    return{
        type:'UPDATE_CUSTOMER',payload:newCustomerObj
    }
}
export const removeCustomer=(_id)=>{
    return{
        type:'REMOVE_CUSTOMER',payload:_id
    }
}
export const addCustomer=(customerObj)=>{
    return{
        type:'ADD_CUSTOMER',payload:customerObj
    }
}
export const getCustomer=(customersArr)=>{
    return{
        type:'GET_CUSTOMER',payload:customersArr
    }
}