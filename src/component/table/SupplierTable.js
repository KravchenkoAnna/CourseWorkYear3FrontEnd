import React from 'react';
import './Table.css'
import Table from "./Table";
import SupplierUpdateForm from "../supplier/SupplierUpdateForm";
import SupplierDeleteButton from "../supplier/SupplierDeleteButton";


function SupplierTable({ suppliers, onSupplierUpdate, onSupplierDelete }) {
    return (
        <Table>
            <thead className="">
            <tr>
                <th rowSpan="2">ID</th>
                <th rowSpan="2">Назва підприємства</th>
                <th rowSpan="2">Опис</th>
                <th rowSpan="2">Оновлення даних</th>
                <th rowSpan="2">Видалення</th>
            </tr>
            </thead>
            <tbody>
            {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                    <td>{supplier.id}</td>
                    <td>{supplier.name}</td>
                    <td>{supplier.address}</td>
                    <td>{supplier.phoneNumber}</td>
                    <td><SupplierUpdateForm supplier={supplier} onUpdate={onSupplierUpdate}/></td>
                    <td><SupplierDeleteButton supplier={supplier} onDelete={onSupplierDelete}/></td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default SupplierTable;