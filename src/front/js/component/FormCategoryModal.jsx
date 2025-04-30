import React from "react";

const FormCategoryModal = ({id}) => {


    return (
        <div className="modal fade" id="createCategoryModal" tabIndex="-1" aria-labelledby="createCategoryModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createCategoryModalLabel">Nueva Categoría</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="categoryName" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="categoryName" placeholder="Ej: Transporte" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="categoryDescription" className="form-label">Descripción</label>
                                <input type="text" className="form-control" id="categoryDescription" placeholder="Ej: Gastos relacionados al transporte" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-success">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FormCategoryModal;