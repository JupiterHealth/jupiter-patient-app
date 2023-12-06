import * as Yup from "yup";
export interface ChangePasswordFormInputs {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const ChangePasswordFormValidateSchema = Yup.object({
    currentPassword: Yup.string()
        .matches(/^(?! ).*[^ ]$/, "Password cannot contain whitespace")
        .required("Current password is a required field"),
    newPassword: Yup.string()
        .matches(/^(?! ).*[^ ]$/, "Password cannot contain whitespace")
        .required("New password is a required field"),
    confirmPassword: Yup.string()
        .matches(/^(?! ).*[^ ]$/, "Password cannot contain whitespace")
        .required("Confirm password is a required field")
        .oneOf(
            [Yup.ref("newPassword")],
            "New password and confirm password does not match",
        ),
}).required();
