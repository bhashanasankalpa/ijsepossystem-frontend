import { Link } from "react-router-dom"

function Home(){
  return (
    <>
        
        <div className="w-full h-max bg-slate-600 py-8  ">
            <Link to='/itemcategories' className="bg-rose-600 px-5 py-2 m-12 rounded-lg">Item Category</Link>
            <Link to='/items' className="bg-rose-600 px-5 py-2 m-12 rounded-lg">Item</Link>
            <Link to='/stocks' className="bg-rose-600 px-5 py-2 m-12 rounded-lg">Stock</Link>
            <Link to='/sales' className="bg-rose-600 px-5 py-2 m-12 rounded-lg">Sales</Link>
            
           
        </div>
    </>
  )
}

export default Home