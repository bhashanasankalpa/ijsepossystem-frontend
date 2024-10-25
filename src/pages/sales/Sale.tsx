import { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import SaleType from "../../Types/SaleType";
import { useAuth } from "../../context/AuthContext";

function Sale(){

    const [sales,setsales] = useState<SaleType[]>([]);

    const {isAuthenticated,jwtToken}= useAuth();
    const config = {
        headers:{
            Authorization:`Bearer ${jwtToken}`
        }
    }

    async function loadSales(){
        try {
           const response = await axios.get("http://localhost:8082/sales",config);
           setsales(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(function(){
        
        if (isAuthenticated) {
            loadSales();
        }
        
    },[isAuthenticated])

    return(
        <div className="container mx-auto pt-5 pb-5">
            <div className="border border-gray-900 rounded-lg px-4 py-2 mt-2 max-w-[150px] ml-2 bg-blue-200 ">
            <Link to='/' >Back to Home</Link>
        </div>
        <h1 className="text-3xl font-bold mb-5 text-rose-600 ml-10 mt-5">Sales</h1>
        <Link to="/sales/createsales" className="ml-[1100px] rounded-sm text-slate-200 mb-5 px-3 py-2 bg-rose-500">Add Sales</Link>
        
        <table className="container mx-auto py-5">
           
            <div className="table p-10 w-full border-separate border-spacing-0 border-none text-left">
                <thead className="bg-slate-400">
                    <tr>
                        <th className="w-[80px]">Sale ID</th>
                        <th className="w-[200px]">Sale Date and Time</th>
                        <th className="w-[200px]">Total Amount</th>
                        <th className="w-[200px]">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-slate-200">
                    {sales.map(function(sale){
                        return(
                            
                            <tr>
                                <td>{sale.saleId}</td>
                                <td>{sale.saleDateTime}</td>
                                <td>{sale.totalPrice}</td>
                                <td></td>
                            </tr>
                            
                        )
                    })}
                </tbody>
            </div>
        </table>
       
    </div>
    )
}
export default Sale;