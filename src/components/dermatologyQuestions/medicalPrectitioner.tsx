import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    DermatologyQuizInputs,
    DermatologyQuizValidateSchema,
} from "src/schemas/dermatologyQuizSchema";
import {
    FormGroup,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const MedicalPrectitioner = () => {
    const { register, formState } = useForm<DermatologyQuizInputs>({
        resolver: yupResolver(DermatologyQuizValidateSchema),
    });
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary px-32">
                Do you have any questions or information you would like share
                with the medical practitioner?
            </h1>
            <div className="mt-9 w-3/5 mx-auto">
                <FormGroup className="!mb-4 mr-auto">
                    <TextAreaField
                        {...{
                            register,
                            formState,
                            id: "textarea",
                            label: "Please enter details below",
                            placeholder: "Enter here",
                            className: "w-full",
                        }}
                    />
                </FormGroup>
            </div>
        </>
    );
};

export default MedicalPrectitioner;
