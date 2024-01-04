import React, { useEffect, useState } from "react";
import { treatmentType } from "@redux/slices/assessment";
import { Button, Spin } from "antd";
import { convertToTitleCaseAndRemoveUnderscore } from "jupiter-commons/src/components/libs/helpers";
import {
    FormGroup,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { fetchTreatmentAPI } from "@redux/services/assessment.api";
import { CONDITION_ENUM } from "jupiter-commons/src/components/libs/constants";

export interface HairRegrowthTreatmentOptionsProps {
    selectedTreatment: treatmentType;
    setSelectedTreatment: (d: any) => any;
    formState?: any;
    register: (d: any) => any;
    assessmentId: string;
    setValue?: any;
    setProduct: (d: any) => any;
    setSelectedProduct: (d: any) => void;
    selectedProduct: treatmentType;
    assessMentDetails?: any;
}

const HairRegrowthTreatmentOptions = (
    props: HairRegrowthTreatmentOptionsProps,
) => {
    const {
        selectedTreatment,
        setSelectedTreatment,
        formState,
        register,
        assessmentId,
        setValue,
        setProduct,
        setSelectedProduct,
        selectedProduct,
        assessMentDetails,
    } = props;

    const { questions } = assessMentDetails;
    const [
        loadingTreatmentOptions,
        setLoadingTreatentOptions,
    ] = useState<boolean>(false);
    const [treatmentOptions, setTreatmentOptions] = useState<any>([]);
    const [conditonLevel, setConditionLevel] = useState<any>([
        "MILD",
        "SEVERE",
    ]);

    const handleFetchTreatmentOptions = async () => {
        try {
            setLoadingTreatentOptions(true);
            const que8: any = questions.find((q: any) => q.qId === "QUE_8");
            const que11: any = questions.find((q: any) => q.qId === "QUE_11");

            if (
                que8?.answers.includes("QUE_8_ANS_6") ||
                que11?.answers.includes("QUE_11_ANS_1") ||
                (que8?.answers.includes("QUE_8_ANS_6") &&
                    que11?.answers.includes("QUE_11_ANS_1"))
            ) {
                setConditionLevel("MILD");
            }

            // Check if all conditions are true
            const treatMentOptionsRes = await fetchTreatmentAPI(
                {
                    conditionLevel: conditonLevel,
                    condition: CONDITION_ENUM.HAIR_REGROWTH,
                    assessmentId: assessmentId,
                },
                assessmentId,
            );

            if (treatMentOptionsRes) {
                setTreatmentOptions(treatMentOptionsRes?.product);
                setProduct(treatMentOptionsRes);
                setSelectedTreatment((d: any) => ({
                    ...d,
                    productId: treatMentOptionsRes?.product?.id,
                }));
            }

            setLoadingTreatentOptions(false);
        } catch (error) {
            console.error(error, "error");
            setLoadingTreatentOptions(false);
        }
    };

    //Function to initialize products by id
    const handleSelectProductIds = (treatment: any) => {
        setSelectedProduct((prevSelectedProduct: any) => {
            const updatedProduct = { ...prevSelectedProduct };

            if (!updatedProduct?.productId) {
                updatedProduct.productId = [];
            }

            const lastSelectedProductId = updatedProduct?.productId[0];

            if (lastSelectedProductId === treatment?.id) {
                // If the last selected product is the same as the newly selected one, remove it
                updatedProduct?.productId.splice(0, 1);
            } else {
                // If the last selected product is different, replace it with the newly selected one
                updatedProduct.productId[0] = treatment?.id;
            }

            return { ...updatedProduct };
        });
    };

    useEffect(() => {
        handleFetchTreatmentOptions();
    }, []);

    return (
        <>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
                Prescription Treatment Options
            </h1>
            <div
                className={`bg-[#e7f0fa] rounded-[10px] mt-5 md:mt-9 mb-8 p-3 `}
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
                treatmentOptions?.map((treatment: any) => (
                    <div className="pb-6">
                        <>
                            <div className="border border-input-border mt-7 rounded-[10px] pt-4 pb-6 px-5 ">
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
                                                    treatment?.image[0]
                                                        ?.description ??
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
                                                    $
                                                    {(
                                                        treatment.price / 30
                                                    ).toFixed(2)}{" "}
                                                    per day{" "}
                                                    <span className="font-medium">
                                                        (without insurance)
                                                    </span>
                                                </h1>
                                            </div>
                                            <div className="flex items-baseline justify-end">
                                                {selectedProduct?.productId?.includes(
                                                    treatment?.id,
                                                ) && (
                                                    <div className="flex items-center justify-between text-danger font-bold">
                                                        <p
                                                            className="underline text-sm lg:text-base mr-5 cursor-pointer mt-5"
                                                            onClick={() => {
                                                                handleSelectProductIds(
                                                                    treatment,
                                                                );
                                                            }}
                                                        >
                                                            REMOVE
                                                        </p>
                                                        <Button className="!bg-success !border-success hover:!bg-transparent hover:!text-success hover:!border-success items-center flex h-8 md:h-10 !text-white text-sm md:text-sm lg:text-base font-semibold rounded-[10px] mt-5">
                                                            Added to Cart
                                                        </Button>
                                                    </div>
                                                )}
                                                {!selectedProduct?.productId?.includes(
                                                    treatment.id,
                                                ) && (
                                                    <Button
                                                        className="bg-primary items-center flex h-10 text-white text-base font-semibold rounded-[10px] mt-5"
                                                        onClick={() => {
                                                            handleSelectProductIds(
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
                                                $
                                                {(treatment.price / 30).toFixed(
                                                    2,
                                                )}{" "}
                                                per day{" "}
                                                <span className="font-medium">
                                                    (without insurance)
                                                </span>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex md:hidden md:items-center flex-row justify-end mt-5 md:mt-7 text-sm md:text-lg text-danger font-bold">
                                    <div className="flex items-baseline">
                                        {selectedProduct?.productId?.includes(
                                            treatment?.id,
                                        ) && (
                                            <div className="flex items-center justify-between text-danger font-bold">
                                                <p
                                                    className="underline text-sm lg:text-base mr-5 cursor-pointer mt-5"
                                                    onClick={() => {
                                                        handleSelectProductIds(
                                                            treatment,
                                                        );
                                                    }}
                                                >
                                                    REMOVE
                                                </p>
                                                <Button className="!bg-success !border-success hover:!bg-transparent hover:!text-success hover:!border-success items-center flex h-10 md:h-10 !text-white text-sm md:text-sm lg:text-base font-semibold rounded-[10px] mt-5">
                                                    Added to Cart
                                                </Button>
                                            </div>
                                        )}
                                        {!selectedProduct?.productId?.includes(
                                            treatment.id,
                                        ) && (
                                            <Button
                                                className="bg-primary items-center flex h-10 text-white text-base font-semibold rounded-[10px] mt-5"
                                                onClick={() => {
                                                    handleSelectProductIds(
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
                        </>
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

export default HairRegrowthTreatmentOptions;
