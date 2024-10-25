import ItemcategoryType from "./ItemcategoryType";

interface ItemType{
    itemId:number;
    itemName:string;
    itemPrice:number;
    itemDescription:string;
    itemCategory:ItemcategoryType;
}
export default ItemType;