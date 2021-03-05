import {API} from "../../backend"

export const fetchData = (query) => {
  return fetch(`${API}/cities/${query}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  }).then(response => {
    return response.json()
  }).catch(err => {
    console.log(err)
  })
}

export const findCity = (city) => {
  return fetch(`${API}/search/${city}`, {
    method: "GET", 
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then(response => {
    return response.json()
  }).catch(err => {
    console.log(err)
  })
}