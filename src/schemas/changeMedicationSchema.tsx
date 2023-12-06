import * as Yup from "yup";

export interface ChangeMedicationForminputs {
    medicines: any[];
    isChangesToAssessment: string;
    reasonForChange: any;
    otherDetailForAssessment: string;
    otherReasonText: string;
}

export const ChangeMedicationValidationSchema = Yup.object({
    isChangesToAssessment: Yup.string()
        .typeError("Please Select Changes")
        .required("Please select changes"),
    otherDetailForAssessment: Yup.string()
        .trim()
        .notRequired()
        .when("isChangesToAssessment", {
            is: (val: any) => val == "Yes",
            then: Yup.string()
                .required("Please enter asseessment details")
                .matches(
                    /^\s*\S[\s\S]*$/,
                    "Asseessment details cannot contain only blankspaces",
                ),
        }),

    reasonForChange: Yup.object().shape({
        value: Yup.string()
            .nullable()
            .required("Please select reason for change"),
        label: Yup.string()
            .nullable()
            .required("Please select reason for change"),
    }),
    otherReasonText: Yup.string()
        .trim()
        .notRequired()
        .when("reasonForChange", {
            is: (val: any) => val?.value == "Other",
            then: Yup.string()
                .required("Please enter other reason for change")
                .matches(
                    /^\s*\S[\s\S]*$/,
                    "Reason for change cannot contain only blankspaces",
                ),
        }),
}).required();
