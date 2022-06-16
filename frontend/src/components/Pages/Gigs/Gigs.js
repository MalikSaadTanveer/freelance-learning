import React from 'react'
import { useParams } from 'react-router-dom'
import './Gigs.css'
import '../Home/Home.css'
import MetaData from "../../layout/MetaData";
import GigsCard from '../Home/GigsCard'

const Gigs = () => {
    const params = useParams();
    const { name } = params;

    const title = name?.replaceAll('-', ' ').toUpperCase()
    return (
        <>
            <MetaData title={title} />


            <div className="gigs">
                <div className='gigs-inner' >
                    <span className="gigs-title" >{name&& title}</span>



                   
                </div>

                 <div className="container" id="container">
                        {
                            [1, 2, 3, 4, 5, 6, 7,8].map((product, index) => (
                                <GigsCard key={index}
                                />
                            ))
                        }

                    </div>
            </div>
        </>
    )
}

export default Gigs