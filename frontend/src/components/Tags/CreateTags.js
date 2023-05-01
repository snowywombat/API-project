import React, { useState } from "react";
import * as tagActions from "../../store/tagReducer";
import * as spotActions from "../../store/spotReducer";
import { useDispatch } from "react-redux";
import './CreateTags.css'


function CreateTagForm({ spots }) {
    const dispatch = useDispatch();

    const [tagName, setTagName] = useState("");
    const [errors, setErrors] = useState([]);

      const handleSubmit = (e) => {
          e.preventDefault();
          setErrors([]);
          dispatch(tagActions.createTag({ tagName }, spots.id))
              .then(() => setTagName(""))
              .then(() => dispatch(spotActions.getSingleSpot(spots.id)))
              .then(() => dispatch(tagActions.getTags(spots.id)))
              .catch(
                  async (res) => {
                      const data = await res.json();
                      if (data && data.errors) setErrors(data.errors);
                  }
              );
      };

    return (
      <>
        <h1 className='create-tag-title'>Create tags for your spot:</h1>
        <form onSubmit={handleSubmit}>
          <ul className='error-message'>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className='tag-box'>
            <label>
              #
            </label>
            <input
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              required
              className='tag-input'
            />
            <button type="submit" className='create-tag-submit-button'>
                Create Tag
            </button>
          </div>

        </form>
      </>
    );
  }

  export default CreateTagForm;
