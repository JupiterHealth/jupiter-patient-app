import { BackBodyComponent } from "@components/bodyComponent/backBodyComponent";
import { FrontBodyComponent } from "@components/bodyComponent/frontBodyComponent";
import { questionObj } from "@redux/slices/assessment";
import { Col, Row } from "antd";
import {
    FormGroup,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import PainQuestionsStyle from "../painQuestionsStyle.module.scss";

export interface DiagramProps {
    currentQuestionObj: questionObj;
    setCurrentQuestionObj: (d?: any) => void;
    register: (d?: any) => void;
    formState: any;
    watch: any;
    frontParts?: any;
    setFrontParts: (d?: any) => any;
    backParts?: any;
    setBackParts: (d?: any) => any;
    handleTextareaChange: (d?: any) => any;
    setValue: any;
}

const Diagram = (props: DiagramProps) => {
    const {
        currentQuestionObj,
        setCurrentQuestionObj,
        frontParts,
        setFrontParts,
        backParts,
        setBackParts,
        formState,
        register,
        handleTextareaChange,
        setValue,
    } = props;

    return (
        <>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
                Please select the location(s) of your pain on the diagram below:
            </h1>
            <p className="text-lg xl:text-2xl font-medium text-secondary">
                (as many areas as apply)
            </p>
            <Row className="mt-5 md:mt-9">
                <Col span={24} md={24} xl={12}>
                    <FrontBodyComponent
                        {...{
                            currentQuestionObj,
                            setCurrentQuestionObj,
                            frontParts,
                            setFrontParts,
                        }}
                    />
                </Col>
                <Col span={24} md={24} xl={12}>
                    <BackBodyComponent
                        {...{
                            currentQuestionObj,
                            setCurrentQuestionObj,
                            backParts,
                            setBackParts,
                        }}
                    />
                </Col>
            </Row>
            <div className="mt-10">
                <div className="flex mb-2">
                    <p className="text-base font-medium text-left">
                        Provide additional details if required (i.e. left knee)
                    </p>
                </div>
                <FormGroup
                    className={`!mb-4 ${PainQuestionsStyle.textareaPainQuestions}`}
                >
                    <TextAreaField
                        {...{
                            register,
                            formState,
                            id: "otherText",
                            label: "",
                            maxLength: 9999,
                            className: "w-full",
                            defaultValue: currentQuestionObj?.answers.find(
                                (answer) => answer?.Other,
                            )?.Other,
                            placeholder: "Enter here",
                            setValue,
                            onChange: (e: any) => {
                                handleTextareaChange(e);
                            },
                        }}
                    />
                </FormGroup>
            </div>
        </>
    );
};

export default Diagram;
