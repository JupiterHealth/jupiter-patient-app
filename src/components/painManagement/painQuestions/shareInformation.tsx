import {
    AssessmentTextAreaField,
    FormGroup,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";

export interface ShareInformationProps {
    currentQuestionObj: any;
    register: (d?: any) => void;
    formState: any;
    watch: any;
    handleTextareaChange: (d?: any) => void;
    setValue?: any;
}

const ShareInformation = (props: ShareInformationProps) => {
    const {
        register,
        formState,
        currentQuestionObj,
        handleTextareaChange,
        setValue,
    } = props;
    return (
        <>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary mx-auto md:w-[730px]">
                Do you have any questions or additional information you would
                like to share with the medical practitioner?
            </h1>
            <div className="mt-5 md:mt-9 md:w-[650px] mx-auto">
                <div className="flex mb-2">
                    <p className="text-base">Please enter details below</p>
                </div>
                <FormGroup className="!mb-4">
                    <AssessmentTextAreaField
                        {...{
                            register,
                            formState,
                            id: "otherText",
                            label: "",
                            className: "w-full",
                            maxLength: 9999,
                            defaultValue: currentQuestionObj?.answers.find(
                                (answer: any) => answer?.Other,
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

export default ShareInformation;
