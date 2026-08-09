import { useState } from 'react';
import { getUserByEmail } from '../../api/UserData';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from "../../store";
import { login } from "../../store/userSlice";

export default function Login() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
   
    function handleSubmit(e : React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
       
        const user = getUserByEmail(formData.email);
        if(user){
            if(user.password === formData.password){
                alert("User Logged in successfully");
                const userDispatchData = {
                    name: user.name,
                    email: user.email
                }
                dispatch(login(userDispatchData));
                navigate("/UserList");
                  
            }
            else{
                alert("Invalid Password");
            }
        }
        else{
            alert("User not found")
        }
    }

    function onChange(e : React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className="container mx-auto mt-10 p-6 max-w-md border-2 border-gray-300 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Login Page</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4  p-4 max-w-md">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email: </label>
                    <input type="email" name="email" id="email" onChange={onChange}
                    className="border border-gray-300 rounded py-2 px-3 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password: </label>
                    <input type="password" name="password" id="password" onChange={onChange} 
                    className="border border-gray-300 rounded py-2 px-3 w-full"
                    />
                </div>

                <div className="mb-4">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Login
                    </button>
                </div>
            </form>

            
        </div>
    );
}