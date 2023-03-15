import React, { useState, createContext } from 'react';
import { HomePage, Register, Login } from "@modules";
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { LogoGlobalComponent } from './global-components';

const router = createBrowserRouter([
  {
    path: '*',
    element: <HomePage />
  },

  {
    path: '/sign-in',
    element: <Login />
  },

  {
    path: '/sign-up',
    element: <Register />
  }
])

export const GlobalMessage = createContext<any>([]);

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('')

  return (
    <div className='container'>
      <GlobalMessage.Provider value={[message, setMessage]}>
        <LogoGlobalComponent />
        <RouterProvider router={router} />
      </GlobalMessage.Provider>
    </div>
  )
}


export default App;
