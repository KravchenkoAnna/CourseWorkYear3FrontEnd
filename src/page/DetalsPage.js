import React, { useEffect, useState } from "react";
import axios from "axios";
import DetalTable from "../component/table/DetalTable";
import CreateDetalForm from "../component/detal/CreateDetalForm";

function DetalsPage() {
    const [detals, setDetals] = useState([]); // Change state variable name
    const [successMessage, setSuccessMessage] = useState(""); // State variable for success message

    useEffect(() => {
        fetchDetals(); // Change function name
    }, []);

    const fetchDetals = async () => { // Change function name
        const response = await axios.get("http://localhost:8080/api/v1/detals"); // Change API endpoint
        setDetals(response.data); // Change state variable name
    };

    const onDetalUpdate = async () => { // Change function name
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchDetals(); // Change function name
            setSuccessMessage("Detal updated successfully"); // Change success message
        } catch (error) {
            console.error("Error updating detal:", error); // Change error message
        }
    };

    const onDetalCreated = async () => { // Change function name
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchDetals(); // Change function name
            setSuccessMessage("Detal created successfully"); // Change success message
        } catch (error) {
            console.error("Error creating detal:", error); // Change error message
        }
    };

    const onDetalDelete = async () => { // Change function name
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchDetals(); // Change function name
            setSuccessMessage("Detal deleted successfully"); // Change success message
        } catch (error) {
            console.error("Error deleting detal:", error); // Change error message
        }
    };

    return (
        <div>
            <DetalTable
                detals={detals}
                onDetalUpdate={onDetalUpdate}
                onDetalDelete={onDetalDelete}
            />
            <CreateDetalForm clonDetalCreated={onDetalCreated}/>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
        </div>
    );
}

export default DetalsPage;