import React from 'react';
import './Table.css'
import Table from "./Table";
import DetalUpdateForm from "../detal/DetalUpdateForm";
import DetalDeleteButton from "../detal/DetalDeleteButton";

function DetalTable({ detals, onDetalUpdate, onDetalDelete }) {
    return (
        <Table>
            <thead className="">
            <tr>
                <th rowSpan="2">ID</th>
                <th rowSpan="2">Назва забруднюючої речовини</th>
                <th rowSpan="2">Величина масової витрати г/год.</th>
                <th rowSpan="2">Гранично допустима концинтрація мг/м3</th>
                <th rowSpan="2">Гранично допустимі викиди мг/м3</th>
                <th rowSpan="2">Оновлення даних</th>
                <th rowSpan="2">Видалення</th>
            </tr>
            </thead>
            <tbody>
            {detals.map((detal) => (
                <tr key={detal.id}>
                    <td>{detal.id}</td>
                    <td>{detal.name}</td>
                    <td>{detal.price}</td>
                    <td>{detal.dateOfSettingPrice}</td>
                    <td><DetalUpdateForm detal={detal} onUpdate={onDetalUpdate}/></td>
                    <td><DetalDeleteButton detal={detal} onDelete={onDetalDelete}/></td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default DetalTable;