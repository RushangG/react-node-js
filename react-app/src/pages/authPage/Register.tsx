import { useState } from "react";
import { addUserData } from "../../api/UserData";
import { useNavigate } from "react-router-dom";
export default function Register() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        
        if (formData.password === formData.confirmPassword) {
            addUserData(formData.fullName, formData.email, formData.password);
            setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
            alert("User registered successfully");
            navigate("/LoginAuth");  
        }else{
            alert("Passwords do not match");
        }

    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    return (
        <>
            
        <div className="container mx-auto mt-10 p-6 max-w-md border-2 border-gray-300 rounded-lg shadow-md">
           
        
            <h1 className="text-2xl font-bold mb-4">Register Page</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={onChange} 
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
             <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={onChange} 
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
             <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={onChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
            </div>
             <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={onChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
            </div>
             <div>
                <button type="submit" className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">Register</button>
            </div>
            </form>
        </div>
        </>
    );
}