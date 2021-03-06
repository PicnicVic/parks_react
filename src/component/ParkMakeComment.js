import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import { useGlobalState } from '../config/store';
import { createNewPark } from '../services/parkPostServices';
import { parseError } from '../config/api';

export default function ParkMakeComment() {
  
  const {store, dispatch} = useGlobalState();
  // const {posts, features} = store;
  const {posts} = store;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const initialState = {
    park_comment: "",
    park_image: "",
    // feature: []
  }
  
  const [postFormState, setPostFormState] = useState(initialState);

  function addNewParkPost(parkPostObject) {
    setLoading(true)
    createNewPark(parkPostObject)
      .then(newParkPost => {
        console.log(newParkPost);
        dispatch({
          type: "setParkPosts",
          data: [...posts, newParkPost]
        })
        setLoading(false)
        navigate("/")
      })
      .catch(error => {
        const message = parseError(error);
        setErrorMessage(message);
      })
  }

  function handleChange(event) {
    event.preventDefault();
    setPostFormState({
      ...postFormState,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    addNewParkPost(postFormState);
  }

  return (
    <>
      <form id="addParkPost" onSubmit={handleSubmit}>
          {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
          <label>Add Park Comment: <br />
            <textarea
              id="park_comment"
              from="addParkPost"
              type="text"
              name="park_comment"
              placeholder="Enter park comment"
              value={postFormState.park_comment}
              onChange={handleChange}
            ></textarea>
          </label>
        <br />
          {/* <label>Select what feature this comment applies to:
            <select name="feature_id" onChange={handleChange}>
              {features
                .map(feature => (
                  <option key={feature.id} value={feature.name}>
                    {feature.name}
                  </option>
                ))}
            </select>
          </label>
        <br /> */}
          <label>Upload images: <br />
            <input 
              id="park_image"
              type="file" 
              from="addParkPost"
              name="park_image" 
              placeholder="Click to upload file"
              value={postFormState.park_image}
              onChange={handleChange}
            />
          </label>
        <br />
          <button disabled={loading} type="submit" className="primary">Add Park Comment</button>
      </form>
    </>
  )
}
