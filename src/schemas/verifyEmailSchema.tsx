import * as Yup from "yup";

export interface VerifyEmailInputs {
    otp: boolean;
    otpRef: string;
}

export const VerifyEmailValidateSchema = Yup.object({
    otp: Yup.string()
        .matches(/^(?! ).*[^ ]$/, "Password cannot contain whitespace")
        .required("Password is required field"),
    otpRef: Yup.string()
        .matches(/^(?! ).*[^ ]$/, "Email cannot contain whitespace")
        .email("Email must be a valid email")
        .required("Email is a required field"),
}).required();
