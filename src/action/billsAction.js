import axios from "../config/axios";
export const startCreateBill=(formData,reset)=>{
    return (dispatch)=>{
        axios.post('/bills',formData,{
            headers:{ Authorization : `Bearer ${localStorage.getItem('token')}`}
        })
        .then(response=>{
            dispatch(addtoBill(response.data))
            reset()
        })
        .catch(err=>console.log(err.message))
    }
}
export const startShowAllBills=()=>{
   return  (dispatch)=>{
        axios.get('/bills',{
            headers:{ Authorization : `Bearer ${localStorage.getItem('token')}`}
        })
        .then(response=>{
            dispatch(allBills(response.data))
        })
        .catch(err=>console.log(err.message))
    }
}
export const startDeleteBills=(_id)=>{
    return  (dispatch)=>{
         axios.delete(`/bills/${_id}`,{
             headers:{ Authorization : `Bearer ${localStorage.getItem('token')}`}
         })
         .then(response=>{
             dispatch(deleteBill(response.data._id))
         })
         .catch(err=>console.log(err.message))
     }
 }

export const allBills=(data)=>{
    return{
        type:'GET_ALL_BILLS',payload:data
    }
}
export const addtoBill=(dataObj)=>{
    return{
        type:'ADD_TO_BILL',payload:dataObj
    }
}
export const deleteBill=(_id)=>{
    return{
        type:'DELETE_BILL',payload:_id
    }
}