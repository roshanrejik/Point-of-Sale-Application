const initCustomer={
    data:[],error:{},loadding:true
}
const customersReducer=(state=initCustomer,action)=>{
    switch(action.type){
        case 'ADD_CUSTOMER': return {...state,data:[...state.data,{...action.payload}]}
        case 'GET_CUSTOMER': return {...state,data:[...action.payload]}
        case 'REMOVE_CUSTOMER':return {...state,data:state.data.filter(obj=>{return obj._id!==action.payload})}
        case 'UPDATE_CUSTOMER':return {...state,data:state.data.map(obj=>{
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
export default customersReducer