const initBills={
    data:[],error:{},loadding:true
}
const billsReducer=(state=initBills,action)=>{
    switch(action.type){
        case "GET_ALL_BILLS":return {...state,data:[...action.payload]}
        case 'ADD_TO_BILL':return {...state,data:[...state.data,{...action.payload}]}
        case 'DELETE_BILL':return {...state,data:[...state.data.filter(ele=>ele._id!=action.payload)]}
        default : return {...state}
    }
}
export default billsReducer