import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import GigsCard from "./GigsCard.js";
import MetaData from "../../layout/MetaData";
import { clearErrors, } from "../../../redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../layout/Loader/Loader";
import { useAlert } from "react-alert";
import happyPerson from '../../../images/face5.png'
import { changeNavbar } from '../../../redux/actions/userAction'

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error,  } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
      dispatch(changeNavbar('buyer'))

    }
    // dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="WorkPay" />

          <div className="banner">
            <p>Welcome to WorkPay</p>
            <h1>{"Get Ready for your pending projects".toUpperCase()}</h1>

            <a href="#container">
              <button >
                Scroll 
                <CgMouse style={{marginLeft:'4px',}}/>
              </button>
            </a>
            <img src={happyPerson} alt="face"  className="bannerImage" />
          </div>

          <h2 className="homeHeading">Featured Gigs</h2>

          <div className="container" id="container">
            
              {
                [1,2,3,4,5,6,7].map((product,index) => (
                <GigsCard key={index} 
                />
              ))
              }
              
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
