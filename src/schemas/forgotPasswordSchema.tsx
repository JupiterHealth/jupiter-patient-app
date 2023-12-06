import * as Yup from "yup";

export interface ForgotPasswordFormInputs {
    email: string;
}

export const ForgotPasswordFormValidateSchema = Yup.object({
    email: Yup.string()
        .matches(/^(?! ).*[^ ]$/, "Email cannot contain whitespace")
        .email("Email must be a valid email")
        .required("Email is a required field"),
}).required();
