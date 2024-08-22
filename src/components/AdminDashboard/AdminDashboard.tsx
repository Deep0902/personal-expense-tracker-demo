import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import "../SignIn/SignIn.css";
import logo from "/images/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { Users } from "../../interfaces/Users";
import Footer from "../Footer/Footer";
import moreIcon from "/images/more-dots.svg";
import moreIconNav from "/images/more.svg";
import avatar1 from "/images/avatars/avatar-male-1.svg";
import avatar2 from "/images/avatars/avatar-male-2.svg";
import avatar3 from "/images/avatars/avatar-male-3.svg";
import avatar4 from "/images/avatars/avatar-girl-1.svg";
import avatar5 from "/images/avatars/avatar-girl-2.svg";
import avatar6 from "/images/avatars/avatar-girl-3.svg";
import PopupWarning from "../PopupWarning/PopupWarning";
import PopupConfirmation from "../PopupConfirmation/PopupConfirmation";
import ScrollTop from "../ScrollTop/ScrollTop";
import { dummyAdmins, dummyUsers } from "../dummyDatas"; // Import dummy data

function AdminDashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [users, setUsers] = useState<Users[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Users[]>([]); // State for filtered users
  const [overlay, setOverlay] = useState(false);
  const [visibleDropdownIndex, setVisibleDropdownIndex] = useState<
    number | null
  >(null);
  const profileImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
  const navigate = useNavigate();
  const location = useLocation();
  const { admin_id, admin_pass } = location.state || {};
  const [currentUser, setCurrentUser] = useState<Users | null>(null);
  const [editedUserName, setEditedUserName] = useState("");
  const [editedUserEmail, setEditedUserEmail] = useState("");

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleOverlay = () => setOverlay(!overlay);

  useEffect(() => {
    if (!sessionStorage.admin_id || !sessionStorage.admin_pass) {
      navigate("/personal-expense-tracker-demo");
      return;
    }

    // Dummy admin validation
    const isValidAdmin = dummyAdmins.some(
      (admin) =>
        admin.admin_id === sessionStorage.admin_id &&
        admin.admin_pass === sessionStorage.admin_pass
    );

    if (!isValidAdmin) {
      navigate("/personal-expense-tracker-demo");
    } else {
      // Fetch users from dummy data
      const sortedUsers = dummyUsers.sort(
        (a: Users, b: Users) => a.user_name.localeCompare(b.user_name) // Sort by user_name in ascending order
      );
      setUsers(sortedUsers);
      setFilteredUsers(sortedUsers); // Initialize filteredUsers with sorted data
    }
    window.history.replaceState(null, "", window.location.pathname);
  }, [admin_id, admin_pass, navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_id");
    sessionStorage.removeItem("admin_pass");
    navigate("/personal-expense-tracker-demo/AdminLogin");
    window.history.pushState(
      null,
      "",
      "/personal-expense-tracker-demo/AdminLogin"
    );
  };

  // Search input change handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter users based on search query
    const filtered = users.filter(
      (user) =>
        user.user_name.toLowerCase().includes(query) ||
        user.user_email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handleMouseEnter = (index: number) => {
    if (window.innerWidth > 768) {
      setVisibleDropdownIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      setVisibleDropdownIndex(null);
    }
  };

  const handleClick = (index: number) => {
    if (window.innerWidth <= 768) {
      setVisibleDropdownIndex(visibleDropdownIndex === index ? null : index);
    }
  };

  const handleDelete = (userId: number) => {
    // Simulate deletion from dummy data
    setUsers(users.filter((user) => user.user_id !== userId));
    setFilteredUsers(filteredUsers.filter((user) => user.user_id !== userId));
    setIsAlertSuccess(true);
    setAlertMessage("User Deleted Successfully!");
    toggleAlertPopup();
  };

  const handleEdit = (user: Users) => {
    setCurrentUser(user);
    setEditedUserName(user.user_name);
    setEditedUserEmail(user.user_email);
    setOverlay(true);
  };

  const handleUpdate = () => {
    if (editedUserName === "" || editedUserEmail === "") {
      setIsAlertSuccess(false);
      setAlertMessage("Username or email cannot be empty");
      toggleAlertPopup();
      return;
    }
    if (!currentUser) return;

    // Simulate update in dummy data
    setUsers(
      users.map((user) =>
        user.user_id === currentUser.user_id
          ? {
              ...user,
              user_name: editedUserName,
              user_email: editedUserEmail,
            }
          : user
      )
    );
    setFilteredUsers(
      filteredUsers.map((user) =>
        user.user_id === currentUser.user_id
          ? {
              ...user,
              user_name: editedUserName,
              user_email: editedUserEmail,
            }
          : user
      )
    );
    setIsAlertSuccess(true);
    setAlertMessage("User Updated Successfully");
    toggleAlertPopup();
    setOverlay(false);
    setCurrentUser(null);
  };

  const handleToggleBlock = (userId: number, isBlocked: boolean) => {
    // Simulate block/unblock in dummy data
    setUsers(
      users.map((user) =>
        user.user_id === userId
          ? {
              ...user,
              is_user_blocked: !isBlocked,
            }
          : user
      )
    );
    setFilteredUsers(
      filteredUsers.map((user) =>
        user.user_id === userId
          ? {
              ...user,
              is_user_blocked: !isBlocked,
            }
          : user
      )
    );

    // Display an alert depending on the new block status
    if (!isBlocked) {
      setIsAlertSuccess(true);
      setAlertMessage("User has been blocked successfully!");
    } else {
      setIsAlertSuccess(true);
      setAlertMessage("User has been unblocked successfully!");
    }
    toggleAlertPopup();
  };

  // Logic for Alert
  const [isAlertSuccess, setIsAlertSuccess] = useState(false);
  const [isPopVisible, setIsPopVisible] = useState(false);
  const toggleAlertPopup = () => {
    setIsPopVisible(!isPopVisible);
  };
  const [alertMessage, setAlertMessage] = useState("");

  // Logic for confirmation Alert
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [confirmationUserId, setConfirmationUserId] = useState<number | null>(
    null
  );
  const handleConfirmShowConfirmationPopup = (userId: number) => {
    setConfirmationUserId(userId);
    setShowConfirmationPopup(true);
  };
  const handleConfirmation = (confirmation: boolean) => {
    if (confirmation) {
      if (confirmationUserId !== null) {
        handleDelete(confirmationUserId);
      }
    }
    setShowConfirmationPopup(false);
    setConfirmationUserId(null);
  };
  const [deletingUserName, setDeletingUserName] = useState("");
  const [toggleUseEffect, setToggleUseEffect] = useState(false);
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [toggleUseEffect]);

  return (
    <>
      <ScrollTop />
      {overlay && (
        <div className="overlayBackground">
          <div className="poppins-bold">
            <div className="overlayBox">
              <label className="">Edit User</label>
              <span className="poppins-reglar description">
                Enter user details
              </span>
              <br />
              <span className="poppins-regular">User Name</span>
              <input
                className="poppins-regular"
                type="text"
                value={editedUserName}
                placeholder="Name"
                onChange={(e) => setEditedUserName(e.target.value)}
              />
              <span className="poppins-regular">Email</span>
              <input
                className="poppins-regular"
                type="email"
                value={editedUserEmail}
                onChange={(e) => setEditedUserEmail(e.target.value)}
                placeholder="Email"
              />
              <button
                className="poppins-semibold add-button"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                type="submit"
                className="poppins-semibold cancel-button"
                onClick={() => {
                  toggleOverlay();
                  setCurrentUser(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {isPopVisible && (
        <PopupWarning
          message={alertMessage}
          onButtonClickded={toggleAlertPopup}
          successAlert={isAlertSuccess}
        />
      )}
      {showConfirmationPopup && (
        <PopupConfirmation
          message={`Are you sure you want to delete the user ${deletingUserName}?`}
          onButtonClicked={handleConfirmation}
        />
      )}

      <div className="customTopNavbar">
        <nav className="topNavbar">
          <div
            className="title"
            onClick={() => {
              setToggleUseEffect(!toggleUseEffect);
            }}
          >
            <img src={logo} alt="" />
            <span className="poppins-bold ">Personal Expense Tracker</span>
          </div>

          <div className="navbar-right">
            <button
              onClick={handleLogout}
              className="poppins-medium desktop-button"
            >
              Log Out
            </button>
            <button className="mobile-menu-button" onClick={toggleDropdown}>
              <img src={moreIconNav} alt="" />
            </button>
          </div>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <a onClick={handleLogout} className="dropdown-link">
                Logout
              </a>
            </div>
          )}
        </nav>
      </div>
      <br />
      <br />
      <div className="mainContentAdminDashboard">
        <div className="headers">
          <h3>Hello, {sessionStorage.admin_id}!</h3>
          <input
            className="poppins-regular"
            type="text"
            placeholder="Search User/Email"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <br />
        <span className="poppins-regular adminDescription">Manage Users</span>
        <br />
        <br />
        {filteredUsers.length === 0 ? (
          <p className="poppins-semibold no-users-message">
            User does not exist! ☹️
          </p>
        ) : (
          filteredUsers.map((user, index) => (
            <div
              key={index}
              className={
                user.is_user_blocked === false ? "userCard" : "userCardBlocked"
              }
            >
              <div className="userImage">
                <img
                  className="profileImage"
                  src={profileImages[user.profile_img - 1]}
                  alt=""
                />
              </div>
              <div className="userDetails2">
                <span className="poppins-bold">{user.user_name}</span>
                <label className="poppins-regular">{user.user_email}</label>
              </div>
              <div
                className="more"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(index)}
              >
                <img src={moreIcon} alt="" />
                {visibleDropdownIndex === index && (
                  <div className="moreDropdown">
                    <p
                      onClick={() => {
                        handleEdit(user);
                        toggleOverlay();
                      }}
                    >
                      Edit
                    </p>
                    <p
                      onClick={() => {
                        setDeletingUserName(user.user_name);
                        handleConfirmShowConfirmationPopup(user.user_id);
                      }}
                    >
                      Delete
                    </p>
                    <p
                      onClick={() =>
                        handleToggleBlock(user.user_id, user.is_user_blocked)
                      }
                    >
                      {user.is_user_blocked ? "Unblock" : "Block"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default AdminDashboard;
