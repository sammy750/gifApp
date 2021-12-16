import React, { useState  } from "react";
import axios from "axios";

import Loader from "./Loader";


const Giphy = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [post , setPost] = useState([])
  const [message , setMessage] = useState("");
  // const [fullMessage , setFullmessage] = useState([]);

  const inputEvent = (event) => {
      setMessage(event.target.value)
    }
    
    const deleteEvent = () =>{
        setMessage("")
    }
    
    const onSubmitt = () => {
        setPost(oldmsg => [...oldmsg , message])
        deleteEvent()
    }

 

  const renderGifs = () => {
    if (isLoading) {
      return <Loader />;
    }
    return data.map(el => {
      return (
        <div key={el.id} className="gif">
         <img alt={''} style={{width:"20vw" , marginBottom:"10px"}} src={el.images.fixed_height.url} onClick={() => {

      {alert("Do You want to Post this message?")} postImage(el.id)}
       
         }  /> 
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

  

  const postImage = async (id) => {
    const results = await axios(`https://api.giphy.com/v1/gifs/${id}`, {
        params: {
          api_key: "tAEFUgagRjRNkU24orQdFB8EHMcNTUSe",
          q: search,
          limit: 9
        }
      });

      console.log(results)
      setPost(old => [...old , results.data.data.images.fixed_height.url])

  }

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
console.log(results)
        setData(results.data.data);
        deleteSearch();
    } catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }

    setIsLoading(false);
    
  };

  

  return (
      
    <div className="m-3">

<div >
  
   <>

   <div className="container-fluid">
     <ul>

       {/* {
         fullMessage.map((msg) => {
           return <li className="msg" style={{listStyle: "none" }}> {msg} </li>
         })
       } */}
      <div className="my-2">
       {
         post.map((link) => {

          if(link.substring(0,5) === "https") {
            return  <> 
            
            <li style={{listStyle: "none" }}><img style={{width:"20vw" , marginBottom:"10px"}} src={link} alt="" /> </li>
            
             </>

          }
          return <li className="msg" style={{listStyle: "none" }}> {link} </li>

         })
       }
       </div>
     </ul>
   </div>

   </>


   {/* { <img alt={''} src={post} /> } */}

   
</div>
{renderError()}

<div>

<div className="row">

<div className="col-9 input-group my-2 text_left">
  <input type="text" className="form-control text_input" value={message} onChange={inputEvent} placeholder="Enter a Message" aria-label="Recipient's username" aria-describedby="button-addon2" />
  <button className="btn btn-outline-primary mx-2" onClick={onSubmitt}>Send</button>
</div>

     <div className="col-3">
      <form className="form-inline justify-content m-2">
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
      </div>

      </div>
      </div>
      <div >
        
        
      <div className="container gifs"> {renderGifs()}
     
       </div>
      
      </div>
    </div>
  );
};

export default Giphy;