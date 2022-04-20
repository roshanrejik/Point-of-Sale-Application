import React from "react";
import { Link } from "react-router-dom";
import { startDeleteBills } from '../../action/billsAction';
import { useDispatch, useSelector } from "react-redux";
const Billitem = (props) => {
    const dispatch = useDispatch()
    const { ele } = props
    const customers = useSelector(state => state.customers.data)
    const name = (customers.length > 0 && customers.find(ele1 => ele1._id === ele.customer).name);
    return (

        <div className="m-4 p-3 rounded border shadow bg-light">
            <div className="row">
                <div className="col-3">
                 <h3 className="d-inline " >{name}</h3>
                </div>
                <div className="col-3">
                    <h3 className="d-inline">{ele.date.slice(0, 10)}</h3>
                </div>
                <div className="col-2">
                    <h3 className="d-inline">{ele.total}</h3>
                </div>
                <div className="col-2">
                    <button className="d-inline btn" style={{ color: '#66FCF1', backgroundColor: '#1F2833' }} ><Link to={`/bills/${ele._id}`} style={{ textDecoration: 'none', color: '#66FCF1' }}>Details</Link></button>
                </div>
                <div className="col-2" >
                    <button className="d-inline btn btn-danger" onClick={() => { dispatch(startDeleteBills(ele._id)) }}>Delete</button>
                </div>

            </div>
        </div>
    )
}
export default Billitem