import React from "react";
import { startCreateProduct } from "../../action/productsAction";
import ProductsForm from "./ProductsForm";
import { useDispatch } from "react-redux";
const ProductsAddItem = (props) => {
    const dispatch = useDispatch()
    const formSubmit = (formData, formReset) => {
        dispatch(startCreateProduct(formData, formReset))
    }
    return (
        <div className="shadow mb-5 p-2 rounded" style={{ backgroundColor: '#1f2833', color: '#66FCF1' }}>
            <h2>Add Products</h2>
            <ProductsForm formSubmit={formSubmit} />
        </div>
    )
}
export default ProductsAddItem