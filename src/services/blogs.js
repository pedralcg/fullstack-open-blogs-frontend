import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null // Variable para almacenar el token

/**
 * Establece el token de autenticación para futuras solicitudes.
 * @param {string} newToken - El token JWT.
 */
const setToken = newToken => {
  token = `Bearer ${newToken}` // Guarda el token con el prefijo "Bearer "
}

const getAll = async () => {
  // Para GET ALL, el backend aún no requiere token.
  // Sin embargo, si lo hiciera, lo enviaríamos así:
  // const config = {
  //   headers: { Authorization: token },
  // }
  // const request = await axios.get(baseUrl, config)

  const request = await axios.get(baseUrl)
  return request.data
}

export default { getAll, setToken }