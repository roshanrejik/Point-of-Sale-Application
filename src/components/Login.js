import React from "react";
import { useState } from 'react';
import { startLoginUser } from "../action/userAction";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from 'yup'
const Login = (props) => {
    const { handleAuth } = props
    const [err,setErr]=useState('')
    const dispatch = useDispatch()
    //to redirect to home after sucessfull login  
    const redirectToHome = () => {
        props.history.push('/')
    }
    //Login action generator
    const handleSubmit = (values) => {
        dispatch(startLoginUser(values, redirectToHome, handleAuth,handleError))
    }
    //server error validation
    const handleError=(err)=>{
        setErr(err)
    }
    //validation part using Yup
    const validate = Yup.object({
        email: Yup.string()
            .email('Email is invalied')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Must be 8 Charater or more')
            .required('Required')
    })
    //form part using formik
    return (
        <div>
             <div    style={{width:'50%',display:'inline-block'}}>
                <img src="https://www.scieducationusa.org/new-theme/assets/images/login.gif" alt="login gif" />
            </div>
            <div  style={{width:'40%',display:'inline-block'}}>
            <Formik
            initialValues={{
                email: 'developer@gmail.com',
                password: 'developer'
            }}
            validationSchema={validate}
            onSubmit={values => {
                handleSubmit(values)
            }}
        >
            {formik => (
                <div >
                    <h1 className="my-4 fomt-weight-bold-display-4 ">Login User</h1>
                    <Form>
                        <TextField label='enter email' name='email' type='text'/>
                        <TextField label='enter password' name='password' type='password'/>
                        {err&&<span style={{color:'red'}}>{err}</span>}<br/>
                        <button className="btn btn-dark m-2" type='submit'>Login</button>
                        <button className="btn btn-danger" onClick={()=>{handleError('')}} type='reset'>Reset</button>
                    </Form>
                </div>
            )}
        </Formik>
            </div>
           
        </div>
    )
}
export default Login