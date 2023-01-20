import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from "../../store/spotReducer";
import * as reviewActions from "../../store/reviewReducer"
import OpenCreateModalButton from '../CreateModal';
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
        console.log('spot detail use effect for get reviews running')
        dispatch(reviewActions.getReviews(spotId))
    }, [spotId, dispatch])

    useEffect(() => {
        console.log('spot detail use effect for get single spot running')
        dispatch(spotActions.getSingleSpot(spotId))
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
                    <div className='details-header-title'>
                    {spots.name}
                    </div>
                    <div className='details-header-info'>
                        <div className='details-header-info-rating'>
                            <i class='fa-solid fa-star'/>
                            {Number(spots.avgStarRating).toFixed(1)}
                        </div>
                        <div className='breaker'> . </div>
                        <div className='details-header-info-reviews'>
                            {Number(spots.numReviews)} reviews
                        </div>
                        <div className='breaker'> . </div>
                        <div className='details-header-info-location'>
                            {spots.city}, {spots.state}, {spots.country}
                        </div>
                    </div>
                </div>
                <div className='details-body'>
                    {spots.SpotImages &&
                        <img className='details-image' src = {`${spots.SpotImages.map(image => image.url)}`} alt='property' />
                    }


                    <div className='details-text'>
                        {user && +spots.ownerId === user.id &&
                        <div className = 'edit-button'>
                            <OpenCreateModalButton
                            buttonText="Edit"
                            modalComponent={<EditSpotModal
                                spots={spots}
                            />}
                        />
                        </div>
                        }
                        {spots.SpotImages &&
                            <div className='details-info'>
                                <div className='details-name'>
                                    <div>
                                        Hosted by
                                    </div>
                                    <div className='details-owner-first-name'>
                                        {spots.Owner.firstName}
                                    </div>
                                    <div className='details-last-name'>
                                        {spots.Owner.lastName}
                                    </div>
                                </div>
                                <div className='details-description'>
                                    <div className='details-description-header'>
                                        the space:
                                    </div>
                                    <div className='details-description-body'>
                                        {spots.description}
                                    </div>
                                </div>
                                <div className='details-price'>
                                    <div className='details-price-number'>
                                    ${spots.price}
                                    </div>
                                    <div>
                                    /night
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                </div>

            </div>
        </section>


        <h1 className='review-header'>Reviews</h1>
        <div className = 'review-main'>
            {reviewsArr.map((review) => (
                <div className = 'review-body'>
                    { review && review.spotId === +spotId && review.User &&
                    <div className='single-review'>
                        <div className='review-info'>
                            <div className='review-info-review'>
                                {review.review}
                            </div>
                            <div className='review-info-name'>
                                -{review.User.firstName}
                            </div>
                        {user && +review.userId === user.id &&
                            <div className='delete-review-button-div'>
                                <button onClick={handleDelete} type="submit" className='delete-review-button'>
                                Delete
                                </button>
                            </div>
                        }
                        </div>
                    </div>
                    }


                </div>

            ))}

        </div>

        <div className='review-button'>
            <div className = 'create-review-button'>
                <OpenCreateModalButton
                buttonText="Add Review"
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
