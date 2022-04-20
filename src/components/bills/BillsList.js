import React, { useState } from "react";
import { useSelector } from "react-redux";
import Billitem from "./Billitem";
const BillsList = (props) => {
    const {_id}=props
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(10)
    const bills = useSelector(state => { return state.bills })
    const handleBack = () => {
        setStart(start - 10)
        setEnd(start)

    }
    const handleNext = () => {
        setStart(end)
        if (end + 10 > bills.data.length) {
            setEnd(bills.data.length)
        }
        else {
            setEnd(end + 10)
        }
    }
    const dataOrder = (orderBy) => {

        switch (orderBy) {
            case '': return [...bills.data]
            case orderBy: return [...bills.data.filter(ele => ele.customer=== _id||'')]
            default: return [...bills.data]
        }
    }
    return (<div>
        <h2 className="border p-3 mt-4 rounded" style={{ backgroundColor: '#1F2833', color: '#66FCF1' }}>Listing Bills -{dataOrder(_id).length}

            <div className='d-inline' style={{ float: 'right' }}>
                <button className=" btn btn-outline-dark pb-0" onClick={handleBack} disabled={start < 10}><h4 style={{ color: '#66FCF1' }}>back</h4></button>  <button className="btn btn-outline-dark pb-0" style={{ color: '#66FCF1' }} onClick={handleNext} disabled={end >= bills.data.length}><h4>Next</h4></button></div>

        </h2>
        {
            dataOrder(_id).reverse().slice(start, end).map((ele, i) => {
                return <Billitem key={i} ele={ele} />
            })
        }
    </div>)
}
export default BillsList
