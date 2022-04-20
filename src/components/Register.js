import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startRegisterUser } from "../action/userAction";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from 'yup'
const Register = (props) => {
    //server error state
    const [err,setErr]=useState('')
    //validation using yup
    const validate = Yup.object({
        username: Yup.string()
            .max(15, 'Must be 15 Charater or less')
            .required('Required'),
        email: Yup.string()
            .email('Email is invalied')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Must be 8 Charater or more')
            .required('Required'),
        businessName: Yup.string()
            .max(15, 'Must be 15 Charater or less'),
        address: Yup.string()
            .max(30, 'Must be 30 Charater or less')
    })

    const dispatch = useDispatch()
    //redirect to login after sucessfull register
    const redirectToLogin = () => {
        props.history.push('/login')
    }
    //server error handler
    const handleError=(err)=>{
        setErr(err)
    }
    //register action generator
    const formSubmit = (formData) => {
        dispatch(startRegisterUser(formData, redirectToLogin,handleError));
    }
    //form using formik
    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: '',
                businessName: '',
                address: ''
            }}
            validationSchema={validate}
            onSubmit={values => {
                formSubmit(values)
            }}
        >
            {formik => (
                <div  style={{width:'40%',display:'inline-block'}}>
                    <h1 className="my-4 fomt-weight -bold-display-4">Register User</h1>
                    <Form>
                        <TextField label='enter username' name='username' type='text' />
                        <TextField label='enter email' name='email' type='text' />
                        <TextField label='enter password' name='password' type='password' />
                        <TextField label='enter business name' name='businessName' type='text' />
                        <TextField label='enter address' name='address' type='text' />
                        {err&& <span style={{color:'red'}}>{err}</span> }
                        <button className="btn btn-dark m-2" type='submit'>Register</button>
                        <button className="btn btn-danger" type='reset' onClick={()=>{handleError('')}}>Reset</button>

                    </Form>
                </div>
            )}
        </Formik>
    )
}
export default Register