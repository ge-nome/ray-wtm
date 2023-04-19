import { useState, useEffect} from 'react';

const Grade = ({one, two, three, exam}) => {
    const f = one === "" ? 0 : one;
    const s = two === "" ? 0 : two;
    const t = three === "zero" ? 0 : three;
    const e = exam === "" ? 0 : exam;

    console.log(three)

    const pre_total = parseInt(f) + parseInt(s) + parseInt(t) + parseInt(e)
    let grade = "A"

    if(pre_total >= 0 && pre_total <= 29){
      grade = "F"
    }
    else if(pre_total >= 30 && pre_total <= 49){
      grade = "D"
    }
    else if(pre_total >= 50 && pre_total <= 59){
        grade = "C"
    }
    else if(pre_total >= 60 && pre_total <= 74){
      grade = "B"
    }
    else if(pre_total >= 75 && pre_total <= 100){
      grade = "A"
    }
    else{
      grade = ""
    }
    return (
      <td>{grade}</td>
    );
    }
    
export default Grade;
    