import { useState } from 'react';

export default function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
   
    function handleSubmit(e : React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
       console.log(formData);
    }

    function onChange(e : React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4">Login Page</h1>
        
            <form onSubmit={handleSubmit}>
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