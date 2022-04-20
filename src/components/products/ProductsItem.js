import React, { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import ProductsEditItem from "./ProductsEditItem";
import { startRemoveProduct } from '../../action/productsAction'
const ProductsItem = (props) => {
    const { obj } = props
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()
    const handleToggle = () => {
        setToggle(!toggle)
    }
    const show = () => {
        swal(`Name  :  ${obj.name}
        Price  :  ${obj.price}
        Created At  :  ${obj.createdAt}
        Updated At  :  ${obj.updatedAt}`)
    }
    return (
        <div>
            {
                toggle ? <div style={{ color: '#66FCF1', backgroundColor: 'grey' }} className='rounded shadow'>
                    <ProductsEditItem obj={obj} handleToggle={handleToggle} />
                    <button className='d-inline btn btn-dark m-3' onClick={handleToggle}>Cancel</button>
                </div>
                    :
                    <div className="m-3 p-3 rounded shadow border bg-light " >
                        <div className="row ">
                            <div className="col-2">
                                <h4 className="d-inline">{obj.name}  </h4>
                            </div>
                            <div className="col-3">
                                <h4 className="d-inline">{obj.price}</h4>
                            </div>
                            <div className="col-2">
                                <h4 className="d-inline "><button className="btn d-inline  btn-dark" onClick={handleToggle} >EDIT</button></h4>
                            </div>
                            <div className="col-2">
                                <h4 className="d-inline "> <button className="btn d-inline " style={{ color: '#66FCF1', backgroundColor: '#1F2833' }} onClick={() => { show() }} >SHOW</button></h4>
                            </div>
                            <div className="col-1">
                                <h4 className="d-inline"><button className="btn btn-danger d-inline" onClick={() => { dispatch(startRemoveProduct(obj._id)) }}>DELETE</button></h4>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
export default ProductsItem