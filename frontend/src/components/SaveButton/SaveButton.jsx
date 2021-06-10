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

export default function SaveButton({ user, photo_id, photo }) {
  const history = useHistory();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function getSavedPhotos() {
      if (!photo.likes.length) {
        return
      } else {
        photo.likes.map((like) =>
          like.user === user.id ? setIsSaved(true) : setIsSaved(false)
        );
      }
    }
    getSavedPhotos();
  });

  const handleSave = async (e) => {
    e.preventDefault();
    const options = {
      url: `http://localhost:8000/likes/${user.id}/create/${photo_id}/`,
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

  return (
    <>
      {isSaved ? (
        <>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={handleSave}
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
        </>
      ) : (
        <>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={handleSave}
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
        </>
      )}
    </>
  );
}
