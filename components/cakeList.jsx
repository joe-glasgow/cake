import * as React from 'react';
import CakeService from 'common/cakeService';
import Cake from './cakeItem';

class CakeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            cakes: []
        };
    }

    componentDidMount() {
        const Cakes = new CakeService();
        Cakes.getAllCakes().then(results => {
            if (results && results.length) {
                return this.setState({
                    cakes: results,
                    loading: false,
                    error: false
                });
            }
            return this.setState({
                error: true,
                loading: false
            });
        });
    }

    render() {
        const {error, loading, cakes} = this.state;
        if (error) {
            return <div><p>There was an error loading cakes!</p></div>
        }
        return loading ? <div>Loading cakes... </div> : <ul className="o-list-inline">
            {
                cakes.map(({imageUrl, name, id}, index) => <Cake id={id} key={index} imageUrl={imageUrl} name={name}/>)
            }
        </ul>;
    }
}

export default CakeList;