import React from "react";
import CustomersForm from "./CustomersForm";
import { startUpdateACustomer } from "../../action/customersAction";
import { useDispatch } from "react-redux";
const CustomersEditItem = (props) => {
    const dispatch = useDispatch()
    const { obj, handleToggle } = props
    //toupdate customer action generator
    const formSubmit = (formData) => {
        dispatch(startUpdateACustomer(obj._id, formData, handleToggle))
    }
    return (
        <div className="rounded p-2" style={{ color: '#66FCF1', backgroundColor: '#1F2833' }}>
            <h3>Edit Customer</h3>
            <CustomersForm {...obj} formSubmit={formSubmit} />
        </div>
    )
}
export default CustomersEditItem