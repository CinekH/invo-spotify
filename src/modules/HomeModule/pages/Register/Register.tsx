import React, { useState } from 'react';
import './Register.scss';

import { ReactComponent as FB } from '../../../../assets/icons/fb.svg';
import { ReactComponent as Google } from '../../../../assets/icons/google.svg';
import { ReactComponent as Error } from '../../../../assets/icons/error.svg';
import { emailValidation, emailConfirmValidation, passwordValidation, nameValidation } from '../../services/validation';

interface IForm {
    errors: {
        email: string,
        emailConfirm: string,
        password: string,
        name: string,
        month: string,
        day: string,
        year: string,
        gender: string,
        checkbox: string,
    },

    values: {
        email: string,
        emailConfirm: string,
        password: string,
        name: string,
        month: number,
        day: number,
        year: number,
        gender: string,
        checkbox: boolean,
    }
}

const initialForm: IForm = {
    errors: {
        email: '',
        emailConfirm: '',
        password: '',
        name: '',
        month: '',
        day: '',
        year: '',
        gender: '',
        checkbox: '',
    },
    values: {
        email: '',
        emailConfirm: '',
        password: '',
        name: '',
        month: 0,
        day: 0,
        year: 0,
        gender: '',
        checkbox: false,
    }
}

export const Register: React.FC = () => {
    const [form, setForm] = useState<IForm>({ ...initialForm });

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.id) {
            case 'email':
                setForm({ values: { ...form.values, email: event.target.value }, errors: { ...form.errors, email: emailValidation(event.target.value) } });
                break;
            case 'email-confirm':
                setForm({ values: { ...form.values, emailConfirm: event.target.value }, errors: { ...form.errors, emailConfirm: emailConfirmValidation(form.values.email, event.target.value) } });
                break
            case 'password':
                setForm({ values: { ...form.values, password: event.target.value }, errors: { ...form.errors, password: passwordValidation(event.target.value) } });
                break
            case 'name':
                setForm({ values: { ...form.values, name: event.target.value }, errors: { ...form.errors, name: nameValidation(event.target.value) } });
                break
            default:
                break;
        }
    }

    return (
        <div className='register'>
            <h2 className="text-title register__title">Sign up for free to start listening.</h2>
            <button className='text-big register__button register__button--facebook'>
                <div className='register__icon-container'>
                    <FB className='register__icon register__icon--facebook' />
                </div>
                <span>Sign up with Facebook</span>
            </button>
            <button className='text-big register__button register__button--google'>
                <Google className='register__icon register__icon--google' />
                <span>Sign up with Google</span>
            </button>
            <div className='register__spacer'>
                <span className='text-regular'>or</span>
            </div>
            <h3 className='register__sign-up'>Sign up with your email adress</h3>
            <form className='register__form'>
                <div className='register__group'>
                    <label className='text-small register__label' htmlFor="email" >What&apos;s your email?</label>
                    <input className='text-tiny register__input register__input--text' type="text" id="email" name='email' placeholder='Enter your email.'
                        onChange={handleTextChange} value={form.values.email} aria-describedby="email-error" aria-invalid={form.errors.email.length > 0} />
                    {form.errors.email.length > 0 ? <span className='register__error' id="email-error"><Error />{form.errors.email}</span> : null}
                </div>

                <div className="register__group">
                    <label className='text-small register__label' htmlFor="email-confirm" >Confirm your email</label>
                    <input className='text-tiny register__input register__input--text' type="text" id="email-confirm" name='email=confirm' placeholder='Enter your email again.'
                        onChange={handleTextChange} value={form.values.emailConfirm} aria-describedby="email-confirm-error" aria-invalid={form.errors.emailConfirm.length > 0} />
                    {form.errors.emailConfirm.length > 0 ? <span className='register__error' id="email-confirm-error"><Error />{form.errors.emailConfirm}</span> : null}
                </div>

                <div className="register__group">
                    <label className='text-small register__label' htmlFor="password" >Create a password</label>
                    <input className='text-tiny register__input register__input--text' type="password" id="password" name='password' placeholder='Create a password.'
                        onChange={handleTextChange} value={form.values.password} aria-describedby="password-error" aria-invalid={form.errors.password.length > 0} />
                    {form.errors.password.length > 0 ? <span className='register__error' id="password-error"><Error />{form.errors.password}</span> : null}
                </div>

                <div className="register__group">
                    <label className='text-small register__label' htmlFor="name" >What should we call you?</label>
                    <input className='text-tiny register__input register__input--text' type="text" id="name" name='name' placeholder='Enter a profile name.'
                        onChange={handleTextChange} value={form.values.name} aria-describedby="name-error" aria-invalid={form.errors.name.length > 0} />
                    {form.errors.name.length > 0 ? <span className='register__error' id="name-error"><Error />{form.errors.name}</span> : null}
                </div>

                <p className='text-tiny'>This appears on your profile.</p>
                <fieldset>
                    <div className='register__date'>
                        <legend className='text-small register__date-title'>What&apos;s your date of birth</legend>
                        <label htmlFor="month" className='text-tiny register__month-label'>Month</label>
                        <select defaultValue="0" name="month" id="month" className='register__month'>
                            <option value="0" disabled hidden>Month</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>

                        <label htmlFor="day" className='text-tiny register__day-label'>Day</label>
                        <input className='text-tiny register__input register__input--text register__day' type="text" id="day" name='day' placeholder='DD' />

                        <label htmlFor="year" className='text-tiny register__year-label'>Year</label>
                        <input className='text-tiny register__input register__input--text register__year' type="text" id="year" name='year' placeholder='YYYY' />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="register__gender">
                        <legend className="text-small register__gender-title center">What is your gender?</legend>

                        <label className="text-tiny register__male-label center" htmlFor='male'>Male</label>
                        <input type="radio" name="gender" id="male" className='register__male center' />

                        <label className="text-tiny register__female-label center" htmlFor='female'>Female</label>
                        <input type="radio" name="gender" id="female" className='register__female center' />

                        <label className="text-tiny register__non-binary-label center" htmlFor='non-binary'>Non-binary</label>
                        <input type="radio" name="gender" id="non-binary" className='register__non-binary center' />

                        <label className="text-tiny register__other-label center" htmlFor='other'>Other</label>
                        <input type="radio" name="gender" id="other" className='register__other center' />

                        <label className="text-tiny register__prefer-label center" htmlFor='prefer'>Prefer not to say</label>
                        <input type="radio" name="gender" id="prefer" className='register__prefer center' />
                    </div>
                </fieldset>
                <div className='register__share'>
                    <label htmlFor="share" className='text-tiny register__share-text'>Share my registration date with Spotify&apos;s content providers for marketing purposes.</label>
                    <input type="checkbox" name="share" id="share" className='register__checkbox' />
                </div>
                <p className='register__info'>By clicking on sing-up. you agree to Sporify&apos;s <a href='#'>Terms and Conditions of Use</a>.</p>
                <p className='register__info'>To learn more about how. Spotify collects, uses, shares and protects your personal data, please see <a>Spotify&apos;s Privacy Policy</a>.</p>
                <button type="submit" className='text-big register__submit'>Sign up</button>
                <p className='text-big register__login'>Have an account? <a href='#'>Log in</a>.</p>
            </form>
        </div>
    )
}