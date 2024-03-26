import React from 'react'
import ReactDOM from 'react-dom/client'
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
import ToDoView from './views/ToDoView.tsx'
import { csCZ } from '@mui/x-date-pickers/locales'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
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
}, csCZ)

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
        path: "/seznam",
        element: <ToDoView />,
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
      <ToastContainer autoClose={5000} />
      <LoginProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </LoginProvider>
    </CookiesProvider>
  </React.StrictMode>
)
