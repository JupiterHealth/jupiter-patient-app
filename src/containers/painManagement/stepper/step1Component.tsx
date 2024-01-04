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
    watchFields: any;
    assessMentDetails: any;
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
        watchFields,
        assessMentDetails,
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
                        watchFields,
                        assessMentDetails,
                    }}
                />
            )}
            {activeQuestionId === "begin_assessment" && <AssessmentComponent />}
        </>
    );
};

export default Step1Component;
