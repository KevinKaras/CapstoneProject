import React from 'react';
import {useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import "./CSS/NavBar.css"

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav className="NavContainer">
      <div className="HomeLogo">
        <img src="https://i.gyazo.com/fa9f31bf8ba545bf037f27f78b82905b.png" alt="" className="HomeLogoPhoto"/>
      </div>
      <div className="NavButtonGroupRight">
        <div className="NavButtonDiv">
          <NavLink className="NavButton"to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
        {!user &&
          <>
            <div className="NavButtonDiv">
              <NavLink className="NavButton" to="/login" exact={true} activeClassName="active">
                Login
              </NavLink>
            </div>
            <div className="NavButtonDiv">
              <NavLink className="NavButton" to="/sign-up" exact={true} activeClassName="active">
                Sign Up
              </NavLink>
            </div>
          </>}
          <div className="NavButtonDiv">
            <NavLink className="NavButton" to="/users" exact={true} activeClassName="active">
              Users
            </NavLink>
          </div>
          {user && 
            <div className="NavButtonDiv">
              <NavLink className="NavButton" to="/create" exact={true} activeClassName="active">
                Create Post
              </NavLink>
            </div>
          }
          {user && <div className="NavButtonDivLogOut">
            <LogoutButton />
          </div>}
        </div>
    </nav>
  );
}

export default NavBar;