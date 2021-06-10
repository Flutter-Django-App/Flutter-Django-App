import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./AddPhotoPage.css";
import { Form, Button, Modal } from "react-bootstrap";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";

// axios.defaults.xsrfCookieName='csrftoken'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default function AddPhotoPage({ user }) {
  const [showPhoto, setShowPhoto] = useState("Upload a Photo");
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    caption: "",
    location: "",
    url: "",
  });
  const history = useHistory(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    const photo_id = e.target.value
    e.preventDefault();
    let img = "";
    const imageData = new FormData();
    imageData.append("file", image);
    imageData.append("upload_preset", "ggurtht8");
    await axios
      .post(
        "https://api.cloudinary.com/v1_1/edithr2852/image/upload",
        imageData
      )
      .then((res) => {
        console.log(res.data.url);
        img = res.data.url;
      });
    console.log("axios finished", img);
    const options = {
      url: `http://localhost:8000/photos/${user.id}/add_photo/`,
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      data: {
        // photo: photo_id,
        user: user.id,
        caption: formData.caption,
        location: formData.location,
        url: img,
      },
    };
    try {
      const photo = await axios(options).then((response) => {
        console.log("Response for submission=>", response);
      });
    } catch {
      console.log("bleh");
    }
    history.push("/profile");
  };
  const uploadModalRef = useRef();
  const dragOver = (e) => {
    e.preventDefault();
  };
  const dragEnter = (e) => {
    e.preventDefault();
  };
  const dragLeave = (e) => {
    e.preventDefault();
  };
  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    setImage(files[0]);
    console.log(files);
  };
  const closeUploadModal = () => {
    uploadModalRef.current.style.display = "none";
  };

  return (
    <div className="add-photo">
      <h1>Add Photo</h1>
      <div className="container">
        <div
          className="drop-container"
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
        >
          Drag & Drop files here or click to upload below
        </div>
      </div>
      <hr></hr>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Caption:</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter Caption"
            name="caption"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Location:</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter Location"
            name="location"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Upload Image:</FormLabel>
          <FormControl
            type="file"
            name="url"
            onChange={(evt) => {
              console.log(evt.target.files);
              setImage(evt.target.files[0]);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Button type="submit" onChange={handleChange}>
            Add Photo
          </Button>{" "}
          {/* is the onChange needed here? */}
        </FormGroup>
      </Form>
    </div>
  );
}
