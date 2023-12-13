import React, {useState} from "react";
import axios from "axios";

function TradeUpdateForm({trade, onUpdate}) {
    const [formData, setFormData] = useState({
        objectName: trade.supplierName,
        pollutantName: trade.detalName,
        detalQuantity: trade.detalQuantity,
        purchaseDate: trade.purchaseDate
    });

    const [error, setError] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
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

        if (
            !formData.detalQuantity
        ) {
            setError("Number can't be less than 0.")
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/api/v1/trade/${trade.id}`,
                formData
            );
            if (response.status === 200) {
                setError(""); // Clear any previous errors
                onUpdate();
                setIsFormVisible(false); // Hide the form after submission
            }
        } catch (error) {
            console.error("Error updating trade data:", error);
            setError(error.response.data);
        }
    };

    return (
        <div className="text-center m-3">
            <button className="btn btn-primary btn-warning" onClick={toggleFormVisibility}>
                {isFormVisible ? "Hide Update Form" : "Update"}
            </button>
            {isFormVisible && (
                <div className="d-flex justify-content-center">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Supplier`s Name:</label>
                            <br/>
                            <input
                                type="text"
                                name="supplierName"
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
                                value={formData.detalName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Detal Quantity:</label>
                            <br/>
                            <input
                                type="number"
                                name="detalQuantity"
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
                                value={formData.purchaseDate}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn mt-2 btn-success">
                            Update
                        </button>
                        {error && <div className="text-danger">{error}</div>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default TradeUpdateForm;