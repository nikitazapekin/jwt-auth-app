import {createContext} from 'react'

function noop() {}

export const AuthContext = createContext({ // получаем настройки аудентификации
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false
})