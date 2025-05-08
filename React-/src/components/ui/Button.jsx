import React from 'react';
import './Button.css';
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