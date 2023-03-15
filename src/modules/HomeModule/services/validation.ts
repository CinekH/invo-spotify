import { IForm } from "../types/IForm";

export const emailValidation = (email: string): string => {
    if (
        email.match(
            /^([\w!#$%&'*+\-/=?^`{|}~]+\.)*[\w!#$%&'*+\-/=?^`{|}~]+@((((([a-z0-9]{1}[a-z0-9-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(:\d{1,5})?)$/i
        )
    ) {
        return "";
    } else {
        return "Incorrect e-mail";
    }
};

export const emailConfirmValidation = (
    email: string,
    confirmEmail: string
): string => {
    if (email === confirmEmail) {
        return "";
    } else {
        return "E-mail addresses are not the same";
    }
};

export const passwordValidation = (password: string): string => {
    if (
        password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
    ) {
        return "";
    } else {
        return "Password should be at least 8 characters long, and contain at least 1 number, 1 lowercase and 1 uppercase letters";
    }
};

export const nameValidation = (name: string): string => {
    if (name.length < 3) {
        return "Name should be at least 3 characters long";
    } else if (name.length > 33) {
        return "Name should be less than 32 characters long";
    } else {
        return "";
    }
};

export const dateValidation = ({
    day,
    month,
    year,
}: {
    day: number;
    month: number;
    year: number;
}): string => {
    const date = new Date(`${month}/${day}/${year}`);
    if (
        date.getDate() !== day ||
        date.getMonth() !== month - 1 ||
        date.getFullYear() !== year
    ) {
        return "Incorrect date";
    } else if (
        new Date().setFullYear(new Date().getFullYear() - 13) < date.getTime()
    ) {
        return "You need to have at least 13 years old";
    } else {
        return "";
    }
};

export const checkErrors = (form: IForm) => {
    if (form.errors.checkbox !== "") return false;
    if (form.errors.date !== "") return false;
    if (form.errors.email !== "") return false;
    if (form.errors.emailConfirm !== "") return false;
    if (form.errors.gender !== "") return false;
    if (form.errors.name !== "") return false;
    if (form.errors.password !== "") return false;
    return true;
};
