import React, { useState } from "react";
import axios from "axios";

function DetalUpdateForm({ detal, onUpdate }) {
    const [formData, setFormData] = useState({
        name: detal.name,
        artikul: detal.artikul,
        price: detal.price,
        dateOfSettingPrice: detal.dateOfSettingPrice
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
        if (!formData.name || !formData.artikul || !formData.price || !formData.dateOfSettingPrice ) {
            setError("All fields are required.");
            return;
        }

        if (formData.price < 0 || formData.artikul < 0) {
            setError("Fields cannot be less than 0.");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/api/v1/detals/${detal.id}`,
                formData
            );
            if (response.status === 200) {
                setError(""); // Clear any previous errors
                onUpdate();
                setIsFormVisible(false); // Hide the form after submission
            }
        } catch (error) {
            console.error("Error updating detal data:", error);
            setError(error.response.data);
        }
    };

    return (
        <div className="text-center m-3">
            <button className="btn btn-info" onClick={toggleFormVisibility}>
                {isFormVisible ? "Hide Update Form" : "Update Detal Data"}
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
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Date Of Setting Price:</label>
                            <br />
                            <input
                                type="date"
                                name="dateOfSettingPrice"
                                value={formData.dateOfSettingPrice}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn mt-2 btn-primary">
                            Update
                        </button>
                        {error && <div className="text-danger">{error}</div>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default DetalUpdateForm;
