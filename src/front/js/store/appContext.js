import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: updatedStore =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: { ...state.actions }
                    })
            })
        );

        useEffect(() => {
            /**
             * EDIT THIS!
             * This function is the equivalent to "window.onLoad", it only runs once on the entire application lifetime
             * you should do your ajax requests or fetch api requests here. Do not use setState() to save data in the
             * store, instead use actions, like this:
             **/
            state.actions.getMessage(); 
            
            // Llama a la acción para cargar el perfil del usuario al inicio de la aplicación
            if (localStorage.getItem('token')) { // Solo si hay un token, para evitar llamadas innecesarias
                state.actions.getUser(); // <--- ¡Añade esta línea y envuélvela en una comprobación de token!
            }
            
        }, []); // El array de dependencias vacío significa que se ejecuta una sola vez al montar

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;