import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import './AddProfilePhotoPage.css'
import { Form, Button, Modal } from "react-bootstrap";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";

// axios.defaults.xsrfCookieName='csrftoken'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default function AddProfilePhotoPage({user}) {
  const [showPhoto, setShowPhoto] = useState('Upload a Photo')
  const [image, setImage] = useState('')
  const [formData, setFormData] = useState({
    url: "",
  });
  const history = useHistory(); // Is this doing anything/will be doing something?

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      
    });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    const profile_photo_id = e.target.value
    // console.log(e.target.value)
    // console.log('clicked')
    // console.log(photo_id)
    // console.log(formData.caption)
    // console.log(formData.location)
    // console.log(formData.url)
    e.preventDefault();
    let proImg = ''
    const imgData = new FormData()
    imgData.append('file', image)
    imgData.append('upload_preset', 'hzvualup')
    await axios.post('https://api.cloudinary.com/v1_1/edithr2852/image/upload', imgData)
    .then((res) => {
      console.log(res.data.url)
      proImg = res.data.url
      // setFormData({
      //   ...formData,
      //   url: res.data.url,
      // });
    })
    console.log('axios finished', proImg)
    const options = {
      url: `/api/profilephoto/${user.id}/add_profilephoto/`,
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      data: {
        user: user.id,
        url: proImg,
      },
    };
    try {
      const profilePhoto = await axios(options).then((response) => {
        console.log('Response for submission=>', response);
      });
    } catch {
      console.log('bleh')
    }
    history.push("/");
  }
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
    <>
    <h1>Hello</h1>
    
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
    <Form.Group>
    <Form.Label>Upload Image:</Form.Label>
    <Form.Control
      type="file"
      name="url"
      onChange={(evt) => {
        console.log(evt.target.files)
        setImage(evt.target.files[0])
      }}
    />
  </Form.Group>
  <Form.Group>
    <Button type="submit" onChange={handleChange}>Add Photo</Button> 
  </Form.Group>
</Form>
</>
  )

    }