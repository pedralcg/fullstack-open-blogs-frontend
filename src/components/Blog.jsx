import { useState } from 'react' // Importa useState para gestionar el estado de visibilidad
import React from 'react' // Asegúrate de importar React

/**
 * Componente Blog: Muestra un blog individual y permite alternar la visualización de sus detalles.
 * @param {object} props - Las props del componente.
 * @param {object} props.blog - El objeto blog a mostrar (debe contener title, author, url, likes, user).
 */
const Blog = ({ blog }) => {
  // Estado para controlar la visibilidad de los detalles del blog.
  // Inicialmente, los detalles están ocultos (false).
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
            <button>like</button> {/* Botón de "like" (sin funcionalidad por ahora) */}
          </p>
          {/* Verifica si blog.user existe antes de intentar acceder a blog.user.name */}
          {blog.user && <p>{blog.user.name}</p>}
        </div>
      )}
    </div>
  )
}

export default Blog
