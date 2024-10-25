import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemcategoryType from "../Types/ItemcategoryType";
import { useAuth } from "../context/AuthContext";

function Itemcategory(){

    const [category,setCategory] = useState<ItemcategoryType[]>([]);

    const {isAuthenticated,jwtToken}= useAuth();
    const config = {
        headers:{
            Authorization:`Bearer ${jwtToken}`
        }
    }

    async function loadItemCategories(){
        const response = await axios.get("http://localhost:8082/categories",config)
        setCategory(response.data);
    }

    useEffect(function(){
        if(isAuthenticated){
            loadItemCategories();
        }
    },[isAuthenticated]);

    const [categoryName,setCategoryName] = useState<string>("");

    function handleCategoryName(event:any){
        setCategoryName(event.target.value);
    }

    async function handleSubmit(){

        const data = {
            itemCategoryName:categoryName
        }
        
        const response = await axios.post("http://localhost:8082/categories",data,config);
        console.log(response);
        loadItemCategories();
    }

    return(
        <div  className="container mx-auto pt-5 pb-5 ml-5">
        <div className="border border-gray-900 rounded-lg px-4 py-2 mt-2 max-w-[150px] ml-2 bg-blue-200 ">
            <Link to='/' >Back to Home</Link>
        </div>
        <div>
            <h2 className="mt-3 text-3xl font-semibold mb-5 text-rose-700">ItemCategory</h2>
            {
                category&&category.map(function(category:ItemcategoryType){
                    return(
                        <div className="text-slate-600 border border-slate-200 rounded-lg mb-3 p-3 shadow shadow-white inline-block me-3	">
                            {category.itemCategoryName}
                        </div>
                    )
                })
            }
        </div>
        <div>
            <h2 className="text-3xl font-semibold text-rose-700 mt-5 ">Add Item Category</h2>
            <div className="border border-slate-200 p-3 rounded-lg max-w-[350px]">
            <form>
                <label className="text-slate-600 font-sm block mb-2">Item Category Name </label><br />
                <input  className="bg-slate-100 text-slate-600 text-sm block mb-3 w-full p-2 border border-rose-300 rounded-lg" onChange={handleCategoryName} type="text"  required/><br />
                <button className="py-3 px-4 bg-rose-600 text-white rounded hover:bg-rose-900 mb-2 text-sm" type="button" onClick={handleSubmit}>Add Item Category</button>
            </form>
            </div>
        </div>
        
        </div>
    )
}

export default Itemcategory;