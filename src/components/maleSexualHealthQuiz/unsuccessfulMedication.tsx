import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Row } from "antd";
import {
    ProfileFormInputs,
    ProfileFormValidateSchema,
} from "src/schemas/profileSchema";
import {
    DOSAGE_TYPE,
    RADIO_BUTTON,
} from "jupiter-commons/src/components/libs/constants";
import {
    CheckBoxField,
    FormGroup,
    InputRadioField,
    SelectField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { UploadPhotoIcon } from "jupiter-commons/src/components/theme/icons/uploadPhotoIcon";

const UnsuccessfulMedication = () => {
    const { register, formState, control } = useForm<ProfileFormInputs>({
        resolver: yupResolver(ProfileFormValidateSchema),
    });
    const [checkMethod, setCheckMethod] = useState(RADIO_BUTTON.One);
    const [checkMethod1, setCheckMethod1] = useState(RADIO_BUTTON.One);
    const [checkMethod2, setCheckMethod2] = useState(RADIO_BUTTON.One);
    const [checkMethod3, setCheckMethod3] = useState(RADIO_BUTTON.One);
    const [checkMethod4, setCheckMethod4] = useState(RADIO_BUTTON.One);
    const [checkMethod5, setCheckMethod5] = useState(RADIO_BUTTON.One);
    const [checkMethod6, setCheckMethod6] = useState(RADIO_BUTTON.One);
    const [checkMethod7, setCheckMethod7] = useState(RADIO_BUTTON.One);
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Were any of these medication(s) unsuccessful in treating ED?
            </h1>
            <Row>
                <Col span={2}></Col>
                <Col span={8}>
                    <p className="text-lg font-semibold text-start mt-9">
                        Viagra/Sildenafil
                    </p>
                    <FormGroup className="!mb-4 w-4/5 mt-8">
                        <SelectField
                            {...{
                                register,
                                formState,
                                control,
                                defaultValue: "",
                                id: "Dose",
                                label: "Dose",
                                options: DOSAGE_TYPE,
                                isClearable: false,
                                placeholder: "Enter dose",
                                name: "dose",
                            }}
                        />
                    </FormGroup>
                </Col>
                <Col span={1}></Col>
                <Col span={13}>
                    <div className="flex justify-start items-center mt-8">
                        <div className="flex mr-14 ml-2">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "one",
                                    name: "Sildenafil",
                                    value: RADIO_BUTTON.One,
                                    label: "Yes",
                                    checked: checkMethod === RADIO_BUTTON.One,
                                }}
                                onClick={() => setCheckMethod(RADIO_BUTTON.One)}
                            />
                        </div>
                        <div className="flex">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "two",
                                    name: "Sildenafil",
                                    value: RADIO_BUTTON.Two,
                                    label: "No",
                                    checked: checkMethod === RADIO_BUTTON.Two,
                                }}
                                onClick={() => setCheckMethod(RADIO_BUTTON.Two)}
                            />
                        </div>
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "too long",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "too long ",
                                label: "Took too long to work",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Erection",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "Erection does",
                                label: "Erection does not last long",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "penetration",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "penetration",
                                label:
                                    "Erection is not strong enough for penetration",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "not get erection",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "not get erection",
                                label: "I did not get an erection at all",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "side effects",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "side effects",
                                label: "Caused side effects",
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col span={2}></Col>
                <Col span={8}>
                    <p className="text-lg font-semibold text-start  mt-9">
                        Cialis/Tadalafil
                    </p>
                    <FormGroup className="!mb-4 w-4/5 mt-8">
                        <SelectField
                            {...{
                                register,
                                formState,
                                control,
                                defaultValue: "",
                                id: "Dose",
                                label: "Dose",
                                options: DOSAGE_TYPE,
                                isClearable: false,
                                placeholder: "Enter dose",
                                name: "dose",
                            }}
                        />
                    </FormGroup>
                </Col>
                <Col span={1}></Col>
                <Col span={13}>
                    <div className="flex justify-start items-center mt-8">
                        <div className="flex mr-14 ml-2">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "three",
                                    name: "callMethod",
                                    value: RADIO_BUTTON.Three,
                                    label: "Yes",
                                    checked:
                                        checkMethod1 === RADIO_BUTTON.Three,
                                }}
                                onClick={() =>
                                    setCheckMethod1(RADIO_BUTTON.Three)
                                }
                            />
                        </div>
                        <div className="flex">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "four",
                                    name: "callMethod",
                                    value: RADIO_BUTTON.Four,
                                    label: "No",
                                    checked: checkMethod1 === RADIO_BUTTON.Four,
                                }}
                                onClick={() =>
                                    setCheckMethod1(RADIO_BUTTON.Four)
                                }
                            />
                        </div>
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "too long to",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "Took too long",
                                label: "Took too long to work",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Erection",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "Erection",
                                label: "Erection does not last long",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "penetration",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "strong enough penetration",
                                label:
                                    "Erection is not strong enough for penetration",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "not get erection",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "did not get erection",
                                label: "I did not get an erection at all",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "side effects",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "effects",
                                label: "Caused side effects",
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col span={2}></Col>
                <Col span={8}>
                    <p className="text-lg font-semibold text-start  mt-9">
                        Levitra/Vardenafil
                    </p>
                    <FormGroup className="!mb-4 w-4/5 mt-8">
                        <SelectField
                            {...{
                                register,
                                formState,
                                control,
                                defaultValue: "",
                                id: "Dose",
                                label: "Dose",
                                options: DOSAGE_TYPE,
                                isClearable: false,
                                placeholder: "Enter Dosage|mg",
                                name: "dose",
                            }}
                        />
                    </FormGroup>
                </Col>
                <Col span={1}></Col>
                <Col span={13}>
                    <div className="flex justify-start items-center mt-8">
                        <div className="flex mr-14 ml-2">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "five",
                                    name: "Levitra",
                                    value: RADIO_BUTTON.Five,
                                    label: "Yes",
                                    checked: checkMethod2 === RADIO_BUTTON.Five,
                                }}
                                onClick={() =>
                                    setCheckMethod2(RADIO_BUTTON.Five)
                                }
                            />
                        </div>
                        <div className="flex">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "six",
                                    name: "Levitra",
                                    value: RADIO_BUTTON.Six,
                                    label: "No",
                                    checked: checkMethod1 === RADIO_BUTTON.Six,
                                }}
                                onClick={() =>
                                    setCheckMethod1(RADIO_BUTTON.Six)
                                }
                            />
                        </div>
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "too long",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "too long",
                                label: "Took too long to work",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Erection",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "Erection does not",
                                label: "Erection does not last long",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "penetration",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "enough for penetration",
                                label:
                                    "Erection is not strong enough for penetration",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "not get erection",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "I did not get erection",
                                label: "I did not get an erection at all",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "side effects",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "Caused side effects",
                                label: "Caused side effects",
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col span={2}></Col>
                <Col span={8}>
                    <p className="text-lg font-semibold text-start  mt-9">
                        Muse/Alprostadil
                    </p>
                    <FormGroup className="!mb-4 w-4/5 mt-8">
                        <SelectField
                            {...{
                                register,
                                formState,
                                control,
                                defaultValue: "",
                                id: "Dose",
                                label: "Dose",
                                options: DOSAGE_TYPE,
                                isClearable: false,
                                placeholder: "Enter Dosage|mg",
                                name: "dose",
                            }}
                        />
                    </FormGroup>
                </Col>
                <Col span={1}></Col>
                <Col span={13}>
                    <div className="flex justify-start items-center mt-8">
                        <div className="flex mr-14 ml-2">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "seven",
                                    name: "Muse",
                                    value: RADIO_BUTTON.Seven,
                                    label: "Yes",
                                    checked:
                                        checkMethod3 === RADIO_BUTTON.Seven,
                                }}
                                onClick={() =>
                                    setCheckMethod3(RADIO_BUTTON.Seven)
                                }
                            />
                        </div>
                        <div className="flex">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "eight",
                                    name: "Muse",
                                    value: RADIO_BUTTON.Eight,
                                    label: "No",
                                    checked:
                                        checkMethod3 === RADIO_BUTTON.Eight,
                                }}
                                onClick={() =>
                                    setCheckMethod3(RADIO_BUTTON.Eight)
                                }
                            />
                        </div>
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "too long",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "too long last",
                                label: "Took too long to work",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Erection",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "Erection not last",
                                label: "Erection does not last long",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "penetration",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "penetration not strong",
                                label:
                                    "Erection is not strong enough for penetration",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "not get erection",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "did get erection",
                                label: "I did not get an erection at all",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "side effects",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "side effects last",
                                label: "Caused side effects",
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col span={2}></Col>
                <Col span={8}>
                    <p className="text-lg font-semibold text-start  mt-9">
                        Bimix: Papaverine, Phentolamine
                    </p>
                </Col>
                <Col span={1}></Col>
                <Col span={13}>
                    <div className="flex justify-start items-center mt-8">
                        <div className="flex mr-14 ml-2">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "nine",
                                    name: "Bimix",
                                    value: RADIO_BUTTON.Nine,
                                    label: "Yes",
                                    checked: checkMethod4 === RADIO_BUTTON.Nine,
                                }}
                                onClick={() =>
                                    setCheckMethod4(RADIO_BUTTON.Nine)
                                }
                            />
                        </div>
                        <div className="flex">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "ten",
                                    name: "Bimix",
                                    value: RADIO_BUTTON.Ten,
                                    label: "No",
                                    checked: checkMethod4 === RADIO_BUTTON.Ten,
                                }}
                                onClick={() =>
                                    setCheckMethod4(RADIO_BUTTON.Ten)
                                }
                            />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col span={2}></Col>
                <Col span={8}>
                    <p className="text-lg font-semibold text-start  mt-9">
                        Trimix: Alprostadil,
                        <br /> Papaverine, Phentolamine
                    </p>
                </Col>
                <Col span={1}></Col>
                <Col span={13}>
                    <div className="flex justify-start items-center mt-8">
                        <div className="flex mr-14 ml-2">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "eleven",
                                    name: "Trimix",
                                    value: RADIO_BUTTON.Eleven,
                                    label: "Yes",
                                    checked:
                                        checkMethod5 === RADIO_BUTTON.Eleven,
                                }}
                                onClick={() =>
                                    setCheckMethod5(RADIO_BUTTON.Eleven)
                                }
                            />
                        </div>
                        <div className="flex">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "Twelve",
                                    name: "Trimix",
                                    value: RADIO_BUTTON.Twelve,
                                    label: "No",
                                    checked:
                                        checkMethod5 === RADIO_BUTTON.Twelve,
                                }}
                                onClick={() =>
                                    setCheckMethod5(RADIO_BUTTON.Twelve)
                                }
                            />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col span={2}></Col>
                <Col span={8}>
                    <p className="text-lg font-semibold text-start  mt-9">
                        Quadmix: Alprostadil, Papaverine, Phentolamine, Atropine
                    </p>
                </Col>
                <Col span={1}></Col>
                <Col span={13}>
                    <div className="flex justify-start items-center mt-8">
                        <div className="flex mr-14 ml-2">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "thirteen",
                                    name: "Quadmix",
                                    value: RADIO_BUTTON.Thirteen,
                                    label: "Yes",
                                    checked:
                                        checkMethod6 === RADIO_BUTTON.Thirteen,
                                }}
                                onClick={() =>
                                    setCheckMethod6(RADIO_BUTTON.Thirteen)
                                }
                            />
                        </div>
                        <div className="flex">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "fourteen",
                                    name: "Quadmix",
                                    value: RADIO_BUTTON.Fourteen,
                                    label: "No",
                                    checked:
                                        checkMethod6 === RADIO_BUTTON.Fourteen,
                                }}
                                onClick={() =>
                                    setCheckMethod6(RADIO_BUTTON.Fourteen)
                                }
                            />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col span={2}></Col>
                <Col span={8}>
                    <p className="text-lg font-semibold text-start  mt-9">
                        Other injectable
                    </p>
                </Col>
                <Col span={1}></Col>
                <Col span={13}>
                    <div className="flex justify-start items-center mt-8">
                        <div className="flex mr-14 ml-2">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "fifteen",
                                    name: "injectable",
                                    value: RADIO_BUTTON.Fifteen,
                                    label: "Yes",
                                    checked:
                                        checkMethod7 === RADIO_BUTTON.Fifteen,
                                }}
                                onClick={() =>
                                    setCheckMethod7(RADIO_BUTTON.Fifteen)
                                }
                            />
                        </div>
                        <div className="flex">
                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "sixteen",
                                    name: "injectable",
                                    value: RADIO_BUTTON.Sixteen,
                                    label: "No",
                                    checked:
                                        checkMethod7 === RADIO_BUTTON.Sixteen,
                                }}
                                onClick={() =>
                                    setCheckMethod7(RADIO_BUTTON.Sixteen)
                                }
                            />
                        </div>
                    </div>
                </Col>
                <div className="flex text-lg font-medium mt-10 mb-2 ml-4">
                    <p>Upload Medication Photos (Optional)</p>
                </div>
                <div className="border-dashed w-11/12 ml-4 border-2 rounded-[20px]">
                    <div className="my-7">
                        <span className="flex justify-center cursor-pointer">
                            <UploadPhotoIcon className="text-secondary" />
                        </span>
                        <span className="text-secondary cursor-pointer underline text-lg font-semibold">
                            Upload Photos
                        </span>
                        <p className="px-7 mt-2 text-lg font-medium">
                            or drag and drop your photo(s) to this area. We
                            accept JPEG, PNG, GIF, BMP, PDF or HEIC at 10mb or
                            less.
                        </p>
                    </div>
                </div>
            </Row>
        </>
    );
};

export default UnsuccessfulMedication;
