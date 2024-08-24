import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { updateToken } from "../store/authSlice";

function UpdateProfile() {
  const nameRef = useRef();
  const urlRef = useRef();
  const history = useHistory();
  const idToken = useSelector((state) => state.auth.idToken);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredUrl = urlRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB7MGC9bOluOU6TIdOfP5N4JXykPe1u_QY",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: idToken,
            displayName: enteredName,
            photoUrl: enteredUrl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        let errorMsg = "Update failed";
        if (data && data.error && data.error.message) {
          errorMsg = data.error.message;
        }
        alert(errorMsg);
      } else {
        const data = await response.json();
        dispatch(updateToken({ idToken: data.idToken }));
        alert("Profile updated successfully!");
        history.push("/profile");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const cancelHandler = () => {
    history.push("/profile");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "whitesmoke",
        }}
      >
        <p>Winners never quit, quitters never win</p>
        <p>
          Your profile is 60% completed, a complete profile has a higher chance
          to land a job.
          <Link to="/complete-profile" style={{ color: "yellow" }}>
            Complete now
          </Link>
        </p>
      </div>
      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Button
          variant="danger"
          style={{ marginLeft: "50%" }}
          className="mb-3"
          type="button"
          onClick={cancelHandler}
        >
          Cancel
        </Button>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              color: "whitesmoke",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label style={{ margin: "0" }}>Full Name:</label>
              <input type="text" ref={nameRef} required />
            </div>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "whitesmoke",
              }}
            >
              <label >Profile Photo URL:</label>
              <input type="url" ref={urlRef} required />
            </div>
          </div>
        </div>
      </form>
      <hr />
    </div>
  );
}

export default UpdateProfile;
