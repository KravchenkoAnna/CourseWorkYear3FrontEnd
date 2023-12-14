import React, {useEffect, useState} from "react";
import axios from "axios";
import TradeTable from "../component/table/TradeTable";
import CreateTradeForm from "../component/trade/CreateTradeForm";

function TradesPage() {
    const [trades, setTrades] = useState([]);
    const [, setSuccessMessage] = useState(""); // State variable for success message

    useEffect(() => {
        fetchTrades();
    }, []);

    const fetchTrades = async () => {
        const response = await axios.get("http://localhost:8080/api/v1/trade");
        setTrades(response.data);
    };

    const onTradeUpdate = async () => {
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchTrades();
            setSuccessMessage("Trade updated successfully");
        } catch (error) {
            console.error("Error updating trade:", error);
        }
    };

    const onTradeCreated = async () => {
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchTrades();
            setSuccessMessage("Trade created successfully");
        } catch (error) {
            console.error("Error creating trade:", error);
        }
    };

    const onTradeDelete = async () => {
        // Clear any previous success message
        setSuccessMessage("");
        try {
            await fetchTrades();
            setSuccessMessage("Trade deleted successfully");
        } catch (error) {
            console.error("Error deleting trade:", error);
        }
    };

    return (
        <div className={"bg-dark"}>
            <TradeTable
                trades={trades}
                onTradeUpdate={onTradeUpdate}
                onTradeDelete={onTradeDelete}
            />
            <CreateTradeForm onTradeCreated={onTradeCreated}/>
        </div>
    );
}

export default TradesPage;