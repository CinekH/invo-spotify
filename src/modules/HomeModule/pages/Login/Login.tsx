import React, { useState, useEffect, useContext } from 'react'

import './Login.scss';

import { ReactComponent as FB } from '../../../../assets/icons/fb.svg';
import { ReactComponent as Google } from '../../../../assets/icons/google.svg';
import { ReactComponent as Apple } from '../../../../assets/icons/apple.svg';

import { Link, useNavigate } from 'react-router-dom';

import { auth, } from '@/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { GlobalMessage } from '@/App';

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useContext(GlobalMessage);
  const [error, setError] = useState<string>('');
  const navigator = useNavigate()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigator('/');
    }
  });

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setMessage('');
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    setError('');
    navigator('/');
  })
  .catch((error) => {
    window.scrollTo(0,0);
    if(error.code === 'auth/wrong-password') {
      setError('You typed wrong password.');
    } else if(error.code === 'auth/user-not-found') {
      setError('There is no user with such an email.')
    } else {
      setError('Unexpected error, please try again');
    }
  });
  }
  return (
    <div className='login'>
      {message !== '' ? <p className='text-big login__message'>{message}</p> : null}
      {error !== '' ? <p className='login__main-error'>{error}</p> : null}
      <h2 className='text-big login__title'>Please sign in to Spotify to continue.</h2>
      <button className='text-big login__button login__button--facebook'>
        <div className='login__icon-container'>
          <FB className='login__icon login__icon--facebook' />
        </div>
        <span>Sign up with Facebook</span>
      </button>
      <button className='text-big login__button login__button--apple'>
        <Apple className='login__icon login__icon--apple' />
        <span>Sign up with Apple</span>
      </button>
      <button className='text-big login__button login__button--google'>
        <Google className='login__icon login__icon--google' />
        <span>Sign up with Google</span>
      </button>
      <div className='login__spacer'>
        <span className='text-regular'>or</span>
      </div>
      <form className='login__form' onSubmit={handleSubmit}>
        <label className='text-small login__label' htmlFor="email" >Email address or username</label>
        <input className='text-tiny login__input login__input--text' type="text" id="email" name='email' placeholder='Email address or username' onChange={(e) => setEmail(e.target.value)} />

        <label className='text-small login__label' htmlFor="password" >Password</label>
        <input className='text-tiny login__input login__input--text' type="password" id="password" name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />

        <Link to="#" className='text-small login__recovery'>Do not you remember the password?</Link>

        <div className='login__submit-group'>
          <div className='login__checkbox-container'>
            <label htmlFor="remember-me" className='text-tiny'>Remember me</label>
            <input type="checkbox" name="remember-me" id="remember-me" className='login__checkbox' />
          </div>
          <button type="submit" className='text-big login__submit' disabled={password === '' || email === ''}>Sign in</button>
        </div>
      </form>
      <p className='text-large login__account'>You dont have an account yet?</p>
      <Link to="/sign-up" className='text-big login__button login__button--google login__sign-up'>Sign up for spotify</Link>
    </div>
  )
}