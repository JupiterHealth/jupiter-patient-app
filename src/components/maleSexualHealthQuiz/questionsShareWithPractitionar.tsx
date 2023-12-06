import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    DermatologyQuizInputs,
    DermatologyQuizValidateSchema,
} from "src/schemas/dermatologyQuizSchema";
import {
    FormGroup,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const QuestionsShareWithPractitionar = () => {
    const { register, formState } = useForm<DermatologyQuizInputs>({
        resolver: yupResolver(DermatologyQuizValidateSchema),
    });
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Do you have any questions or information you would like share
                with the medical practitioner?
            </h1>
            <div className="mt-9">
                <FormGroup className="!mb-4 w-4/5 mx-auto">
                    <TextAreaField
                        {...{
                            register,
                            formState,
                            id: "textarea",
                            label: "Please enter details below",
                            placeholder: "Enter here",
                        }}
                    />
                </FormGroup>
            </div>
        </>
    );
};

export default QuestionsShareWithPractitionar;
