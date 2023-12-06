import { Col, Row } from "antd";
import {
    CheckBoxField,
    FormGroup,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { useForm } from "react-hook-form";

const HappenBeforePain = (props: any) => {
    const {
        register,
        formState,
        currentQuestionObj,
        setCurrentQuestionObj,
    } = props;
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Did any of the following happen before your pain started?
            </h1>
            <Row className="mb-5 mt-5">
                <Col span={6} className="text-start"></Col>
                <Col span={6} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Accident",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "one",
                                label: "Accident",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: " Insect bite",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "two",
                                label: " Insect bite",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Accident",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "three",
                                label: "Medical Condition",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Accident",
                                type: " None",
                                className: "mt-1",
                                id: "four",
                                label: " None of the above",
                            }}
                        />
                    </div>
                </Col>
                <Col span={2} className="text-start"></Col>
                <Col span={10} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Infection",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "five",
                                label: "Infection",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Surgery",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "six",
                                label: "Surgery",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Other",
                                type: "Checkbox",
                                className: "mt-1",
                                id: "seven",
                                label: "Other",
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <div className="mt-10">
                <div className="flex mb-2">
                    <p className="text-lg">
                        If any other please enter details below
                    </p>
                    <span className="text-lg text-[#FF5767]">*</span>
                </div>
                <FormGroup className="!mb-4">
                    <TextAreaField
                        {...{
                            register,
                            formState,
                            id: "textarea",
                            label: "",
                            placeholder: "Enter here",
                        }}
                    />
                </FormGroup>
            </div>
        </>
    );
};

export default HappenBeforePain;
