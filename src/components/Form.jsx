import React from "react";
import { useFormState } from "react-use-form-state";

const Form = () => {
    const [formState, { text, email, password, radio }] = useFormState();
    const handleSubmit = e => {
        const { values } = formState;
        e.preventDefault();
        console.log(values);
    };
    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyItems: "center"
            }}
        >
            <label>Name:</label>
            <input {...text("name")} required />
            <label>Email:</label>
            <input {...email("email")} required />
            <label>Password: </label>
            <input {...password("password")} required />
            <label>Option number</label>
            <input {...radio("option", "one")} />
            <input {...radio("option", "two")} />
            <input {...radio("option", "three")} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;
