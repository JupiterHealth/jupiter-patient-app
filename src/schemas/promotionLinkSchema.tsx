import * as Yup from "yup";

export interface PromotionLinkFormInputs {
    firstName: string;
    lastName: string;
    email: string;
}

export const PromotionLinkFormValidateSchema = Yup.object({
    firstName: Yup.string().trim().required("First name is required field"),
    lastName: Yup.string().trim().required("Last name is required field"),
    email: Yup.string()
        .matches(/^(?! ).*[^ ]$/, "Email cannot contain whitespace")
        .email("Email must be a valid email")
        .required("Email is a required field"),
}).required();
