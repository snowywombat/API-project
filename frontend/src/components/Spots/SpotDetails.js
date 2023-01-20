import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from "../../store/spotReducer";
import * as reviewActions from "../../store/reviewReducer"
import OpenModalButton from '../OpenModalButton';
import EditSpotModal from '../Spots/SpotEdit';
import './SpotDetails.css'
import CreateReviewModal from '../Reviews/CreateReview';

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots[spotId]);
    const user = useSelector(state => state.session.user)


    //get reviews
    const reviews = useSelector(state => state.reviews);
    const reviewsArr = Object.values(reviews)


    useEffect(() => {
        dispatch(spotActions.getSingleSpot(spotId))
    }, [spotId, dispatch])

    useEffect(() => {
        dispatch(reviewActions.getReviews(spotId))
    }, [spotId, dispatch])

    const handleDelete = () => {
        reviewsArr.forEach(review => {
            if(review.userId === user.id) {
                dispatch(reviewActions.removeReview(review.id))
            }
        })
      }

    if(!spots) return null;

    if(spots.avgStarRating === null) {
        spots.avgStarRating = '5.0'
    }

    return (
    <>
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


        {reviewsArr.map((review) => (
            <div className = 'review-main'>

                <div className = 'review-body'>
                    {review && review.spotId === +spotId && review.User &&
                    <div className='review-info'>
                    {review.review}
                    {review.stars}
                    {review.User.firstName}
                    </div>
                    }

                    {user && +review.userId === user.id &&
                        <div>
                            <button onClick={handleDelete} type="submit" className='delete-button'>
                            Delete
                            </button>
                        </div>
                    }

                </div>


            </div>
        ))}


        <div className='review-button'>
            <div className = 'create-review-button'>
                <OpenModalButton
                buttonText="Create Review"
                modalComponent={<CreateReviewModal
                    reviews={reviews}
                    spots={spots}
                    />}
                    />
            </div>
        </div>

    </>
);
}

export default SpotDetails;
