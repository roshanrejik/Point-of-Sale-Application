import React from "react";
import ProductsAddItem from "./ProductsAddItem";
import ProductsList from "./ProductsList";
const ProductsContainer = (props) => {
    return (<div>
        <ProductsAddItem />
        <ProductsList />
    </div>)
}
export default ProductsContainer