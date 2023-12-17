import React, { useState } from "react";
import axios from "axios";

function CreateSupplierForm({ onSupplierCreated }) {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phoneNumber: ""
    });

    const [error, setError] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic not-null checks
        if (!formData.name || !formData.address || !formData.phoneNumber) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/suppliers",
                formData
            );
            if (response.status === 201) {
                // Clear form data on successful submission
                setFormData({
                    name: "",
                    address: "",
                    phoneNumber: ""
                });
                setError(""); // Clear any previous errors
                onSupplierCreated(); // You can use this callback to refresh your table or perform other actions
                setIsFormVisible(false); // Hide the form after submission
            }
        } catch (error) {
            console.error("Error creating supplier data:", error);
            setError(error.response.data);
        }
    };

    return (
        <div className="text-center mt-3">
            <button className="btn btn-warning" onClick={toggleFormVisibility}>
                {isFormVisible ? "Hide Form" : "Add a new supplier"}
            </button>
            {isFormVisible && (
                <div className="d-flex justify-content-center">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name:</label>
                            <br />
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Address:</label>
                            <br />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Phone Number:</label>
                            <br />
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="PhoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn mt-2 btn-success">
                            Submit
                        </button>
                        {error && <div className="text-danger">{error}</div>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default CreateSupplierForm;
