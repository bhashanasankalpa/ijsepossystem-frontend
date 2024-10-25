import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login(){

    const {login} = useAuth();

    const navigate = useNavigate();

    const [username,setUsername] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [error,setError]= useState<string>("");

    async function submit(event : any){
        event.preventDefault();
        if(username==""|| password ==""){
            setError("Username and password Required")
        }

        const data = {
            username:username,
            password:password
        }
        try {
            const response = await axios.post("http://localhost:8082/auth/login",data);
            login(response.data);
            navigate("/");
            
        } catch (error) {
            setError("There was an error")
        }
    }

    return(
        <div className="p-10">
            <div className="mx-auto max-w-[600px] p-5 shadow rounded-lg shadow-rose-500">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">Login</h1>
                </div>
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label className="block mb-2">Username </label>
                        <input onChange={function(event:any){
                            setUsername(event.target.value);
                            setError("");
                        }} placeholder="Enter Your Username" type="text" className="block w-full p-2 border border-slate-500 rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Password </label>
                        <input onChange={function(event:any){
                            setPassword(event.target.value);
                            setError("");
                        }} placeholder="Enter Your Password" type="password" className="block w-full p-2 border border-slate-500 rounded-lg" />
                    </div>
                    {error && <div className="text-sm text-red-500 mb-2">{error}</div>}
                    <div>
                        <button  type="submit" className="bg-rose-600 px-3 py-2 w-full rounded-lg hover:bg-rose-900">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login;