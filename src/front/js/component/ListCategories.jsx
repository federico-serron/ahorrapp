import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import ConfirmModal from "./ConfrimModal.jsx";
import { toast } from "react-toastify";
import FormCategoryModal from "./FormCategoryModal.jsx";
import * as bootstrap from 'bootstrap'; // Importa bootstrap para modales

const ListCategories = () => {
    const { store, actions } = useContext(Context);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleAddCategory = async (e) => {
        if (name === "" || description === "") {
            toast.warn("Debe ingresar todos los campos!");
            setName("");
            setDescription("");
            return;
        }
        const response = await actions.addCategory(name, description);

        if (!response) {
            toast.error(`Hubo un error al intentar crear la categoria ${name}`);
            console.log(`Hubo un error al intentar crear la categoria ${name}`);
            setName("");
            setDescription("");
            return;
        } else {
            // Cerrar el modal después de añadir exitosamente
            const modalElement = document.getElementById('createCategoryModal');
            const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modal.hide();

            setCategories(store.categories_db);
            toast.success(`Categoria ${name} creada exitosamente!`);
            setName("");
            setDescription("");
            return;
        }
    };

    const handleEditCategory = async (id) => {
        if (name === "" || description === "") {
            toast.warn("Debe ingresar todos los campos!");
            return;
        }
        const response = await actions.editCategory(id, name, description);

        if (!response) {
            toast.error("Hubo un error al editar la categoría");
            return;
        }

        // Cerrar el modal después de editar exitosamente
        const modalElement = document.getElementById('editCategoryModal');
        const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modal.hide();

        toast.success("Categoría editada exitosamente");
        setCategories(store.categories_db);
        setName("");
        setDescription("");
        setCategoryId(null);
    };

    const handleDelete = async (id) => {
        const response = await actions.deleteCategory(id);
        if (!response) {
            toast.error("No se pudo eliminar la categoria");
            return;
        } else {
            // Cerrar el modal después de eliminar exitosamente
            const modalElement = document.getElementById('confirmDeleteModal');
            const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modal.hide();

            toast.success("La categoria ha sido eliminada correctamente");
            setCategories(store.categories_db);
            setCategoryId(null);
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
                return;

            } catch (error) {
                console.error(`Hubo un error al intentar traer las categorias: ${error}`);
                setLoading(false);
            }
        };

        fetchCategories();
    }, [store.categories_db.length]); 
    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center mb-4 ">
                <h2 className="mb-0">Lista de Categorias</h2>
                <i className="ms-2 fa-solid fa-circle-plus fs-3 text-success "
                    role="button"
                    data-bs-toggle="modal"
                    data-bs-target="#createCategoryModal"></i>
            </div>
            <div className="row">
                <div className="col-12">
                    {/* Añade .table-sm para un padding más compacto */}
                    <div className="table-responsive p-3 shadow rounded-2">
                        <table className="table table-hover table-bordered align-middle table-sm"> 
                            <thead className="table-light">
                                <tr>
                                    <th className="fit-content">#</th> {/* Clase para ancho fijo */}
                                    <th>Nombre</th>
                                    <th>Descripcion</th>
                                    <th className="text-center d-none d-md-table-cell fit-content">Registros Asoc.</th> {/* Ocultar en móvil */}
                                    <th className="fit-content"></th> {/* Clase para ancho fijo */}
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5"> {/* Ajusta el colspan si ocultas columnas */}
                                            <div className="d-flex justify-content-center my-3">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Cargando...</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    categories.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center">No hay categorías registradas.</td>
                                        </tr>
                                    ) : (
                                        categories.map((category, index) => (
                                            <tr key={category.id}>
                                                <td className="fit-content">{index + 1}</td>
                                                <td>
                                                    <div className="text-truncate" style={{ maxWidth: "150px" }}>
                                                        {category.name}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="text-truncate" style={{ maxWidth: "250px" }}>
                                                        {category.description}
                                                    </div>
                                                </td>
                                                <td className="text-center d-none d-md-table-cell fit-content">
                                                    <span className="badge bg-success rounded-circle p-2">
                                                        {category.records_count}
                                                    </span>
                                                </td>
                                                <td className="fit-content">
                                                    <i
                                                        className="fas fa-trash show me-2 text-danger"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#confirmDeleteModal"
                                                        role="button"
                                                        onClick={() => setCategoryId(category.id)}
                                                    ></i>
                                                    <i
                                                        className="fa-solid fa-pen text-primary"
                                                        role="button"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#editCategoryModal"
                                                        onClick={() => {
                                                            setCategoryId(category.id);
                                                            setName(category.name);
                                                            setDescription(category.description);
                                                        }}
                                                    ></i>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ConfirmModal
                id="confirmDeleteModal"
                message="¿Estás seguro de que quieres eliminar esta categoria?"
                onConfirm={() => handleDelete(categoryId)}
                onCancel={() => setCategoryId(null)}
            />

            <FormCategoryModal
                id="createCategoryModal"
                message="Crea una nueva categoria"
                onCancel={() => {
                    setName("");
                    setDescription("");
                }}
                onConfirm={() => { handleAddCategory() }}
                name={name}
                description={description}
                onChangeName={(e) => setName(e.target.value)}
                onChangeDescription={(e) => setDescription(e.target.value)}
            />

            <FormCategoryModal
                id="editCategoryModal"
                message="Editar"
                onCancel={() => {
                    setName("");
                    setDescription("");
                }}
                onConfirm={() => { handleEditCategory(categoryId) }}
                name={name}
                description={description}
                onChangeName={(e) => setName(e.target.value)}
                onChangeDescription={(e) => setDescription(e.target.value)}
            />
        </div>
    );
}

export default ListCategories;