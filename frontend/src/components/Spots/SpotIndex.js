import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spotReducer';
import { Link } from 'react-router-dom';
import './SpotIndex.css'

const SpotIndex = () => {

  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots);
  const spotsArr = Object.values(spots);


  useEffect(() => {
    console.log('spot index use effect running')
    dispatch(getSpots())
  }, [dispatch])


  return (
    <section className='main-page'>
      <div className='spots-body'>
      {spotsArr.map((spot) => (
        <Link to={`/spot/${spot.id}`} style={{ textDecoration: 'none' }}>
          <div className='spots-card'>

            <div>
              <img className='spots-image' src = {`${spot.previewImage}`} alt='property' />
            </div>

            <div className='spots-bottom-div'>
              <div className='spots-info'>
                <div className='spots-info-location'>
                 {spot.city}, {spot.state}
                </div>
                <div className='spots-info-price'>
                <div className='spots-price'>
                  ${spot.price}
                </div>
                night
                </div>
              </div>

              <div className='spots-info-rating'>
                <i class='fa-solid fa-star'/>
                {Number(spot.avgRating).toFixed(1)}
              </div>
            </div>

        </div>
        </Link>
      ))}
      </div>
    </section>
  );
}

export default SpotIndex;
