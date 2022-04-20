import React from "react";
import { useSelector } from "react-redux";
import GoogleChart from "./GoogleChart ";
const Home = (props) => {
    const state = useSelector((state) => {
        return state
    })
    //today's income fun()
    const incomeOfTheDay = () => {
        const bills = state.bills.data
        const todayBills = bills.filter(ele => ele.date.slice(0, 10) === new Date().toISOString().slice(0, 10))
        return todayBills.length > 0 ? todayBills.reduce((a, b) =>{return a+b.total},0): 0
    }
    //to find recent 5 
    const recentArr = (arr) => {
        return (arr.slice(-5).reverse())
    }
    //to find all bills array total
    const findTotal = (arr) => {
        /* let tot = 0
         arr.forEach(ele => tot += ele.total)
         return tot*/
        return arr.reduce((a, b) => { return a+b.total},0)
      }
    return (
        //to show please login if(not login)
        Object.keys(state.user.data).length > 0 ?

            <div className="row mb-4" >

                <div className="col-md-3  ">
                    <div className="card bg-light  rounded shadow " >
                        <div className="card-header box " ><h1>{state.customers.data.length}</h1>
                        </div>
                        <div className="card-body rounded box" style={{ backgroundColor: '#1F2833', color: '#66FCF1', textAlign: 'center' }}>
                            <div className="card-title " ><h3>Total Customer</h3></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-light  rounded shadow" >
                        <div className="card-header box "><h1>{state.bills.data.length}</h1>
                        </div>
                        <div className="card-body rounded box" style={{ backgroundColor: '#1F2833', color: '#66FCF1', textAlign: 'center' }}>
                            <div className="card-title"><h3>Total Bill</h3></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-light rounded shadow" >
                        <div className="card-header box" ><h1>{incomeOfTheDay()}</h1>
                        </div>
                        <div className="card-body rounded box" style={{ backgroundColor: '#1F2833', color: '#66FCF1', textAlign: 'center' }}>
                            <div className="card-title" ><h3>Today's Income</h3></div>
                        </div>
                    </div>
                </div>
               
                <div className="col-md-3">
                    <div className="card bg-light  rounded shadow" >
                        <div className="card-header box" ><h1>{findTotal(state.bills.data)}</h1>
                        </div>
                        <div className="card-body rounded box" style={{ backgroundColor: '#1F2833', color: '#66FCF1', textAlign: 'center' }}>
                            <div className="card-title "><h3>Total Income</h3></div>
                        </div>
                    </div>
                </div>
                <div>
                    <GoogleChart />
                </div>
                <div className="row mt-5">
                    <div className="col-md-6 ">
                        <div className="card  rounded shadow box" >
                            {
                                recentArr(state.products.data).map((ele, i) => {
                                    return (
                                        <div className="card-header rounded " key={i}><h5>{i + 1}.{ele.name}</h5></div>
                                    )
                                })
                            }
                            <div className="card-body rounded" style={{ backgroundColor: '#1F2833', color: '#66FCF1', textAlign: 'center' }}>
                                <div className="card-title" ><h3>Recent Products</h3></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 ">
                        <div className="card rounded shadow border  box" >
                            {
                                recentArr(state.customers.data).map((ele, i) => {
                                    return (
                                        <div className="card-header rounded" key={i}><h5>{i + 1}.{ele.name}</h5></div>
                                    )
                                })
                            }

                            <div className="card-body rounded box" style={{ backgroundColor: '#1F2833', color: '#66FCF1', textAlign: 'center' }}>
                                <div className="card-title" ><h3>Recent Customers</h3></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            :
            <div style={{textAlign:'center'}}><h1>Please Login</h1>
            <img src="https://tstatic.ir/img/landings/why-techara/8461298.gif" alt="png" /></div>
    )
}
export default Home