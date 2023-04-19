import { useState } from "react"


const Gtotal = ({results, list, totals, fund, posi}) => {

   

    //calculate average
    const ave = fund/results.length

    //calculate attendance
    const attendance = () => {
        if(ave > 80){
            return ave * 3.9 / 4
        }
        else{
            return ave * 3.8 / 4
        }
    }

    //get the next class
    const [one] = results
    const index = list.findIndex(object =>{
       return object.pre_section+" "+object.pre_class === one.pre_class
    })

    console.log(posi)
    
   return (
      <div>
        <tr>
            <td>Total</td>
            <td>{fund}</td>
        </tr>
        <tr>
            <td>Average</td>
            <td>{+(Math.round(ave + "e+2")+ "e-2")}</td>
        </tr>
        {    
        // <tr>
        //     <td>Attendance</td>
        //     <td>{+(Math.round(attendance() + "e+2")+ "e-2")} %</td>
        // </tr>
        }
        <tr>
            <td>Next Class</td>
            <td>{one.pre_term === '3rd' ? list[index + 1].pre_section +" "+ list[index + 1].pre_class : 'N/A'}</td>
        </tr>
        <tr>
            <td>Position</td>
            <td>{one.pre_class.substr(0, 3) !== 'SSS' ? posi : 'N/A'}</td>
        </tr>
      </div>   
    );
    }
    
export default Gtotal;
    