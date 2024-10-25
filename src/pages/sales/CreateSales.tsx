import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemType from "../../Types/ItemType";
import axios from "axios";

function CreateSales(){

    const navigate = useNavigate();
    const [items,setItems] = useState<ItemType[]>([]);
    const [orderItems,setOrderItems]= useState<ItemType[]>([]);
    const [total,setTotal]= useState<number>(0);

    async function saveOrder(){
        var itemIds:any = [];
        orderItems.map(function(items){
            itemIds.push(items.itemId);
        });
        console.log(itemIds);
        
        try {
            const data = {
                itemIds:itemIds
            }
            await axios.post("http://localhost:8082/sales",data)
            navigate("/sales")

        } catch (error) {
            console.log(error);
        }
    }

    async function loadItems() {
        const response = await axios.get("http://localhost:8082/items");
        setItems(response.data);

    }
    useEffect(function(){
        loadItems();
        
    },[])

    function addProductToOrder(item:ItemType){
        const updateOrder = [...orderItems,item]
        setOrderItems(updateOrder);
    }
    useEffect(function(){
        orderItems.map(function(item){
            const totalPrice=total+item.itemPrice;
            setTotal(totalPrice);
        })
    },[orderItems])
    
    return(
        <div>
            <div className="flex">
                <div className="w-[400px] border-r border-slate-800 p-2">
             <span className="text-xl font-semibold text-slate-800 block h-[40px]">Products</span>
             <div className="mt-5">
             {items.map(function(item){
                return(
                    <div onClick={()=>addProductToOrder(item )} className="border border-rose-400 rounded-lg p-2 mb-3 bg-slate-200 hover:bg-slate-400">
                        <div className="text-lg font-semibold text-rose-600">{item.itemName}</div>
                        <div className="text-sm text-slate-600">{item.itemCategory?.itemCategoryName}</div>
                        <div className="text-sm text-green-600 text-right font-bold">Rs. {item.itemPrice}</div>
                    </div>
                )
                })}
             </div>
             </div>
             <div className="p-2 w-full px-10">
                <span className="text-xl font-semibold text-slate-300">New Order</span>
                <table className="w-full border-separate border-spacing-0 border-none text-align mt-5">
             <thead className="bg-slate-600 text-left">
               <tr>
               <th className="w-[200px]">ID</th>
                <th className="w-[200px]">Description</th>
                <th className="w-[200px] text-right">Price</th>
               </tr>
                </thead>
             <tbody className="bg-slate-300 text-left">
                {orderItems.map(function(item){
                    return(
                        <tr>
                            <td className="w-[200px]">{item.itemId}</td>
                            <td className="w-[200px]">{item.itemName}</td>
                            <td className="w-[200px] text-right">{item.itemPrice}</td>
                            
                        </tr>   
                    )
                })}
                <tr className="bg-rose-500">
                    <td colSpan={2}>
                        <strong>Total</strong>
                    </td>
                    <td className="border-t border-white-500 text-right">
                       <strong>{total}</strong> 
                    </td>
                </tr>
                </tbody>
                </table>
                <button type="button" className="bg-slate-300 text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-400 mt-3" onClick={saveOrder}>Place Order</button>
             </div>
             </div>
        </div>
    )
}
export default CreateSales;