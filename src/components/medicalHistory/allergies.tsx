import React, { useState } from "react";
import { Button, Col, Row, message } from "antd";
import {
    FormGroup,
    InputRadioField,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { optionType, questionObj } from "@redux/slices/assessment";
import { DeleteIcon } from "jupiter-commons/src/components/theme/icons/deleteIcon";
import AllergiesStyles from "./allergiesStyles.module.scss";
import CreatableSelect from "react-select/creatable";

export interface MedicationProps {
    currentQuestionObj: questionObj;
    setCurrentQuestionObj: (d?: any) => void;
    register: (d?: any) => void;
    formState: any;
    medicines: any;
    setMedicines: (d?: any) => void;
    setValue?: any;
    control?: any;
    selectOptions?: any;
    searchMedicine: any;
    setSearchMedicine: (d?: any) => void;
    setApiParam?: any;
    fetchAllergy: (d?: any) => void;
    isLoading: boolean;
}

const Allergies = (props: MedicationProps) => {
    const {
        currentQuestionObj,
        setCurrentQuestionObj,
        register,
        formState,
        medicines,
        setMedicines,
        setValue,
        control,
        selectOptions,
        searchMedicine,
        setSearchMedicine,
        fetchAllergy,
        isLoading,
    } = props;
    const [allergy, setAllergy] = useState(0);

    return (
        <>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
                Do you have any allergies?
            </h1>
            <div className="flex justify-center mt-5 md:mt-9">
                <div className="flex flex-col">
                    {currentQuestionObj &&
                        currentQuestionObj?.options.map(
                            (option: optionType) => (
                                <div className="mb-6 last:mb-0 radioLabel">
                                    <InputRadioField
                                        {...{
                                            register,
                                            formState,
                                            id: option.key,
                                            name: "callMethod",
                                            value: option.key,
                                            label: option.label,
                                            checked: currentQuestionObj?.answers?.includes(
                                                option.key,
                                            ),
                                        }}
                                        onClick={() =>
                                            setCurrentQuestionObj((d: any) => {
                                                return {
                                                    ...d,
                                                    answers: [option.key],
                                                };
                                            })
                                        }
                                    />
                                </div>
                            ),
                        )}
                </div>
            </div>
            {currentQuestionObj &&
                currentQuestionObj?.answers &&
                currentQuestionObj?.answers?.some(
                    (a: any) =>
                        a ===
                        `${
                            currentQuestionObj?.options?.[
                                currentQuestionObj?.options.length - 2
                            ].key
                        }`,
                ) && (
                    <div className="mx-auto w-full md:w-[640px]">
                        <Row className="mt-9">
                            <div className="flex">
                                <p className="text-start text-sm md:text-base font-medium mb-2">
                                    Please enter allergies below
                                </p>
                                <span className="text-danger">*</span>
                            </div>
                            <Col span={24} md={19}>
                                <div className="">
                                    <FormGroup
                                        className={`reactSelect !mb-0 ${AllergiesStyles.reactSelect}`}
                                    >
                                        <CreatableSelect
                                            {...{
                                                register,
                                                formState,
                                                control,
                                                id: "allergy",
                                                className:
                                                    "ant-react-select create-table-field",
                                                classNamePrefix:
                                                    "creatable-select",
                                                options: selectOptions,
                                                onInputChange: (
                                                    inputValue: any,
                                                ) => {
                                                    fetchAllergy(inputValue);
                                                },
                                                onChange: (option: any) =>
                                                    setSearchMedicine(
                                                        option?.label,
                                                    ),
                                                isClearable: true,
                                                name: "allergy",
                                                loading: isLoading,
                                                placeholder:
                                                    currentQuestionObj?.qId ===
                                                    "ME_QUE_1"
                                                        ? "Search or add medications"
                                                        : "Search or add medical condition",
                                                styles: {
                                                    menuPortal: (base) => ({
                                                        ...base,
                                                        zIndex: 99999,
                                                    }),
                                                },
                                            }}
                                            key={allergy}
                                        />
                                    </FormGroup>
                                </div>
                            </Col>
                            <Col span={24} md={5}>
                                <Button
                                    disabled={!searchMedicine}
                                    className={`btn-primary ml-5 mt-7 md:mt-0 !h-[36px] ${AllergiesStyles.buttonHoverEffect}`}
                                    onClick={() => {
                                        if (
                                            !medicines?.find(
                                                (item: any) =>
                                                    item?.key ===
                                                    searchMedicine,
                                            )
                                        ) {
                                            setAllergy(
                                                (prevKey) => prevKey + 1,
                                            );
                                            setMedicines((d: any) => {
                                                return [
                                                    ...d,
                                                    {
                                                        key: searchMedicine,
                                                        value: "",
                                                    },
                                                ];
                                            });
                                            setValue("allergy", "");
                                            setSearchMedicine("");
                                        } else {
                                            message.warning(
                                                "Allergy already added",
                                            );
                                        }
                                    }}
                                >
                                    Add
                                </Button>
                            </Col>
                        </Row>
                        <div className="flex items-start md:items-center justify-between mt-9 mx-auto w-full md:w-[640px]">
                            <p className="text-start text-sm md:text-base font-bold w-1/2 md:w-auto">
                                Allergy name
                            </p>
                            <p className="text-start text-sm md:text-base font-bold w-[50%] md:w-[55%]">
                                Nature of allergic reaction
                            </p>
                        </div>
                    </div>
                )}

            {currentQuestionObj &&
                currentQuestionObj?.answers &&
                currentQuestionObj?.answers?.some(
                    (a: any) =>
                        a ===
                        `${
                            currentQuestionObj?.options?.[
                                currentQuestionObj?.options.length - 2
                            ].key
                        }`,
                ) && (
                    <div className="mt-7 mx-auto w-full md:w-[640px]">
                        {medicines &&
                            medicines?.map((medicine: any) => (
                                <div className="flex items-start justify-between mt-4">
                                    <div className="flex items-center w-[44%] md:w-[44%]">
                                        <p className="ml-5 capitalize text-start text-sm md:text-base font-medium circleSecondaryTop">
                                            {(medicine?.key).replace(/_/g, " ")}
                                        </p>
                                    </div>
                                    <div className="flex items-start w-[50%]">
                                        <FormGroup
                                            className={`!mb-4 w-full ${AllergiesStyles.textarea}`}
                                        >
                                            <TextAreaField
                                                {...{
                                                    register,
                                                    formState,
                                                    defaultValue:
                                                        medicine?.value,
                                                    id: medicine?.key,
                                                    label: "",
                                                    maxLength: 9999,
                                                    value: medicine.value,
                                                    placeholder: "Enter here",
                                                    setValue,
                                                    className:
                                                        "w-full  overflow-y-auto",
                                                    onChange: (e: any) => {
                                                        {
                                                            const updatedArray = medicines?.map(
                                                                (item: any) => {
                                                                    if (
                                                                        item?.key ===
                                                                        medicine?.key
                                                                    ) {
                                                                        // Toggle the selected property for the matching item
                                                                        return {
                                                                            ...item,
                                                                            value:
                                                                                e
                                                                                    ?.target
                                                                                    ?.value,
                                                                        };
                                                                    }
                                                                    return item;
                                                                },
                                                            );

                                                            // Update the state with the new array
                                                            setMedicines(
                                                                updatedArray,
                                                            );
                                                        }
                                                    },
                                                }}
                                            />
                                        </FormGroup>
                                        <div
                                            onClick={() => {
                                                setMedicines((d: any) => {
                                                    return d.filter(
                                                        (m: any) =>
                                                            m?.key !==
                                                            medicine?.key,
                                                    );
                                                });
                                                setValue(
                                                    `${medicine?.key}`,
                                                    "",
                                                );
                                            }}
                                        >
                                            <DeleteIcon className="w-5 h-5 ml-4 cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
        </>
    );
};

export default Allergies;
