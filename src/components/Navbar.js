import React,{useEffect,useState} from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home"
import CustomersContainer from "./customers/CustomersContainer";
import { logoutUser } from '../action/userAction'
import ProductsContainer from "./products/ProductsContainer";
import User from "./User";
import PrivateRoute from "../helpers/PrivateRoute";
import ShowBillDetails from "./bills/ShowBillDetails";
import BillsContainers from "./bills/BillsContainers";
import {startgetUserInfo } from "../action/userAction";
import {startGetAllCustomer} from "../action/customersAction"
import {startGetAllProducts} from "../action/productsAction"
import {startShowAllBills} from "../action/billsAction"
const Navbar = (props) => {
    const [userLoggedIn,setUserLoggedIn]=useState(false)
    const handleAuth=()=>{
      setUserLoggedIn(!userLoggedIn)
    }
  
    const dispatch = useDispatch()
    //on auto login
    useEffect(()=>{
        if(localStorage.getItem('token')){
          dispatch(startgetUserInfo())
          dispatch(startGetAllCustomer())
          dispatch(startGetAllProducts())
          dispatch(startShowAllBills())
          handleAuth()
        }
       },[])
    return (
        <div>
            <div className="  rounded p-3 mt-4 mb-4 sticky-top " style={{ backgroundColor: '#1F2833' }}>
                <Link className="text-decoration-none " to='/'> <button className="d-inline  ml-3 btn btn-outline-dark pb-0"><h4 style={{ color: '#66FCF1' }}>Home</h4></button></Link>
                {
                    userLoggedIn ?
                      // if user Loged in
                        <>
                            <Link className="text-decoration-none" to='/customers'> <button className="d-inline btn btn-outline-dark pb-0" ><h4 style={{ color: '#66FCF1' }}>Customers</h4></button></Link>
                            <Link className="text-decoration-none" to='/products'> <button className="d-inline btn btn-outline-dark pb-0" ><h4 style={{ color: '#66FCF1' }}>Products</h4></button></Link>
                            <Link className="text-decoration-none" to='/bills'> <button className="d-inline btn btn-outline-dark pb-0" ><h4 style={{ color: '#66FCF1' }}>Bills</h4></button></Link>
                            <div className="d-inline" style={{ float: 'right' }}>
                                <Link className="text-decoration-none" to='/user'><button className="d-inline btn btn-outline-dark pb-0"><h4 style={{ color: '#66FCF1' }}>User</h4></button></Link>
                                <Link className="text-decoration-none" to='/'><button className="d-inline btn btn-outline-dark pb-0" onClick={() => {
                                    handleAuth()
                                    dispatch(logoutUser())
                                }}><h4 style={{ color: '#66FCF1' }}>Logout</h4></button></Link>
                            </div>
                        </>
                        :
                        // else not Loged in
                        <div className="d-inline" style={{ float: 'right' }}>
                            <Link className="text-decoration-none" to='/register'><button className="d-inline btn btn-outline-dark pb-0"><h4 className="d-inline" style={{ color: '#66FCF1' }} >Register</h4></button></Link>
                            <Link className="text-decoration-none" to='/login'><button className="d-inline btn btn-outline-dark pb-0"><h4 className="d-inline" style={{ color: '#66FCF1' }}>Login</h4></button></Link>
                        </div>
                }
            </div>
            <Route path='/login' render={(props) => { return <Login {...props} handleAuth={handleAuth} /> }} exact />
            <PrivateRoute path='/user' component={User} exact />
            <Route path='/register' component={Register} exact />
            <Route path='/' component={Home} exact />
            <PrivateRoute path='/customers' component={CustomersContainer} exact />
            <PrivateRoute path='/bills' component={BillsContainers} exact />
            <PrivateRoute path='/products' component={ProductsContainer} exact />
            <PrivateRoute path='/bills/:_id' exact={true} component={ShowBillDetails} />
        </div>
    )
}
export default Navbar