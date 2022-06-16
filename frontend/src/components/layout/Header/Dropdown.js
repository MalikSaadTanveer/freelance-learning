import React, { useState } from 'react';
import './Dropdown.css';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {logout} from '../../../redux/actions/userAction'
import { useAlert } from "react-alert";
import {useHistory} from 'react-router-dom'
import {changeNavbar} from '../../../redux/actions/userAction'

function Dropdown({MenuItems,right,avatar}) {
  const history = useHistory()
  const alert = useAlert();

  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => setClick(!click);
  const handleLink = (path)=>{
    setClick(false);
    console.log(path);
    if(path==='/'){
      dispatch(changeNavbar('buyer'))
      dispatch(logout());
      alert.success("Logout Successfully");
    }
    
  }
  return (
    <>
      <ul
        onClick={handleClick}
        style={{right}}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
            {/* {
              avatar?<div className={item.cName} onClick={()=>handleLink(item.path)}>
                {item.title}

              </div>: */}
              <Link
                className={item.cName}
                to={item.path}
                onClick={avatar? ()=>handleLink(item.path) :() => setClick(false)}
              >
                {item.title}
              </Link>
            {/* } */}

            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
