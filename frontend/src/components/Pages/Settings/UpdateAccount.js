import React, { useState, useEffect, useRef } from 'react'
import Avatar from '@mui/material/Avatar';
import './Settings.css';
import { useDispatch, useSelector } from "react-redux";
import Loader from '../../layout/Loader/Loader'
import { useAlert } from "react-alert";
import { clearErrors, updateProfile, loadUser } from "../../../redux/actions/userAction";
import { UPDATE_PROFILE_RESET } from '../../../redux/constants/userConstants'
const UpdateAccount = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const avatarPickImage = useRef(null);
    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [allData, setAllData] = useState({
        name: '',
        email: '',
        languages: '',
        description: '',
    })

    const handleAllData = (e) => {
        setAllData(pre => (
            { ...pre, [e.target.name]: [e.target.value] }
        ))
        console.log(allData.languages);
    }

    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

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


    const updateProfileSubmit = (e) => {
        e.preventDefault();
        
        const myForm = new FormData();

        myForm.set("name", allData.name);
        myForm.set("email", allData.email);
        myForm.set("languages", allData.languages);
        myForm.set("description", allData.description);
        myForm.append("myFile",  avatar); 
        console.log("Hello");
        dispatch(updateProfile(myForm));
    };
    useEffect(() => {
        if (user) {
            setAllData({
                name: user.name,
                email: user.email,
                languages: user.languages ? user.languages : '',
                description: user.description ? user.description : '',
            })
            if (user.avatar?.url)
                setAvatarPreview(user.avatar.url);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());

            history.push("/settings");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error, alert, history, user, isUpdated]);

    return (
        <>
            {
                loading ? (
                    <Loader />
                ) :

                    <div className="updateAccount-container">
                    <div >

                        <div className="updateAccount-inner">
                            <div className="updateAccount-left">
                                <div className="left-inner">
                                    <span>Name</span>
                                    <input type="text"
                                        name="name"
                                        value={allData.name}
                                        required
                                        onChange={handleAllData}
                                    />
                                </div>
                                <div className="left-inner">
                                    <span>Email</span>
                                    <input type="email"
                                        name="email"
                                        value={allData.email}
                                        required
                                        onChange={handleAllData}
                                    />
                                </div>
                                <div className="left-inner">
                                    <span>Language</span>
                                    <input type="text"
                                        name="languages"
                                        value={allData.languages}

                                        onChange={handleAllData}
                                    />
                                </div>

                            </div>
                            <div className="updateAccount-right">
                                <Avatar src={avatarPreview} className="right-avatar" onClick={() => avatarPickImage.current.click()} />
                                <input type="file"
                                    style={{ display: "none" }}
                                    ref={avatarPickImage}
                                    name="avatar"
                                    accept=".jpg, .png, .jpeg, .gif|image/*"
                                    onChange={updateProfileDataChange}
                                />
                            </div>



                        </div>

                        <div className="description-container">
                            <span>Description</span>
                            <textarea rows={10} cols={5}
                                name="description"
                                value={allData.description}
                                onChange={handleAllData}
                            />
                        </div>

                        <div className="save-button" 
                        onClick={updateProfileSubmit}
                        >
                            Save
                        </div>


                        {/* <input type="submit"  className="save-button"/> */}
                    </div>

                    </div>
            }
        </>
    )
}

export default UpdateAccount