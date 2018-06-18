import * as React from 'react';

const FormInput = (props) => <div>
    <label htmlFor={props.name}>{props.name.toUpperCase()}</label>
    <input {...props}/>
</div>;

    export default FormInput;