import React, { useState  } from "react";
import axios from "axios";

import Loader from "./Loader";


const Giphy = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  const [message , setMessage] = useState("");
  const [fullMessage , setFullmessage] = useState();

  const inputEvent = (event) => {
      setMessage(event.target.value)
    }
    
    const deleteEvent = () =>{
        setMessage("")
    }
    
    const onSubmitt = () => {
        setFullmessage(message)
        deleteEvent()
    }

  const renderGifs = () => {
    if (isLoading) {
      return <Loader />;
    }
    return data.map(el => {
      return (
        <div key={el.id} className="gif">
          <img alt={''} src={el.images.fixed_height.url} />
        </div>
      );
    });
  };
  const renderError = () => {
    if (isError) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Unable to get Gifs, please try again in a few minutes
        </div>
      );
    }
  };

  const searchHandler = event => {
    setSearch(event.target.value);
  };

const deleteSearch = () => {
setSearch("")
} 

  const handleSubmit = async event => {
    event.preventDefault();
    setIsError(false);
    setIsLoading(true);


    try {

      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "tAEFUgagRjRNkU24orQdFB8EHMcNTUSe",
          q: search,
          limit: 9
        }
      });

        setData(results.data.data);
        deleteSearch();
    } catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }

    setIsLoading(false);
    
  };

  

  return (
      
    <div className="m-2">

<div className="card ">
  <div className="card-body" >
   <h3> {fullMessage} </h3>
  </div>
</div>
<div className="input-group my-2">
  <input type="text" className="form-control" value={message} onChange={inputEvent} placeholder="Enter a Message" aria-label="Recipient's username" aria-describedby="button-addon2" />
  <button className="btn btn-outline-primary" onClick={onSubmitt}>Send</button>
</div>

      {renderError()}
      <form className="form-inline justify-content-center m-2">
        <input
          value={search}
          onChange={searchHandler}
          type="text"
          placeholder="search GIF"
          className="form-control"
        />
        <button
          onClick={handleSubmit} type="submit" className="btn btn-info mx-2"
        >
          Go
        </button>
      </form>
      
      <div className="container gifs"> {renderGifs()} </div>
    </div>
  );
};

export default Giphy;