import ItemType from "./ItemType";

interface SaleType{
    saleId:number,
    totalPrice:number,
    saleDateTime:Date,
    saleItems:ItemType[]
}
export default SaleType;