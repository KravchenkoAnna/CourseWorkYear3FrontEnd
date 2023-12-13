import React, { useState } from "react";
import axios from "axios";

function CreateTradeForm({ onPollutionCreated }) {
    const [formData, setFormData] = useState({
        supplierName: "",
        detalName: "",
        detalQuantity: "",
        purchaseDate: ""
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
        if (
            !formData.supplierName ||
            !formData.detalName ||
            !formData.detalQuantity ||
            !formData.purchaseDate
        ) {
            setError("All fields are required.");
            return;
        }

        if (formData.detalQuantity < 0) {
            setError("Number can't be less than 0.")
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/trade",
                formData
            );
            if (response.status === 201) {
                // Clear form data on successful submission
                setFormData({
                    supplierName: "",
                    detalName: "",
                    detalQuantity: "",
                    purchaseDate: ""
                });
                setError(""); // Clear any previous errors
                onPollutionCreated(); // You can use this callback to refresh your table or perform other actions
                setIsFormVisible(false); // Hide the form after submission
            }
        } catch (error) {
            console.error("Error creating trade data:", error);
            setError(error.response.data);
        }
    };

    return (
        <div className="container text-center justify-content-center">
            <button
                className="btn btn-info"
                onClick={toggleFormVisibility}
            >
                {isFormVisible ? "Hide Form" : "Add"}
            </button>
            {isFormVisible && (
                <div className="d-flex justify-content-center mt-2">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                name="supplierName"
                                placeholder="Supplier name"
                                value={formData.supplierName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Detal Name:</label>
                            <br/>
                            <input
                                type="text"
                                name="detalName"
                                placeholder="Detal name"
                                value={formData.detalName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Detal quantity:</label>
                            <br/>
                            <input
                                type="number"
                                name="detalQuantity"
                                placeholder="Detal quantity"
                                value={formData.detalQuantity}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Purchase Date:</label>
                            <br/>
                            <input
                                type="date"
                                name="purchaseDate"
                                placeholder="Purchase Date"
                                value={formData.purchaseDate}
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

export default CreateTradeForm;
