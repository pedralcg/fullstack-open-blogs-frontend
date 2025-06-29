// src/components/Blog.test.jsx
import React from 'react'
import '@testing-library/jest-dom' // Para matchers como toBeInTheDocument, not.toBeInTheDocument
import { render, screen } from '@testing-library/react'
import Blog from './Blog' // Importa el componente Blog

// Importaciones explícitas de Vitest: vi, test, expect, describe, beforeEach
import { vi, test, expect, describe, beforeEach } from 'vitest'

describe('<Blog />', () => {
  const sampleBlog = {
    title: 'Testing React components is fun',
    author: 'Test Author',
    url: 'http://www.testurl.com',
    likes: 10,
    user: {
      username: 'testuser',
      name: 'Test User',
      id: '123'
    },
    id: 'abc'
  }

  const mockHandleLike = vi.fn() // Mock para la función de likes
  const mockHandleDelete = vi.fn() // Mock para la función de eliminar
  const sampleUser = { username: 'testuser', name: 'Test User' } // Usuario actual para la prueba

  // Renderizamos el componente antes de cada test para asegurar un estado limpio
  beforeEach(() => {
    render(
      <Blog
        blog={sampleBlog}
        handleLike={mockHandleLike}
        handleDelete={mockHandleDelete}
        currentUser={sampleUser}
      />
    )
  })

  // Test 1: Verificar que el título y el autor se muestran por defecto
  test('renders title and author, but not URL or likes by default', () => {
    // Buscar el título y el autor usando los data-testid
    const titleElement = screen.getByTestId('blog-title')
    const authorElement = screen.getByTestId('blog-author')

    // Afirmar que el título y el autor están en el documento
    expect(titleElement).toBeInTheDocument()
    expect(authorElement).toBeInTheDocument()
    // Asegurarse de que el texto del título y autor sean los correctos
    expect(titleElement).toHaveTextContent(sampleBlog.title)
    expect(authorElement).toHaveTextContent(sampleBlog.author)


    // Buscar la URL y los likes usando queryByTestId
    // queryByTestId devuelve null si el elemento no se encuentra, en lugar de lanzar un error
    const urlElement = screen.queryByTestId('blog-url')
    const likesElement = screen.queryByTestId('blog-likes')
    const detailsSection = screen.queryByTestId('blog-details-section')


    // Afirmar que la URL y los likes NO están en el documento por defecto
    // Esto se logra verificando que el elemento sea null (no encontrado)
    expect(urlElement).toBeNull()
    expect(likesElement).toBeNull()

    // Opcional: Si la sección completa de detalles se oculta, puedes verificar eso.
    // Esto asume que el div con data-testid="blog-details-section" tiene display: none
    // si el componente Togglable se usa para encapsularlo o si tiene esa lógica directamente.
    // Si usas el estilo inline, toHaveStyle funcionará si el elemento existe pero está oculto.
    if (detailsSection) {
      expect(detailsSection).toHaveStyle('display: none')
    }
  })
})
