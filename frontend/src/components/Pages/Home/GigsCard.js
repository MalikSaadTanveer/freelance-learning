import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
const GigsCard = () => {
  const options = {
    value: 4,
    readOnly: true,
    precision: 0.5,
  };
  return (
    // <Link className="productCard" to={`/product/${product._id}`}>
    //   <img src={product.images[0].url} alt={product.name} />
    //   <p>{product.name}</p>
    //   <div>
    //     <Rating {...options} />
    //     <span className="productCardSpan">
    //       ({product.numOfReviews} Reviews)
    //     </span>
    //   </div>
    //   <span>{`₹${product.price}`}</span>
    // </Link>

    <Link className="productCard" to={`/product/${1}`}>
      <img src="https://images.unsplash.com/photo-1619183744799-68f1fd8f1edb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHdvcmslMjBkZXNrfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
        alt="nothing" />
      <div className="product-person">
        <Avatar src='./Profile.png' />
        <p>Strassencobra</p>
      </div>
      <p >I will develop complete software or web applications</p>
      <div>
        <span className="productCardSpan">
          <StarIcon style={{ color: 'orange' }} />
          <span>4.9</span> (123)

        </span>
      </div>
      <div className="line"></div>

      <div className='price-container'>
        
        <FavoriteIcon style={{color:'grey'}}/>
        <span className="price">{`$${500}`}</span>
      </div>
    </Link>
  );
};

export default GigsCard;
