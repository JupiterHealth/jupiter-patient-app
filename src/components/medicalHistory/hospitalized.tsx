import { optionType, questionObj } from "@redux/slices/assessment";
import {
    AssessmentTextAreaField,
    FormGroup,
    InputRadioField,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";

export interface HospitalizedProps {
    currentQuestionObj: questionObj;
    setCurrentQuestionObj: (d?: any) => void;
    register: (d?: any) => void;
    formState: any;
    medicines: any;
    setMedicines: (d?: any) => void;
    setValue?: any;
}

const Hospitalized = (props: HospitalizedProps) => {
    const {
        currentQuestionObj,
        setCurrentQuestionObj,
        register,
        formState,
        medicines,
        setMedicines,
        setValue,
    } = props;

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
                                <div className="flex mb-6 last:mb-0 radioLabel">
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
                    <div className="mt-10 w-full md:w-[600px] mx-auto">
                        <FormGroup className="!mb-4">
                            <AssessmentTextAreaField
                                {...{
                                    register,
                                    formState,
                                    id: "otherText",
                                    maxLength: 9999,
                                    label: "Please enter details below",
                                    className: "w-full md:w-[600px]",
                                    placeholder: "Enter here",
                                    setValue,
                                    onChange: (e: any) => {
                                        setMedicines((d: any) => {
                                            return e?.target?.value;
                                        });
                                    },
                                }}
                            />
                        </FormGroup>
                    </div>
                )}
        </>
    );
};

export default Hospitalized;
