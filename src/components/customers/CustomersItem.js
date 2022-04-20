import React, { useState } from "react";
import CustomersEditItem from "./CustomersEditItem";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { startRemoveCustomer } from '../../action/customersAction'
const CustomersItem = (props) => {
    const { obj } = props
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()
    const handleToggle = () => {
        setToggle(!toggle)
    }
    const show = () => {
        swal(`Name  :  ${obj.name}
        Email  :  ${obj.email}
        Mobile  :  ${obj.mobile}
        Created At  :  ${obj.createdAt}
        Updated At  :  ${obj.updatedAt}`)
    }
    return (
        <div>
            {
                toggle ? <div style={{ color: '#66FCF1', backgroundColor: 'grey' }} className='rounded m-3'>
                    <CustomersEditItem obj={obj} handleToggle={handleToggle} />
                    <button className='d-inline btn btn-dark m-3 ' onClick={handleToggle}>Cancel</button>
                </div>
                    :
                    <div className="m-4 p-3 rounded border shadow bg-light box">
                        <div className="row "> 
                            <div className="col-2">
                                    <h4 className="d-inline">{obj.name}  </h4>
                            </div>
                            <div className="col-4">
                                <h4 className="d-inline">{obj.email}</h4>
                            </div>
                            <div className="col-2">
                                <h4 className="d-inline">{obj.mobile}</h4>
                            </div>
                            <div className="col-1">
                                <h4 className="d-inline "> <button className="btn d-inline " style={{ color: '#66FCF1', backgroundColor: '#1F2833' }} onClick={() => { show() }} >SHOW</button></h4>
                            </div>
                            <div className="col-1">
                                <h4 className="d-inline "><button className="btn btn-dark d-inline " onClick={handleToggle} >EDIT</button></h4>
                            </div>
                            <div className="col-1">
                                <h4 className="d-inline"><button className="btn btn-danger d-inline" onClick={() => { dispatch(startRemoveCustomer(obj._id)) }}>DELETE</button></h4>
                            </div>

                        </div>
                    </div>
            }
        </div>
    )
}
export default CustomersItem