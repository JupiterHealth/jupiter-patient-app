import * as Yup from "yup";

export interface ProfileFormInputs {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    postalCode: string;
    gender: string;
}

export const ProfileFormValidateSchema = Yup.object({
    firstName: Yup.string().trim().required("First Name is required field"),
    lastName: Yup.string().trim().required("Last Name is a required field"),
    // gender: Yup.string().required("Please select gender"),
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
}).required();
