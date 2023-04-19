import { useState, useContext,useEffect } from "react"
import { faCoins, faUser, faCaretRight, faBarChart, faChartSimple, faNairaSign, faEllipsis, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ProdDisplay from "./proddisplay"
import Sidebar from "./sidebar"
import Menu from "./menu"
import SalesSummary from "./salessumm"
import SalesList from "./saleslist"
import {UserContext} from '../auth/usercontext';
import axios from "axios"
import Pcards from "../reusable/pcards"

const HAdmin = () => {
    const {details:{authlev, name,  email, location}, setDetails} = useContext(UserContext)
    const [topic, settopic] = useState('Top Trending Products')
    const [showdrop, setshowdrop] = useState(false)
    const [groceries, setgroceries] = useState([])
    useEffect(()=>{
        getparners()
    },[])
    const getparners = async () => {
        try {
            const product = await axios.get('http://geo.vensle.com/api/prods')
            setgroceries(product.data)
         } catch (error) {
            console.log(error);
         }
    }
    return(
        <div>
            <Menu />
            <div className="admin-sec">
                <Sidebar />
                <div className="adm-main">
                    <div className="breadcrumbs-bar">
                        <div>Home <FontAwesomeIcon icon={faCaretRight} /> Dashboard</div>
                        <div><span>{name} </span><FontAwesomeIcon icon={faUser}/></div>
                    </div>
                    <div className="adm-main-second">
                        <div className="adm-main-left">
                            <div className="topbox">
                                <SalesSummary caption={'Revenue'}/>
                                <SalesSummary caption={'Orders'}/>
                            </div>
                            <div className="top-trending">
                                <h3>{topic}</h3>
                                <FontAwesomeIcon icon={faChevronDown} onClick={(e)=>setshowdrop(!showdrop)} style={{cursor:'pointer'}}/>
                                {
                                    showdrop === true ? 
                                    <div className="dropdowns">
                                        <div onClick={(e)=>{settopic(e.target.innerText);setshowdrop(!showdrop)}}>Top trending products</div>
                                        <div onClick={(e)=>{settopic(e.target.innerText);setshowdrop(!showdrop)}}>Most viewed products</div>
                                        <div onClick={(e)=>{settopic(e.target.innerText);setshowdrop(!showdrop)}}>Most bought products</div>
                                    </div> :
                                    null
                                }
                                
                            </div>
                            
                            <div className="top-trending-list">
                            {
                                groceries.map((product, i)=>(
                                    <div><Pcards type={2} width={'100%'} height={'150px'} pdsize={'1.3em'} pcsize={'1.8em'} information={product}/></div>
                                ))
                            }
                            </div>
                        </div>
                        <div className="adm-main-right">
                            <SalesList/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default HAdmin