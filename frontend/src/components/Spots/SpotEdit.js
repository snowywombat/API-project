import React, { useState } from "react";
import { useHistory} from 'react-router-dom';
import * as spotActions from "../../store/spotReducer";
// import { getSingleSpot } from '../../store/spotReducer';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './SpotEdit.css'


function EditSpotModal({ spots }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [address, setAddress] = useState(spots.address);
    const [city, setCity] = useState(spots.city);
    const [state, setState] = useState(spots.state);
    const [country, setCountry] = useState(spots.country);
    const [name, setName] = useState(spots.name);
    const [description, setDescription] = useState(spots.description);
    const [price, setPrice] = useState(spots.price);
    // const [SpotImages, setSpotImages] = useState(spots.SpotImages.map(image => image.url));
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    if(!spots) return null;

    const handleDelete = () => {
        dispatch(spotActions.removeSpot(spots.id))
        .then(() => {
          history.push('/')
          closeModal()
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(spotActions.updateSpot({ address, city, state, country, name, description, price }, spots.id))
        .then((updatedSpot) => {
            history.push(`/spot/${updatedSpot.id}`)
            closeModal()
        })
        .catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
            );
    };


    return (
        <>
          <h1 className='create-spot-title'>Update Spot</h1>
          <form onSubmit={handleSubmit}>
            <ul className='error-message'>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>
              Address
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <label>
              City
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}

              />
            </label>
            <label>
              State
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}

              />
            </label>
            <label>
              Country
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}

              />
            </label>
            <label>
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}

              />
            </label>
            <label>
              Description
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}

              />
            </label>
            <label>
              Price
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}

              />
            </label>
            {/* <label>
              Upload Image
              <input
                type="text"
                value={SpotImages}
                onChange={(e) => setSpotImages(e.target.value)}

              />
            </label> */}
            <div className='edit-buttons'>
              <button type="submit" className='update-button'>
                  Update
              </button>
              <button onClick={handleDelete} type="submit" className='delete-button'>
                  Delete
              </button>
            </div>
          </form>
        </>
      );
}

export default EditSpotModal;
