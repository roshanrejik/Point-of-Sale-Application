const initUser={
    data:{},error:{},loadding:true
}
const userReducer=(state=initUser,action)=>{
    switch(action.type){
        case 'LOGOUT_USER':{
            localStorage.removeItem('token')
            return {...state,data:{}}
        }
        case "SET_USER_INFO":{
            return {...state,data:{...action.payload}}
        }
        default : return {...state}
    }
}
export default userReducer