import React from "react";
import { CheckBoxField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { useForm } from "react-hook-form";
import { checkboxSchema } from "src/schemas/checkboxSchema";

const SkinSymtoms = () => {
    const { register, formState } = useForm<checkboxSchema>();

    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Where on your body do you experience your skin symptoms?
            </h1>
            <p className="text-lg pt-2 font-medium pb-5">
                (select all that apply)
            </p>
            <div className="flex justify-center">
                <div className="text-start mr-16">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Forehead",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "one",
                                label: "Forehead",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Hair",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "two",
                                label: "Chin",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "back",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "three",
                                label: "Back",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "hand",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "four",
                                label: "Hands",
                            }}
                        />
                    </div>
                </div>
                <div className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "cheeks",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "five",
                                label: "Cheeks",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "scalp",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "six",
                                label: "Scalp",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "chest",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "seven",
                                label: "Chest",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "feet",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "eight",
                                label: "Feet",
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SkinSymtoms;
