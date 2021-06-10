import React, { useState, useEffect } from "react";
import { ButtonGroup} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import axios from "axios";
import "./UserProfilePage.css";
import { Row, Col, Card, CardGroup, Modal, Button, Container } from "react-bootstrap";

export default function UserProfilePage({ user, profilePhoto }) {
  const [photos, setPhotos] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
  };
  const history = useHistory();

  useEffect(() => {
    async function fetchPhotos() {
      const options = {
        url: `/api/photos/`,
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios(options);
      setPhotos(response.data);
    }
    fetchPhotos();
  }, []);

  const handleDeletePhoto = async (e) => {
    e.preventDefault();
    // const id = e.target.value
    const options = {
      url: `/api/photos/${e.target.value}/delete_photo/`, // maybe wrong
      method: "DELETE",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      data: {
        photo: e.target.value,
      },
    };
    try {
      const slot = await axios(options).then((response) => {
        console.log("Response for submission=>", response);
      });
    } catch {
      console.log("bleh");
    }
    history.push("/");
  };

  return (
    <>
      <main className="profile-main pro-main pro-main-2">
        <div className="profile-1 profile-3 prof-1">
          <header className="header-1">
            <CardGroup>
              <Card>
                <div className="profile-img-1">
                  <div className="profile-img-2">
                    <h1> </h1>
                    <img className="pic-prof" src="{profile.url}" alt="" />
                    <span className="span-pic"></span>
                  </div>
                </div>
                <section className="profile-sec">
                  <div className="profile-div-1" >
                    <Container>
                    <Row>
                      <Col>
                    <Card.Body>
                    <Card.Text as="div">
                      {profilePhoto.map((profilephoto) => (
                        <>
                        {profilephoto.user.id===user.id ? (
                          <img className="profilephoto" src={profilephoto.image_url} />
                        ) : ("")}
                        </>
                      ))}
                  </Card.Text>
                  </Card.Body>
                  </Col>
                  <Col>
                  <Card.Body>
                      <Card.Title>
                        <h2 className="user-name name name1 name-profile">
                          {user.username}
                        </h2>
                        <br />
                        <div className="user-name name name1 name-profile">
                          Last Login:{" "}
                          {new Date(user.last_login).toLocaleDateString()}
                        </div>
                        <br />
                      </Card.Title>
                      <div className="btn-1 btn-2 btn-3">
                        <Card.Link>
                          <Link
                            className="btn btn-xs"
                            to={{
                              pathname: "/profile/update",
                              state: { user },
                            }}
                            user={user}
                            key={user.id}
                          >
                            <button>Edit Profile</button>
                          </Link>
                        </Card.Link>
                      </div>
                      <div className="btn-1 btn-2 btn-3">
                        <Card.Link>
                          <Link
                            className="btn btn-xs"
                            to={{
                              pathname: "/profile/photo",
                              state: { user },
                            }}
                            user={user}
                            key={user.id}
                          >
                            <button>Add Profile Photo</button>
                          </Link>
                        </Card.Link>
                      </div>
                    </Card.Body>
                    </Col>
                    </Row>
                  </Container>
                  </div>
                </section>
                <Card.Footer>
                  <small className="text-muted">
                    Joined on {new Date(user.date_joined).toLocaleDateString()}
                  </small>
                </Card.Footer>
              </Card>
            </CardGroup>
          </header>
        </div>
        {photos.map((photo) => (
          <section className="index-pg ind-pg">
            <div className="ind-div">
              <Row>
                {photo.user.id === user.id ? (
                  <div className=" \flex-box">
                    <Card.Body as="div">
                      <Card.Title as="div">
                      <Card.Text as="div">
                    {profilePhoto.map((profilephoto) => (
                      <>
                        {profilephoto.user.id === photo.user.id ? (
                          <img
                            className="profilephoto_feed"
                            src={profilephoto.image_url}
                          />
                        ) : (
                          ""
                        )}
                      </>
                    ))}
                  </Card.Text>
                  <ButtonGroup  className="photobuttons">
                              <Button variant="contained" value={user.id}>
                          <strong>{photo.user.username}</strong>
                          </Button>
                       
                        
                              <Button
                                variant="contained"
                                onClick={handleShow}
                                value={photo.id}
                              >
                                <svg
                                  aria-label="More options"
                                  className="_8-yf5 "
                                  fillRule="#262626"
                                  height="16"
                                  viewBox="0 0 48 48"
                                  width="16"
                                >
                                  <circle
                                    clipRule="evenodd"
                                    cx="8"
                                    cy="24"
                                    fillRule="evenodd"
                                    r="4.5"
                                  ></circle>
                                  <circle
                                    clipRule="evenodd"
                                    cx="24"
                                    cy="24"
                                    fillRule="evenodd"
                                    r="4.5"
                                  ></circle>
                                  <circle
                                    clipRule="evenodd"
                                    cx="40"
                                    cy="24"
                                    fillRule="evenodd"
                                    r="4.5"
                                  ></circle>
                                </svg>
                              </Button>
                              {show ? (
                                <>
                                  <Button
                                    variant="contained"
                                    onClick={handleClose}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="light"
                                    onClick={handleDeletePhoto}
                                    value={photo.id}
                                  >
                                    Delete
                                  </Button>
                                </>
                              ) : (
                                ""
                              )}
                         
                        </ButtonGroup>
                        <div className="my-3">{photo.location}</div>
                      </Card.Title>
                      <Card.Img as="div">
                        <img className="my-3" src={photo.url} />
                      </Card.Img>
                      <Card.Text as="div"></Card.Text>
                      <Card.Text as="div">
                        <div className="my-3">
                          <span>
                            <strong>{photo.user.username}</strong>{" "}
                            {photo.caption}
                          </span>
                        </div>
                      </Card.Text>
                      <Card.Text as="div">
                        <div className="my-3">
                          Likes: {photo.likes.length} | Comments:{" "}
                          {photo.comments.length}
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </div>
                ) : (
                  console.log("bye bye photo")
                )}
              </Row>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
