import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Home() {
  const [items, setItems] = useState([]);
  const [inputs, setInputs] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5003")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hi");

    try {
      await axios.post("http://localhost:5003/inventory", { item: inputs })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
          } else if (error.request) {
            // Request was made but no response was received
            console.error('Error request:', error.request);
          } else {
            // Something happened in setting up the request
            console.error('Error message:', error.message);
          }
        });
      console.log("done");
    } catch (error) {
      console.log(error);
    }
    navigate(`/inventory`)
   
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">{items.home}</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/setting">{items.settings}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">{items.help}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/cart">{items.order}</a>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSubmit}>
              <input
                id="searchInput"
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={inputs} // The input value is bound to the state
                onChange={(e) => setInputs(e.target.value)} // Update the input value on change
              />
              <button className="btn btn-outline-success" type="submit">{items.search}</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Home;