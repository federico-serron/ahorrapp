import React, {useContext} from "react";
import { Context } from "../store/appContext";



const ListRecord = () => {

    const { store, actions } = useContext(Context);
    
    const fakeData = [...store.records];

    return (
        <div>
            <h2>Registros</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Descripcion</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Monto</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Categoria</th>
                    </tr>
                </thead>
                <tbody>
                    {fakeData.map((record) => (
                        <tr key={record.id}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{record.id}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{record.description}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{record.amount}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{record.category.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListRecord;