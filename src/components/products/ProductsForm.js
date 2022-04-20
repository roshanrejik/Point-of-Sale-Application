import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "../TextField";
import * as Yup from 'yup'

const ProductsForm = (props) => {
    const { formSubmit, name: prodName, price: prodPrice } = props
    const handleSubmit = (values, formReset) => {

        formSubmit(values, formReset)

    }
    const validate = Yup.object({
        name: Yup.string()
            .max(15, 'Must be 15 Charater or less')
            .required('Required'),
        price: Yup.string()
            .required('Required'),

    })
    return (
        <Formik
        initialValues={{
            name: prodName ? prodName : '',
            price: prodPrice ? prodPrice : '',
        }}
        validationSchema={validate}
        onSubmit={(values, { resetForm }) => {
            const formReset = () => {
                resetForm({
                    name: '',
                    price: '',
                })
            }
            handleSubmit(values, formReset)
        }}
    >
        {formik => (
            <div className="d-inline">
               <Form className="form-horizontal" role="form"> 
                    <div className="form-group">
                    <div className="form-group row">
                    <div className="col-md-3 ">
                    <TextField label='enter name' name='name' type='text' />
                    </div>
                    <div className="col-md-3">
                    <TextField label='enter price' name='price' type='text' />
                    </div>
                    <div className="col-md-2">
                    <button className="btn btn-primary" type='submit'>Submit</button><br />
                    </div>
                    </div>
                    </div>
                    </Form>
            </div>
        )}
    </Formik>
    )

}
export default ProductsForm