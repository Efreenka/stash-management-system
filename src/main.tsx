import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material'
import { CookiesProvider } from 'react-cookie'
import DefaultLayout from './views/layout/DefaultLayout.tsx'
import Home from './views/Home.tsx'
import TableList from './views/TableList.tsx'
import NotFound from './views/NotFound.tsx'

import LoginProvider from './context/LoginProvider.tsx'
import LoginView from './views/LoginView.tsx'
import RegistrationView from './views/RegistrationView'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const theme = createTheme({
  palette: {
    primary: {
      light: '#ad9476',
      main: '#ad9476',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
})
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tabulky",
        element: <TableList />,
      },
      {
        path: "/prihlaseni",
        element: <LoginView />,
      },
      {
        path: "/registrace",
        element: <RegistrationView/>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider>
      <LoginProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </LoginProvider>
    </CookiesProvider>
  </React.StrictMode>
)
