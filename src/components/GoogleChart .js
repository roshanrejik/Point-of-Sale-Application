import React from "react";
import Chart from "react-google-charts";
import { useSelector } from "react-redux";
import _ from 'lodash'
const GoogleChart = (props) => {
  const bills = useSelector(state => state.bills.data)

  const findTotal = (arr) => {
    /* let tot = 0
     arr.forEach(ele => tot += ele.total)
     return tot*/
    return arr.reduce((a, b) => { return a+b.total},0)
  }
  const result = _.groupBy(bills, 'date')
    // {2022-04-01T00:00:00.000Z: Array(10), 2022-04-02T00:00:00.000Z: Array(4), 2022-04-03T00:00:00.000Z: Array(10), 2022-04-04T00:00:00.000Z: Array(8), 2022-04-05T00:00:00.000Z: Array(2), …}
    // console.log(Object.keys(result))
    // dates
  const data = ([].concat([...[['Date', 'Rupees', { role: 'style' }]].concat(Object.keys(result).map(ele => { return ([ele.slice(0, 10), findTotal(/*result[ele] is single day bills array*/result[ele]), '#1F2833']) })/*.slice(-7)*/ )]))
  return (
    <div>
      <div className=" m-5 bg-light rounded border shadow box">
      <Chart
      height={400}
        data={data}
        chartType="ColumnChart"
        loader={<div>Loading Chart...</div>}
      />
           <div className="card-body rounded box" style={{ backgroundColor: '#1F2833', color: '#66FCF1', textAlign: 'center' }}>
                            <div className="card-title" ><h3>Sales Chart</h3></div>
           </div>
           
    </div>
    </div>
  )

}
export default GoogleChart 