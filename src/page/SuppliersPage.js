import React, { useEffect, useState } from "react";
import axios from "axios";
import SupplierTable from "../component/table/SupplierTable";
import CreateSupplierForm from "../component/supplier/CreateSupplierForm";

function SuppliersPage() {
    const [suppliers, setSuppliers] = useState([]); // Change state variable name
    const [successMessage, setSuccessMessage] = useState(""); // State variable for success message

    useEffect(() => {
        console.log("useEffect()");
        fetchSuppliers(); // Change function name

    }, []);

    const fetchSuppliers = async () => { // Change function name
        console.log("fetchSuppliers()");
        const response = await axios.get("http://localhost:8080/api/v1/suppliers"); // Change API endpoint
        setSuppliers(response.data); // Change state variable name
    };

    const onSupplierUpdate = async () => { // Change function name
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchSuppliers(); // Change function name
            setSuccessMessage("Supplier updated successfully"); // Change success message
        } catch (error) {
            console.error("Error updating supplier:", error); // Change error message
        }
    };

    const onSupplierCreated = async () => { // Change function name
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchSuppliers(); // Change function name
            setSuccessMessage("Object created successfully"); // Change success message
        } catch (error) {
            console.error("Error creating object:", error); // Change error message
        }
    };

    const onSupplierDelete = async () => { // Change function name
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchSuppliers(); // Change function name
            setSuccessMessage("Supplier deleted successfully"); // Change success message
        } catch (error) {
            console.error("Error deleting supplier:", error); // Change error message
        }
    };

    return (
        <div>
            <SupplierTable
                suppliers={suppliers}
                onSupplierUpdate={onSupplierUpdate}
                onSupplierDelete={onSupplierDelete}
            />
            <CreateSupplierForm onSupplierCreated={onSupplierCreated} />
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
        </div>
    );
}

export default SuppliersPage;