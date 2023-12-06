import { useForm } from "react-hook-form";
import { Col, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
    CheckBoxField,
    FormGroup,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";

const Symptoms = () => {
    const { register, formState } = useForm();

    return (
        <>
            <h1 className="text-2xl font-bold text-secondary">
                Which of the following best describes your symptoms?
            </h1>
            <Row className="mb-5 mt-5">
                <Col span={7} className="text-start"></Col>
                <Col span={17} className="text-start">
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "Pain",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "one",
                                label: "Trouble getting an erection",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "erection",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "two",
                                label: "Trouble maintaining an erection",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "ejaculation",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "three",
                                label: "Premature ejaculation",
                            }}
                        />
                    </div>
                    <div className="mt-7">
                        <CheckBoxField
                            {...{
                                register,
                                formState,
                                name: "other",
                                type: "Checkbox",
                                className: "mt-1 mr-2",
                                id: "four",
                                label: "Other",
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <div className="mt-10">
                <div className="flex mb-2">
                    <p className="text-lg">
                        What are your other symptoms? Please describe here
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

export default Symptoms;
