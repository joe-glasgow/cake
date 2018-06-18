import * as React from 'react';
import {Link} from 'react-router-dom';

const Cake = ({imageUrl, name, id}) => <li className="o-list-inline__item"><Link to={`/cake/${id}`}><div className="cake">
    <div className="cake-image-holder"><img className="cake-image" src={imageUrl} alt=""/></div>
    <p><small>{name}</small></p>
</div></Link></li>;

export default Cake;