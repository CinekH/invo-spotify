export const emailValidation = (email: string) : string => {
    if(email.match(/^([\w!#$%&'*+\-/=?^`{|}~]+\.)*[\w!#$%&'*+\-/=?^`{|}~]+@((((([a-z0-9]{1}[a-z0-9-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(:\d{1,5})?)$/i)) {
        return '';
    } else {
        return 'Incorrect e-mail';
    }
}

export const emailConfirmValidation = (email: string, confirmEmail: string) : string => {
    if(email === confirmEmail) {
        return '';
    } else {
        return 'E-mail addresses are not the same';
    }
}

export const passwordValidation = (password: string) : string => {
    if(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)) {
        return '';
    } else {
        return 'Password should be at least 8 characters long, and contain at least 1 number, 1 lowercase and 1 uppercase letters';
    }
}

export const nameValidation = (name: string) : string => {
    if(name.length < 3) {
        return 'Name should be at least 3 characters long'
    } else if (name.length > 33) {
        return 'Name should be less than 32 characters long';
    } else {
        return '';
    }
}