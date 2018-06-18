import * as React from 'react';
import CakeService from 'common/cakeService';

class CakeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            comment: "",
            id: "",
            imageUrl: "",
            name: "",
            yumFactor: 0
        }
    }

    componentDidMount() {
        const Cakes = new CakeService();
        const {params} = this.props.match;
        Cakes.getCake(params.id)
            .then(result => {
                Object.keys(result).map( name => {
                    this.setState({[name]: result[name]});
                });
                this.setState({ loading : false });
            });
    }

    render() {
        const {loading, name, comment, imageUrl, yumFactor} = this.state;
        return loading ? <div>Loading your cake ... </div> : <div>
            <p>Name: {name}</p>
            <p><img src={imageUrl} alt={name}/></p>
            <p>Comment: {comment}</p>
            <p>Yum Factor: {yumFactor}</p>
        </div>
    }
}

export default CakeDetail;