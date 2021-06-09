import React from "react";

export default function HomePage({ logged_in, user }) {
  return (
    <>
      <h1>Home Page</h1>
      {logged_in ? (
        <div>Hello, {user.username}</div>
      ) : (
        <div>Please Log In or Sign Up</div>
      )}
    </>
  );
}
