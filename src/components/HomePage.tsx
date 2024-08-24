import { useNavigate } from "react-router-dom";
import "../App.css";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  // if (goToUserLogin) {
  //   return <Navigate to="/UserLogin" />;
  // }
  // useEffect(() => {
  //   navigate("/LandingPage")
  // }, []);

  return (
    <>
      <div className="HomepageText">
        <br />
        <p className="poppins-bold">
          Welcome to the demo version of my project! 🎉 <br />
          <br />
        </p>

        <span className="poppins-regular">
          Note that while you're exploring, no actual data is being captured,
          and all real time API calls are disabled on GitHub. Feel free to test
          and play around as much as you like. Just remember, the data will
          reset if you refresh the page. <br />
          <br />
          Enjoy your experience, and get a feel for how the final project will
          work! 🚀
        </span>

        <br />
        <br />
        <div className="button-center">
          <button
            className="button-highlight poppins-medium"
            onClick={() => {
              navigate("/personal-expense-tracker-demo/LandingPage");
            }}
          >
            Click to Proceed
          </button>
        </div>
        {/* <button
          onClick={() => {
            setGoToUserLogin(true);
          }}
        >
          Go to User Login
        </button>
        <button
          onClick={() => {
            navigate("/personal-expense-tracker-demo/AdminLogin");
          }}
        >
          Admin Login
        </button>
        <br />
        <br />
        <button
          onClick={() => {
            navigate("/personal-expense-tracker-demo/DummyData");
          }}
        >
          Dummy Data Display
        </button>
        <button
          onClick={() => {
            navigate("/personal-expense-tracker-demo/DeviceDimentions");
          }}
        >
          Device Dimentions
        </button> */}
        <br />
      </div>
    </>
  );
}

export default HomePage;
