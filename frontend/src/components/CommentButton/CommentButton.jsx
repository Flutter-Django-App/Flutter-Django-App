import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Card,
  CardGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Form, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function CommentButton({
  user,
  photo_id,
  photo,
  handleNewCommentChange,
  handleKeyUp,
  handleSubmit,
}) {
  const history = useHistory();
  const [isCommented, setIsCommented] = useState(false);
  const [newComment, setNewComment] = useState([]);

  useEffect(() => {
    async function getCommentedPhotos() {
      if (!photo.comments.length) {
        return
      } else {
        photo.comments.map((like) =>
          like.user === user.id ? setIsCommented(true) : setIsCommented(false)
        );
      }
    }
    getCommentedPhotos();
  });

  return (
    <>
      {isCommented ? (
        <>
            <Button
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
            </Button>
        </>
      ) : (
        <>
            <Button
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
            </Button>
        </>
      )}
    </>
  );
}
