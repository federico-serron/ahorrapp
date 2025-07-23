// 👇 Parte superior, dejá esto igual
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SpinnerLogo from "./SpinnerLogo.jsx";

const ListRecord = () => {
    const { store, actions } = useContext(Context);
    const { wallet_id } = useParams();
    let records = store.records;

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const [editId, setEditId] = useState(null);
    const [description, setDescription] = useState(null);
    const [amount, setAmount] = useState(null);
    const [cat_id, setCat_id] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const perPage = store.pagination.per_page || 10;

    const cleanUpState = () => {
        setEditId(null);
        setDescription(null);
        setAmount(null);
        setCat_id(null);
    };

    const handleEditRecord = async (editId, description, amount, cat_id) => {
        try {
            const response = await actions.editRecord(editId, description, amount, cat_id);
            if (response) {
                toast.success("Registro editado correctamente");
                cleanUpState();
            } else {
                toast.error("No se pudo editar el registro");
                cleanUpState();
            }
        } catch (error) {
            toast.error("Error, algo salió mal en el componente");
            cleanUpState();
        }
    };

    const handleDeleteRecord = async (recordId) => {
        const result = await actions.deleteRecord(recordId);
        if (result) {
            toast.success("Registro eliminado correctamente");
        } else {
            toast.error("No se pudo eliminar el registro");
        }
    };

    const fetchRecords = async (page = 1) => {
        setLoading(true);

        const success = await actions.get_records_paginated(null, null, wallet_id, page, perPage);
        if (success) setLoading(false);
    };

    useEffect(() => {
        fetchRecords(currentPage);
    }, [currentPage]);

    const handleExport = async () => {
        try {
            const result = await actions.exportRecordsExcel();
            if (!result) {
                toast.error("Ha ocurrido un error al exportar el excel");
                return;
            }
            toast.success("Descargando archivo de registros");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await actions.getCategories();
                if (!data) {
                    console.log("No hay categorías");
                    setLoading(false);
                    return;
                }
                setCategories(store.categories_db);
                setLoading(false);
            } catch (error) {
                console.error(`Error al intentar traer las categorías: ${error}`);
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const pagination = store.pagination || { page: 1, pages: 1, has_next: false, has_prev: false };;

    return (
        <div className="">
            <h2>Registros</h2>
            <div className="table-responsive card p-3 shadow rounded-2">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Descripción</th>
                            <th>Monto</th>
                            <th>Categoría</th>
                            <th>Fecha</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6">
                                    <SpinnerLogo />
                                </td>
                            </tr>
                        ) : store.records.length > 0 ? (
                            store.records.map((record, index) => (
                                <tr key={record.id}>
                                    <td>{index + 1}</td>
                                    {editId === record.id ? (
                                        <>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue={record.description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    defaultValue={record.amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <select
                                                    className="form-select"
                                                    defaultValue={record.category.id}
                                                    onChange={(e) => setCat_id(e.target.value)}
                                                >
                                                    {store.categories_db.map((cat, i) => (
                                                        <option key={i} value={cat.id}>
                                                            {cat.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>{new Date(record.timestamp).toLocaleString("es-UY")}</td>
                                            <td>
                                                <button
                                                    className="btn"
                                                    onClick={() => handleEditRecord(editId, description, amount, cat_id)}
                                                >
                                                    ✅
                                                </button>
                                                <button className="btn" onClick={cleanUpState}>
                                                    ❌
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{record.description}</td>
                                            <td className={record.amount < 0 ? "text-danger" : "text-success"}>
                                                ${parseFloat(record.amount).toFixed(2)}
                                            </td>
                                            <td>{record.category.name}</td>
                                            <td>{new Date(record.timestamp).toLocaleString("es-UY")}</td>
                                            <td>
                                                <i
                                                    className="fas fa-trash me-3 text-danger"
                                                    role="button"
                                                    onClick={() => handleDeleteRecord(record.id)}
                                                />
                                                <i
                                                    className="fas fa-pen text-primary"
                                                    role="button"
                                                    onClick={() => setEditId(record.id)}
                                                />
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-3">
                                    No hay registros todavía.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINACIÓN */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <button
                    className="btn btn-outline-primary"
                    disabled={!pagination.has_prev}
                    onClick={() => { setCurrentPage(prev => prev - 1) }}
                >
                    ◀ Anterior
                </button>
                <span>
                    Página {pagination.page} de {pagination.pages}
                </span>
                <button
                    className="btn btn-outline-primary"
                    disabled={!pagination.has_next}
                    onClick={() => { setCurrentPage(prev => prev + 1) }}
                >
                    Siguiente ▶
                </button>
            </div>

            <button type="button" className="btn btn-success mt-3" onClick={handleExport}>
                Exportar Registros
            </button>
        </div>
    );
};

export default ListRecord;
