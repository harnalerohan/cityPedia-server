import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import { findCity } from "./helper/google"
import Highlighter from "react-highlight-words"

const Results = () => {

  const [details, setDetails] = useState([]);

  const {city} = useParams();

  useEffect(() => {
    findCity(city).then(res => {
      setDetails(res)
    }).catch(err => {
      console.log(err)
    })
  }, [city])

  return (
    <div>
      <div className="container1">
        <div className="card">
          {details.map((value, index) => {
            return(
              <div key={index} className="innerCard">
                <Highlighter
                  searchWords={[city]}
                  textToHighlight={value.city}
                />
                <p>Country Name: {value.country}</p>
                <p>Lattitude: {value.lat}</p>
                <p>Longitude: {value.lng}</p>
                <p>Population: {value.population}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Results
