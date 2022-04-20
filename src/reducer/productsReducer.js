const initProducts={
    data:[],error:{},loadding:true
}
const productsReducer=(state=initProducts,action)=>{
    switch(action.type){
       case 'ADD_PRODUCT':return {...state,data:[...state.data,{...action.payload}]}
       case 'GET_PRODUCTS': return {...state,data:[...action.payload]}
       case 'REMOVE_PRODUCT':return {...state,data:state.data.filter(obj=>{return obj._id!==action.payload})}
       case 'UPDATE_PRODUCT':return {...state,data:state.data.map(obj=>{
        if(obj._id==action.payload._id)
        {
            return {...action.payload}
        }
        else{
           return {...obj}
        }
    })}

        default : return {...state}
    }
}
export default productsReducer