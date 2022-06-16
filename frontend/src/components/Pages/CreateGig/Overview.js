import React, { useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { useAlert } from "react-alert";

const Overview = ({ gigId, click }) => {
  const alert = useAlert();
  const [tags, setTags] = useState([''])
  let arr = [];
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('graphic')
  const [subCategory, setSubCategory] = useState('')



  const handleTags = (e) => {
    arr = [...tags]
    arr[e.target.name] = e.target.value
    setTags([...arr])
    console.log(arr);
  }
  const addTags = (e) => {
    setTags([...tags, ''])
  }
  const removeTags = (i) => {
    setTags([...tags.filter((item, index) => index != i)])
    arr = tags.filter((item, index) => index != i)
  }
  const handleCategory = (e) => {
    if (e.target.value != 'programming')
      setSubCategory('')
    else
      setSubCategory('game')

    setCategory(e.target.value)
  }

  const checkFormAndSubmit = ()=>{
    if(title.trim() == ''){
      alert.error('Please Enter Title')
      return;
    }

    let filter = tags.filter(item => item !='')

    if(filter.length==0){
      alert.error('Please add atleast one tag')
    }
    else{
        const data = {
          title,category,subCategory,searchTags:tags
        }
        click(0,data)
    }

  }

  return (
    <>
      <div className="overview-container">
        <div className="overview-inner">
          <label htmlFor="title">Title</label>
          <textarea type="text" id="title" name="title" value={title}
            rows="2" placeholder="I will..."
            required onChange={(e) => setTitle(e.target.value)}

          />
        </div>

        <div className="overview-mid">
          <div>
            <label htmlFor="category">Category:</label>

            <select id="category" name='category' defaultValue='graphic' onChange={handleCategory}>
              <option value="graphic"  >Graphic Designinig</option>
              <option value="programming"  >Programming</option>
              <option value="music"  >Music & Audio</option>
              <option value="business"  >Business</option>
            </select>
          </div>
          {
            category == 'programming' ? <div>
              <label htmlFor="category">Sub category:</label>

              <select id="category" name='subCategory' defaultValue='game' onChange={(e) => setSubCategory(e.target.value)}>
                <option value="game"  >Game Development</option>
                <option value="mobile" >Mobile Apps</option>
                <option value="websites" >Websites</option>
                <option value="softwares" >Softwares</option>
              </select>
            </div> : <></>
          }
        </div>

        <div className="overview-bottom">
          <div>
            <label htmlFor="title">Tags  </label><span>(maximum 5)</span></div>
          {
            tags.map((item, index) => (
              <span className="tagBox-container" key={index}>
                <input type="text"
                  name={index} value={item} onChange={handleTags} />
                {tags.length > 1 ? <CancelIcon className="icon" onClick={() => removeTags(index)} /> : <></>}
              </span>
            ))
          }
          {
            tags.length < 5 ?
              <span className="add-button" onClick={addTags}>Add</span>
              : <></>
          }

        </div>
        <div className="save-button" onClick={checkFormAndSubmit}>
          Save
        </div>
      </div>
    </>
  )
}

export default Overview