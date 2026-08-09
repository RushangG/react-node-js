import { useState } from "react";
import  './register.css';

export default function Register() {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(formData);
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    return (
        <>
            
        <div className="main">
           
        
            <h1>Register Page</h1>

            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={onChange} />
            </div>
             <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={onChange} />
            </div>
             <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={onChange} />
            </div>
             <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={onChange} />
            </div>
             <div>
                <button type="submit">Register</button>
            </div>
            </form>
        </div>
        </>
    );
}