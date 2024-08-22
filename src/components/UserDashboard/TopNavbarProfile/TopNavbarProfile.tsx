import "./TopNavbarProfile.css";
import logo from "/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import avatar1 from "/images/avatars/avatar-male-1.svg";
import avatar2 from "/images/avatars/avatar-male-2.svg";
import avatar3 from "/images/avatars/avatar-male-3.svg";
import avatar4 from "/images/avatars/avatar-girl-1.svg";
import avatar5 from "/images/avatars/avatar-girl-2.svg";
import avatar6 from "/images/avatars/avatar-girl-3.svg";
interface TopNavbarProps {
  onLogoutClick: () => void;
  profileIcon: any;
  onProfileClick: (tab: string) => void;
}

function TopNavbarProfile({
  onLogoutClick,
  profileIcon,
  onProfileClick,
}: TopNavbarProps) {
  const profileImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
  const imageSrc =
    profileIcon >= 1 && profileIcon <= 6
      ? profileImages[profileIcon - 1]
      : avatar1; // Fallback to profile1 if the number is out of bounds

  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [toggleScrollTop, setToggleScrollTop] = useState(false);
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [toggleScrollTop]);
  return (
    <>
      <nav className="topNavbar">
        <div
          className="title"
          onClick={() => {
            setToggleScrollTop(!toggleScrollTop);
            navigate("/personal-expense-tracker-demo/UserDashboard");
          }}
        >
          <img src={logo} alt="" />
          <span className="poppins-bold ">Personal Expense Tracker</span>
        </div>

        <div className="navbar-right">
          <img
            onClick={toggleDropdown}
            className="avatarLogo desktop-button"
            src={imageSrc}
            alt=""
          />

          <img
            onClick={toggleDropdown}
            className="avatarLogo mobile-menu-button"
            src={imageSrc}
            alt=""
          />
        </div>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <a
              className="dropdown-link extra-option"
              onClick={() => {
                onProfileClick("Dashboard");
                toggleDropdown();
              }}
            >
              Dashboard
            </a>
            <a
              className="dropdown-link extra-option"
              onClick={() => {
                onProfileClick("History");
                toggleDropdown();
              }}
            >
              Transaction History
            </a>
            <a
              className="dropdown-link"
              onClick={() => {
                onProfileClick("Settings");
                toggleDropdown();
              }}
            >
              Profile
            </a>
            <a
              className="dropdown-link"
              onClick={() => {
                onProfileClick("About");
                toggleDropdown();
              }}
            >
              About
            </a>
            <a className="dropdown-link" onClick={onLogoutClick}>
              Logout
            </a>
          </div>
        )}
      </nav>
    </>
  );
}

export default TopNavbarProfile;
