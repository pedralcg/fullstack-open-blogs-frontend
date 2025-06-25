// .eslintrc.cjs

module.exports = {
  // Indica que esta es la configuración raíz de ESLint y que no debe buscar en directorios superiores.
  root: true,

  // Define los entornos globales disponibles para el código.
  // 'browser': Habilita variables globales de navegador (window, document, alert, etc.).
  // 'es2020': Habilita características de ECMAScript 2020 (ej. sintaxis moderna, globals como Promise).
  // 'jest': (Si estuvieras haciendo tests con Jest) Habilita variables globales de Jest (test, expect, describe, beforeEach, etc.).
  env: {
    browser: true,
    es2020: true,
    // jest: true, // Descomentar si usas Jest para tests de frontend
  },

  // Extiende configuraciones preestablecidas de ESLint y plugins.
  extends: [
    'eslint:recommended',                // Reglas recomendadas básicas de ESLint
    'plugin:react/recommended',          // Reglas recomendadas para React
    'plugin:react/jsx-runtime',          // Reglas para el nuevo JSX transform (React 17+), no requiere `import React`
    'plugin:react-hooks/recommended',    // Reglas recomendadas para React Hooks
  ],

  // Especifica archivos o directorios a ignorar durante el linting.
  // Esto complementa o reemplaza a un archivo .eslintignore separado.
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.js'],

  // Opciones del parser de JavaScript.
  parserOptions: {
    ecmaVersion: 'latest', // Permite el uso de la última sintaxis de ECMAScript
    sourceType: 'module',  // Permite el uso de import/export
    ecmaFeatures: {
      jsx: true,           // Habilita el parseo de JSX
    },
  },

  // Configuración específica para plugins.
  // En este caso, para el plugin 'react', le decimos qué versión de React estamos usando.
  settings: {
    react: {
      version: 'detect', // ESLint detectará automáticamente la versión de React
    },
  },

  // Registra plugins adicionales de ESLint que contienen reglas personalizadas.
  // 'react-refresh': Necesario para el Fast Refresh de Vite.
  plugins: ['react-refresh'],

  // Define las reglas específicas de linting para tu proyecto.
  // Puedes sobrescribir reglas de 'extends' o añadir nuevas.
  rules: {
    // Reglas de estilo (ej. de @stylistic/eslint-plugin-js si lo tuvieras, o reglas core)
    "indent": [
        "error",
        2  // Fuerza una sangría de 2 espacios
    ],
    "linebreak-style": [
        "error",
        "unix" // ¡CAMBIADO a "unix" para que ESLint espere LF y permita la corrección automática!
    ],
    "quotes": [
        "error",
        "single" // Fuerza el uso de comillas simples
    ],
    "semi": [
        "error",
        "never" // No requiere punto y coma al final de las declaraciones
    ],
    "eqeqeq": "error",          // Fuerza el uso de '===' y '!=='
    "no-trailing-spaces": "error", // No permite espacios al final de las líneas
    "object-curly-spacing": [
        "error", "always"   // Requiere un espacio dentro de las llaves de los objetos { }
    ],
    "arrow-spacing": [
        "error", { "before": true, "after": true } // Requiere espacio antes y después de la flecha en funciones flecha
    ],

    // Reglas específicas de React
    "react/react-in-jsx-scope": "off", // Esta regla ya no es necesaria con React 17+ y el nuevo JSX transform.

    // "react/prop-types": "off": Desactiva la advertencia si no estás usando PropTypes o si usas TypeScript.
    "react/prop-types": "off",

    "no-unused-vars": "off", // Permite variables declaradas pero no usadas.

    "no-console": "off", // Permite el uso de console.log, console.error, etc.
  },
};
