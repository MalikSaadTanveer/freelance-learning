import {
  LOAD_GIG_REQUEST,
  LOAD_GIG_SUCCESS,
  LOAD_GIG_FAIL,
  CREATE_GIG_REQUEST,
  CREATE_GIG_SUCCESS,
  CREATE_GIG_FAIL,
  UPDATE_GIG_REQUEST,
  UPDATE_GIG_SUCCESS,
  UPDATE_GIG_FAIL,

  CLEAR_ERRORS
} from '../constants/gigConstants'

import axios from "axios";


export const loadGig = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_GIG_REQUEST });

    const { data } = await axios.get(`/api/v1/gigs/me`);

    dispatch({ type: LOAD_GIG_SUCCESS, payload: data.gig });
  } catch (error) {
    dispatch({ type: LOAD_GIG_FAIL, payload: error.response.data.message });
  }
}

//Create GIG
export const createGig = (gigData) => async (dispatch) => {

  try {
    dispatch({ type: CREATE_GIG_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/v1/gigs/new`, gigData, config);

    dispatch({ type: CREATE_GIG_SUCCESS, payload: data.success, id: data.gigId });
  }
  catch (error) {
    dispatch({ type: CREATE_GIG_FAIL, payload: error.response.data.message });
  }
}

//Update Gig

export const updateGig = (gigData,id,p) => async (dispatch) => {
    try{
      dispatch({ type: UPDATE_GIG_REQUEST });
      let headerValue = "application/json"
      if(p==3)
          headerValue = "multipart/form-data"

      const config = { headers: { "Content-Type":headerValue  } };

      const { data } = await axios.put(`/api/v1/gigs/${id}?p=${p}`, gigData, config);
      dispatch({ type: UPDATE_GIG_SUCCESS, payload: data.success, });


    }catch(error){
      dispatch({ type: UPDATE_GIG_FAIL, payload: error.response.data.message });

    }
}




// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};