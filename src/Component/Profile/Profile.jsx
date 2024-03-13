import React, { useContext } from "react";
import { authContext } from "../../Context/Authcontext";
import { Circles } from "react-loader-spinner";

function Profile() {
  const { userData } = useContext(authContext);
  console.log(userData);
  if (!userData) {
    return (
      <div className="d-flex justify-content-center bg-secondary align-items-center vh-100 bg-opacity-50">
        <Circles
          height="100"
          width="100"
          color="#fff"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
  return (
    <>
      <h1>Hello{userData.name}</h1>
    </>
  );
}

export default Profile;
