import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SpotDetails from '../Spots/SpotDetails';
import OpenCreateModalButton from '../CreateModal';
import CreateSpotModal from '../Spots/SpotForm';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <section className='header'>
      <nav className='nav-bar'>

        <div className='inner-nav-bar'>
          <div className='home'>
            <NavLink className='home-navlink' exact to="/">
            <i className="fa-solid fa-crown" />
            <h1 className='title'>heirbnb</h1>
            </NavLink>
          </div>

          <div className = 'create-button'>
            <OpenCreateModalButton
                    buttonText="Create Spot"
                    modalComponent={<CreateSpotModal />}
                  />
          </div>
        </div>

          {isLoaded && (
            <div className='profile'>
              <ProfileButton user={sessionUser} />
              <SpotDetails user={sessionUser} />
            </div>
          )}


      </nav>
    </section>
  );
}

export default Navigation;
