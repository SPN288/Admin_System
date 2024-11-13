import React, { useState } from "react";
import "../loginform.css";
import Navbar from "../../Components/Navbar";

const ManagerLoginForm = () => {
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
            const response = await fetch("http://localhost:5000/createmanager", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Employee data submitted successfully!");
                setFormData({
                    email_id: "",
                    password: ""
                });
            } else {
                alert("Failed to submit employee data.");
            }
        } catch (error) {
            console.error("Error submitting form data:", error);
            alert("There was an error submitting the form.");
        }
    };

    return (
        <>
            <Navbar email_id="satya" logout="logout" />
            <div className="form-container">
                <h2>Manager Login</h2>

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
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
};

export default ManagerLoginForm;
