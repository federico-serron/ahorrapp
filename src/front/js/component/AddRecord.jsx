import React, { useState, useContext } from "react";
import ListRecord from "./ListRecord.jsx";
import { Context } from "../store/appContext";


const AddRecord = () => {
    const { store, actions } = useContext(Context);
    const [inputValue, setInputValue] = useState("");
    const [assignedCategory, setAssignedCategory] = useState(null)


    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const singularize = (word) => {
        if (word.endsWith('s') && word.length > 3) {
            return word.slice(0, -1);
        }
        return word;
    };


    const handleRecord = (inputValue, categories) => {
        const amountMatch = inputValue.match(/-?\d+(\.\d+)?/);
        const amount = amountMatch ? parseFloat(amountMatch[0]) : null;
        const words = inputValue
            .replace(/-?\d+(\.\d+)?/, "")
            .toLowerCase()
            .split(/\s+/)
            .map(removeAccents)
            .map(singularize);

        for (const [category, keywords] of Object.entries(categories)) {
            if (words.some(word => keywords.includes(word))) {
                setAssignedCategory(category);
                break;
            }
        }

        console.log(amount, assignedCategory, words.join(" "))
        setInputValue("")
        return store.records = [...store.records, {
            id: store.records.length + 1,
            description: words.join(" "),
            amount: amount,
            category:{
                name: assignedCategory
            }
        }];
    };

    return (
        <div className="container mt-4 col-4">
            <ListRecord />
            <h5 className="my-3">Ingresa tu registro</h5>
            <div className="input-group">
                <button onClick={() => { handleRecord(inputValue, store.categories) }} className="btn btn-custom" type="button">
                    ➕
                </button>
                <input
                    onChange={(e) => { setInputValue(e.target.value) }}
                    onKeyDown={(e)=>{e.key === "Enter" ? handleRecord(inputValue, store.categories) : ""}}
                    type="text"
                    className="form-control"
                    placeholder="-250 comida con la banda"
                    value={inputValue}
                />
            </div>
        </div>
    )
}

export default AddRecord;