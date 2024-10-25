import { useEffect, useState } from "react";
import StockType from "../Types/StockType";
import axios from "axios";
import ItemType from "../Types/ItemType";

function Stock ()  {

    const [stocks,setStocks] = useState<StockType[]>([]);
    const [quantity,setquantity] = useState<number>();
    const [items,setItems] = useState<ItemType[]|any>([]);
    const [itemIdnew,setitemidnew] = useState<number>();


    async function loadItems() {
        const response = await axios.get("http://localhost:8082/items");
        setItems(response.data);

    }

    

    async function loadStock() {
        const response = await axios.get("http://localhost:8082/stocks");
        setStocks(response.data);

    }
    const[stockEditing,setStockEditing] = useState<StockType | null>(null);
    useEffect(function(){
        loadStock();
        loadItems();
        
    },[]);

    function handleStockquantity(event : any){
        setquantity(event.target.value);
    }

    function handleItem_id(event : any){
        setitemidnew(event.target.value);
    }

    async function handleSubmit() {
        const data ={
            
            quantity:quantity,
            itemId:itemIdnew
        }
        try {
            await axios.post("http://localhost:8082/stocks",data);
            loadStock();
            setquantity(0);
            
            setitemidnew(0.0);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateStock(){
        const data ={
            quantity:quantity,
            itemId:itemIdnew
        }
        try{
            await axios.put(`http://localhost:8082/stocks/${stockEditing?.stockId}`,data);
            setStockEditing(null);
            loadStock();
            setquantity(0);
            setitemidnew(0.0);
        }catch(error){
            console.log(error)
        }
    }
    function editStock(stock : StockType,itemsa:ItemType){
        setStockEditing(stock)
    setitemidnew(itemsa.itemId);
       setquantity(stock.quantity)
    }

  return (
    <div>
       <table className="container mx-auto py-5">
         <h1 className="text-3xl font-bold mb-5 text-rose-600 ml-10 mt-5">Stock</h1>
         <div className="table p-10 w-full border-separate border-spacing-0 border-none text-left">
            <thead className="bg-slate-400">
                <tr>
                <th className="w-[80px]">Stock ID</th>
                    <th className="w-[200px]">Item Id</th>
                    <th className="w-[200px]">Stock Quantity</th>
                    <th className="w-[200px]">Action</th>
                </tr>
            </thead>
            <tbody className="bg-slate-200">
                {stocks&&stocks.map(function(stock:StockType){
                    return(
                        <tr>
                            <td>{stock.stockId}</td>
                            <td>{stock.itemId}</td>
                            <td>{stock.quantity}</td>
                            
                            <td>
                            <button onClick={()=>editStock(stock,items)} className="bg-slate-300 text-slate-600 px-2 py-1 rounded-lg hover:bg-slate-400">Edit</button>
                        
                            </td>
                        </tr>
                    )
                })}
            </tbody>
         </div>
        
       </table>
       <div className="border border-slate-200 mx-auto p-3 rounded-lg max-w-[350px]">
            <form>
            
            <div>    
                <label className="text-slate-600 font-sm block mb-2">Item ID</label>
                <select required value={itemIdnew} onChange={handleItem_id} className="bg-slate-100 text-slate-600 text-sm block mb-3 w-full p-2 border border-rose-300 rounded-lg">
                    <option value="">Please Select Item Category</option>
                    {items.map(function(item:any){
                        return(
                            <option value={item.itemId}>{item.itemId} | {item.itemName}</option>
                        )
                    })}
                </select>
            </div> 
            <div>
                <label className="text-slate-600 font-sm block mb-2">Stock Quantity</label>
                <input  type="text" required onChange={handleStockquantity} value={quantity} className="bg-slate-100 text-slate-600 text-sm block mb-3 w-full p-2 border border-rose-300 rounded-lg" />
            </div>
                {stockEditing?
                <>
                 <button className="py-3 px-4 bg-rose-600 text-white rounded hover:bg-rose-900 mb-2 text-sm" onClick={updateStock} type="button">Update Stock</button>
                </>
                :
                <> <button className="py-3 px-4 bg-rose-600 text-white rounded hover:bg-rose-900 mb-2 text-sm" onClick={handleSubmit} type="button">Create Stock</button></>
            }

               
            </form>
         </div>   
    </div>
  )
}
export default Stock;
