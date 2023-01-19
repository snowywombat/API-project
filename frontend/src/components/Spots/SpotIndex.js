// import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spotReducer';
import './SpotIndex.css'

const SpotIndex = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots);
  const spotsArr = Object.values(spots);


  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch])


  return (
    <section className='main-page'>
      <div className='spots-body'>
      {spotsArr.map((spot) => (
          <div className='spots-card'>
            <div>
              <img className='spots-image' src = {`${spot.previewImage}`} alt='property' />
            </div>
            <div className='spots-info'>
              <div className='spots-info-location'>
                {spot.city}, {spot.state}
              </div>
              <div className='spots-info-rating'>
                <i class='fa-solid fa-star'/>
                {spot.avgRating}
              </div>
              <div className='spots-info-price'>
                ${spot.price} night
              </div>
            </div>
          </div>
      ))}
      </div>
    </section>
  );
}

export default SpotIndex;
