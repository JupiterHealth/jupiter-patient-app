import { optionType, questionObj } from "@redux/slices/assessment";
import { Button, Checkbox, Col, Row, message } from "antd";
import {
    CreatableSelectField,
    FormGroup,
    InputRadioField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { DeleteIcon } from "jupiter-commons/src/components/theme/icons/deleteIcon";
import { useState } from "react";
import medicationStyles from "./allergiesStyles.module.scss";
import CreatableSelect from "react-select/creatable";

export interface MedicationProps {
    currentQuestionObj: questionObj;
    setCurrentQuestionObj: (d?: any) => void;
    register: (d?: any) => void;
    formState: any;
    medicines: any;
    setMedicines: (d?: any) => void;
    control?: any;
    unregister: (d?: any) => void;
    setValue?: any;
    selectOptions?: any;
    fetchSupplements: any;
    isLoading?: boolean;
}

const Medication = (props: MedicationProps) => {
    const {
        currentQuestionObj,
        setCurrentQuestionObj,
        register,
        formState,
        medicines,
        setMedicines,
        control,
        unregister,
        setValue,
        selectOptions,
        fetchSupplements,
        isLoading,
    } = props;
    const [searchMedicine, setSearchMedicine] = useState<any>("");
    const [medicalCondition, setMedicalCondition] = useState(0);
    const [medicationData, setMedicationData] = useState<any[]>(selectOptions);

    return (
        <>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
                {currentQuestionObj?.question}
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
                            <Col span={24} md={19}>
                                <div className="relative">
                                    <div className="flex">
                                        {currentQuestionObj?.qId ===
                                        "ME_QUE_1" ? (
                                            <p className="text-start text-sm md:text-base font-medium mb-2">
                                                Please enter medications below
                                            </p>
                                        ) : (
                                            <p className="text-start text-sm md:text-base font-medium mb-2">
                                                Please enter medical condition
                                                below
                                            </p>
                                        )}
                                        <span className="text-danger">*</span>
                                    </div>
                                    {currentQuestionObj?.qId === "ME_QUE_1" ? (
                                        <FormGroup className="reactSelect !mb-0">
                                            <CreatableSelectField
                                                {...{
                                                    register,
                                                    formState,
                                                    control,
                                                    id: "medication",
                                                    options: medicationData,
                                                    onSelectChange: (
                                                        option: any,
                                                    ) =>
                                                        setSearchMedicine(
                                                            option?.value,
                                                        ),
                                                    placeholder:
                                                        "Search or add medications",
                                                    isClearable: false,
                                                    name: "medication",
                                                }}
                                                isClearable={true}
                                            />
                                        </FormGroup>
                                    ) : (
                                        <FormGroup
                                            className={`reactSelect !mb-0 ${medicationStyles.reactSelect}`}
                                        >
                                            <CreatableSelect
                                                {...{
                                                    register,
                                                    formState,
                                                    control,
                                                    id: "medicalCondition",
                                                    options: selectOptions,
                                                    className:
                                                        "ant-react-select",
                                                    onInputChange: (
                                                        inputValue: any,
                                                    ) => {
                                                        fetchSupplements(
                                                            inputValue,
                                                        );
                                                    },
                                                    onChange: (option: any) =>
                                                        setSearchMedicine(
                                                            option?.label,
                                                        ),
                                                    placeholder:
                                                        "Search or add medical condition",
                                                    isClearable: true,
                                                    name: "medicalCondition",
                                                    loading: isLoading,
                                                    styles: {
                                                        menu: (base) => ({
                                                            ...base,
                                                            zIndex: 99999,
                                                        }),
                                                    },
                                                }}
                                                key={medicalCondition}
                                            />
                                        </FormGroup>
                                    )}
                                </div>
                            </Col>
                            <Col span={24} md={5} className="md:pl-5">
                                <Button
                                    className={`btn-primary !h-[38px] mt-[30px] ${medicationStyles.buttonHoverEffect}`}
                                    disabled={!searchMedicine}
                                    onClick={() => {
                                        const newMedicine = {
                                            key: searchMedicine,
                                            selected: false,
                                        };

                                        if (
                                            !medicines.find(
                                                (item: any) =>
                                                    item.key ===
                                                    newMedicine.key,
                                            )
                                        ) {
                                            setMedicalCondition(
                                                (prevKey) => prevKey + 1,
                                            );
                                            setMedicines(
                                                (prevMedicines: any) => [
                                                    ...prevMedicines,
                                                    newMedicine,
                                                ],
                                            );
                                            setValue("medication", "");
                                            setSearchMedicine("");
                                        } else {
                                            message.warning(
                                                currentQuestionObj?.qId ===
                                                    "ME_QUE_1"
                                                    ? "Medicine already added"
                                                    : "Medical Condition already added",
                                            );
                                        }
                                    }}
                                >
                                    Add
                                </Button>
                            </Col>
                        </Row>
                        <div className="mt-9">
                            <div className="text-start tex-sm md:text-base font-bold w-full">
                                {currentQuestionObj?.qId === "ME_QUE_1" ? (
                                    <Row className="flex items-center justify-between">
                                        <Col span={12} md={19}>
                                            Medication name
                                        </Col>
                                        <Col
                                            span={12}
                                            md={5}
                                            className="text-center pl-5"
                                        >
                                            To treat pain
                                        </Col>
                                    </Row>
                                ) : (
                                    <Row>
                                        <Col span={24} md={19}>
                                            Medical condition name
                                        </Col>
                                    </Row>
                                )}
                            </div>
                            {medicines &&
                                medicines.map((medicine: any) => (
                                    <Row className="flex items-center justify-between mt-4">
                                        <Col
                                            span={12}
                                            md={19}
                                            className="flex items-center"
                                        >
                                            <p className="ml-5 text-start capitalize w-full text-sm md:text-base font-medium circleSecondaryTop">
                                                {(medicine?.key).replace(
                                                    /_/g,
                                                    " ",
                                                )}
                                            </p>
                                        </Col>
                                        <Col
                                            span={12}
                                            md={5}
                                            className="flex items-center justify-center pl-5"
                                        >
                                            {currentQuestionObj?.qId ===
                                                "ME_QUE_1" && (
                                                <Checkbox
                                                    onChange={(e: any) => {
                                                        const updatedArray = medicines.map(
                                                            (item: any) => {
                                                                if (
                                                                    item.key ===
                                                                    medicine?.key
                                                                ) {
                                                                    // Toggle the selected property for the matching item
                                                                    return {
                                                                        ...item,
                                                                        selected: !item.selected,
                                                                    };
                                                                }
                                                                return item;
                                                            },
                                                        );

                                                        // Update the state with the new array
                                                        setMedicines(
                                                            updatedArray,
                                                        );
                                                    }}
                                                    checked={medicine.selected}
                                                    defaultChecked
                                                ></Checkbox>
                                            )}
                                            <div
                                                onClick={() => {
                                                    setMedicines((d: any) => {
                                                        return d.filter(
                                                            (m: any) =>
                                                                m?.key !==
                                                                medicine?.key,
                                                        );
                                                    });
                                                }}
                                            >
                                                <DeleteIcon className="w-5 h-5 ml-4 cursor-pointer" />
                                            </div>
                                        </Col>
                                    </Row>
                                ))}
                        </div>
                    </div>
                )}
        </>
    );
};

export default Medication;
