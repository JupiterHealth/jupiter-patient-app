import { fetchTreatmentAPI } from "@redux/services/assessment.api";
import { treatmentType } from "@redux/slices/assessment";
import { Spin } from "antd";
import {
    FormGroup,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { useEffect, useState } from "react";
import TreatmentStyle from "./treatmentStyle.module.scss";
import { convertToTitleCaseAndRemoveUnderscore } from "jupiter-commons/src/components/libs/helpers";

export interface TreatmentOptionProps {
    selectedTreatment: treatmentType;
    setSelectedTreatment: (d: any) => any;
    assessMentDetails?: any;
    formState?: any;
    register: (d: any) => any;
    assessmentId: string;
    setValue?: any;
    setProduct: (d: any) => any;
}

const TreatmentOption = (props: TreatmentOptionProps) => {
    const {
        selectedTreatment,
        setSelectedTreatment,
        assessMentDetails,
        formState,
        register,
        assessmentId,
        setValue,
        setProduct,
    } = props;

    const { questions } = assessMentDetails;
    const [finalAmount, setFinalAmount] = useState<any>(null);
    const [conditonLevel, setConditionLevel] = useState("MILD");
    const [condition, setCondition] = useState<any>("");
    const [
        loadingTreatmentOptions,
        setLoadingTreatentOptions,
    ] = useState<boolean>(false);

    const [treatmentOptions, setTreatmentOptions] = useState<any>([]);

    const calculateAmount = () => {
        let v1 = 0,
            v2 = 0,
            v3 = 0;
        const queG1: any = questions.find((q: any) => q.qId === "QUE_G_1");

        if (queG1?.answers?.includes("QUE_G_1_ANS_1")) {
            v1 = 0.5;
        }

        if (queG1?.answers?.includes("QUE_G_1_ANS_2")) {
            v1 = 1;
        }

        if (queG1?.answers?.includes("QUE_G_1_ANS_3")) {
            v1 = 2;
        }

        if (queG1?.answers?.includes("QUE_G_1_ANS_4")) {
            v1 = 0;
        }

        const queG3: any = questions.find((q: any) => q.qId === "QUE_G_3");

        if (queG3?.answers?.includes("QUE_G_3_ANS_1")) {
            v3 = v3 + 1;
        }

        if (queG3?.answers?.includes("QUE_G_3_ANS_2")) {
            v3 = v3 + 1;
        }

        if (queG3?.answers?.includes("QUE_G_3_ANS_3")) {
            v3 = v3 + 1;
        }

        if (queG3?.answers?.includes("QUE_G_3_ANS_4")) {
            v3 = 3;
        }

        const queG2: any = questions.find((q: any) => q.qId === "QUE_G_2");

        v2 = Number(queG2?.answers[0]);

        const calculatedAmount = ((v1 * v2 * v3) / 7) * 30;
        setFinalAmount(Math.round(calculatedAmount / 50) * 50);

        // LOGIC FOR CONDITION

        const queP1: any = questions.find((q: any) => q.qId === "QUE_P_1");
        const queP2: any = questions.find((q: any) => q.qId === "QUE_P_2");

        if (queP2?.answers.includes("QUE_P_2_ANS_12")) {
            setConditionLevel("ADVANCED1");
        }
        if (queP1?.answers[0] <= 6) {
            setConditionLevel("MILD");
        }
        if (queP1?.answers[0] >= 7) {
            setConditionLevel("SEVERE");
        }

        const answerCategories: any[] = queP2?.answers.map((answerKey: any) => {
            const option = queP2?.options.find(
                (option: any) => option.key === answerKey,
            );
            return option ? option.category : null;
        });
        const uniqueCategories = Array.from(new Set(answerCategories));
        if (queP2?.answers.includes("QUE_P_2_ANS_12")) {
            setCondition("NEUROPATHIC_PAIN");
            setConditionLevel("ADVANCED1");
        } else if (uniqueCategories.length === 1) {
            setCondition(uniqueCategories[0].toUpperCase() + "_PAIN");
        } else if (uniqueCategories.length > 1) {
            if (
                uniqueCategories.includes("Musculoskeletal") &&
                uniqueCategories.includes("Inflammatory") &&
                uniqueCategories.includes("Neuropathic")
            ) {
                setCondition("MIXED_PAIN");
            } else if (
                uniqueCategories.includes("Musculoskeletal") &&
                uniqueCategories.includes("Inflammatory")
            ) {
                setCondition("MUSCULOSKELETAL_PAIN");
            } else {
                setCondition("MIXED_PAIN");
            }
        }
    };
    const queP2: any = questions.find((q: any) => q.qId === "QUE_P_2");
    const answerCategories: any[] = queP2?.answers.map((answerKey: any) => {
        const option = queP2?.options.find(
            (option: any) => option.key === answerKey,
        );
        return option ? option.category : null;
    });

    const uniqueCategories = Array.from(new Set(answerCategories));

    let recommendationMessage =
        "Based on the information provided, your symptoms appear to be consistent with ";

    if (uniqueCategories.length === 1) {
        recommendationMessage += `${uniqueCategories[0]} pain. We recommend the following medication option(s):`;
    } else if (uniqueCategories.length > 1) {
        recommendationMessage += `a combination of ${uniqueCategories.join(
            " and ",
        )} pain. We recommend the following medication option(s):`;
    } else {
        recommendationMessage +=
            "an unspecified type of pain. Please consult a healthcare professional for a proper diagnosis and medication recommendation";
    }

    const handleFetchTreatmentOptions = async () => {
        try {
            setLoadingTreatentOptions(true);
            const treatMentOptionsRes = await fetchTreatmentAPI(
                {
                    dosage: finalAmount < 50 ? "50" : finalAmount.toString(),
                    dosageUnit: "G",
                    conditionLevel: conditonLevel,
                    condition: condition,
                },
                assessmentId,
            );
            const treatmentResponseProductId = treatMentOptionsRes?.product?.map(
                (prodId: any) => prodId?.id,
            );

            if (treatMentOptionsRes) {
                setTreatmentOptions(treatMentOptionsRes?.product);
                setProduct(treatMentOptionsRes);
                setSelectedTreatment((d: any) => {
                    return {
                        ...d,
                        productId: treatmentResponseProductId,
                    };
                });
            }
            setLoadingTreatentOptions(false);
        } catch (error) {
            console.log(error, "error");
            setLoadingTreatentOptions(false);
        }
    };

    useEffect(() => {
        calculateAmount();
    }, []);

    useEffect(() => {
        if (condition) {
            handleFetchTreatmentOptions();
        }
    }, [condition]);

    return (
        <>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
                Prescription Treatment Options
            </h1>
            <p className="text-sm md:text-base pt-2 font-medium">
                {recommendationMessage}
            </p>
            <div
                className={`bg-[#e7f0fa] rounded-[10px] mt-5 md:mt-9 mb-8 p-3 ${TreatmentStyle.circleSecondary}`}
            >
                <p className="font-medium text-xs text-left opacity-100 circleSecondaryTop ml-8">
                    The prices shown are without insurance coverage. If you are
                    prescribed medication, we will apply your insurance benefits
                    accordingly.
                </p>

                <p className="font-medium text-xs text-left opacity-100 circleSecondaryTop ml-8 mt-2">
                    A healthcare professional will prescribe the displayed
                    medication only if it is considered suitable for your
                    condition.
                </p>

                <p className="font-medium text-xs text-left opacity-100 circleSecondaryTop ml-8 mt-2">
                    A prescription is not guaranteed.
                </p>
            </div>
            {loadingTreatmentOptions && <Spin className="mt-4" />}
            {!loadingTreatmentOptions &&
                treatmentOptions &&
                treatmentOptions?.length === 0 && <p>No data found</p>}
            {!loadingTreatmentOptions &&
                treatmentOptions &&
                treatmentOptions[0]?.id &&
                treatmentOptions.map((treatment: any) => (
                    <div className="border border-input-border mt-7 rounded-[10px] pt-4 pb-6 px-5">
                        <div className="text-base md:text-lg text-start font-semibold">
                            <h1 className="text-base md:text-lg text-start font-semibold">
                                {treatment?.name} -{" "}
                                {treatment?.dosageUnit !== "NUMBER" &&
                                    convertToTitleCaseAndRemoveUnderscore(
                                        treatment?.form,
                                    )}{" "}
                                {treatment?.selectAvailability ===
                                    "COMPOUNDED" &&
                                    `(${convertToTitleCaseAndRemoveUnderscore(
                                        treatment?.selectAvailability,
                                    )})`}{" "}
                                | {treatment?.dosage}{" "}
                                {treatment?.dosageUnit !== "NUMBER"
                                    ? (treatment?.dosageUnit).toLowerCase()
                                    : convertToTitleCaseAndRemoveUnderscore(
                                          treatment.form,
                                      )}
                            </h1>
                        </div>
                        <p className="text-start text-sm md:text-sm font-semibold pt-4 xl:pt-2">
                            {treatment?.activeIngredients[0]}
                        </p>
                        <div className="mt-6 w-full flex flex-row">
                            <div className="w-[130px] md:w-[140px] lg:w-[190px]">
                                <div className="ring-1 ring-input-border mt-1 mx-auto flex justify-center rounded-[10px] w-[75px] h-[75px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] xl:w-[150px] xl:h-[150px]">
                                    <img
                                        src={
                                            treatment?.image[0]?.description ??
                                            "/images/bottle.png"
                                        }
                                        className="object-contain !rounded-[10px] w-[75px] h-[75px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] xl:w-[150px] xl:h-[150px]"
                                    />
                                </div>
                            </div>
                            <p className="block md:hidden font-bold text-sm lg:text-base mb-3 text-left ml-6">
                                {treatment?.directions ?? ""}
                            </p>
                            <div className="hidden md:block pl-5 w-full">
                                <div className="text-start">
                                    <p className="font-bold text-sm lg:text-base mb-3">
                                        {treatment?.directions ?? ""}
                                    </p>
                                    <div className="flex flex-col items-left">
                                        {treatment?.description[0] &&
                                            treatment?.description[0]
                                                ?.split("\n")
                                                ?.map((i: any) => (
                                                    <p
                                                        className={`font-medium text-sm lg:text-base ${
                                                            i &&
                                                            "circleSecondaryTop"
                                                        } ml-5`}
                                                    >
                                                        {i}
                                                    </p>
                                                ))}
                                    </div>
                                    <div className="flex justify-between mt-4 xl:mt-7 text-sm lg:text-lg text-danger font-bold">
                                        <h1 className="text-secondary font-bold mr-2 text-sm lg:text-lg">
                                            ${(treatment.price / 30).toFixed(2)}{" "}
                                            per day{" "}
                                            <span className="font-medium">
                                                (without insurance)
                                            </span>
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="block md:hidden pt-6 pl-5 w-full">
                            <div className="text-start">
                                <p className="hidden font-bold text-sm lg:text-base mb-3">
                                    {treatment?.directions ?? ""}
                                </p>
                                <div className="flex flex-col items-left">
                                    {treatment?.description[0] &&
                                        treatment?.description[0]
                                            ?.split("\n")
                                            ?.map((i: any) => (
                                                <p
                                                    className={`font-medium text-sm lg:text-base ${
                                                        i &&
                                                        "circleSecondaryTop"
                                                    } ml-5`}
                                                >
                                                    {i}
                                                </p>
                                            ))}
                                </div>
                                <div className="flex justify-between mt-4 xl:mt-7 text-sm lg:text-lg text-danger font-bold">
                                    <h1 className="text-secondary font-bold mr-2 text-sm lg:text-lg">
                                        ${(treatment.price / 30).toFixed(2)} per
                                        day{" "}
                                        <span className="font-medium">
                                            (without insurance)
                                        </span>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            <div className="mt-6 xl:mt-10">
                <div className="flex mb-2">
                    <p className="text-sm md:text-base font-medium">
                        Comments for your prescriber
                    </p>
                </div>
                <FormGroup className="!mb-4">
                    <TextAreaField
                        {...{
                            register,
                            formState,
                            maxLength: 9999,
                            id: "commentForPrescriber",
                            label: "",
                            className: "capitalize w-full",
                            placeholder: "Enter here",
                            setValue,
                        }}
                    />
                </FormGroup>
            </div>
        </>
    );
};

export default TreatmentOption;
