import * as React from 'react';

const Cake = ({imageUrl, name}) => <div className="cake">
    <div className="cake-image"><img src={imageUrl} alt=""/></div>
    <p>Name: {name}</p>
</div>;

export default Cake;