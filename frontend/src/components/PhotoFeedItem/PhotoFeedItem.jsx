import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Card } from "react-bootstrap";
import LikeButton from "../components/LikeButton/LikeButton";
import CommentButton from "../components/CommentButton/CommentButton";
import SaveButton from "../components/SaveButton/SaveButton";

export default function PhotoFeedItem({ photo, comments }) {
    
  return (
      <Card className="my-3 p-3 rounded">
        <Card.Body as="div">
          <Card.Title as="div">
            <strong>{photo.user}</strong>
          </Card.Title>
          <Card.Text as="div">
            <div className="my-3">{photo.location}</div>
          </Card.Text>
          <Card.Text as="div">
            <div className="my-3">
              <strong>Img URL: </strong>
              {photo.url}
            </div>
          </Card.Text>
         {/* <Row>
           <LikeButton /><CommentButton /><SaveButton />
         </Row> */}
          <Card.Text as="div">
            <div className="my-3">
              Likes: {photo.total_likes}
            </div>
          </Card.Text>
          <Card.Text as="div">
            <div className="my-3"><span><strong>{photo.user}</strong>   {photo.caption}</span></div>
          </Card.Text>
          <Card.Text as="div">
            <div className="my-3">
              Comments: {comments}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>

      
  );
}
