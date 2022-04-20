import React from "react";
import { useSelector } from "react-redux";
import Pdf from "react-to-pdf";
import emailjs from 'emailjs-com'
import Swal from "sweetalert2";
const ref = React.createRef();

const ShowBillDetails = (props) => {
    const { _id } = props.match.params
    const bills = useSelector(state => state.bills.data)
    const bill = (bills.length > 0 && bills.find(ele1 => ele1._id === _id));
    const products = useSelector(state => state.products.data)
    const customers=useSelector(state=>state.customers.data)
    const customer=(customers.length > 0 && customers.find(ele1 => ele1._id === bill.customer));
    // to send mail to customers
    const sendMail=()=>{
        emailjs.send("service_o9udgw3","template_e12d8wm",{
            to_name: customer.name,
            message: `Thank You For Visiting As Your Total Billing Amount is ${bill.total}`,
            to_email: customer.email,
            reply_to: "ooo7roshanrejik@gmail.com"
            },"wlH8uXzAJzFv0c3u4")
            .then((res)=>{
                Swal.fire(
                    'Email Sent!',
                    'You clicked the button!',
                    'success'
                  )
            })
            .catch((err)=>alert(err.message))
        }
    return (<div>
        <div ref={ref}>
        {<div >
            <h4 className="p-3" style={{ display: 'inline', float: 'right' }}>Date:{bill && bill.date.slice(0, 10)}</h4>
            <h4>Customer Name : {customer && customer.name}</h4>

            {bill && <table style={{ width: '80%' }} className='table table-striped shadow border rounded'>
                <thead>
                    <tr>
                        <th>Product</th><th>Price</th><th>Quantity</th><th>Sub Total</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        products.length > 0 && bill.lineItems.map((ele, i) => {
                            return <tr key={i}><td>{(products.find(ele1 => ele1._id === ele.product)) && (products.find(ele1 => ele1._id === ele.product).name)}</td><td>{ele.price}</td><td>{ele.quantity}</td><td>{ele.subTotal}</td></tr>
                        })
                    }

                </tbody>
            </table>}
        </div>

        }
        <div className="m-3">
            <h2>Final Total : {bill && bill.total}</h2>
        </div>
    </div>
    <Pdf targetRef={ref} filename="bill.pdf">
    {({ toPdf }) => <button onClick={toPdf}  className="btn btn-primary m-2">Generate Pdf</button> }
  </Pdf>
  <button  className="btn btn-primary m-2" onClick={sendMail}>Send Mail</button>
    </div>
    )
}
export default ShowBillDetails