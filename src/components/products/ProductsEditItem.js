import React from "react";
import ProductsForm from "./ProductsForm";
import { startUpdateProduct } from "../../action/productsAction";
import { useDispatch } from "react-redux";
const ProductsEditItem = (props) => {
    const dispatch = useDispatch()
    const { obj, handleToggle } = props
    const formSubmit = (formData) => {
        dispatch(startUpdateProduct(obj._id, formData, handleToggle))
    }
    return (
        <div className="rounded p-3 " style={{ color: '#66FCF1', backgroundColor: '#1F2833' }}>
            <h3>Edit Customer</h3>
            <ProductsForm {...obj} formSubmit={formSubmit} />
        </div>
    )
}
export default ProductsEditItem