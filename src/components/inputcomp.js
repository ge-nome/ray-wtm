import React from "react";


const input = ({type, placehold, click, value}) => {
    return(
        <div>
        <input type={type} placeholder={placehold} onChange={(e)=>click(e.target.value)} value={value}/>
      </div>
    )
}
export default input;