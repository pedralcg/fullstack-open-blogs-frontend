import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null // Variable para almacenar el token


const setToken = newToken => {
  token = `Bearer ${newToken}` // Guarda el token con el prefijo "Bearer "
}


const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}


const create = async newObject => {
  const config = {
    headers: { Authorization: token }, // Incluye el token en los encabezados de autorización
  }
  // Realiza una petición POST al servidor con el objeto del blog y la configuración de autenticación
  const response = await axios.post(baseUrl, newObject, config)
  return response.data // Devuelve los datos del blog creado por el servidor
}


export default { getAll, setToken, create }