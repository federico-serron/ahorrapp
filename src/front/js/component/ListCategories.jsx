import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import ConfirmModal from "./ConfrimModal.jsx";
import { toast } from "react-toastify";
import FormCategoryModal from "./FormCategoryModal.jsx";

const ListCategories = () => {

    const { store, actions } = useContext(Context);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)
    const [categoryToDelete, setCategoryToDelete] = useState(null);


    const handleDelete = async (id) => {

        const response = await actions.deleteCategory(id);
        if (!response) {
            toast.error("No se pudo eliminar la categoria")
            return;
        } else {
            toast.success("La categoria ha sido eliminada correcamente")
            setCategories(store.categories_db)
        }
    }


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

            <div className="d-flex align-items-center mb-4 ">
                <h2 className="mb-0">Lista de Categorias</h2>
                <i class="ms-2 fa-solid fa-circle-plus fs-3 text-success"
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#createCategoryModal"></i>
            </div>
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
                                    <th></th>

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
                                            <td>{category.name}</td>
                                            <td>{category.descritpion}</td>
                                            <td style={{ minWidth: "15px", width: "5%" }}>{category.records_count}</td>
                                            <td style={{ minWidth: "50px", width: "6%" }}><i
                                                className="fas fa-trash show me-2 text-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#confirmDeleteModal"
                                                role="button"
                                                onClick={() => setCategoryToDelete(category.id)}
                                            ></i>
                                                <i className="fa-solid fa-pen text-primary" role="button"></i>

                                            </td>

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
                message="¿Estás seguro de que quieres eliminar esta categoria?"
                onConfirm={() => handleDelete(categoryToDelete)}
                onCancel={() => setUserToDelete(null)}
            />
            <FormCategoryModal 
                id="createCategoryModal"
                message="Crea una nueva categoria"
            />
        </div>
    );

}

export default ListCategories;