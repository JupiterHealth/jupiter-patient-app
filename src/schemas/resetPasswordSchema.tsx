import * as Yup from "yup";

export interface ResetPasswordFormInputs {
    confirmPassword: string;
    newPassword: string;
}

export const ResetPasswordFormValidateSchema = Yup.object({
    newPassword: Yup.string()
        .matches(/^(?! ).*[^ ]$/, "Password cannot contain whitespace")
        .trim()
        .required("New password is a required field"),
    confirmPassword: Yup.string()
        .matches(/^(?! ).*[^ ]$/, "Password cannot contain whitespace")
        .trim()
        .required("Confirm password is a required field")
        .oneOf(
            [Yup.ref("newPassword")],
            "New password and confirm password does not match",
        ),
}).required();
