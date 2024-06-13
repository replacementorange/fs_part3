import axios from 'axios'
const baseUrl = '/api/persons'

// https://fullstackopen.com/en/part2/altering_data_in_server#extracting-communication-with-the-backend-into-a-separate-module
// https://github.com/axios/axios/blob/v1.x/README.md

// Pulling data from db
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Creating new person
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

// Updating
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

// Deleting from db (axios)
const axiosDelete = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, axiosDelete }
