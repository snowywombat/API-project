import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleSpot } from '../../store/spotReducer';
import './SpotDetails.css'

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots[spotId]);

    useEffect(() => {
        dispatch(getSingleSpot(spotId))
    }, [spotId, dispatch])


    if(!spots) return null;

    return (
    <section className='detail-page'>
        <div className='details-body'>
            <div className='details-card'>
            <div>
                <img className='details-image' src = {`${spots.SpotImages.map(image => image.url)}`} alt='property' />
            </div>
            <div className='details-info'>

            </div>
            </div>
        <button>Update</button>

        </div>
    </section>
    );
}

export default SpotDetails;
