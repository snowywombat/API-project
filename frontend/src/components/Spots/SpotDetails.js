import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from "../../store/spotReducer";
import OpenModalButton from '../OpenModalButton';
import EditSpotModal from '../Spots/SpotEdit';
import './SpotDetails.css'

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots[spotId]);
    console.log('details', spots)

    useEffect(() => {
        dispatch(spotActions.getSingleSpot(spotId))
    }, [spotId, dispatch])

    if(!spots) return null;

    if(spots.avgStarRating === null) {
        spots.avgStarRating = '5.0'
    }

    return (
    <section className='detail-page'>
        <div className='details-main'>
            <div className='details-header'>
                {spots.name}
                <i class='fa-solid fa-star'/>
                {spots.avgStarRating}
                {spots.numReviews}
                {spots.city} {spots.state} {spots.country}
            </div>
            <div className='details-body'>

                <img className='details-image' src = {`${spots.SpotImages.map(image => image.url)}`} alt='property' />

                <div className='details-info'>
                    {spots.description}
                    {spots.price}
                    {spots.Owner.firstName}
                    {spots.Owner.lastName}

                </div>

                <div className = 'edit-button'>
                    <OpenModalButton
                    buttonText="Edit"
                    modalComponent={<EditSpotModal
                        spots={spots}
                    />}
                  />
                </div>


                <button onClick={spotActions.removeSpot(spotId)} type="submit" className='delete-button'>
                Delete
                </button>

            </div>


        </div>
    </section>
    );
}

export default SpotDetails;
