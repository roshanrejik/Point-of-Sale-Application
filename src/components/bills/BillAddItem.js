import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startCreateBill } from '../../action/billsAction'
import Select from 'react-select';

import BillsList from '../bills/BillsList'
const BillAddItem = (props) => {
  const [total, setTotal] = useState(0)
  const[_id,set_id]=useState('')
  const dispatch = useDispatch()
  const productsRedux = useSelector(state => {
    return state.products
  })
  const customerssRedux = useSelector(state => {
    return state.customers
  })
  const [formValues, setFormValues] = useState([{ product: "", quantity: 1 }])
  const reset = () => {
    setFormValues([{ product: "", quantity: 1 }])
    set_id('')
  }
  const handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    //{product: '624683812494450016159b53', quantity: 1}=>index
    setFormValues(newFormValues);
  }

  const addFormFields = () => {
    const newFormValues = [...formValues, { product: "", quantity: 1 }]
    setFormValues(newFormValues)
  }

  const removeFormFields = (i) => {
    // let newFormValues = [...formValues];
    // newFormValues.splice(i, 1);
    // setFormValues(newFormValues)
    const newFormValues=formValues.filter((ele,index)=>{return index!==i})
    setFormValues(newFormValues)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const todayDate = new Date().toISOString().slice(0, 10);
    const formData = {
      date: todayDate, customer: _id, lineItems: [...formValues]
    }
    dispatch(startCreateBill(formData, reset))
    setTotal(0)
  }
  const subTotalFun = (product, quantity) => {
    return productsRedux.data.find(ele => ele._id === product).price * quantity
  }
  useEffect(() => {
    if (formValues.every(ele => { return ele.product })) {
      let tot = 0
      formValues.forEach(ele => { tot += subTotalFun(ele.product, ele.quantity) })
      setTotal(tot)
    }
  }, [formValues])
  const [cust,setCust]=useState('')
  const handleId=(cust)=>{
    setCust(cust)
    set_id(cust._id)
  }
  return (<div><div className="border shadow rounded p-2" style={{ color: '#66FCF1', backgroundColor: '#2F363F' }}>
    <h2 className=" d-inline">Add Bills</h2><h2 className="d-inline m-3" style={{ float: 'right' }}>Total:{total}</h2>
    <form onSubmit={handleSubmit} >
      
         {/* {<select className="form-select d-inline m-2" name='customer' style={{ width: '40%' }} value={_id} onChange={handleId}>
         <option value='' >-select Customer-</option>
         {
           customerssRedux.data.map(ele => {
             return (
               <option key={ele._id} value={ele._id}>{ele.name}</option>
             )
           })
         }
       </select>} */}
       
       <div style={{ width: '40%',color:'black' }} className="m-2">
       <Select name="customer"   value={customerssRedux.data.filter(function(option) {
          return option.name === cust.name
        })} options={customerssRedux.data} getOptionLabel ={(option)=>option.name} label={(option)=>option.name} 
         getOptionValue ={(option)=>option._id}
         onChange={handleId}
         placeholder='--Select Customer--'
         />
       </div>
       {
        formValues.map((element, index) => (
          <div className="form-inline " key={index}>
           <select className="form-select d-inline m-2" name='product' style={{ width: '40%' }} value={element.product || ""} onChange={e => handleChange(index, e)}>
              <option >-select product-</option>
              {
                productsRedux.data.map(item => {
                  return (
                    <option key={item._id} value={item._id}>{item.name}</option>
                  )
                })
              }
            </select>

            <input type='number' className="form-control  d-inline m-2 " name='quantity' min="1" max="99" placeholder="Quantity" value={element.quantity || ""} onChange={e => handleChange(index, e)} style={{ width: '20%' }} />
            {element.product && <h5 className="d-inline  p-2 ">{subTotalFun(element.product, element.quantity)}</h5>}
            {
              index ?
                <button type="button" className="button remove btn btn-danger m-2 " onClick={() => removeFormFields(index)}>Remove</button>
                : null
            }
          </div>
        ))}
      <div className="button-section">
        <button className="button add btn btn-warning m-2" type="button" onClick={() => addFormFields()}>Add</button>
        <button className="button submit  btn btn-primary m-2" type="submit">Submit</button>
      </div>
    </form>
  </div>
  <div>
        <BillsList _id={_id}/>
  </div>
  </div>
  )
}
export default BillAddItem