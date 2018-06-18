import * as React from 'react';

const FormInput = (props) => <div className="o-layout__item cake-form-segment">
    <label htmlFor={props.name}>{props.name.toUpperCase()}</label>
    <input {...props}/>
</div>;

export default FormInput;