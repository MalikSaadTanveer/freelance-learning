import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import MetaData from "../../layout/MetaData";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../layout/Loader/Loader'
import { useAlert } from "react-alert";
import { changeNavbar } from '../../../redux/actions/userAction'
import './Profile.css'
import {
  loadGig,
  clearErrors
} from '../../../redux/actions/gigAction'
import PersonIcon from '@mui/icons-material/Person';
import {Link} from 'react-router-dom'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import ProfileGigCard from './ProfileGigCard';
import AddIcon from '@mui/icons-material/Add';



const Profile = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, loading, gigs } = useSelector(state => state.userGigs)
  const { user } = useSelector((state) => state.user);
  const [tabs, setTabs] = useState('active')
  const [filteredData, setFilteredData] = useState(false)
  const handleTabs = (status) => {
    setTabs(status);
    if(status === 'active'){
      setFilteredData(false)
    }else{
      setFilteredData(true)

    }
  }
  useEffect(() => {
    dispatch(loadGig())
    setTabs('active');
    setFilteredData(false)
    dispatch(changeNavbar('seller'))
    console.log(filteredData);
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    console.log(gigs);

  }, [dispatch,error, alert,])

  return (
    <>
      {
        loading ?
          <Loader />
          :
          <div>
            <MetaData title="Profile" />

            <div className="dashboard">

              <div className='dashboard-inner' >
                <span className="dashboard-title" >Profile</span>

                <div className="dashboard-main" >



                  <div className='dashboard-main-left-container'>
                    <div className='dashboard-main-left'>
                      <Avatar src={user.avatar?.url ? user.avatar.url : "./Profile.png"} className='avatar' />
                      <span className="name">{user.name}</span>
                      <div>
                        Reviews ( {user.ratings} )
                        <i className="fa fa-star" aria-hidden="true"> </i>
                      </div>

                      <div className="profile-detail-container">
                        <span className="profile-detail-left"><PersonIcon className="icons" /> Member since</span>
                        <span className="profile-detail-right">June 2021</span>
                      </div>
                      <div className="profile-detail-container">
                        <span className="profile-detail-left"><DeliveryDiningIcon className="icons" />Last Delivery</span>
                        <span className="profile-detail-right">11 Months</span>
                      </div>

                    </div>




                    <div className='dashboard-main-left'>

                      <div className="description-container">
                        <div className="description-top">Description</div>
                        <span className="description-text">Hi, I am Malik Saad. I am a Computer Science Student. I am a Professional Audio, Video Editor, and a Good Programmer. I am good at "problem-solving" and creating many good projects in these fields from the past few years. I have been helping people for the last 2 years on other freelancing platforms. I am passionate about my work and my first importance is my client. If my client is happy then I am also happy in terms of spiritually and financially😜. So if you need any kind of help feel free to ask me.</span>
                        
                        <hr />
                        
                        <div className="description-top">Language</div>
                        <span className="description-text">English</span>
                        </div>

                    </div>
                  </div>

                  <div className='dashboard-main-right'>

                    <div className='top'>
                      <span style={{ borderBottom: tabs === 'active' ? '4px solid teal' : 'none' }}
                        onClick={() => handleTabs('active')}>Active Gigs</span>
                      <span style={{ borderBottom: tabs === 'drafts' ? '4px solid teal' : 'none' }}
                        onClick={() => handleTabs('drafts')}>Drafts </span>
                    </div>
                
                <div style={{display:'flex',flexWrap:'wrap'}}>
                    
                    {
                    
                      gigs && gigs.filter(item=> item.draft == filteredData)?.map((item,index)=>(
                        <ProfileGigCard key = {index} item={item}/>
                      ))

                    }
                    
                    {
                      tabs ==='active' ? 
                      <Link to="/gig/new">
                          <div className="createGig-container">
                            <div className="createGig-icon-container">
                            <AddIcon className="createGig-icon" fontSize="large" />
                            </div>
                          </div>
                    </Link>:<></>
                    }
                    
                      

                </div>
                    


                  </div>

                </div>

              </div>

            </div>
          </div>
      }
    </>
  )
}

export default Profile