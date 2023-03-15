export interface IForm {
    errors: {
        email: string | null,
        emailConfirm: string | null,
        password: string | null,
        name: string | null,
        date: string | null,
        gender: string | null,
        checkbox: string | null,
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