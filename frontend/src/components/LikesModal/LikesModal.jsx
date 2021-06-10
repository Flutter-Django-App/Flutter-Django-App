import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Col,
  Row,
  Card,
  CardGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Form, Button, Modal, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./LikesModal.css";


export default function LikesModal({
  key,
  //   show,
  //   handleShow,
  //   handleClose,
  photo,
  allUsers,
  profilePhoto,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
  };
  return (
    <>
      <Card.Text as="div">
        <div className="my-3" onClick={handleShow} class="myDIV">
          Likes: {photo.likes.length}
        </div>
      </Card.Text>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <strong>Likes</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={photo.url} />

          {photo.likes.map((like) => (
            <Container>
            
              <Row>
                <div
                  id="likedusers"
                  className="user-name name name1 name-profile"
                >
                 {profilePhoto.map((profilephoto) => (
                        <>
                        {profilephoto.user.id===like.user ? (
                          <img className="likeduserprofilepic" src={profilephoto.image_url} />
                        ) : ("")}
                        </>
                      ))}
                </div>
                <div
                    id="likedusers"
                    className="user-name name name1 name-profile"
                  >
                    {
                      allUsers.find((element) => (element = `${like.user}`))
                        .username
                    }
                  </div>
              </Row>
              <Row>
                <Col>
                  <div
                    id="likedusers"
                    className="user-name name name1 name-profile"
                  >
                    {
                      allUsers.find((element) => (element = `${like.user}`))
                        .first_name
                    }
                  </div>
                </Col>

                <Col>
                  <div
                    id="likedusers"
                    className="user-name name name1 name-profile"
                  >
                    {
                      allUsers.find((element) => (element = `${like.user}`))
                        .last_name
                    }
                  </div>
                </Col>
              </Row>
            </Container>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}
