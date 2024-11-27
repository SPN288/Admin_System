import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../loginform.css";


const AdminLoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email_id: "",
        password: ""
    });
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission using fetch API
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log(result);
            const { role, success, message, jwttoken, email_id, error } = result;

            if (success) {


                if (role === 'user') {
                    localStorage.setItem('utoken', jwttoken);
                    localStorage.setItem('umail', email_id)
                    setTimeout(() => { navigate("/userpage") }, 1000);
                    alert("Log in successful")
                } else if (role === 'manager') {
                    localStorage.setItem('mtoken', jwttoken);
                    localStorage.setItem('mmail', email_id)
                    setTimeout(() => { navigate("/managerpage") }, 1000);
                    alert("Log in successful")
                } else if (role === 'admin') {
                    localStorage.setItem('atoken', jwttoken);
                    localStorage.setItem('amail', email_id)
                    setTimeout(() => { navigate("/adminpage") }, 1000);
                    alert("Log in successful")
                }


            } else if (error) {
                const er = error?.details[0].message;
                alert(er);
            } else { alert(message) }
        } catch (error) {
            console.error("Error submitting form data:", error);
            alert("There was an error submitting the form.");
        }
    };

    return (
        <>
            
            <div className="form-container">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>

                    <label htmlFor="email_id">Email ID:</label>
                    <input
                        type="email"
                        id="email_id"
                        name="email_id"
                        placeholder="Enter Email ID"
                        value={formData.email_id}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button className="lbutton" type="submit">Login</button>
                </form>
            </div>
        </>
    );
};

export default AdminLoginForm;
