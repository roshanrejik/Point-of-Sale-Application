import React from "react";
import CustomersAddItem from "./CustomersAddItem";
import CustomersList from "./CustomersList";
const CustomersContainer = (props) => {
    return (<div className="rounded shadow">
        <CustomersAddItem />
        <CustomersList />
    </div>)
}
export default CustomersContainer