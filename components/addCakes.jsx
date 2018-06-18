import * as React from 'react';
import CakeService from '../common/cakeService';
import { withRouter } from 'react-router'

const FormInput = (props) => <div>
    <label htmlFor={props.name}>{props.name.toUpperCase()}</label>
    <input {...props}/>
</div>;

class AddCake extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            comment: "",
            imageUrl: "",
            yumFactor: ""
        };
        this.addFormToCakes = this.addFormToCakes.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createFormElements = this.createFormElements.bind(this);
    }

    addFormToCakes(event) {
        const Cakes = new CakeService();
        const {history} = this.props;
        event.preventDefault();
        Cakes.addCake(this.state).then( () => {
            // show the new cake
            history.push("/");
        });

    }

    handleChange(event) {
        const target = event.target;
        // incase of checkbox
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    createFormElements() {
        const basicFormElement = {
            required: "required",
            onChange: this.handleChange,
            type: "text"
        };
        const uniqueFormElements = (name) => {
            return {
                ...basicFormElement,
                name,
                placeholder: name,
                id: name
            }
        };
        // create form elements
        return Object.keys(this.state).map(key => {
            return {
                ...uniqueFormElements(key)
            }
        });
    }

    render() {
        const {createFormElements} = this;
        return <form onSubmit={this.addFormToCakes}>
            {/* model:
            name: <string>,
            comment: <string>,
            imageUrl: <string>,
            yumFactor: <number>
            */}
            {
                createFormElements().map((props, index) => {
                    return <FormInput key={index} {...props} />
                })
            }
            <button>Submit</button>
        </form>;
    }
}

export default withRouter(AddCake);