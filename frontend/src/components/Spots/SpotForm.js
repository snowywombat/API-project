import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import * as spotActions from "../../store/spotReducer";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";


function CreateSpotModal() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [SpotImages, setSpotImages] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(spotActions.createSpot({ address, city, state, country, name, description, price, SpotImages }))
            .then((joined) => {
                  history.push(`/spot/${joined.id}`)
                  closeModal()
                }
            )
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

  return (
    <>
      <h1 className='create-spot-title'>Create Spot</h1>
      <form onSubmit={handleSubmit}>
        <ul>
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
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Upload Image
          <input
            type="text"
            value={SpotImages}
            onChange={(e) => setSpotImages(e.target.value)}
            required
          />
        </label>
        <button type="submit" className='submit-button'>
            Create
        </button>
      </form>
    </>
  );
}

export default CreateSpotModal;
