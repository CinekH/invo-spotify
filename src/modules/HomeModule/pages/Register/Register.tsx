import React from 'react';
import './Register.scss';

export const Register: React.FC = () => {
    return (
        <div className='register'>
            <h2 className="text-title register__title">Sign up for free to start listening.</h2>
            <button className='text-big register__button--facebook'>Sign up with Facebook</button>
            <button className='text-big register__button--google'>Sign up with Google</button>
            <div className='register__spacer'>
                <span className='text-regular'>or</span>
            </div>
            <h3 className='register__sign-up'>Sign up with your email adress</h3>
            <form className='register__form'>
                <label className='text-small register__label' htmlFor="email" >What&apos;s your email?</label>
                <input className='text-small register__input register__input--text' type="text" id="email" name='email' placeholder='Enter your email.' />
                <label className='text-small register__label' htmlFor="email-confirm" >Confirm your email</label>
                <input className='text-small register__input register__input--text' type="text" id="email-confirm" name='email=confirm' placeholder='Enter your email again.' />
                <label className='text-small register__label' htmlFor="password" >Create a password</label>
                <input className='text-small register__input register__input--text' type="text" id="password" name='password' placeholder='Create a password.' />
                <label className='text-small register__label' htmlFor="email" >What&apos;s your email?</label>
                <input className='text-small register__input register__input--text' type="text" id="email" name='email' placeholder='Enter your email.' />
            </form>
        </div>
    )
}