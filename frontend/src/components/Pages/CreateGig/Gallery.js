import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../layout/Loader/Loader';
import { loadGig, updateGig,clearErrors } from '../../../redux/actions/gigAction'
import { UPDATE_GIG_RESET } from '../../../redux/constants/gigConstants';
import { useAlert } from "react-alert";

const Gallery = ({ gigId, click }) => {
  const avatarPickImage = useRef(null);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { gigs, } = useSelector((state) => state.userGigs)
  const {isUpdated,loading,error} = useSelector(state => state.updateGig)
  const [myGig, setMyGig] = useState(gigs.filter(item => item._id == gigId))

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState("");

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    if(e.target.files[0]){
        setAvatar(e.target.files[0]);
    }
    

    reader.onload = () => {
        if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            // setAvatar(reader.result);
        }
    };

    reader.readAsDataURL(e.target.files[0]);
};


  useEffect(() => {
    if (myGig?.images?.url) {
      setAvatarPreview(myGig.images.url)
    }
    else {
      setAvatarPreview("https://assetsv2.fiverrcdn.com/assets/v2_globals/no-image-98a579918ef768aae1f4d7ec166a5471.svg")
    }

    if(isUpdated){
      dispatch(loadGig())
      alert.success("Image added successfully...")

      click('',3)
      dispatch({
        type: UPDATE_GIG_RESET
    })
    }
    if(error){
      alert.error(error)
      dispatch(clearErrors());

    }

  }, [dispatch,error, alert,isUpdated])

  const checkFormAndSubmit = ()=> {
    const myForm = new FormData();
    if(avatar!='')
    myForm.append("gigImages",  avatar); 

    dispatch(updateGig(myForm,gigId,3))
  }
  return (
    <>
    {
      loading?
      <Loader/>:
      <div className="pricing-container">
      <div className="title" >
        Gallery
      </div>

      <div className="description-inner">

        <div className="title">Get Noticed by the right buyers with visual examples of your services.</div>
        <div className="title">Image</div>
        <div className="image-container">
          <img className="image" src={avatarPreview} onClick={() => avatarPickImage.current.click()}/>
          <input type="file"
            style={{ display: "none" }}
            ref={avatarPickImage}
            name="avatar"
            accept=".jpg, .png, .jpeg, .gif|image/*"
            onChange={updateProfileDataChange}
          />

          {myGig?.images?.url ? "" : <span className='image-text'>Browse</span>}
        </div>

        <div className="save-button" onClick={checkFormAndSubmit}>
          Save
        </div>
      </div>

    </div>
    }
    </>
   
  )
}

export default Gallery