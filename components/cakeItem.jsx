import * as React from 'react';
import {Link} from 'react-router-dom';

const Cake = ({imageUrl, name, id}) => <Link to={`/cake/${id}`}><div className="cake">
    <div className="cake-image"><img src={imageUrl} alt=""/></div>
    <p>Name: {name}</p>
</div></Link>;

export default Cake;