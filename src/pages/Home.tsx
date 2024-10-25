import { Link } from "react-router-dom"

function Home(){
  return (
    <>
        <div>Home</div>
        <div>
            <div><Link to='/itemcategories'>Item Category</Link></div>
            <div><Link to='/items'>Item</Link></div>
            <div><Link to='/stocks'>Stock</Link></div>
            
           
        </div>
    </>
  )
}

export default Home