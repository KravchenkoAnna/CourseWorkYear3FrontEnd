import React, { useState } from "react";
import axios from "axios";

function SupplierDeleteButton({ supplier, onDelete }) {
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
    const [error, setError] = useState("");

    const toggleConfirmation = () => {
        setIsConfirmationVisible(!isConfirmationVisible);
        setError(""); // Clear any previous error messages
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/suppliers/${supplier.id}`);
            onDelete();
            setIsConfirmationVisible(false); // Hide the confirmation dialog
        } catch (error) {
            console.error("Error deleting supplier:", error);
            setError('An error occurred while deleting the detal data.'); // Set error message
        }
    };

    return (
        <div>
            {!isConfirmationVisible && (
                <button className="btn btn-outline-danger" onClick={toggleConfirmation}>
                    Delete
                </button>
            )}
            {isConfirmationVisible && (
                <div className="confirmation-dialog">
                    <p className="mt-2">Are you sure you want to delete this supplier?</p>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Yes, Delete
                    </button>
                    <br />
                    <button className="btn btn-secondary mt-2" onClick={toggleConfirmation}>
                        Cancel
                    </button>
                    {error && <div className="text-danger mt-2">{error}</div>}
                </div>
            )}
        </div>
    );
}

export default SupplierDeleteButton;