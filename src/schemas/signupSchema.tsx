import * as Yup from "yup";

export interface SignupFormInputs {
    email: string;
    password: string;
}

export const SignupFormValidateSchema = Yup.object({
    password: Yup.string()
        .matches(/^(?! ).*[^ ]$/, "Password cannot contain whitespace")
        .required("Password is required field"),
    email: Yup.string()
        .matches(/^(?! ).*[^ ]$/, "Email cannot contain whitespace")
        .email("Email must be a valid email")
        .required("Email is a required field"),
}).required();
