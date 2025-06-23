import { useState } from 'react'
import React from 'react'

/**
 * Componente BlogForm: Formulario para crear un nuevo blog.
 * Gestiona su propio estado para los campos de entrada.
 * @param {object} props - Las props del componente.
 * @param {function} props.createBlog - Función callback que se llama al enviar el formulario con los datos del blog.
 */
const BlogForm = ({ createBlog }) => {
  // Estados locales para los campos del formulario
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  // Función para manejar el envío del formulario
  const addBlog = (event) => {
    event.preventDefault() // Evita que la página se recargue

    // Llama a la función 'createBlog' (pasada como prop desde App)
    // con el objeto del nuevo blog
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      // likes: 0 // El backend asigna 0 por defecto si no se envía
    })

    // Limpia los campos del formulario después del envío
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div style={{ marginBottom: '20px' }}> {/* Estilo para un poco de margen */}
      <h2>create new</h2>
      <form onSubmit={addBlog}> {/* Usa la función local addBlog */}
        <div>
          title:
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm