import React, { useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import "../loginform.css";
import Navbar from "../../Components/Navbar";

const ManagerCreateForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emp_id: "",
        email_id: "",
        name: "",
        mobile_number: "",
        store_id: "",
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
            const response = await fetch("http://localhost:5000/createmanager", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result =await response.json();
            const {success,error}=result;

            if (success) {
                alert("SingUP successful")
                setTimeout(()=>{navigate("/")},1000);
            } else if(error){
                const er=error?.details[0].message;
                alert(er);
            }else{alert("enter correct credentials")}
        } catch (error) {
            console.error("Error submitting form data:", error);
            alert("There was an error submitting the form.");
        }
    };

    return (
        <>
            <Navbar email_id="satya" logout="logout" />
            <div className="form-container">
                <h2>Manager Registration Form</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emp_id">Employee ID:</label>
                    <input
                        type="text"
                        id="emp_id"
                        name="emp_id"
                        placeholder="Enter Employee ID"
                        value={formData.emp_id}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="store_id">Store ID:</label>
                    <input
                        type="text"
                        id="store_id"
                        name="store_id"
                        placeholder="Enter Store ID"
                        value={formData.store_id}
                        onChange={handleChange}
                        required
                    />

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

                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="mobile_number">Mobile Number:</label>
                    <input
                        type="text"
                        id="mobile_number"
                        name="mobile_number"
                        placeholder="Enter Mobile Number"
                        value={formData.mobile_number}
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



                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default ManagerCreateForm;
