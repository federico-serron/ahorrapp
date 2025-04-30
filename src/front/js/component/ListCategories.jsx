import React from "react";

const ListCategories = () => {


    return (
        <div className="container mt-4">
            <h2 className="mb-4">Lista de Usuarios</h2>
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
                        <div className="d-flex justify-content-center my-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    ) : (
                        categories.map((category, index) => (
                            <tr key={category.id}>
                                <td>{index + 1}</td>
                                <td><i class="fas fa-trash delete-fa show" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal"
                                    role='button'
                                    onClick={() => { setUserToDelete(category.id) }}></i>
                                    {category.name}
                                </td>
                                <td>{category.descritpion}</td>
                                <td>{category.records_count}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <ConfirmModal
                id="confirmDeleteModal"
                message="¿Estás seguro de que quieres eliminar este usuario?"
                onConfirm={() => handleDelete(userToDelete)}
                onCancel={() => setUserToDelete(null)}
            />
        </div>

    )
}

export default ListCategories;