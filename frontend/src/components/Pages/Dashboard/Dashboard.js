import React, { useState, useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { changeNavbar } from '../../../redux/actions/userAction'
import './Dashboard.css'
import Avatar from '@mui/material/Avatar';
import MetaData from "../../layout/MetaData";

const Dashboard = () => {

  let dummyData = [
    {
      img: "https://media.istockphoto.com/photos/graphic-designer-drawing-on-graphics-tablet-at-workplace-picture-id865230556?k=20&m=865230556&s=612x612&w=0&h=yaMgJpncw6ngPbwm9Z25bMBK3PZ42lVO5z7dZUojiew=",
      src: "./Profile.png",
      name: "Strassencobra",
      price: '$300',
      status: 'active'

    },
    {
      img: "https://media.istockphoto.com/photos/graphic-designer-drawing-on-graphics-tablet-at-workplace-picture-id865230556?k=20&m=865230556&s=612x612&w=0&h=yaMgJpncw6ngPbwm9Z25bMBK3PZ42lVO5z7dZUojiew=",
      src: "./Profile.png",
      name: "Strassencobra",
      price: '$100',
      status: 'completed'

    },
    {
      img: "https://media.istockphoto.com/photos/graphic-designer-drawing-on-graphics-tablet-at-workplace-picture-id865230556?k=20&m=865230556&s=612x612&w=0&h=yaMgJpncw6ngPbwm9Z25bMBK3PZ42lVO5z7dZUojiew=",
      src: "./Profile.png",
      name: "Strassencobra",
      price: '$10',
      status: 'cancelled'

    },
    {
      img: "https://media.istockphoto.com/photos/graphic-designer-drawing-on-graphics-tablet-at-workplace-picture-id865230556?k=20&m=865230556&s=612x612&w=0&h=yaMgJpncw6ngPbwm9Z25bMBK3PZ42lVO5z7dZUojiew=",
      src: "./Profile.png",
      name: "Strassencobra",
      price: '$500',
      status: 'completed'

    },
  ]

  const dispatch = useDispatch();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const [tabs, setTabs] = useState('active')
  const [orders, setorders] = useState(dummyData.filter(item => item.status == 'active'))
  const handleTabs = (status) => {
    setTabs(status);
    setorders(dummyData.filter(item => item.status == status))
  }
  useEffect(() => {

    dispatch(changeNavbar('seller'))

  }, [])

  return (
    <>
                <MetaData title="Dashboard" />
      <div className="dashboard">
        <div className='dashboard-inner' >
          <span className="dashboard-title" >Dashboard</span>


          <div className="dashboard-main" >


          <div className='dashboard-main-left-container'>
            <div className='dashboard-main-left'>

              <Avatar src={user.avatar?.url ? user.avatar.url:"./Profile.png"} className='avatar' />
              <span className="name">{user.name}</span>
              <div>
                Reviews ( {user.ratings} )<i className="fa fa-star" aria-hidden="true"> </i>
              </div>


              <div className="completion-container">

                <div className="completion-inner">
                  <span className="completion-title">Order completion</span>
                  <span className="completion-status">100%</span>
                </div>

                <div className="completion-inner">
                  <span className="completion-title">Delivered on time</span>
                  <span className="completion-status">100%</span>
                </div>


                <div className="completion-inner">
                  <span className="completion-title">Total Earnings</span>
                  <span className="completion-status">$300</span>
                </div>
        </div>
              </div>

            </div>
            <div className='dashboard-main-right'>

              <div className='top'>
                <span style={{ borderBottom: tabs === 'active' ? '4px solid teal' : 'none' }}
                  onClick={() => handleTabs('active')}>Active Orders</span>
                <span style={{ borderBottom: tabs === 'completed' ? '4px solid teal' : 'none' }}
                  onClick={() => handleTabs('completed')}>Completed </span>
                <span style={{ borderBottom: tabs === 'cancelled' ? '4px solid teal' : 'none' }}
                  onClick={() => handleTabs('cancelled')}>Cancelled</span>
              </div>


              {
                orders &&
                orders.map((item, index) => (
                  <div key={index}className='order-list'>

                    <div className='order-list-left'>
                      <img src={item.img} alt="" />
                      <Avatar src={item.src} className="avatar" />
                      <span>{item.name}</span>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <p style={{ color: 'teal', fontFamily: 'GothamMedium', fontSize: '1.4vmax' }}>Price</p>
                      <p>{item.price}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ color: 'teal', fontFamily: 'GothamMedium', fontSize: '1.4vmax' }}>Status</p>
                      <p>{item.status}</p>
                    </div>

                    <span style={{ color: 'teal', fontFamily: 'GothamMedium', cursor: 'pointer' }}>View</span>
                  </div>
                ))
              }


            </div>


          </div>



        </div>


      </div>
    </>
  )
}

export default Dashboard