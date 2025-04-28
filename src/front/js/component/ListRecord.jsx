import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

const ListRecord = () => {

    const { store, actions } = useContext(Context);
    let records = store.records

    useEffect(() => {

        let isMounted = true;

        const fetchRecords = async () => {
            const success = await actions.get_records();
            if (success && isMounted) {
                records = store.records
            }
        }

        fetchRecords();

        return () => {
            isMounted = false;
        }
    }, [])
    return (
        <div>
            <h2>Registros</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Descripcion</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Monto</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tipo</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Categoria</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Fecha</th>

                    </tr>
                </thead>
                <tbody>
                    {records && records.length > 0 ? (
                        records.map((record, index) => (
                            <tr key={index}>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index+1}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{record.description}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{record.amount}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{record.type == "Ingreso" ? `✅` : `📛`}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{record.category.name}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{new Date(record.timestamp).toLocaleString('es-UY')}</td>

                            </tr>
                        ))) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                                No hay registros todavía.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListRecord;