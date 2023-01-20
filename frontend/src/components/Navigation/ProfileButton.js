import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import DemoFormModal from "../DemoModal";
import './ProfileButton.css'


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className='profile-button' onClick={openMenu}>
        <div className='bar-icon'>
            <i className="fa-solid fa-bars" style={{fontSize: 10}}/>
        </div>

        <div className='profile-icon'>
          <i className="fa-solid fa-user" />
        </div>

          <ul className={ulClassName} ref={ulRef}>
            {user ? (
              <>
                <div className='logged-in-dropdown-elements'>
                <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                </div>
                <li>
                  <button className='dropdown-logout' onClick={logout}>Log Out</button>
                </li>
              </>
            ) : (
              <>
              <div className='dropdown-buttons'>
                <li className='signup'>
                  <OpenModalButton
                    buttonText="Sign Up"
                    onButtonClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                  />
                </li>
                <li className='login'>
                  <OpenModalButton
                    buttonText="Log In"
                    onButtonClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                  />
                </li>
                <li className='demo'>
                  <OpenModalButton
                    buttonText="Demo"
                    onButtonClick={closeMenu}
                    modalComponent={<DemoFormModal />}
                  />
                </li>
              </div>
              </>
            )}
          </ul>
      </button>
      </>
  );
}

export default ProfileButton;
