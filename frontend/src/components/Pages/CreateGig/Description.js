import React,{ useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from "react-alert";

const Description = ({gigId, click}) => {
  const { gigs, } = useSelector((state) => state.userGigs)
  const [myGig, setMyGig] = useState(gigs.filter(item => item._id == gigId))
  const [description, setDescription] = useState('')
  const alert = useAlert();
  useEffect(()=>{
    if(myGig?.description){
      setDescription(description)
    }
  },[])
  const checkFormAndSubmit = ()=>{
      if(description.length<10){
        alert.error("Description must be greater 10 characters");
        return;
      }
      else if(description.length>1200){
        alert.error("Description must be less than 1200 characters");
        return;
      }

      click(2,{description})
  }
  return (
    <div className="pricing-container">
        <div className="title" >
          Description
        </div>
        
        <div className="description-inner">
            <div className="title">Briefly Describe Your Gig</div>
            <textarea name="description"  rows="10" value={description} placeholder="Write your description here..." 
              onChange={(e)=>setDescription(e.target.value)} />
            <div style={{textAlign:'end',marginBottom:'20px'}}>(1200) words</div>
            <div className="save-button" onClick={checkFormAndSubmit}>
          Save
        </div>
        </div>



    </div>
  )
}

export default Description