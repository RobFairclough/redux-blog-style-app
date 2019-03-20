import React from "react";

const Picker = ({ current, onChange, options }) => (
    <>
        <h1>{current}</h1>
        <select onChange={e => onChange(e.target.value)} value={current}>
            {options.map(option => (
                <option value={option} key={option}>
                    {option}
                </option>
            ))}
        </select>
    </>
);

export default Picker;
