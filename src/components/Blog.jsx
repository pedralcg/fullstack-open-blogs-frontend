import { useState } from 'react' // Importa useState para gestionar el estado de visibilidad
import React from 'react' // Asegúrate de importar React

/**
 * Componente Blog: Muestra un blog individual y permite alternar la visualización de sus detalles.
 * También implementa la funcionalidad de "like".
 * @param {object} props - Las props del componente.
 * @param {object} props.blog - El objeto blog a mostrar (debe contener title, author, url, likes, user).
 * @param {function} props.handleLike - Función callback que se llama para manejar el "like" de un blog.
 */
const Blog = ({ blog, handleLike }) => {
  // Estado para controlar la visibilidad de los detalles del blog.
  const [showDetails, setShowDetails] = useState(false)

  // Estilo en línea para el contenedor de cada blog, tal como se muestra en el material del curso.
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // Función para alternar el estado de visibilidad de los detalles.
  const toggleDetails = () => {
    setShowDetails(!showDetails) // Invierte el valor actual de showDetails
  }

  // Función para manejar el clic en el botón "like".
  // Llama a la función handleLike pasada como prop desde el componente padre (App.jsx).
  const incrementLike = () => {
    // Crea un objeto con los datos actualizados del blog.
    // Es crucial incluir el 'id' del usuario si el backend lo espera para la actualización,
    // y para que el PUT reemplace todo el objeto en el backend como pide el ejercicio.
    // El id del blog.user es lo que el backend típicamente espera en lugar de todo el objeto user.
    const updatedBlog = {
      ...blog, // Copia todas las propiedades existentes del blog
      likes: blog.likes + 1, // Incrementa el contador de likes
      // Si blog.user existe (no es null/undefined) y tiene una propiedad .id (lo cual significa que está populado como objeto),
      // entonces usa blog.user.id.
      // Si blog.user existe pero no tiene .id (es un ID string), entonces usa blog.user tal cual.
      // Si blog.user es null/undefined, entonces envía null.
      user: blog.user ? (blog.user.id || blog.user) : null
    }
    handleLike(updatedBlog) // Llama al callback con el blog actualizado
  }

  return (
    // Contenedor principal del blog con los estilos definidos
    <div style={blogStyle}>
      <div>
        {/* Muestra el título y el autor del blog */}
        {blog.title} {blog.author}
        {' '} {/* Espacio para separar el texto del botón */}
        {/* Botón para alternar la visibilidad de los detalles */}
        <button onClick={toggleDetails}>
          {showDetails ? 'hide' : 'view'} {/* El texto del botón cambia según la visibilidad */}
        </button>
      </div>

      {/* Renderizado condicional de los detalles del blog */}
      {/* Si showDetails es true, muestra la URL, los likes y el nombre del usuario que lo agregó. */}
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} {' '} {/* Muestra el número de likes */}
            <button onClick={incrementLike}>like</button> {/* Botón de "like" */}
          </p>
          {/* Verifica si blog.user existe antes de intentar acceder a blog.user.name */}
          {blog.user && <p>{blog.user.name}</p>}
        </div>
      )}
    </div>
  )
}

export default Blog
