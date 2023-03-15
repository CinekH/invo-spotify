import React, { useState, useEffect, useContext } from 'react';
import './Register.scss';

import { ReactComponent as FB } from '../../../../assets/icons/fb.svg';
import { ReactComponent as Google } from '../../../../assets/icons/google.svg';
import { ReactComponent as Error } from '../../../../assets/icons/error.svg';
import { emailValidation, emailConfirmValidation, passwordValidation, nameValidation, dateValidation, checkErrors } from '../../services/validation';
import { GlobalMessage } from '@/App';

import { auth, database } from '@/firebase';
import {ref, push } from "firebase/database";
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import { IForm } from '../../types/IForm';

const initialForm: IForm = {
    errors: {
        email: null,
        emailConfirm: null,
        password: null,
        name: null,
        date: null,
        gender: null,
        checkbox: null,
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
    const [isValid, setIsValid] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [message, setMessage] = useContext(GlobalMessage);
    const navigator = useNavigate();

    onAuthStateChanged(auth, (user) => {
        if (user) {
          navigator('/');
        }
      });
    
    //check if button was validated and passed it
    useEffect(() => {
        if (form.errors.email !== '') {
            setIsValid(false);
        } else if (form.errors.emailConfirm !== '') {
            setIsValid(false);
        } else if (form.errors.password !== '') {
            setIsValid(false);
        } else if (form.errors.name !== '') {
            setIsValid(false);
        } else if (form.errors.date !== '') {
            setIsValid(false);
        } else if (form.errors.gender !== '') {
            setIsValid(false);
        } else if (form.errors.checkbox !== '') {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [form])

// onchange events for first four inputs
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


    //onChange event for date inputs
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.id === 'month') {
            if (form.values.day > 0 && form.values.year > 0) {
                setForm({
                    values: { ...form.values, month: parseInt(event.target.value) },
                    errors: { ...form.errors, date: dateValidation({ day: form.values.day, year: form.values.year, month: parseInt(event.target.value) }) }
                });
            } else {
                setForm({ ...form, values: { ...form.values, month: parseInt(event.target.value) } });
            }
        }

        if (event.target.id === 'day' && Number.isInteger(parseInt(event.target.value))) {
            if (form.values.month > 0 && form.values.year > 0) {
                setForm({
                    values: { ...form.values, day: parseInt(event.target.value) },
                    errors: { ...form.errors, date: dateValidation({ day: parseInt(event.target.value), year: form.values.year, month: form.values.month }) }
                });
            } else {
                setForm({ ...form, values: { ...form.values, day: parseInt(event.target.value) } });
            }
        }

        if (event.target.id === 'year' && Number.isInteger(parseInt(event.target.value))) {
            if (form.values.month > 0 && form.values.day > 0) {
                setForm({
                    values: { ...form.values, year: parseInt(event.target.value) },
                    errors: { ...form.errors, date: dateValidation({ day: form.values.day, year: parseInt(event.target.value), month: form.values.month }) }
                });
            } else {
                setForm({ ...form, values: { ...form.values, year: parseInt(event.target.value) } });
            }
        }
    }

    //onChange for radio button
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ values: { ...form.values, gender: event.target.value }, errors: { ...form.errors, gender: '' } });
    }

    //onChange for checkbox
    const handleCheckboxChange = () => {
        setForm({ values: { ...form.values, checkbox: !form.values.checkbox }, errors: { ...form.errors, checkbox: '' } });
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (checkErrors(form)) {
            let error = false;

            if (form.values.gender.length === 0) {
                setForm(prev => ({ ...prev, errors: { ...prev.errors, gender: 'Please select a gender' } }));
                error = true;
            }

            if (!form.values.checkbox) {
                setForm(prev => ({ ...prev, errors: { ...prev.errors, checkbox: 'Please accept a data sharing option' } }));
                error = true;
            }

            if (error) return false;
            // create user
            createUserWithEmailAndPassword(auth, form.values.email, form.values.password).then((userCredential) => {
                setError('');
                setMessage('User created successfully, please log in.');

                //save additional data in database
                push(ref(database, 'users/' + userCredential.user.uid), {
                    name: form.values.name,
                    date: `${form.values.day}.${form.values.month}.${form.values.year}`,
                    gender: form.values.gender,
                })
            
                navigator('/sign-in');
            }).catch((error) => {
                window.scrollTo(0,0);
                if(error.code === 'auth/internal-error') {
                    setError('Check your internet connection');
                } else if (error.code === 'auth/email-already-in-use') {
                    setError('There is an user with that email address');
                    setForm({...form, errors: {...form.errors, email: 'There is an user with that email address'}})
                } else {
                    setError('Unexpected error, please try again');
                }
            });

            return true;
        } else {
            setForm({
                ...form, errors: {
                    email: emailValidation(form.values.email),
                    emailConfirm: emailConfirmValidation(form.values.email, form.values.emailConfirm),
                    password: passwordValidation(form.values.password),
                    name: nameValidation(form.values.name),
                    date: dateValidation({ day: form.values.day, month: form.values.month, year: form.values.year }),
                    gender: form.values.gender.length === 0 ? 'Please select a gender' : '',
                    checkbox: form.values.checkbox ? '' : 'Please accept a data sharing option'
                }
            });
            return false;
        }
    }

    return (
        <div className='register'>
            {error !== '' ? <p className='register__main-error'>{error}</p> : null}
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
            <form className='register__form' onSubmit={handleSubmit}>
                <div className='register__group'>
                    <label className='text-small register__label' htmlFor="email" >What&apos;s your email?</label>
                    <input className='text-tiny register__input register__input--text' type="text" id="email" name='email' placeholder='Enter your email.'
                        onChange={handleTextChange} value={form.values.email} aria-describedby="email-error"
                        aria-invalid={!!form.errors.email && form.errors.email.length > 0} data-filled={form.values.email.length > 0} />
                    {form.errors.email && form.errors.email.length > 0 ? <span className='register__error' id="email-error"><Error />{form.errors.email}</span> : null}
                </div>

                <div className="register__group">
                    <label className='text-small register__label' htmlFor="email-confirm" >Confirm your email</label>
                    <input className='text-tiny register__input register__input--text' type="text" id="email-confirm" name='email=confirm' placeholder='Enter your email again.'
                        onChange={handleTextChange} value={form.values.emailConfirm} aria-describedby="email-confirm-error"
                        aria-invalid={!!form.errors.emailConfirm && form.errors.emailConfirm.length > 0} data-filled={form.values.emailConfirm.length > 0} />
                    {form.errors.emailConfirm && form.errors.emailConfirm.length > 0 ? <span className='register__error' id="email-confirm-error"><Error />{form.errors.emailConfirm}</span> : null}
                </div>

                <div className="register__group">
                    <label className='text-small register__label' htmlFor="password" >Create a password</label>
                    <input className='text-tiny register__input register__input--text' type="password" id="password" name='password' placeholder='Create a password.'
                        onChange={handleTextChange} value={form.values.password} aria-describedby="password-error"
                        aria-invalid={!!form.errors.password && form.errors.password.length > 0} data-filled={form.values.password.length > 0} />
                    {form.errors.password && form.errors.password.length > 0 ? <span className='register__error' id="password-error"><Error />{form.errors.password}</span> : null}
                </div>

                <div className="register__group">
                    <label className='text-small register__label' htmlFor="name" >What should we call you?</label>
                    <input className='text-tiny register__input register__input--text' type="text" id="name" name='name' placeholder='Enter a profile name.'
                        onChange={handleTextChange} value={form.values.name} aria-describedby="name-error"
                        aria-invalid={!!form.errors.name && form.errors.name.length > 0} data-filled={form.values.name.length > 0} />
                    {form.errors.name && form.errors.name.length > 0 ? <span className='register__error' id="name-error"><Error />{form.errors.name}</span> : null}
                </div>

                <p className='text-tiny register__public'>This appears on your profile.</p>
                <fieldset>
                    <div className='register__date'>
                        <legend className='text-small register__date-title'>What&apos;s your date of birth</legend>
                        <label htmlFor="month" className='text-tiny register__month-label'>Month</label>
                        <select name="month" id="month" className='register__month' aria-invalid={!!form.errors.date && form.errors.date.length > 0} value={form.values.month}
                            onChange={handleDateChange} aria-describedby="date-error" data-selected={form.values.month > 0}
                        >
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
                        <input className='text-tiny register__input register__input--text register__day' type="text" id="day" name='day' placeholder='DD'
                            onChange={handleDateChange} value={form.values.day === 0 ? '' : form.values.day} aria-describedby="date-error"
                            aria-invalid={!!form.errors.date && form.errors.date.length > 0} data-filled={form.values.day > 0} />

                        <label htmlFor="year" className='text-tiny register__year-label'>Year</label>
                        <input className='text-tiny register__input register__input--text register__year' type="text" id="year" name='year' placeholder='YYYY'
                            onChange={handleDateChange} value={form.values.year === 0 ? '' : form.values.year} aria-describedby="date-error"
                            aria-invalid={!!form.errors.date && form.errors.date.length > 0} data-filled={form.values.year > 0} />

                        {form.errors.date && form.errors.date.length > 0 ? <span className='register__error register__date-error' id="date-error"><Error />{form.errors.date}</span> : null}

                    </div>
                </fieldset>
                <fieldset aria-describedby='gender-error'>
                    <div className="register__gender">
                        <legend className="text-small register__gender-title center">What is your gender?</legend>

                        <label className="text-tiny register__male-label center" htmlFor='male'>Male</label>
                        <input type="radio" name="gender" id="male" className='register__male center' onChange={handleRadioChange} />

                        <label className="text-tiny register__female-label center" htmlFor='female'>Female</label>
                        <input type="radio" name="gender" id="female" className='register__female center' onChange={handleRadioChange} />

                        <label className="text-tiny register__non-binary-label center" htmlFor='non-binary'>Non-binary</label>
                        <input type="radio" name="gender" id="non-binary" className='register__non-binary center' onChange={handleRadioChange} />

                        <label className="text-tiny register__other-label center" htmlFor='other'>Other</label>
                        <input type="radio" name="gender" id="other" className='register__other center' onChange={handleRadioChange} />

                        <label className="text-tiny register__prefer-label center" htmlFor='prefer'>Prefer not to say</label>
                        <input type="radio" name="gender" id="prefer" className='register__prefer center' onChange={handleRadioChange} />

                        {!!form.errors.gender && form.errors.gender.length > 0 ? <span className='register__error register__gender-error' id="gender-error"><Error />{form.errors.gender}</span> : null}
                    </div>
                </fieldset>
                <div className='register__share'>
                    <input type="checkbox" name="share" id="share" className='register__checkbox' onChange={handleCheckboxChange} aria-describedby="checkbox-error" />
                    <label htmlFor="share" className='text-tiny register__share-text'>Share my registration date with Spotify&apos;s content providers for marketing purposes.</label>
                    {!!form.errors.checkbox && form.errors.checkbox.length > 0 ? <span className='register__error register__checkbox-error' id="checkbox-error"><Error />{form.errors.checkbox}</span> : null}
                </div>
                <p className='register__info'>By clicking on sing-up. you agree to Sporify&apos;s <a href='#'>Terms and Conditions of Use</a>.</p>
                <p className='register__info'>To learn more about how. Spotify collects, uses, shares and protects your personal data, please see <a href="#">Spotify&apos;s Privacy Policy</a>.</p>
                <button type="submit" className='text-big register__submit' disabled={isValid === false}>Sign up</button>
                <p className='text-big register__login'>Have an account? <Link to={'/sign-in'}>Log in</Link>.</p>
            </form>
        </div>
    )
}