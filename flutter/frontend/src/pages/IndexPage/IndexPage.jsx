import React, { useState, useEffect } from "react";
import axios from "axios";
import "./IndexPage.css";
import { Row, Card, CardGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import { Form, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function IndexPage({ user }) {
  const [allUsers, setAllUsers] = useState([]);
  // const [comments, setComments] = useState([]);
  // const [likedPhotoId, setLikedPhotoId] = useState([]);
  // const [likes, setLikes] = useState([]);
  // const [formData, setFormData] = useState({comment: ""});
  const [photos, setPhotos] = useState([]);
  const [newComment, setNewComment] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    console.log(e.target.value);
    setShow(true);
  };
  const [showLikes, setShowLikes] = useState(false);
  const handleCloseLikes = () => setShowLikes(false);
  const handleShowLikes = (e) => {
    console.log(e.target.value);
    setShowLikes(true);
  };
  const history = useHistory();

  // useEffect(() => {
  // 	history.push("/photos/");
  // }, [photos, history]);

  // useEffect(() => {
  //   async function fetchPhotos() {
  //     const options = {
  //       url: `/api/photos/`,
  //       method: "GET",
  //       headers: {
  //         Authorization: `JWT ${localStorage.getItem("token")}`,
  //       },
  //     }
  //     const response = await axios(options);
  //     setPhotos(response.data);
  //     history.push("/photos/");
  //   }
  //   fetchPhotos();
  // }, []);

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      if (newComment !== "") {
        handleSubmit(newComment);
        setNewComment("");
      }
    }
  };

  const handleSubmit = async (e) => {
    const photo_id = e.target.value;
    console.log(photo_id);
    e.preventDefault();
    const options = {
      url: `/api/comments/${user.id}/create/${photo_id}/`,
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      data: {
        photo: photo_id,
        user: user.id,
        comment: newComment,
      },
    };
    try {
      const comment = await axios(options).then((response) => {
        console.log("Response for submission=>", response);
      });
    } catch {
      console.log("bleh");
    }
    history.push("/");
  };

  const handleDeleteComment = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const options = {
      url: `/api/comments/${e.target.value}/delete_comment/`, // maybe wrong
      method: "DELETE",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      data: {
        photo: e.target.value,
      },
    };
    try {
      const photos = await axios(options).then((response) => {
        console.log("Response for submission=>", response);
      });
    } catch {
      console.log("bleh");
    }
    history.push("/");
  };
  // console.log(user)
  console.log(photos);

  useEffect(() => {
    async function fetchAllUsers() {
      const options = {
        url: `/api/allusers/`,
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      };
      try {
        const allUsers = await axios(options).then((response) => {
          console.log("Response for submission=>", response);
          setAllUsers(response.data);
        });
      } catch {
        console.log("bleh");
      }
      // history.push("/");
    }
    fetchAllUsers();
  }, []);

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
      history.push("/photos/");
    }
    fetchPhotos();
  }, []);

  const handleLike = async (e) => {
    console.log(e.target.value);
    console.log(user);
    const photo_id = e.target.value;
    e.preventDefault();
    const options = {
      url: `/api/likes/${user.id}/create/${photo_id}/`,
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      data: {
        photo: photo_id,
        user: user.id,
      },
    };
    try {
      const like = await axios(options).then((response) => {
        console.log("Response for submission=>", response);
      });
    } catch {
      console.log("bleh");
    }
    history.push("/");
  };
  // console.log(photos);
  // console.log(user);
  // console.log(comments);
  // console.log(likes);
  // console.log(formData);
  // console.log(photos)
  // console.log(allUsers.find(element => element=1).username)

  return (
    <section className="index-pg ind-pg">
      <div className="ind-div">
        <Row>
          {photos.map((photo) => (
            <CardGroup>
              <Card className="my-3 p-3 rounded">
                <Card.Body as="div">
                  <Card.Title as="div">
                    <strong>{photo.user.username}</strong>
                  </Card.Title>
                  <Card.Text as="div">
                    <div className="my-3">{photo.location}</div>
                    <img src={photo.url} />
                  </Card.Text>

                  <Form onSubmit={handleLike}>
                    {photo.likes.map((like) => (
                      <>
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          onClick={handleLike}
                          value={like.photo}
                        >
                          <a class="wpO6b  " type="submit">
                            <>
                              <svg
                                aria-label="Like"
                                class="_8-yf5 "
                                fill="#262626"
                                height="24"
                                viewBox="0 0 48 48"
                                width="24"
                              >
                                <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                              </svg>
                            </>
                          </a>
                        </Button>

                        {/* <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          onClick={handleLike}
                          value={like.photo}
                        >
                          <a class="wpO6b  " type="submit">
                            <>
                              <svg
                                aria-label="Unlike"
                                class="_8-yf5 "
                                fill="#ed4956"
                                height="24"
                                viewBox="0 0 48 48"
                                width="24"
                              >
                                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                              </svg>
                            </>
                          </a>
                        </Button> */}
                      </>
                    ))}

                    {/* <Button
                      variant="contained"
                      disabled={!newComment}
                      type="submit"
                      color="primary"
                      onClick={handleSubmit}
                      value={photo.id}
                      name={photo.id}
                    >
                      <a class="wpO6b  " type="submit">
                        <svg
                          aria-label="Comment"
                          class="_8-yf5 "
                          fill="#262626"
                          height="24"
                          viewBox="0 0 48 48"
                          width="24"
                        >
                          <path
                            clipRule="evenodd"
                            d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </a>
                    </Button> */}
                    <Button
                      disabled={!newComment}
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      value={photo.id}
                    >
                      <svg
                        aria-label="Comment"
                        class="_8-yf5 "
                        fill="#262626"
                        height="24"
                        viewBox="0 0 48 48"
                        width="24"
                      >
                        <path
                          clipRule="evenodd"
                          d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      onClick={handleLike}
                      value={photo.id}
                    >
                      <a class="wpO6b  " type="submit">
                        <svg
                          aria-label="Save"
                          class="_8-yf5 "
                          fill="#262626"
                          height="24"
                          viewBox="0 0 48 48"
                          width="24"
                        >
                          <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
                        </svg>
                      </a>
                    </Button>

                    {/* <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      onClick={handleLike}
                      value={photo.id}
                    >
                      <a class="wpO6b  " type="submit">
                        <svg
                          aria-label="Remove"
                          class="_8-yf5 "
                          fill="#262626"
                          height="24"
                          viewBox="0 0 48 48"
                          width="24"
                        >
                          <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 28.9 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1z"></path>
                        </svg>
                      </a>
                    </Button> */}
                  </Form>
                  <Card.Text as="div">
                    <div className="my-3">
                      <span>
                        <strong>{photo.user.username}</strong> {photo.caption}
                      </span>
                    </div>
                  </Card.Text>
                  <Card.Text as="div">
                    <div className="my-3" onClick={handleShow} class="myDIV">
                      Likes: {photo.likes.length}
                    </div>
                  </Card.Text>

                  <Modal show={show} onHide={handleClose} >
                    <Modal.Header >
                      <Modal.Title><strong>Likes</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={photo.url} /> 
                      
                        {photo.likes.map((like) => (
                        <span><h2 id='likedusers' className="user-name name name1 name-profile">{
                          allUsers.find(
                            (element) => (element = `${like.user}`)
                          ).username
                        }</h2></span>
                        ))}
                        
                    </Modal.Body>
                    
                  </Modal>
                  <Card.Text as="div">
                    {photo.comments.map((comment) => (
                      <>
                        {comment.photo === photo.id ? (
                          <div className="my-3">
                            <span>
                              <strong>
                                {
                                  allUsers.find(
                                    (element) => (element = `${comment.user}`)
                                  ).username
                                }
                              </strong>
                              {comment.comment}{" "}
                              <CardGroup>
                                <Button
                                  variant="contained"
                                  onClick={handleShowLikes}
                                  value={comment.id}
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
                                {showLikes ? (
                                  <>
                                    <Button
                                      variant="contained"
                                      onClick={handleClose}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      variant="light"
                                      // onClick={handleClose}
                                      onClick={handleDeleteComment}
                                      value={comment.id}
                                    >
                                      Delete
                                    </Button>
                                  </>
                                ) : (
                                  ""
                                )}
                              </CardGroup>
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ))}
                  </Card.Text>
                  <section class="com-sec comment">
                    <div className="comment-sec">
                      <Form className="form-com" onSubmit={handleSubmit}>
                        <Form.Group>
                          {/* <strong>{photo.user}</strong> */}
                          <Form.Control
                            type="text"
                            placeholder="Enter Comment"
                            name="name"
                            onChange={handleNewCommentChange}
                            onKeyUp={handleKeyUp}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Button
                            disabled={!newComment}
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            value={photo.id}
                          >
                            Post
                          </Button>
                        </Form.Group>
                      </Form>
                    </div>
                  </section>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    posted {new Date(photo.created_date).toLocaleDateString()}
                  </small>
                </Card.Footer>
              </Card>
            </CardGroup>
          ))}
        </Row>
      </div>
    </section>
  );
}
