import React, { useState } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './NavbarSeller.css';
import Dropdown from './Dropdown';
import { MenuItems } from './MenuItems';
import { AvatarMenuItems } from './AvatarMenuItems';
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch} from "react-redux";
import {changeNavbar} from '../../../redux/actions/userAction'

function Navbar() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch(); 
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState({
    avatar:false,
    services:false
  });
  const handleNavbar = ()=>{
    dispatch(changeNavbar('buyer'))
  }
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = (name) => {
    if (window.innerWidth < 1020) {
      setDropdown((pre)=>({...pre,[name]:false}));
    } else {
      setDropdown((pre)=>({...pre,[name]:true}));
    }
  };

  const onMouseLeave = (name) => {
    if (window.innerWidth < 1020) {
      setDropdown((pre)=>({...pre,[name]:false}));
    } else {
      setDropdown((pre)=>({...pre,[name]:false}));
    }
  };

  return (
    <>
      <nav className='navbar navbar-seller'>
        <div className="navbar-inner ">
          <Link to='/dashboard' className='navbar-logo navbar-seller-text' onClick={closeMobileMenu}>
            WorkPay
            <i className="fab fa-google-wallet navbar-seller-text" aria-hidden="true"></i>


          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times navbar-seller-text' : 'fas fa-bars navbar-seller-text'} />
          </div>
          <ul className={click ? 'nav-menu active navbar-seller' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/dashboard' className='nav-links navbar-seller-text' onClick={closeMobileMenu}>
                Dashboard
              </Link>
            </li>
            <li
              className='nav-item'
              onMouseEnter={()=>onMouseEnter('services')}
              onMouseLeave={()=>onMouseLeave('services')}
            >
              <Link
                to='/profile'
                className='nav-links navbar-seller-text'
                onClick={closeMobileMenu}
              >
                Profile 
                {/* <i className='fas fa-caret-down' /> */}
              </Link>
              {/* {dropdown.services && <Dropdown MenuItems={MenuItems} />} */}
            </li>
            <li className='nav-item'>
              <Link
                to='/messages'
                className='nav-links navbar-seller-text'
                onClick={closeMobileMenu}
              >
                Messages
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/orders'
                className='nav-links navbar-seller-text'
                onClick={closeMobileMenu}
              >
                Orders
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/settings'
                className='nav-links navbar-seller-text'
                onClick={closeMobileMenu}
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                to='/login'
                className='nav-links-mobile '
                onClick={closeMobileMenu}
              >
                JOIN Us
              </Link>
            </li>
          </ul>
          <div>
            
            {isAuthenticated 
            ?
            <>
              <div className="avatar-mobile-display">
              <Link to='/'
              className="switch-dashboard" onClick={handleNavbar}
              >Switch to Buyer</Link>
              <li
              className='nav-item'
              onMouseEnter={()=>onMouseEnter('avatar')}
              onMouseLeave={()=>onMouseLeave('avatar')}
            >
              <Avatar  
              alt="Remy Sharp" src={user.avatar?.url ? user.avatar?.url:"./Profile.png" } />
              {dropdown.avatar && <Dropdown MenuItems={AvatarMenuItems} right="2%" avatar={true} />}
          </li>
              </div>
            </>
            :<Button text="Join us" link="/login"/>
            
            }

          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
