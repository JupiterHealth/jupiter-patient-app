import * as Yup from "yup";

export interface Step1ProfileFormInputs {
    firstName: string;
    lastName: string;
    dob: string;
    isPregnant: string;
    isBreastFeeding: string;
    isPlanPregnant: string;
    province: any;
}
export const Step1ProfileFormValidateSchema = Yup.object({
    firstName: Yup.string().trim().required("First Name is a required field"),
    lastName: Yup.string().trim().required("Last Name is a required field"),
    dob: Yup.string()
        .trim()
        .nullable()
        .required("Date of Birth is a required field")
        .test("valid-age", "Must be at least 18 years old", function (value) {
            if (!value) {
                return false;
            }

            // Parse the date of birth and calculate age
            const dobDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - dobDate.getFullYear();

            // Check if the user is at least 18 years old
            return age >= 18;
        }),
    province: Yup.object().shape({
        value: Yup.string().nullable().required("Province is required"),
        label: Yup.string().nullable().required("Province is required"),
    }),
}).required();

export const Step2ValidateSchema = Yup.object({
    otherText: Yup.string()
        .required("Please enter other details")
        .matches(/^\s*\S[\s\S]*$/, "Details cannot contain only blankspaces"),
});

export const Step4ProfileFormValidateSchema = Yup.object({
    addressLine1: Yup.string()
        .required("Address Line 1 is a required field")
        .matches(/^\s*\S[\s\S]*$/, "Address cannot contain only blankspaces")
        .max(60, "Address Line 1 must be at most 60 characters"),
    city: Yup.string()
        .required("City is a required field")
        .matches(/^\s*\S[\s\S]*$/, "City cannot contain only blankspaces")
        .max(40, " City must be at most 40 characters "),
    province: Yup.string()
        .required("Province is a required field")
        .matches(/^\s*\S[\s\S]*$/, "Province cannot contain only blankspaces")
        .max(40, " Province must be at most 40 characters "),
    postalCode: Yup.string()
        .required("Postal Code is a required field")
        .matches(
            /[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d/,
            "Please enter valid postal code",
        ),
    phoneNumber: Yup.string()
        .trim()
        .min(10, "Phone number requires 10 digit.")
        .required("Phone Number is required field"),
}).required();

export const Step2NotRequiredValidateSchema = Yup.object({
    otherText: Yup.string().notRequired(),
});
