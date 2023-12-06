import * as Yup from "yup";

export interface DermatologyQuizInputs {
    textarea: string;
}

export const DermatologyQuizValidateSchema = Yup.object({
    textarea: Yup.string().trim().required(),
}).required();
