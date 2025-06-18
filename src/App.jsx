import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // Nuevos estados para los campos del formulario de creación de blog
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  //! useEffect para Cargar la Sesión desde localStorage al inicio ---
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user) // Restaura el estado del usuario
      blogService.setToken(user.token) // Establece el token en el servicio de blogs
      console.log('Sesión restaurada desde localStorage para:', user.username)
    }
  }, []) // Se ejecuta solo una vez al montar el componente


  //! useEffect para cargar blogs (token en blogService)
  useEffect(() => {
    // Solo carga los blogs si hay un usuario logueado
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      ) 
    }
  }, [user])


  //! Función para Manejar el Inicio de Sesión
  const handleLogin = async (event) => {
    event.preventDefault() // Evita que la página se recargue

    try {
      // Llama al servicio de login con las credenciales
      const loggedInUser = await loginService.login({
        username, password,
      })

      // Guarda el objeto de usuario en localStorage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedInUser)
      )

      // Establece el token en el servicio
      blogService.setToken(loggedInUser.token)

      // Si el login es exitoso, actualiza el estado 'user' y limpia los campos
      setUser(loggedInUser)
      setUsername('')
      setPassword('')
      console.log('Login exitoso:', loggedInUser) // Para depuración
    } catch (exception) {
      // Si hay un error, muestra un mensaje de error
      console.error('Error de login:', exception) // Para depuración
    }
  }


  //! Función para Manejar el Cerrar Sesión
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser') // Elimina del localStorage
    setUser(null) // Limpia el estado del usuario
    blogService.setToken(null) // Limpia el token en el servicio
    console.log('Sesión cerrada.')
  }


//! Función para Manejar la Creación de un Nuevo Blog
  const handleCreateBlog = async (event) => {
    event.preventDefault() // Evita que la página se recargue

    try {
      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        // likes: 0 // El backend asigna 0 por defecto si no se envía
      }

      const returnedBlog = await blogService.create(blogObject) // Envía el nuevo blog al backend

      // Actualiza la lista de blogs en el estado de React
      // Asegúrate de que el blog devuelto tenga el campo 'user' populado para que Blog componente funcione.
      // El backend debería popularlo si lo configuraste así en el POST /api/blogs.
      setBlogs(blogs.concat(returnedBlog))

      // Limpia los campos del formulario
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')

      console.log('Blog creado:', returnedBlog)

    } catch (exception) {
      console.error('Error al crear blog:', exception)
    }
  }


  //! Formulario de inicio de sesión
  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  //! Formulario de creación de blog
  const blogForm = () => (
    <div style={{ marginBottom: '20px' }}> {/* Añade un poco de espacio */}
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title:
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          Url:
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


  //! --- Renderizado condicional ---
  //! Si no hay usuario (user es null), muestra el formulario de login
  if (user === null) {
    return (
      <div>
        {loginForm()}
      </div>
    )
  }


  //! Si el usuario está logueado, muestra el nombre del usuario y la lista de blogs
  return (
    <div>
      <h2>Blogs</h2>
      <p>
        {/* Muestra el nombre del usuario */}
        {user.name} logged in {' '}
        {/* Botón de cerrar sesión */}
        <button onClick={handleLogout}>logout</button> 
      </p> 
      {/* Muestra el formulario de creación de blog */}
      {blogForm()}
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App