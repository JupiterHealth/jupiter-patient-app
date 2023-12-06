import * as Yup from "yup";

export interface ModifyMedicationFormInputs {
    medicines: any[];
    isChangesToAssessment: string;
    otherDetailForAssessment: string;
    modifyOptions?: any;
    isSelectEarlyRefill: boolean;
    isSelectRefillFrequency: boolean;
    isSelectRefillQuantity: boolean;
    date?: string;
    frequency?: string;
    quantity: {
        label: string;
        value: string;
    };
}

export const ModifyeMedicationValidationSchema = Yup.object({
    isChangesToAssessment: Yup.string()
        .typeError("Please select Changes")
        .required("Please select changes"),
    otherDetailForAssessment: Yup.string()
        .trim()
        .notRequired()
        .when("isChangesToAssessment", {
            is: (val: any) => val == "Yes",
            then: Yup.string()
                .required("Please enter assessment details")
                .matches(
                    /^\s*\S[\s\S]*$/,
                    "Assessment details cannot contain only blankspaces",
                ),
        }),
    date: Yup.string()
        .trim()
        .notRequired()
        .when("isSelectEarlyRefill", {
            is: (val: any) => val == true,
            then: Yup.string().required("Please enter refill date"),
        }),
    frequency: Yup.string()
        .trim()
        .notRequired()
        .when("isSelectRefillFrequency", {
            is: (val: any) => val == true,
            then: Yup.string()
                .typeError("Please select delivery frequency")
                .required("Please select delivery frequency"),
        }),
    quantity: Yup.object()
        .shape({
            label: Yup.string().notRequired(),
            value: Yup.string().notRequired(),
        })
        .when("isSelectRefillQuantity", {
            is: (val: any) => val === true,
            then: Yup.object().shape({
                label: Yup.string().required(
                    "Please select quantity to adjust",
                ),
                value: Yup.string().required(
                    "Please select quantity to adjust",
                ),
            }),
        }),
}).required();

export interface ResumeMedicationFormInputs {
    reason: string;
    medicines: any[];
    isChangesToAssessment: string;
}

export const ResumeMedicationValidationSchema = Yup.object({
    reason: Yup.string()
        .trim()
        .notRequired()
        .when("isChangesToAssessment", {
            is: (val: any) => val == "Yes",
            then: Yup.string()
                .required("Please enter assessment details")
                .matches(
                    /^\s*\S[\s\S]*$/,
                    "Assessment details cannot contain only blankspaces",
                ),
        }),
}).required();

export interface CancleMedicationFormInputs {
    reasonForCancel: any;
    otherReasonText: string;
    medicines: any[];
}

export const CancleMedicationValidationSchema = Yup.object({
    reasonForCancel: Yup.object().shape({
        value: Yup.string()
            .nullable()
            .required("Please select reason for cancle"),
        label: Yup.string()
            .nullable()
            .required("Please select reason for cancle"),
    }),
    otherReasonText: Yup.string()
        .trim()
        .notRequired()
        .when("reasonForCancel", {
            is: (val: any) => val?.value == "Other",
            then: Yup.string()
                .required("Please enter other reason for cancle")
                .matches(
                    /^\s*\S[\s\S]*$/,
                    "Reason for change cannot contain only blankspaces",
                ),
        }),
}).required();

export interface PauseMedicationFormInputs {
    reasonForPause: any;
    otherReasonText: string;
    medicines: any[];
    pauseOption: string;
    days?: number;
}

export const PauseMedicationValidationSchema = Yup.object({
    reasonForPause: Yup.object().shape({
        value: Yup.string()
            .nullable()
            .required("Please select reason for pause"),
        label: Yup.string()
            .nullable()
            .required("Please select reason for pause"),
    }),
    otherReasonText: Yup.string()
        .trim()
        .notRequired()
        .when("reasonForPause", {
            is: (val: any) => val?.value == "Other",
            then: Yup.string()
                .required("Please enter other reason for pause")
                .matches(
                    /^\s*\S[\s\S]*$/,
                    "Reason for change cannot contain only blankspaces",
                ),
        }),
    pauseOption: Yup.string()
        .typeError("Please select atleast one pause option")
        .required("Please select atleast one pause option"),

    days: Yup.string().when("pauseOption", {
        is: (val: any) => val === "Pause For Days",
        then: Yup.string()
            .required("Days is required")
            .matches(/^\d+$/, "Days must be a number")
            .test(
                "is-greater-than-one",
                "Days must be greater than 1",
                (value) => {
                    if (!value) return false;
                    const numberValue = parseInt(value, 10);
                    return numberValue > 1;
                },
            ),
    }),
}).required();
