import React, { useState, useEffect } from "react";
import "./PhotoCard.css";
import { Row, Card, CardGroup } from "react-bootstrap";
import { Form, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function PhotoCard({
  photo,
  user,
  handleLike,
  newComment,
  handleSubmit,
  handleDeleteComment,
  handleNewCommentChange,
  handleKeyUp,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    console.log(e.target.value);
    setShow(true);
  };
  return (
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
                </Button>
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
              ƒ
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

            <Button
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
            </Button>
          </Form>
          <Card.Text as="div">
            <div className="my-3">
              <span>
                <strong>{photo.user.username}</strong> {photo.caption}
              </span>
            </div>
          </Card.Text>
          <Card.Text as="div">
            <div className="my-3">Likes: {photo.likes.length}</div>
          </Card.Text>
          <Card.Text as="div">
            {photo.comments.map((comment) => (
              <>
                {comment.photo === photo.id ? (
                  <div className="my-3">
                    <span>
                      <strong>{comment.user}</strong> {comment.comment}{" "}
                      <CardGroup>
                        <Button
                          variant="contained"
                          onClick={handleShow}
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
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header>
                            <Modal.Title>
                              Are you sure you want to delete this photo?{" "}
                              {comment.id}
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Cancel {comment.id}
                            </Button>
                            <Button
                              variant="primary"
                              // onClick={handleClose}
                              onClick={handleDeleteComment}
                              value={comment.id}
                            >
                              Delete {comment.id}
                            </Button>
                          </Modal.Footer>
                        </Modal>
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
  );
}
