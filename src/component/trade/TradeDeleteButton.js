import React, { useState } from 'react';
import axios from 'axios';

function TradeDeleteButton({ trade, onDelete }) {
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
    const [error, setError] = useState('');

    const toggleConfirmation = () => {
        setIsConfirmationVisible(!isConfirmationVisible);
        setError(''); // Clear any previous error messages
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/trade/${trade.id}`);
            onDelete();
            setIsConfirmationVisible(false); // Hide the confirmation dialog
        } catch (error) {
            console.error('Error deleting trade data:', error);
            setError('An error occurred while deleting the trade data.'); // Set error message
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
                    <p className="mt-2">Are you sure you want to delete the trade?</p>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Yes, Delete
                    </button>
                    <div>
                    <button className="btn btn-secondary mt-2" onClick={toggleConfirmation}>
                        Cancel
                    </button>
                    </div>
                    {error && <div className="text-danger mt-2">{error}</div>}
                </div>
            )}
        </div>
    );
}

export default TradeDeleteButton;