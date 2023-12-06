import { useForm } from "react-hook-form";
import { Col, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
    CheckBoxField,
    FormGroup,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const WhenExperienceSymptoms = () => {
    const { register, formState } = useForm();

    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                When do you experience these symptoms?
            </h1>
            <Row className="mb-5 mt-5">
                <Col span={7} className="text-start"></Col>
                <Col span={17} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "everytime",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "one",
                                label: "Almost every time I have sex",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "sometime",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "two",
                                label: "Some of the time",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "alcohol",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "three",
                                label: "When I drink alcohol or use cannabis",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "nervous",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "four",
                                label: "When I am nervous",
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
                                className: "mt-1 mr-2",
                                id: "five",
                                label: "Other",
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <div className="mt-10">
                <div className="flex mb-2">
                    <p className="text-lg">
                        What do you experience these symptoms? Please mention
                        here
                    </p>
                    <span className="text-lg text-[#FF5767]">*</span>
                </div>
                <FormGroup className="!mb-4">
                    <TextArea
                        placeholder="Enter here"
                        className="text-lg rounded-[10px]"
                    />
                </FormGroup>
            </div>
        </>
    );
};

export default WhenExperienceSymptoms;
