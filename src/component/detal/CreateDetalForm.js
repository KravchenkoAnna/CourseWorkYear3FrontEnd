import React, { useState } from "react";
import axios from "axios";

function CreateDetalForm({ onDetalCreated }) {
    const [formData, setFormData] = useState({
        name: "",
        artikul: "",
        price: "",
        dateOfSettingPrice: ""
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
        if (!formData.name || !formData.artikul || !formData.price || !formData.dateOfSettingPrice) {
            setError("All fields are required.");
            return;
        }

        if (formData.price < 0 || formData.artikul < 0) {
            setError("Fields cannot be less than 0.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/detals",
                formData
            );
            if (response.status === 201) {
                // Clear form data on successful submission
                setFormData({
                    name: "",
                    artikul: "",
                    price: "",
                    dateOfSettingPrice: ""
                });
                setError(""); // Clear any previous errors
                onDetalCreated(); // You can use this callback to refresh your table or perform other actions
                setIsFormVisible(false); // Hide the form after submission
            }
        } catch (error) {
            console.error("Error creating detal data:", error);
            setError(error.response.data);
        }
    };

    return (
        <div className="text-center mt-3">
            <button className="btn btn-warning" onClick={toggleFormVisibility}>
                {isFormVisible ? "Hide Form" : "Add a new detal"}
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
                            <label>Artikul:</label>
                            <br />
                            <input
                                type="text"
                                name="artikul"
                                placeholder="Artikul"
                                value={formData.artikul}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Price:</label>
                            <br />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>DateOfSettingPrice:</label>
                            <br />
                            <input
                                type="date"
                                name="dateOfSettingPrice"
                                placeholder="DateOfSettingPrice"
                                value={formData.dateOfSettingPrice}
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

export default CreateDetalForm;
