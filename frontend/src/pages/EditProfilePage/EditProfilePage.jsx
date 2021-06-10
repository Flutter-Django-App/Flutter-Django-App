import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import "./EditProfilePage.css";
import { Form, Button } from "react-bootstrap";

export default function EditProfilePage({ user, setUser }) {
  const location = useLocation();

  const [invalidForm, setValidForm] = useState(true);
  const [formData, setFormData] = useState(location.state.user);

  const formRef = useRef();
  const history = useHistory();

  useEffect(() => {
    formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      url: `/api/profile/${user.id}/update/`,
      method: "PUT",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      data: {
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
      }
    }
    try {
      const updated_profile = await axios(options);
      console.log(updated_profile.data);
      setUser(updated_profile.data)
    } catch (err) {
      console.log('Failed to Update');
    }
    history.push("/profile");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      // [e.target.first_name]: e.target.value,
      // [e.target.first_name]: e.target.value,
    });
  };

  return (
    <>
      <h1>Edit Profile</h1>

      <section className="ind-pg">
        <main>
          <div >
            {/* <ul className="wW1cu">
              <li>
                <a className="h-aRd -HRM- " href="update" tabIndex="0">
                  Edit Profile
                </a>
              </li>
              <li>
                <a
                  className="h-aRd  fuQUr"
                  href="/profile/password/change/"
                  tabIndex="0"
                >
                  Change Password
                </a>
              </li>
            </ul> */}

            <Form ref={formRef} autoComplete="off" onSubmit={handleSubmit}>
              {/* <h1>{user.username}</h1> */}
              <div className="form-group">
                <label>Username </label>
                <input
                  className="form-control"
                  name="username"
                  value={formData.username}
                  required
                />
              </div>
              <div className="form-group">
                <label>First Name </label>
                <input
                  className="form-control"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  className="form-control"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button
                type="submit"
                className="btn btn-xs"
                disabled={invalidForm}
              >
                SAVE Profile
              </Button>
              &nbsp;&nbsp;
              <Link to="/profile">CANCEL</Link>
            </Form>
          </div>
        </main>
      </section>
    </>
  );
}
