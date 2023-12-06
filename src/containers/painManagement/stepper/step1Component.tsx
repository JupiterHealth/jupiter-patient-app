import AssessmentComponent from "@components/profileComponent/assessmentComponent";
import ProfileComponent from "@components/profileComponent/profileComponent";

export interface Step1ComponentProps {
    activeQuestionId?: string;
    formState: any;
    register: (d: any) => void;
    handleSubmit: (d: any) => void;
    control: any;
    setSelectedOption: (d: any) => any;
    onSubmit: (d: any) => any;
    selectedOption: string;
    assessMentDetails: any;
    watchFields: any;
}

const Step1Component = (props: Step1ComponentProps) => {
    const {
        activeQuestionId,
        formState,
        register,
        handleSubmit,
        control,
        setSelectedOption,
        onSubmit,
        selectedOption,
        assessMentDetails,
        watchFields,
    } = props;
    return (
        <>
            {activeQuestionId === "my-profile" && (
                <ProfileComponent
                    {...{
                        formState,
                        register,
                        handleSubmit,
                        control,
                        setSelectedOption,
                        onSubmit,
                        selectedOption,
                        assessMentDetails,
                        watchFields,
                    }}
                />
            )}
            {activeQuestionId === "begin_assessment" && <AssessmentComponent />}
        </>
    );
};

export default Step1Component;
