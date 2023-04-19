import { useState, useEffect} from 'react';

const Total = ({one, two, three, exam}) => {
    const f = one === "" ? 0 : one;
    const s = two === "" ? 0 : two;
    const t = three === "zero" ? 0 : three;
    const e = exam === "" ? 0 : exam;

    const pre_total = parseInt(f) + parseInt(s) + parseInt(t) + parseInt(e)
    let grade = "A"

    if(pre_total === 0 || pre_total <= 39){
      grade = "F"
    }
    else if(pre_total >= 40 || pre_total <= 49){
      grade = "D"
    }
    else if(pre_total >= 50 || pre_total <= 69){
      grade = "C"
    }
    else if(pre_total >= 70 || pre_total <= 79){
      grade = "C"
    }
    else if(pre_total >= 80 || pre_total <= 89){
      grade = "B"
    }
    else if(pre_total >= 90 || pre_total <= 100){
      grade = "A"
    }
    else{
      grade = ""
    }
    return (
      <td>{pre_total}</td>      
    );
    }
    
export default Total;
    