import React, { useState, useEffect } from 'react'
import './Settings.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeNavbar } from '../../../redux/actions/userAction'
import UpdateAccount from './UpdateAccount';
import UpdatePassword from './UpdatePassword';
import MetaData from '../../layout/MetaData'


const Settings = ({history}) => {
    const [tabs, setTabs] = useState(0)
   
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(changeNavbar('seller'))

    }, [])


    const handleTabs = (number) => {
        setTabs(number)
    }

    return (
        <>
        <MetaData title="Settings" />
        
        <div className="settings">
            <div className='settings-inner'>
                <span className="settings-title" >Settings</span>


                <div className="settings-main">

                    <div className='settings-main-left'>
                        <span className={tabs === 0 ? 'active-setting' : ''} onClick={() => handleTabs(0)}>Account</span>
                        <span className={tabs === 1 ? 'active-setting' : ''} onClick={() => handleTabs(1)}>Security</span>
                    </div>
                    <div className='settings-main-right'>

                        {
                            tabs === 0?
                            <UpdateAccount history={history} />:
                            <UpdatePassword history={history} />
                        }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Settings