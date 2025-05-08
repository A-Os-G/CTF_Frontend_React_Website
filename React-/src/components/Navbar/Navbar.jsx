import React,{useState} from 'react';
import './Navbar.css'
import Button from '../ui/Button'
import {Link, NavLink} from 'react-router-dom'
import { Link as Scroll } from 'react-scroll';

function Navbar(props) {

    const [isActive,setisActive] = useState(false);

    const toggleActive = () => {setisActive(!isActive);};


    return ( 
        <nav>
            <div className='nav-bar'>
                
                {/* Logo + Name */}
                <Link to={"/"}>
                    <div className='nav-brand'>
                        <img src='/images/navbarImage.png'></img>
                        <h3>Capture The Flag</h3>
                    </div>
                </Link>
                
                {/* HamburgerImage */}
                <div className={'Hamburger-nav'}>
                    {isActive ? <img src='/images/Hamburfer_open.png' onClick={toggleActive}></img> : 
                                <img src='/images/Hamburfer_closed.png' onClick={toggleActive}></img>}
                </div>

                {/* Tabs */}
                <div className={`nav-tabs ${isActive ? '' : 'activated'}`}>
                    <ul>
                        <li><Scroll to={"hero"} smooth duration={500}>Home</Scroll></li>
                        <li><Scroll to={"challenge"} smooth duration={500}>Challenges</Scroll></li>
                        <li><Scroll to={"about"} smooth duration={500}>About</Scroll></li>
                    </ul>
                
                {/* Login Button */}
                    <div className='Nav-button'>
                        <Button name="Login / Signup" address="./signup"/>
                    </div>
                </div>
            </div>
        </nav>
     );
}

export default Navbar;