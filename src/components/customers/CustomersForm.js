import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "../TextField";
import * as Yup from 'yup'
const CustomersForm = (props) => {
    const { formSubmit, name: custName, email: custEmail, mobile: custMobile } = props
    const handleSubmit = (values, formReset) => {

        formSubmit(values, formReset)

    }
    //form validation using yup
    const validate = Yup.object({
        name: Yup.string()
            .max(15, 'Must be 15 Charater or less')
            .required('Required'),
        mobile: Yup.string()
            .min(10, 'Must be 10 Charater')
            .required('Required'),
        email: Yup.string()
            .email('Email is invalied')
            .required('Required')

    })
    //form using  formik
    return (

        <Formik
            initialValues={{
                name: custName ? custName : '',
                mobile: custMobile ? custMobile : '',
                email: custEmail ? custEmail : ''
            }}
            validationSchema={validate}
            onSubmit={(values, { resetForm }) => {
                const formReset = () => {
                    resetForm({
                        name: '',
                        mobile: '',
                        email: ''
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
                    <TextField label='enter mobile' name='mobile' type='text' />
                    </div>
                    <div className="col-md-3">
                    <TextField label='enter email' name='email' type='text' />
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
export default CustomersForm