import { useNavigate } from "react-router-dom";

function UserLogin() {
  const navigate = useNavigate();

  return (
    <>
      <div>This is user Login</div>
      <button
        onClick={() => {
          navigate("/personal-expense-tracker-demo");
        }}
      >
        Go to homepage
      </button>
      <button
        onClick={() => {
          navigate("/personal-expense-tracker-demo/BasicAPI");
        }}
      >
        Go to BasicAPI
      </button>
    </>
  );
}

export default UserLogin;
