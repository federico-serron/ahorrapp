import React from "react";

const SavingsGoals = () => {
    // son datos de ejemplo hasta pdoer traer datos reales
    const goals = [
        { id: 1, name: "Fondo de emergencia", target: 10000, saved: 4500 },
        { id: 2, name: "Nuevo teléfono", target: 1500, saved: 800 },
        { id: 3, name: "Vacaciones", target: 5000, saved: 5000 }
    ];

    return (
        <div style={{
            maxWidth: "600px",
            margin: "20px auto",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px"
        }}>
            <h2 style={{
                textAlign: "center",
                color: "#333",
                marginBottom: "30px"
            }}>
                Progreso de Ahorros
            </h2>

            {goals.map((goal) => {
                const percentage = Math.round((goal.saved / goal.target) * 100);

                return (
                    <div key={goal.id} style={{
                        marginBottom: "25px",
                        padding: "15px",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "10px"
                        }}>
                            <h3 style={{ margin: "0", color: "#444" }}>{goal.name}</h3>
                            <span style={{
                                fontWeight: "bold",
                                color: percentage === 100 ? "#28a745" : "#007bff"
                            }}>
                                {percentage}%
                            </span>
                        </div>

                        {/* Barra de progreso */}
                        <div style={{
                            height: "10px",
                            backgroundColor: "#e9ecef",
                            borderRadius: "5px",
                            marginBottom: "8px"
                        }}>
                            <div style={{
                                width: `${percentage}%`,
                                height: "100%",
                                backgroundColor: percentage === 100 ? "#28a745" : "#17a2b8",
                                borderRadius: "5px"
                            }} />
                        </div>

                        {/* Montos */}
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "14px",
                            color: "#666"
                        }}>
                            <span>Ahorrado: <strong>${goal.saved.toLocaleString()}</strong></span>
                            <span>Meta: <strong>${goal.target.toLocaleString()}</strong></span>
                        </div>

                        {/* Mensaje si está completo */}
                        {percentage === 100 && (
                            <p style={{
                                margin: "10px 0 0",
                                color: "#28a745",
                                fontWeight: "bold",
                                textAlign: "center"
                            }}>
                                ¡Meta alcanzada!
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default SavingsGoals;