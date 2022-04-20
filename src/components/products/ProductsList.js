import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductsItem from "./ProductsItem";
const ProductsList = (props) => {
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(10)

    const products = useSelector((state) => {
        return state.products
    })
    const [orderBy, setOrderBy] = useState('')
    const handleOrderBy = (e) => {
        setOrderBy(e.target.value)
    }
    const [searchKey, setSearchKey] = useState('')

    const handleSearchKey = (e) => {
        setSearchKey(e.target.value)
    }
    const dataOrder = (orderBy) => {

        switch (orderBy) {
            case 'A-Z': return [...[].concat(products.data).sort((a, b) => a.name.localeCompare(b.name))]
            case 'Z-A': return [...[].concat(products.data).sort((b, a) => a.name.localeCompare(b.name))]
            case 'Reverse': return [...[].concat(products.data).reverse()]
            default: return [...products.data]
        }
    }
    const handleBack = () => {
        setStart(start - 10)
        setEnd(start)

    }
    const handleNext = () => {
        setStart(end)
        if (end + 10 > products.data.length) {
            setEnd(products.data.length)
        }
        else {
            setEnd(end + 10)
        }
    }
    return (
        <div className="shadow rounded ">
            <div className="rounded p-4" style={{ color: '#66FCF1', backgroundColor: '#1F2833' }}>

                <h2 className="d-inline">  Listing Products -{products.data.length}
                    <div className="d-inline" style={{ float: 'right' }}>
                        <input type='name' value={searchKey} className="form-control  d-inline m-1" style={{ width: '30%' }} onChange={handleSearchKey} placeholder='Search By Name ....' />
                        <select value={orderBy} onChange={handleOrderBy} className="form-select d-inline m-1" style={{ width: '25%' }} >
                            <option value='' >  Order By</option>
                            <option value='A-Z'>A-Z Order</option>
                            <option value='Z-A'>Z-A Order</option>
                            <option value='Reverse'>Reverse Order</option>
                        </select>
                        <button className=" btn btn-outline-dark pb-0" onClick={handleBack} disabled={start < 10}><h4 style={{ color: '#66FCF1' }}>back</h4></button>  <button className="btn btn-outline-dark pb-0" style={{ color: '#66FCF1' }} onClick={handleNext} disabled={end >= products.data.length}><h4>Next</h4></button>
                    </div>
                </h2>
            </div>

            <div className=" p-4 rounded" >
                {
                    dataOrder(orderBy).filter(ele => {
                        return ele.name.toLowerCase().includes(searchKey)
                    }).slice(start, end).map(obj => {
                        return (

                            <ProductsItem key={obj._id} obj={obj} />

                        )
                    })
                }
            </div>


        </div>
    )
}
export default ProductsList