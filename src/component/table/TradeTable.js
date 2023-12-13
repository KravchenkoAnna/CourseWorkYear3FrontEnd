import React from 'react';
import './Table.css'
import Table from "./Table";
import TradeUpdateForm from "../trade/TradeUpdateForm";
import TradeDeleteButton from "../trade/TradeDeleteButton";

function TradeTable({trades, onTradeUpdate, onTradeDelete}) {
    return (
        <Table>
            <thead className="bg-dark">
            <tr>
                <th rowSpan="2" className={"align align-middle"}>ID</th>
                <th rowSpan="2" className={"align align-middle"}>Ім'я постачальника</th>
                <th rowSpan="2" className={"align align-middle"}>Назва деталі</th>
                <th rowSpan="2" className={"align align-middle"}>Кількість деталей</th>
                <th rowSpan="2" className={"align align-middle"}>Дата покупки</th>

            </tr>
            </thead>
            <tbody>
            {trades.map((trade) => (
                <tr key={trade.id}>
                    <td className={"align align-middle"}>{trade.id}</td>
                    <td className={"align align-middle"}>{trade.supplierName}</td>
                    <td className={"align align-middle"}>{trade.detalName}</td>
                    <td className={"align align-middle"}>{trade.detalQuantity}</td>
                    <td className={"align align-middle"}>{trade.purchaseDate}</td>

                    <td className={"align align-middle"}><TradeUpdateForm trade={trade}
                                                                              onUpdate={onTradeUpdate}/></td>
                    <td className={"align align-middle"}><TradeDeleteButton trade={trade}
                                                                                onDelete={onTradeDelete}/></td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default TradeTable;