import React, { useEffect, useState } from 'react'
import './Settings.css';
import { useDispatch, useSelector } from "react-redux";
import Loader from '../../layout/Loader/Loader'
import { useAlert } from "react-alert";
import { clearErrors, updatePassword, loadUser } from "../../../redux/actions/userAction";
import { UPDATE_PASSWORD_RESET } from '../../../redux/constants/userConstants'

const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [allData, setAllData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleAllData = (e) => {
    setAllData(pre => (
      { ...pre, [e.target.name]: [e.target.value] }
    ))
  }



  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", allData.oldPassword);
    myForm.set("newPassword", allData.newPassword);
    myForm.set("confirmPassword", allData.confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully");
      setAllData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      history.push("/settings");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);

  return (
    <>
      {
        loading ?
          <Loader /> :
          <form className="updateAccount-container"
            onSubmit={updatePasswordSubmit}>
            <div className="updateAccount-inner">
              <div className="updateAccount-left">
                <div className="left-inner">
                  <span>Old Password</span>
                  <input type="password"
                    name="oldPassword"
                    value={allData.oldPassword}
                    required
                    onChange={handleAllData}
                  />
                </div>
                <div className="left-inner">
                  <span>New Password</span>
                  <input type="password"
                    name="newPassword"
                    value={allData.newPassword}
                    required
                    onChange={handleAllData}
                  />
                </div>
                <div className="left-inner">
                  <span>Confirm Password</span>
                  <input type="password"
                    name="confirmPassword"
                    value={allData.confirmPassword}
                    required
                    onChange={handleAllData}
                  />
                </div>

              </div>




            </div>
            <input type="submit" className="save-button" />

          </form>
      }
    </>
  )
}

export default UpdatePassword