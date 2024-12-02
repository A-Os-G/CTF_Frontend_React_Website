import React from 'react';
import './button.css';
import {Link} from 'react-router-dom';

function Button(props) {
    return ( 
        <>
            <button>
                <Link to={`/${props.address}`}>{props.name}</Link>
            </button>
        </>
     );
}

export default Button;