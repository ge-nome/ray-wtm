import axios from "axios";
import { useState, createContext, useEffect} from "react";

export const UserContext = createContext()


const UsedContext = (props) => {
//    main store
    const [details, setDetails] = useState({
        name:'',
        authlev:'',
        staffid:'',
    })

    const [products, setproducts] = useState([])
    const [requests, setrequests] = useState([])
    const [groceries, setgroceries] = useState([])
    return(
        <UserContext.Provider value={{details, setDetails,products,requests,groceries}}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UsedContext;