import React, {useState, useEffect} from 'react'
import {fetchData} from "./helper/google"
import {Link} from "react-router-dom"

const Google = () => {

  const [query, setquery] = useState("")
  const [cities, setCities] = useState([])
  const [url, seturl] = useState("")

  const onChange = (e) => {

    setquery(e.target.value)

    fetchData(e.target.value).then(res => {
      setCities(res)
    }).catch(err =>{
      console.log(err)
    })
    
  }

  useEffect(() => {
    getImage()
  }, [])

  const getImage =() => {

    return fetch("https://picsum.photos/1920/1080", {
      method: "GET",
    }).then(res => {
      
      res.arrayBuffer().then((buffer) => {
  
        var base64Flag = 'data:image/jpeg;base64,';
        var imageStr = arrayBufferToBase64(buffer);
  
        var str = base64Flag + imageStr
  
        seturl(str)
  
        function arrayBufferToBase64(buffer) {
          var binary = '';
          var bytes = [].slice.call(new Uint8Array(buffer));
        
          bytes.forEach((b) => binary += String.fromCharCode(b));
        
          return window.btoa(binary);
        };
      }) 
    }).catch(err => {
      console.log(err)
    }) 
  }

  return (
    <div className="container" style={{"padding": "150px 50px", backgroundImage: `url(${url})`}}>
      <div className="wrapper">
        <h1>CityPedia</h1>
        <div className="search-input">
            <input  autoComplete="off" onChange={onChange} value={query} name="query" type="text" placeholder="Type to search.."/>
            <div className="autocom-box">

              {cities && query.length > 0 ? (
                cities.map((cityOne, index) => {
                  return(
                    <li key={index}>
                      <Link to={`/${cityOne.city}`}>{cityOne.city}</Link>
                    </li>
                  )
                })
              ) : (
                !cities && query.length > 0 ? (
                  <li>No cities with this query</li>
                ) : (
                  <li hidden>Hiii</li>
                )
              )}
            </div>
            <div className="icon"><i className="fas fa-search"/></div>
        </div>
      </div>
    </div>
  )
}

export default Google
