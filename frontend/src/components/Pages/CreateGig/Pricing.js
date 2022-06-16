import React, { useState, useEffect } from 'react'
import { useAlert } from "react-alert";

import { useDispatch, useSelector } from 'react-redux';


const Pricing = ({ gigId, click }) => {
  const { gigs, } = useSelector((state) => state.userGigs)
  // console.log(gigId);
  const alert = useAlert();
  const [myGig, setMyGig] = useState(gigs.filter(item => item._id == gigId))
  const [price1, setPrice1] = useState({
    name: '',
    amount: 5,
    description: '',
    deliveryDays: '1 day Delivery',
  })
  const [price2, setPrice2] = useState({
    name: '',
    amount: 25,
    description: '',
    deliveryDays: '1 day Delivery',
  })
  const [price3, setPrice3] = useState({
    name: '',
    amount: 50,
    description: '',
    deliveryDays: '1 day Delivery',
  })

  useEffect(() => {
    if (myGig?.price?.length > 0) {
      setPrice1({
        name: myGig.price[0].name,
        amount: myGig.price[0].amount,
        description: myGig.price[0].description,
        deliveryDays: myGig.price[0].deliveryDays,
      })
      setPrice2({
        name: myGig.price[1].name,
        amount: myGig.price[1].amount,
        description: myGig.price[1].description,
        deliveryDays: myGig.price[1].deliveryDays,
      })
      setPrice3({
        name: myGig.price[2].name,
        amount: myGig.price[2].amount,
        description: myGig.price[2].description,
        deliveryDays: myGig.price[2].deliveryDays,
      })
    }
  }, [])

  const handlePrice1 = (e)=>{
    setPrice1(pre=>(
      {
        ...pre,
        [e.target.name]: e.target.value
      }
    ))
  }
  const handlePrice2 = (e)=>{
    setPrice2(pre=>(
      {
        ...pre,
        [e.target.name]: e.target.value
      }
    ))
  }
  const handlePrice3 = (e)=>{
    setPrice3(pre=>(
      {
        ...pre,
        [e.target.name]: e.target.value
      }
    ))
  }

  const checkFormAndSubmit = ()=>{
      const obj = [price1,price2,price3];

      for(let i=0; i<obj.length;i++){
        if(!obj[i].name || !obj[i].description || !obj[i].deliveryDays || !obj[i].amount){
          alert.error('Please fill all the fields...')
          return
        }
        else if(obj[i].amount<5){
          alert.error('Price should be more than $5');
          return
        }
      }

      click(1,{price:obj})
  }

  return (
    <>
      <div className="pricing-container">
        <div className="title" >
          Scope & Pricing
        </div>

        <div className="pricing-inner">
          <div className="pricing-inner-item">
            <div className="pricing-numberOfDays">Number of Days</div>
            <div style={{margin:'10px 10px 10px auto'}}>Price</div>
          </div>
          <div className="pricing-inner-item">
            <div className="title" >BASIC</div>
            <textarea name="name" value={price1.name} rows="3" placeholder="Name your package..." onChange={handlePrice1}/>
            <textarea name="description" value={price1.description} id="" rows="10" placeholder='Describe the details of your offering' onChange={handlePrice1} />
            <select id="category" name='deliveryDays' defaultValue={price1.deliveryDays} onChange={handlePrice1}>
              <option value="1 day Delivery"  >1 day Delivery</option>
              <option value="3 days Delivery"  >3 days Delivery</option>
              <option value="7 days Delivery"  >7 days Delivery</option>
              <option value="10 days Delivery"  >10 days Delivery</option>
              <option value="14 days Delivery"  >14 days Delivery</option>
              <option value="30 days Delivery"  >30 days Delivery</option>
            </select>
            <div className='amount-container'>
              <input type="number" name="amount" min="5" step="5" value={price1.amount} rows="3" onChange={handlePrice1}/>
              <span>$</span>
            </div>
          </div>


          <div className="pricing-inner-item">
            <div className="title">STANDARD</div>
            <textarea name="name" value={price2.name} id="" rows="3" placeholder="Name your package..." onChange={handlePrice2}/>
            <textarea name="description" value={price2.description}  id="" rows="10" placeholder='Describe the details of your offering' onChange={handlePrice2}/>
            <select id="category" name='deliveryDays' defaultValue={price2.deliveryDays} onChange={handlePrice2}>
            <option value="1 day Delivery"  >1 day Delivery</option>
              <option value="3 days Delivery"  >3 days Delivery</option>
              <option value="7 days Delivery"  >7 days Delivery</option>
              <option value="10 days Delivery"  >10 days Delivery</option>
              <option value="14 days Delivery"  >14 days Delivery</option>
              <option value="30 days Delivery"  >30 days Delivery</option>
            </select>
            <div className='amount-container'>
              <input type="number" name="amount" min="5"  step="5" value={price2.amount} rows="3" onChange={handlePrice2}/>
              <span>$</span>
            </div>
          </div>


          <div className="pricing-inner-item">
            <div className="title">PREMIUM</div>
            <textarea name="name" value={price3.name} id="" rows="3" placeholder="Name your package..." onChange={handlePrice3} />
            <textarea name="description" value={price3.description} id="" rows="10" placeholder='Describe the details of your offering' onChange={handlePrice3} />
            <select id="category" name='deliveryDays' defaultValue={price3.deliveryDays} onChange={handlePrice3} >
              <option value="1 day Delivery"  >1 day Delivery</option>
              <option value="3 days Delivery"  >3 days Delivery</option>
              <option value="7 days Delivery"  >7 days Delivery</option>
              <option value="10 days Delivery"  >10 days Delivery</option>
              <option value="14 days Delivery"  >14 days Delivery</option>
              <option value="30 days Delivery"  >30 days Delivery</option>
            </select>
            <div className='amount-container'>
              <input type="number" min="5" step='5' name="amount" value={price3.amount}  onChange={handlePrice3}/>
              <span>$</span>
            </div>
          </div>





        </div>
        <div className="save-button" onClick={checkFormAndSubmit}>
          Save
        </div>
      </div>
    </>
  )
}

export default Pricing