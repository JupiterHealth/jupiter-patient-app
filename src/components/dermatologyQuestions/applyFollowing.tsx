import React, { useState } from "react";
import CommonModalComponent from "@components/commonModalComponent/commonModalComponent";
import { useForm } from "react-hook-form";
import { RadioButtonSchema } from "src/schemas/radioButtonSchema";
import { RADIO_BUTTON } from "jupiter-commons/src/components/libs/constants";
import { InputRadioField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const ApplyFollowing = () => {
    const [checkMethod, setCheckMethod] = useState(RADIO_BUTTON.One);
    const [isSweatingOverBodyModal, isSetSweatingOverBodyModal] = useState(
        false,
    );

    const { register, formState } = useForm<RadioButtonSchema>();
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary px-52">
                Which of the following applies?{" "}
            </h1>
            <div className="flex justify-center mt-8">
                <div className="flex flex-col">
                    <div className="flex mb-7">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "one",
                                name: "callMethod",
                                value: RADIO_BUTTON.One,
                                label:
                                    "My sweating is localized to my hands/feet",
                                checked: checkMethod === RADIO_BUTTON.One,
                            }}
                            onClick={() => setCheckMethod(RADIO_BUTTON.One)}
                        />
                    </div>
                    <div className="flex mb-7">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "two",
                                name: "callMethod",
                                value: RADIO_BUTTON.Two,
                                label:
                                    "I experience sweating all over the body",
                                checked: checkMethod === RADIO_BUTTON.Two,
                            }}
                            onClick={() => {
                                setCheckMethod(RADIO_BUTTON.Two);
                                isSetSweatingOverBodyModal(true);
                            }}
                        />
                    </div>
                    {/* {isSweatingOverBodyModal && (
                        <CommonModalComponent
                            isOpen={isSweatingOverBodyModal}
                            title="Sweating all over the body"
                            description=" We apologize for the inconvenience, but we are unable to
                            process your request at this moment. We recommend that you
                            to speak directly with your doctor or specialist to address
                            your specific needs and receive the necessary guidance and
                            care. If you have any questions or need further assistance,
                            our support team is here to help. We appreciate your
                            understanding and look forward to assisting you in the
                            future."
                            onClose={() => {
                                isSetSweatingOverBodyModal(false);
                            }}
                        />
                    )} */}
                </div>
            </div>
        </>
    );
};

export default ApplyFollowing;
