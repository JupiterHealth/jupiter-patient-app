import { fetchTreatmentAPI } from "@redux/services/assessment.api";
import { Button, Spin } from "antd";
import { convertToTitleCaseAndRemoveUnderscore } from "jupiter-commons/src/components/libs/helpers";
import { CheckCircleIcon } from "jupiter-commons/src/components/theme/icons/checkCircleIcon";
import { DeleteIcon } from "jupiter-commons/src/components/theme/icons/deleteIcon";
import { useEffect, useState } from "react";

export interface ComplimentingSupplementsProps {
    selectedTreatment: any;
    setSelectedTreatment: (d: any) => any;
    assessMentDetails?: any;
    assessmentId: string;
}

const ComplimentingSupplements = (props: ComplimentingSupplementsProps) => {
    const {
        selectedTreatment,
        setSelectedTreatment,
        assessMentDetails,
        assessmentId,
    } = props;
    const { questions } = assessMentDetails;
    const [
        loadingTreatmentOptions,
        setLoadingTreatentOptions,
    ] = useState<boolean>(false);

    const [treatmentOptions, setTreatmentOptions] = useState<any>([]);

    const [finalAmount, setFinalAmount] = useState<any>(null);
    const [conditonLevel, setConditionLevel] = useState("MILD");
    const [condition, setCondition] = useState<any>("");
    const [productAdded, setProductAdded] = useState(false);

    const calculateAmount = () => {
        let v1 = 0,
            v2 = 0,
            v3 = 0;
        const queG1: any = questions.find((q: any) => q.qId === "QUE_G_1");

        if (queG1?.answers.includes("QUE_G_1_ANS_1")) {
            v1 = 0.5;
        }

        if (queG1?.answers.includes("QUE_G_1_ANS_2")) {
            v1 = 1;
        }

        if (queG1?.answers.includes("QUE_G_1_ANS_3")) {
            v1 = 2;
        }

        if (queG1?.answers.includes("QUE_G_1_ANS_4")) {
            v1 = 0;
        }

        const queG3: any = questions.find((q: any) => q.qId === "QUE_G_3");

        if (queG3?.answers.includes("QUE_G_3_ANS_1")) {
            v3 = v3 + 1;
        }

        if (queG3?.answers.includes("QUE_G_3_ANS_2")) {
            v3 = v3 + 1;
        }

        if (queG3?.answers.includes("QUE_G_3_ANS_3")) {
            v3 = v3 + 1;
        }

        if (queG3?.answers.includes("QUE_G_3_ANS_4")) {
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

    const handleSelectsupplementIds = (treatment: any) => {
        if (
            selectedTreatment &&
            !selectedTreatment?.supplementIds?.includes(treatment.id)
        ) {
            const newData = {
                supplementIds: [
                    ...selectedTreatment?.supplementIds,
                    treatment.id,
                ],
            };

            const testSupplementIds = treatmentOptions.map(
                (item: any) => item.id,
            );

            // Remove IDs from newData that are not present in testSupplementIds
            newData.supplementIds = newData.supplementIds.filter((suppId) =>
                testSupplementIds.includes(suppId),
            );
            setSelectedTreatment(newData);
            setProductAdded(true);
        } else {
            const updatedSupplementIds = selectedTreatment?.supplementIds?.filter(
                (id: any) => id !== treatment.id,
            );
            const newData = { supplementIds: updatedSupplementIds };
            setSelectedTreatment(newData);
            setProductAdded(false);
        }
        setProductAdded(true);
    };

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
            if (treatMentOptionsRes) {
                setTreatmentOptions(treatMentOptionsRes?.supplements);
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
                Add-on Treatments
            </h1>
            <p className="text-base md:text-[21px] mt-4 md:mt-7 font-bold text-[#875CC8]">
                Complimenting Supplements
            </p>
            {!loadingTreatmentOptions &&
                treatmentOptions &&
                treatmentOptions[0]?.id && (
                    <p className="text-sm md:text-base pt-2 font-medium">
                        The following supplements compliment your prescription
                        treatment
                    </p>
                )}
            {loadingTreatmentOptions && <Spin className="mt-9" />}
            {!loadingTreatmentOptions &&
                treatmentOptions &&
                !treatmentOptions[0]?.id && (
                    <p className="text-sm font-medium pt-3">
                        There are no supplements currently available for this
                        medication
                    </p>
                )}
            {!loadingTreatmentOptions &&
                treatmentOptions &&
                treatmentOptions.map((treatment: any) => (
                    <div className="border border-input-border mt-5 md:mt-9 rounded-[10px] pt-4 pb-6 px-5">
                        <h1 className="text-base md:text-lg text-start font-semibold">
                            {treatment?.name}{" "}
                            {treatment?.dosageUnit !== "NUMBER" && "-"}{" "}
                            {treatment?.dosageUnit !== "NUMBER" &&
                                convertToTitleCaseAndRemoveUnderscore(
                                    treatment?.form,
                                )}{" "}
                            {treatment?.selectAvailability === "COMPOUNDED" &&
                                `"("${convertToTitleCaseAndRemoveUnderscore(
                                    treatment?.selectAvailability,
                                )} ")"`}
                            | {treatment?.dosage}{" "}
                            {treatment?.dosageUnit !== "NUMBER"
                                ? (treatment?.dosageUnit).toLowerCase()
                                : convertToTitleCaseAndRemoveUnderscore(
                                      treatment.form,
                                  )}
                        </h1>
                        <p className="text-start text-sm md:text-base font-semibold">
                            {treatment?.activeIngredients[0]}
                        </p>
                        <div className="mt-6 w-full flex flex-row">
                            <div className="w-[130px] md:w-[140px] lg:w-[190px]">
                                <div className="ring-1 ring-input-border flex justify-center mx-auto rounded-[10px] w-[75px] h-[75px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] xl:w-[150px] xl:h-[150px]">
                                    <img
                                        src={
                                            treatment?.image[0]?.description ??
                                            "/images/bottle.png"
                                        }
                                        className="object-contain rounded-[10px] w-[75px] h-[75px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] xl:w-[150px] xl:h-[150px]"
                                    />
                                </div>
                            </div>
                            <div className="pl-5 w-full">
                                <div className="text-start">
                                    <p className="font-bold text-sm lg:text-base mb-3">
                                        {treatment?.directions ?? ""}
                                    </p>
                                    <div className="flex-col items-left hidden md:flex">
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
                                    <div className="hidden md:flex md:items-center flex-row justify-between mt-2 md:mt-7 text-sm md:text-lg text-danger font-bold">
                                        <div className="flex flex-col">
                                            <h1 className="text-secondary w-32 text-left break-all font-bold mr-2 text-sm md:text-base lg:text-lg md:mb-0">
                                                ${treatment?.price} + tax
                                            </h1>
                                            <h1 className="text-secondary w-32 text-left break-all font-bold mr-2 text-sm md:text-base lg:text-lg mb-4 md:mb-0">
                                                (per unit)
                                            </h1>
                                        </div>
                                        <div className="flex items-baseline">
                                            {selectedTreatment?.supplementIds?.includes(
                                                treatment.id,
                                            ) && (
                                                <div className="flex items-center justify-between">
                                                    <p
                                                        className="underline text-sm lg:text-base mr-5 cursor-pointer"
                                                        onClick={() => {
                                                            handleSelectsupplementIds(
                                                                treatment,
                                                            );
                                                        }}
                                                    >
                                                        REMOVE
                                                    </p>
                                                    <Button className="!bg-success !border-success hover:!bg-transparent hover:!text-success hover:!border-success items-center flex h-8 md:h-10 !text-white text-sm md:text-sm lg:text-base font-semibold rounded-[10px]">
                                                        Added to Cart
                                                    </Button>
                                                </div>
                                            )}
                                            {!selectedTreatment?.supplementIds?.includes(
                                                treatment.id,
                                            ) && (
                                                <Button
                                                    className="bg-primary items-center flex h-10 text-white text-base font-semibold rounded-[10px]"
                                                    onClick={() => {
                                                        handleSelectsupplementIds(
                                                            treatment,
                                                        );
                                                    }}
                                                >
                                                    Add to Cart
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-col items-left flex md:hidden text-start pt-6">
                            {treatment?.description[0] &&
                                treatment?.description[0]
                                    ?.split("\n")
                                    ?.map((i: any) => (
                                        <p
                                            className={`font-medium text-sm lg:text-base ${
                                                i && "circleSecondaryTop"
                                            } ml-5`}
                                        >
                                            {i}
                                        </p>
                                    ))}
                        </div>
                        <div className="flex md:hidden md:items-center flex-row justify-between mt-5 md:mt-7 text-sm md:text-lg text-danger font-bold">
                            <div className="flex flex-col">
                                <h1 className="text-secondary w-15 text-left break-all font-bold mr-2 text-sm md:text-base lg:text-lg md:mb-0">
                                    ${treatment?.price} + tax
                                </h1>
                                <h1 className="text-secondary w-15 text-left break-all font-bold mr-2 text-sm md:text-base lg:text-lg mb-4 md:mb-0">
                                    (per unit)
                                </h1>
                            </div>

                            <div className="flex items-baseline">
                                {selectedTreatment?.supplementIds?.includes(
                                    treatment.id,
                                ) && (
                                    <div className="flex flex-col items-end justify-end w-36">
                                        <DeleteIcon
                                            className="w-[18px] h-[18px] block md:hidden"
                                            onClick={() => {
                                                handleSelectsupplementIds(
                                                    treatment,
                                                );
                                            }}
                                        />
                                        <div className="text-sm text-success mt-1 font-semibold flex justify-end md:hidden">
                                            <CheckCircleIcon className="w-3 h-3 mt-[4px] mr-1" />
                                            Added to cart
                                        </div>
                                    </div>
                                )}
                                {!selectedTreatment?.supplementIds?.includes(
                                    treatment.id,
                                ) && (
                                    <>
                                        <Button
                                            className="bg-primary items-center flex h-10 text-white text-base font-semibold rounded-[10px]"
                                            onClick={() => {
                                                handleSelectsupplementIds(
                                                    treatment,
                                                );
                                            }}
                                        >
                                            Add to Cart
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default ComplimentingSupplements;
