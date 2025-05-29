import React,{useState} from 'react';
import './Navbar.css'
import Button from '../ui/Button'
import {Link, NavLink} from 'react-router-dom'

function Navbar() {

    const [isActive,setisActive] = useState(false);

    const toggleActive = () => {setisActive(!isActive);};


    return ( 
        <nav>
            <div className='nav-bar'>
                
                {/* Logo + Name */}
                <Link to={"/admin"}>
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
                        <li><NavLink to={"/admin/users"}>Users</NavLink></li>
                        <li><NavLink to={"/admin/category"}>Category</NavLink></li>
                        <li><NavLink to={"/admin/challenges"}>Challenges</NavLink></li>
                        <li><NavLink to={"/admin/feedback"}>Feedback</NavLink></li>
                    </ul>
                
                {/* Login Button */}
                    <div className='button'>
                        <Button name="Login / Signup" address="./login"/>
                    </div>
                </div>
            </div>
        </nav>
     );
}

export default Navbar;