import * as Yup from "yup";
import { DateTime } from "luxon";

export interface AddNewCardFormInputs {
    cardNumber: string;
    cardName: string;
    exp_month: string;
    expYr: string;
    cvv: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    province: string;
    postalCode: string;
    promocode?: string;
}

const currentYear = DateTime.now().toFormat("yy");
export const AddNewCardFormValidateSchema = Yup.object({
    cardNumber: Yup.string()
        .required("Card Number is required field")
        .matches(
            /^\s*\S[\s\S]*$/,
            "Card Number cannot contain only blankspaces",
        ),
    cardName: Yup.string()
        .required("Card Holder Name is required field")
        .matches(
            /^\s*\S[\s\S]*$/,
            "Card Holder Name cannot contain only blankspaces",
        ),
    exp_month: Yup.string()
        .required("Expire Date is required field")
        .matches(
            /^\s*\S[\s\S]*$/,
            "Expire date cannot contain only blankspaces",
        ),
    cvv: Yup.string()
        .required("CVV is required field")
        .matches(/^\s*\S[\s\S]*$/, "CVV cannot contain only blank spaces"),
    addressLine1: Yup.string()
        .required("Address Line 1 is a required field")
        .matches(/^\s*\S[\s\S]*$/, "Address cannot contain only blank spaces")
        .max(60, "Address Line 1 must be at most 60 characters"),
    city: Yup.string()
        .required("City is a required field")
        .matches(/^\s*\S[\s\S]*$/, "City cannot contain only blank spaces")
        .max(40, " City must be at most 40 characters "),
    province: Yup.string()
        .required("Province is a required field")
        .matches(/^\s*\S[\s\S]*$/, "Province cannot contain only blank spaces")
        .max(40, " Province must be at most 40 characters "),
    postalCode: Yup.string()
        .required("Postal Code is a required field")
        .matches(
            /[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d/,
            "Please enter valid postal code",
        ),
}).required();
