import { useEffect } from 'react';
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
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(spotActions.getSingleSpot(spotId))
    }, [spotId, dispatch])

    if(!spots) return null;

    if(spots.avgStarRating === null) {
        spots.avgStarRating = '5.0'
    }

    // console.log('spots id', spots.ownerId)
    // console.log('user', user)
    // console.log('userid', user.user.id)

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
                {spots.SpotImages &&
                    <img className='details-image' src = {`${spots.SpotImages.map(image => image.url)}`} alt='property' />
                }

                {spots.SpotImages &&
                    <div className='details-info'>
                        {spots.description}
                        {spots.price}
                        {spots.Owner.firstName}
                        {spots.Owner.lastName}
                    </div>
                }

                {user && +spots.ownerId === user.id &&
                <div className = 'edit-button'>
                    <OpenModalButton
                    buttonText="Edit"
                    modalComponent={<EditSpotModal
                        spots={spots}
                    />}
                  />
                </div>
                }

            </div>


        </div>
    </section>
    );
}

export default SpotDetails;
