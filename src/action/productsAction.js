import axios from '../config/axios'
export const startCreateProduct=(formData,formReset)=>{
        return (dispatch)=>{
            axios.post('/products',formData,{
               headers:{ Authorization : `Bearer ${localStorage.getItem('token')}`}
            }
            )
            .then((response)=>{
            const productObj=response.data
               dispatch(addProduct(productObj))
               formReset()
            })
            .catch(err=>{
                console.log(err.message);
            })
        }
    }   

export const startGetAllProducts=()=>{
    return (dispatch)=>{
        axios.get('/products',{
           headers:{ Authorization : `Bearer ${localStorage.getItem('token')}`}
        }
        )
        .then((response)=>{
        const products=response.data
        dispatch(getProducts(products))
        })
        .catch(err=>{
            console.log(err.message);
        })
    }
}
export const startRemoveProduct=(_id)=>{
    return(dispatch)=>{
        axios.delete(`/products/${_id}`,{
            headers:{ Authorization : `Bearer ${localStorage.getItem('token')}`}
        })
        .then((response)=>{
            const _id=response.data._id
            dispatch(removeProduct(_id))
        })
    }
}
export const startUpdateProduct=(_id,formData,handleToggle)=>{
    return(dispatch)=>{
        axios.put(`/products/${_id}`,formData,{
            headers:{ Authorization : `Bearer ${localStorage.getItem('token')}`}
        })
        .then((response)=>{
            const newProductbj=response.data
            dispatch(updateProduct(newProductbj))
            handleToggle()
        })
        .catch(err=>console.log(err.message));
    }
}
export const addProduct=(productObj)=>{
    return{
        type:'ADD_PRODUCT',payload:productObj
    }
}
export const getProducts=(products)=>{
    return{
        type:'GET_PRODUCTS',payload:products
    }
}
export const removeProduct=(_id)=>{
    return{
        type:'REMOVE_PRODUCT',payload:_id
    }}
export const updateProduct=(newProductbj)=>{
    return{
        type:'UPDATE_PRODUCT',payload:newProductbj
    } 
}