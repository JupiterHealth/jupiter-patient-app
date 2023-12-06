import moment from "moment";
import * as Yup from "yup";

export interface VerificationFormInputs {
    hcNo: any;
    dob: string;
    method: 3 | 2;
}

export const VerificationFormValidateSchema = Yup.object({
    hcNo: Yup.string()
        .trim()
        .required("Health Card Number is a required field")
        .matches(
            /^\s*\S[\s\S]*$/,
            "Health Card Number cannot contain only blankspaces",
        )
        .matches(
            /^(\+\d{1,2}\s)?\(?\d{4}\)?[\s.-]\d{3}[\s.-]\d{3}$/,
            "Invalid Health Card Number number, must be 10 digits",
        ),
    dob: Yup.string()
        .required("Date of birth is a required field")
        .test("dob", "Date of Birth is invalid", (value: any) => {
            return moment().diff(moment(value), "days") >= 1;
        }),
}).required();
