import * as Yup from "yup";
import { DateTime } from "luxon";

export interface DeleteCardFormInput {
    cardNumber: string;
    cardName: string;
    exp_month: number;
    expYr: number;
    cvv: string;
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
        .required("Holder Name is required field")
        .matches(
            /^\s*\S[\s\S]*$/,
            "Holder Name cannot contain only blankspaces",
        ),
    exp_month: Yup.string()
        .required("Expire date is required field")
        .matches(
            /^\s*\S[\s\S]*$/,
            "Expire date cannot contain only blankspaces",
        ),
    cvv: Yup.string()
        .required("cvv is required field")
        .matches(/^\s*\S[\s\S]*$/, "cvv cannot contain only blankspaces"),
}).required();
