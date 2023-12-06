import * as Yup from "yup";

export interface LoginFormInputs {
    email: string;
    password: string;
}

export const LoginFormValidateSchema = Yup.object({
    email: Yup.string()
        .matches(/^(?! ).*[^ ]$/, "Email cannot contain whitespace")
        .email("Email must be a valid email")
        .required("Email is a required field"),
    password: Yup.string()
        .matches(/^(?! ).*[^ ]$/, "Password cannot contain whitespace")
        .required("Password is required field"),
}).required();
