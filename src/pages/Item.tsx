import { useEffect, useState } from "react";
import ItemType from "../Types/ItemType";
import axios from "axios";
import ItemcategoryType from "../Types/ItemcategoryType";

function Item(){

    const [items,setItems] = useState<ItemType[]>([]);
    const [itemname,setitemname] = useState<string>("");
    const [itemprice,setItemprice] = useState<number>();
    const [itemdescription,setitemDescription]=useState<string>("");
    const [categoryId,setCategoryId] = useState<number>();
    const [categories,setCategories]=useState<ItemcategoryType[]>([]);


    
    async function loadItems() {
        const response = await axios.get("http://localhost:8082/items");
        setItems(response.data);

    }
    async function loadItemCategories(){
        const response = await axios.get("http://localhost:8082/categories")
        setCategories(response.data);
    }
    useEffect(function(){
        loadItems();
        loadItemCategories();
        
    },[])

    function handleItemName(event : any){
        setitemname(event.target.value);
    }

    function handleItemPrice(event : any){
        setItemprice(event.target.value);
    }

    function handleItemDescription(event : any){
        setitemDescription(event.target.value);
    }
    function handleCategoryId(event : any){
        setCategoryId(event.target.value);
    }
    const[itemEditing,setitemEditing] = useState<ItemType | null>(null);

    async function handleSubmit() {
        const data ={
            itemName:itemname,
            itemPrice:itemprice,
            itemDescription:itemdescription,
            itemCategoryId:categoryId
        }
        try {
            await axios.post("http://localhost:8082/items",data);
            loadItems();
            setitemname("");
            setItemprice(0.0);
            setitemDescription("");
            setCategoryId(0);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateItem(){
        const data ={
            itemName:itemname,
            itemPrice:itemprice,
            itemDescription:itemdescription,
            itemCategoryId:categoryId
        }
        try{
            await axios.put(`http://localhost:8082/items/${itemEditing?.itemId}`,data);
            setitemEditing(null);
            loadItems();
            setitemname("");
            setItemprice(0.0);
            setitemDescription("");
            setCategoryId(0);
        }catch(error){
            console.log(error)
        }
    }
    function editItem(item:ItemType){
        setitemEditing(item);
        setitemname(item.itemName);
        setItemprice(item.itemPrice);
        setitemDescription(item.itemDescription);
        setCategoryId(item.itemCategory.itemCategoryId);
    }
    async function deleteItem(itemId:number){
        try {
            
            await axios.delete(`http://localhost:8082/items/${itemId}`)
            loadItems();
        } catch (error) {
            console.log(error);
        }
    }
    return(<div>
       <table className="container mx-auto py-5">
         <h1 className="text-3xl font-bold mb-5 text-rose-600 ml-10 mt-5">Items</h1>
         <div className="table p-10 w-full border-separate border-spacing-0 border-none text-left">
            <thead className="bg-slate-400">
                <tr>
                <th className="w-[80px]">Item ID</th>
                    <th className="w-[200px]">Item Name</th>
                    <th className="w-[200px]">Item Price</th>
                    <th className="w-[200px]">Item Description</th>
                    <th className="w-[200px]">Action</th>
                </tr>
            </thead>
            <tbody className="bg-slate-200">
                {items&&items.map(function(item:ItemType){
                    return(
                        <tr>
                            <td>{item.itemId}</td>
                            <td>{item.itemName}</td>
                            <td>{item.itemPrice}</td>
                            <td>{item.itemDescription}</td>
                            <td>
                            <button onClick={()=>editItem(item)} className="bg-slate-300 text-slate-600 px-2 py-1 rounded-lg hover:bg-slate-400">Edit</button>
                        <button onClick={()=>deleteItem(item.itemId)} className="bg-red-400 text-white rounded-lg hover:bg-slate-500 px-2 py-1">Delete</button>
                    
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
                <label className="text-slate-600 font-sm block mb-2">Item Name</label>
                <input  type="text" required onChange={handleItemName} value={itemname} className="bg-slate-100 text-slate-600 text-sm block mb-3 w-full p-2 border border-rose-300 rounded-lg" />
            </div>
            <div>
                <label className="text-slate-600 font-sm block mb-2">Item Price</label>
                <input value={itemprice} type="text" required onChange={handleItemPrice} className="bg-slate-100 text-slate-600 text-sm block mb-3 w-full p-2 border border-rose-300 rounded-lg"/>
            </div> 
            <div>
                <label className="text-slate-600 font-sm block mb-2">Item Description</label>
                <input value={itemdescription} type="text" required onChange={handleItemDescription} className="bg-slate-100 text-slate-600 text-sm block mb-3 w-full p-2 border border-rose-300 rounded-lg"/>
            </div> 
            <div>    
                <label className="text-slate-600 font-sm block mb-2">Item Category ID</label>
                <select required value={categoryId} onChange={handleCategoryId} className="bg-slate-100 text-slate-600 text-sm block mb-3 w-full p-2 border border-rose-300 rounded-lg">
                    <option value="">Please Select Item Category</option>
                    {categories.map(function(category:any){
                        return(
                            <option value={category.itemCategoryId}>{category.itemCategoryName}</option>
                        )
                    })}
                </select>
            </div> 
                {itemEditing?
                <>
                 <button className="py-3 px-4 bg-rose-600 text-white rounded hover:bg-rose-900 mb-2 text-sm" onClick={updateItem} type="button">Update Item</button>
                </>
                :
                <> <button className="py-3 px-4 bg-rose-600 text-white rounded hover:bg-rose-900 mb-2 text-sm" onClick={handleSubmit} type="button">Create Item</button></>
            }

               
            </form>
         </div>   
       </div>
       
    )

}
export default Item;