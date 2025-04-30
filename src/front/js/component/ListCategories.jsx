import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import ConfirmModal from "./ConfrimModal.jsx";

const ListCategories = () => {

    const { store, actions } = useContext(Context);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // const data = await actions.getCategories();

                // if(!data){
                //     console.log("No hay categorias")
                //     setLoading(false)
                //     return;
                // }

                setCategories(store.categories_db)
                setLoading(false)
                return;

            } catch (error) {
                console.error(`Hubo un error al intentar traer las categorias: ${error}`)
            }
        }

        fetchCategories()
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Lista de Usuarios</h2>
            <div className="row">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Descripcion</th>
                                    <th>Registros Asoc.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="4">
                                            <div className="d-flex justify-content-center my-3">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Cargando...</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    categories.map((category, index) => (
                                        <tr key={category.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <i
                                                    className="fas fa-trash delete-fa show me-2"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#confirmDeleteModal"
                                                    role="button"
                                                    onClick={() => setUserToDelete(category.id)}
                                                ></i>
                                                {category.name}
                                            </td>
                                            <td>{category.descritpion}</td>
                                            <td>{category.records_count}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ConfirmModal
                id="confirmDeleteModal"
                message="¿Estás seguro de que quieres eliminar este usuario?"
                onConfirm={() => handleDelete(userToDelete)}
                onCancel={() => setUserToDelete(null)}
            />
        </div>
    );

}

export default ListCategories;