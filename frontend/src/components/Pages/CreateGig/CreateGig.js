import React, { useEffect, useState } from 'react'
import './CreateGig.css'
import { useParams } from 'react-router-dom'
import MetaData from '../../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import { changeNavbar } from '../../../redux/actions/userAction'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Overview from './Overview';
import Pricing from './Pricing';
import Description from './Description';
import Gallery from './Gallery';
import Publish from './Publish';
import { useAlert } from "react-alert";
import { loadGig, createGig, updateGig,clearErrors } from '../../../redux/actions/gigAction'
import { CREATE_GIG_RESET,UPDATE_GIG_RESET } from '../../../redux/constants/gigConstants';
import './CreateGig.css'
import Loader from '../../layout/Loader/Loader';
const CreateGig = () => {
    const params = useParams();
    let { id } = params;
    const [tabs, setTabs] = useState(id ? -1 : 0)
    const dispatch = useDispatch();
    const alert = useAlert();


    const { loading, isCreated, error, gigId } = useSelector(state => state.createGig)
    const {isUpdated} = useSelector(state => state.updateGig) 
    const setTabsByCallBack = (number, data) => {
        if (number == 0) {
            dispatch(createGig(data))
        }
        if (number == 1){
            dispatch(updateGig(data,id?id:gigId,number))   
        }
        if(number == 2){
            dispatch(updateGig(data,id?id:gigId,number))   
        }
        if(number == 3){
            setTabs(tabs + 1);
        }
    }

    useEffect(() => {
        dispatch(changeNavbar('seller'))
        console.log(isCreated);
        if (isCreated) {
            dispatch(loadGig())
            setTabs(tabs + 1);
            alert.success("Data added successfully...")
            dispatch({
                type: CREATE_GIG_RESET
            })
        }

        if(isUpdated){
            dispatch(loadGig())
            setTabs(tabs + 1);
            alert.success("Data added successfully...")
            dispatch({
                type: UPDATE_GIG_RESET
            })
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        else if (id) {
            setTabs(tabs + 1);
        }

    }, [dispatch, alert, isCreated, error,loading, isUpdated])



    return (
        <>
            {
                loading ?
                    <Loader /> :
                    <>
                        <MetaData title="Create New" />

                        <div className="settings">
                            <div className='settings-inner'>
                                <span className="settings-title" >Settings</span>


                                <div className="settings-main">

                                    <div className='settings-main-left'>
                                        <span className={tabs >= 0 ? 'active-setting' : ''}>
                                            {tabs > 0 && <CheckCircleIcon style={{ position: 'absolute', left: '8px' }} />}Overview</span>
                                        <span className={tabs >= 1 ? 'active-setting' : ''}>
                                            {tabs > 1 && <CheckCircleIcon style={{ position: 'absolute', left: '8px' }} />}Pricing</span>
                                        <span className={tabs >= 2 ? 'active-setting' : ''}>
                                            {tabs > 2 && <CheckCircleIcon style={{ position: 'absolute', left: '8px' }} />}Description</span>
                                        <span className={tabs >= 3 ? 'active-setting' : ''}>
                                            {tabs > 3 && <CheckCircleIcon style={{ position: 'absolute', left: '8px' }} />}Gallery</span>
                                        <span className={tabs >= 4 ? 'active-setting' : ''}>
                                            {tabs > 4 && <CheckCircleIcon style={{ position: 'absolute', left: '8px' }} />}Publish</span>
                                    </div>
                                    <div className='settings-main-right'>
                                        {
                                            tabs == 0 ? <Overview gigId={id} click={setTabsByCallBack} /> :
                                                tabs == 1 ? <Pricing gigId={id?id:gigId} click={setTabsByCallBack} /> :
                                                    tabs == 2 ? <Description gigId={id?id:gigId} click={setTabsByCallBack} /> :
                                                        tabs == 3 ? <Gallery gigId={id?id:gigId} click={setTabsByCallBack} /> :
                                                            <Publish gigId={id?id:gigId} click={setTabsByCallBack} />

                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
            }

        </>
    )
}

export default CreateGig