import React from 'react';
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

const App: React.FC = () => (
  <div className='container'>
      <LogoGlobalComponent />
      <RouterProvider router={router} />
  </div>
);

export default App;
