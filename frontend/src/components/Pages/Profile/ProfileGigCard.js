import React from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
const ProfileGigCard = ({item}) => {
    return (
        <>
            <Link to="preview" className='profileGigCard-container'>
                <div className="inner">
                    <img src={item?.images?.url?item.images.url:
                    "https://assetsv2.fiverrcdn.com/assets/v2_globals/no-image-98a579918ef768aae1f4d7ec166a5471.svg"} alt="image" />
                    <div className="desc">
                        {item?.title}
                        {/* I will edit podcasts, remove noise, clean and master your audio */}
                    </div>
                    <hr />
                    <div className="price">Starting at ${item?.price[0]?.amount}</div>
                </div>
            </Link>
        </>
    )
}

export default ProfileGigCard