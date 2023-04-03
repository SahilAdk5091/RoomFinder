import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const [uname, setUName] = useState('');
  const [lname, setLname] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const history = useNavigate();
  const [name, setName] = useState("");
  const [location,setLocation] = useState("");
  const [price,setPrice] = useState("");
  const [service,setService] = useState("");
  const [email,setEmail] = useState("");
  const [contact,setContact] = useState("");
  const [userid, setUserid] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    refreshToken();
  },[]);
  const refreshToken = async() => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.fname);
      setLname(decoded.lname);
      setEmail(decoded.email);
      setContact(decoded.contact);
      setUserid(decoded.userId);
      setRole(decoded.role);
      setExpire(decoded.exp);
    } catch (error) {
        if(error.response){
          history("/");
        }
    }
  }

  const axiosJWT = axios.create();


  axiosJWT.interceptors.request.use(async(config) =>{
    const currentDate = new Date();
    if(expire * 1000 < currentDate.getTime()){
      const response = await axios.get('http://localhost:5000/token');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setUName(decoded.fname);
      setLname(decoded.lname);
      setRole(decoded.role);
      setExpire(decoded.exp);
    }
    return config;
  }, (error) =>{
    return Promise.reject(error);
  });

  const getUsers = async() => {
    const response = await axiosJWT.get('http://localhost:5000/users',{
        headers:{
          Authorization: `Bearer ${token}`
        }
    });
    console.log(response.data);
  }

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveRoom = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("service", service);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("userid", userid);
    try {
      await axios.post("http://localhost:5000/rooms", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
      <label>{uname}</label>
        <form onSubmit={saveRoom}>
          <div className="field">
            <label className="label">Price</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Room Price"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Service</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={service}
                onChange={(e) => setService(e.target.value)}
                placeholder="Services for that room"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Location</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location For Your Room"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Image</label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    className="file-input"
                    onChange={loadImage}
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {preview ? (
            <figure className="image is-128x128">
              <img src={preview} alt="Preview Image" />
            </figure>
          ) : (
            ""
          )}

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;