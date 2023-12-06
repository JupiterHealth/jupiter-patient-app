import AddAssessmentCardModal from "@components/theme/modal/addAssessmentCardModal/addAssessmentCardModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { validatePromoCodeAPI } from "@redux/services/assessment.api";
import {
    addPaymentMethodAPI,
    fetchCreditCardListApi,
} from "@redux/services/patient-payment-method.api";
import { Button, Col, Collapse, Row, Space, Spin, Tooltip } from "antd";
import { cards } from "jupiter-commons/src/components/libs/constants";
import {
    americanPhoneFormat,
    convertToTitleCase,
    convertToTitleCaseAndRemoveUnderscore,
    getCVVFormat,
    getCreditCardFormat,
    getPostalCodeFormat,
} from "jupiter-commons/src/components/libs/helpers";
import useList from "jupiter-commons/src/components/libs/useList";
import {
    CheckBoxField,
    FormGroup,
    InputCreditDateField,
    InputField,
    InputGoogleAutoCompleteField,
    InputRadioField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { AmericanExpressCardIcon } from "jupiter-commons/src/components/theme/icons/americanExpressCardIcon";
import { CrossOutlineIcon } from "jupiter-commons/src/components/theme/icons/crossOutlineIcon";
import { EditIcon } from "jupiter-commons/src/components/theme/icons/editIcon";
import { InformationIcon } from "jupiter-commons/src/components/theme/icons/informationIcon";
import { MasterCardIcon } from "jupiter-commons/src/components/theme/icons/masterCardIcon";
import { QuestionCircleIconIcon } from "jupiter-commons/src/components/theme/icons/questionCircleIcon";
import { VisaCardIcon } from "jupiter-commons/src/components/theme/icons/visaCardIcon";
import router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { stripe } from "src/libs/stripe";
import {
    AddNewCardFormInputs,
    AddNewCardFormValidateSchema,
} from "src/schemas/addNewCardSchema";
import CheckoutStyle from "./checkoutStyle.module.scss";
import ConsentFormModal from "@components/theme/modal/consentFormModal/consentFormModal";

export interface SubmitAssesmentProps {
    assessMentDetails: any;
    paymentState: any;
    setPaymentState: (d?: any) => any;
    assessmentId: string;
}

const SubmitAssesment = (props: any) => {
    const {
        assessMentDetails,
        paymentState,
        setPaymentState,
        assessmentId,
    } = props;

    const { apiParam } = useList({
        queryParams: {
            take: 50,
            skip: 0,
            include: ["patientUserAddress"],
        },
    });
    const [
        isLoadingCreditCardList,
        setIsLoadingCreditCardList,
    ] = useState<boolean>(false);

    const { checkout } = assessMentDetails;
    const { shippingAddress } = checkout;
    const { treatmentOption } = assessMentDetails;
    const { product } = treatmentOption;
    const { supplements } = treatmentOption;
    const { assessment } = assessMentDetails;
    const { treatment } = treatmentOption;
    const { supplementIds } = treatment;
    const { profile } = assessMentDetails;

    // Extract product price

    const {
        register,
        formState,
        control,
        setValue,
        handleSubmit,
        reset,
        watch,
    } = useForm<AddNewCardFormInputs>({
        resolver: yupResolver(AddNewCardFormValidateSchema),
    });

    const watchFields = watch();

    const [promoCodeStringValue, setPromoCodeStringValue] = useState<string>(
        "",
    );
    const [creditCardData, setCreditCardData] = useState<any>(null);
    const [selectedCreditCardData, setSelectedCreditCardData] = useState<any>(
        null,
    );
    const [isCreditCardModal, setIsCreditCardModal] = useState(false);
    const [loadingCheckoutState, setLoadingCheckoutState] = useState({
        isvalidatingPromoCode: false,
    });
    const [loadingAddCard, setLoadingAddcard] = useState<boolean>(false);
    const [checkedVal, setCheckedVal]: any = useState([]);
    const monthFormat = "MM/YYYY";
    const [consentFormModalOpen, setIsConsentFormModalOpen] = useState(false);

    const { Panel } = Collapse;

    const handleOk = () => {
        setIsConsentFormModalOpen(false);
    };

    const getCreditCards = async () => {
        try {
            setIsLoadingCreditCardList(true);
            const res = await fetchCreditCardListApi(apiParam);
            if (res) {
                setCreditCardData(res);
                setIsLoadingCreditCardList(false);
            }
        } catch (error) {
            console.log("error", error);
            setIsLoadingCreditCardList(false);
        }
    };

    useEffect(() => {
        getCreditCards();
        setSelectedCreditCardData(null);
    }, []);

    const checkValidation = (value: any) => {
        if (value) {
            cards?.map((p: any) => {
                if (value.match(p?.pattern)) {
                    setCheckedVal(p?.icon);
                }
            });
        } else if (!value) {
            setCheckedVal(null);
        }
    };

    const calculateTax = (price: any) => {
        if (
            [
                "Alberta",
                "British Columbia",
                "Manitoba",
                "Northwest Territories",
                "Nunavut",
                "Quebec",
                "Saskatchewan",
                "Yukon",
            ].includes(profile?.province)
        ) {
            return (price * 0.05 + price).toFixed(2);
        }
        if (["Ontario"].includes(profile?.province)) {
            return (price * 0.13 + price).toFixed(2);
        }
        if (
            [
                "New Brunswick",
                "Newfoundland and Labrador",
                "Nova Scotia",
                "Prince Edward Island",
            ].includes(profile?.province)
        ) {
            return (price * 0.15 + price).toFixed(2);
        }
    };

    const onSubmit = async (values: any) => {
        try {
            let payload = null;
            let res: any = null;

            payload = {
                cardNumber: values?.cardNumber.replace(/\s/g, ""),
                cardName: convertToTitleCase(values?.cardName),
                exp_month: values?.exp_month?.split("/")[0],
                exp_year: values?.exp_month?.split("/")[1],
                cvv: values?.cvv,
                isDefault: true,
                address_city: values?.city ? values?.city.trim() : "",
                address_country: values?.country
                    ? values?.country.trim()
                    : "Canada",
                address_line1: values?.addressLine1
                    ? values?.addressLine1.trim()
                    : "",
                address_line2: values?.addressLine2
                    ? values?.addressLine2.trim()
                    : "",
                address_state: values?.province ? values?.province.trim() : "",
                address_zip: values?.postalCode,
            };
            if (payload) {
                const result = await stripe.tokens.create(
                    {
                        card: {
                            cvc: payload.cvv,
                            exp_month: payload.exp_month,
                            exp_year: payload.exp_year,
                            number: payload.cardNumber,
                            name: payload.cardName,
                            address_city: payload.address_city,
                            address_country: payload.address_country,
                            address_line1: payload.address_line1,
                            address_line2: payload.address_line2,
                            address_state: payload.address_state,
                            address_zip: payload.address_zip,
                        },
                    },
                    { apiKey: process.env.PUBLIC_STRIPE },
                );

                const finalpayload = {
                    exp_month: result.card?.exp_month
                        .toString()
                        .padStart(2, "0"),
                    exp_year: result.card?.exp_year.toString(),
                    cardNumber: result.card?.last4,
                    cardName: result.card?.name,
                    address_city: result.card?.address_city,
                    address_country: result.card?.address_country,
                    address_line1: result.card?.address_line1,
                    address_line2: result.card?.address_line2,
                    address_state: result.card?.address_state,
                    address_zip: result.card?.address_zip,
                    tokenId: result.id,
                    isDefault: true,
                };
                setLoadingAddcard(true);

                res = await addPaymentMethodAPI(finalpayload);
            }
            getCreditCards();
            setPaymentState((d: any) => {
                return {
                    ...d,
                    creditCardId: res?.id,
                };
            });
            setLoadingAddcard(false);
        } catch (error: any) {
            console.log("error: ", error);
            setLoadingAddcard(false);
        }
    };

    const handleSetDefaultAddress = (e: any) => {
        if (e?.target?.checked) {
            const addresses: any = shippingAddress;
            reset({
                addressLine1: addresses?.addressLine1,
                addressLine2: addresses?.addressLine2,
                city: addresses?.city,
                postalCode: addresses?.postalCode,
                province: addresses?.province,
                exp_month: watchFields["exp_month"],
            });
            // setValue("addressLine1", addresses?.addressLine1);
            // setValue("addressLine2", addresses?.addressLine2);
            // setValue("city", addresses?.city);
            // setValue("postalCode", addresses?.postalCode);
            // setValue("province", addresses?.province);
        } else {
            setValue("addressLine1", "");
            setValue("addressLine2", "");
            setValue("city", "");
            setValue("postalCode", "");
            setValue("province", "");
        }
    };

    const handlePromocodeValidate = async () => {
        try {
            setLoadingCheckoutState((d: any) => {
                return { ...d, isvalidatingPromoCode: true };
            });
            const promoCodeRes = await validatePromoCodeAPI(
                {
                    couponCode: promoCodeStringValue,
                },
                assessmentId,
            );
            if (promoCodeRes) {
                setPaymentState((d: any) => {
                    return {
                        ...d,
                        promoCode: promoCodeRes,
                    };
                });
            }
            setLoadingCheckoutState((d: any) => {
                return { ...d, isvalidatingPromoCode: false };
            });
        } catch (error) {
            console.log("error", error);
            setLoadingCheckoutState((d: any) => {
                return { ...d, isvalidatingPromoCode: false };
            });
        }
    };

    const calculateTotalTax = () => {
        const supplementPrices = treatmentOption.supplements.map(
            (supplement: any) => Number(supplement.price),
        );
        const taxAmount = (price: any) => {
            if (
                [
                    "Alberta",
                    "British Columbia",
                    "Manitoba",
                    "Northwest Territories",
                    "Nunavut",
                    "Quebec",
                    "Saskatchewan",
                    "Yukon",
                ].includes(profile?.province)
            ) {
                return Number(price * 0.05);
            }
            if (["Ontario"].includes(profile?.province)) {
                return Number(price * 0.13);
            }
            if (
                [
                    "New Brunswick",
                    "Newfoundland and Labrador",
                    "Nova Scotia",
                    "Prince Edward Island",
                ].includes(profile?.province)
            ) {
                return Number(price * 0.15);
            }
        };
        const totalSupplementTaxPrice = supplementPrices.reduce(
            (acc: any, price: any) => acc + taxAmount(price),
            0,
        );
        return totalSupplementTaxPrice.toFixed(2);
    };

    const calculateProductPrice = () => {
        const productPrice = treatmentOption.product.price;
        const supplementPrices = treatmentOption.supplements.map(
            (supplement: any) => Number(calculateTax(supplement.price)),
        );
        const totalSupplementPrice = supplementPrices.reduce(
            (acc: any, price: any) => acc + price,
            0,
        );

        const totalPrice = productPrice + totalSupplementPrice;

        return totalPrice;
    };

    return (
        <>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
                Submit your Assessment
            </h1>
            <p className="text-sm xl:text-base font-bold mt-2">
                Treatment Summary and Payment Information
            </p>
            <Row className="pt-5 md:pt-9" gutter={15}>
                <Col span={24} xl={12}>
                    <div className="flex bg-[#e4ffec] justify-between px-3 h-16 rounded-[10px] items-center">
                        <p className="font-bold text-sm xl:text-sm 2xl:text-base">
                            Total Due Today
                        </p>
                        <p className="font-semibold text-sm xl:text-sm 2xl:text-base">
                            ${" "}
                            {paymentState?.promoCode?.amount
                                ? (
                                      assessment?.assessmentPrice -
                                      paymentState?.promoCode?.amount
                                  ).toFixed(2)
                                : (assessment?.assessmentPrice).toFixed(2)}
                        </p>
                    </div>
                    <Row>
                        {!isLoadingCreditCardList &&
                            creditCardData?.list.map((creditCard: any) => (
                                <Col span={24}>
                                    <div className="flex justify-between border-input border p-4 !pr-2 rounded-[10px] mt-4">
                                        <div className="flex items-start">
                                            <div>
                                                {creditCard?.cardType ===
                                                    "MasterCard" && (
                                                    <MasterCardIcon />
                                                )}
                                                {creditCard?.cardType ===
                                                    "Visa" && <VisaCardIcon />}
                                                {creditCard?.cardType ===
                                                    "American Express" && (
                                                    <AmericanExpressCardIcon />
                                                )}
                                            </div>
                                            <div className="ml-3">
                                                <p className="2xl:text-base xl:text-sm font-semibold">
                                                    Ending with{" "}
                                                    {creditCard?.cardNumber}
                                                </p>
                                                <p className="2xl:text-base xl:text-sm font-medium text-grey-300">
                                                    Expires{" "}
                                                    {creditCard?.exp_month}/
                                                    {creditCard?.exp_year}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex cursor-pointer !items-center justify-end ml-4 mb-0">
                                            <InputRadioField
                                                {...{
                                                    register,
                                                    formState,
                                                    id: creditCard?.id,
                                                    name: "default",
                                                }}
                                                defaultChecked={
                                                    creditCard?.id ===
                                                    paymentState?.creditCardId
                                                }
                                                onClick={() =>
                                                    setPaymentState(
                                                        (d: any) => {
                                                            return {
                                                                ...d,
                                                                creditCardId:
                                                                    creditCard?.id,
                                                            };
                                                        },
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        {isLoadingCreditCardList && (
                            <Spin className="my-5 mx-auto" />
                        )}
                        {!isLoadingCreditCardList &&
                            creditCardData?.list.length === 0 && (
                                <div>
                                    <p className="text-base 2xl:text-lg text-left font-bold mb-[21px] mt-[22px]">
                                        Enter Credit Card Details
                                    </p>
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        id="addNewCreditForm"
                                    >
                                        <div className="border border-input rounded-[10px] p-5 pt-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-base 2xl:text-base font-bold">
                                                    Credit Card
                                                </p>
                                                {/* <div
                                                    className={
                                                        CheckoutStyle.markAsDefault
                                                    }
                                                >
                                                    <InputRadioField
                                                        {...{
                                                            register,
                                                            formState,
                                                            id: "isDefault",
                                                            name: "isPrimary",
                                                            value:
                                                                RADIO_BUTTON.One,
                                                            className: "mb-2",
                                                            htmlFor:
                                                                "isPrimary",
                                                            label:
                                                                "Mark as Default",
                                                            checked: isSetDefault,
                                                            onClick: () => {
                                                                setIsSetDefault(
                                                                    !isSetDefault,
                                                                );
                                                            },
                                                        }}
                                                    />
                                                </div> */}
                                            </div>
                                            <hr className="my-1" />
                                            <div
                                                className={`mt-5 ${CheckoutStyle.placeholderSize}`}
                                            >
                                                <FormGroup>
                                                    <InputField
                                                        {...{
                                                            register,
                                                            formState,
                                                            id: "cardNumber",
                                                            label:
                                                                "Card Number",
                                                            placeholder:
                                                                "Enter Card Number",
                                                            maxLength: 16,
                                                            onChange: (
                                                                e: any,
                                                            ) => {
                                                                checkValidation(
                                                                    e?.target
                                                                        ?.value,
                                                                );
                                                                setValue(
                                                                    "cardNumber",
                                                                    getCreditCardFormat(
                                                                        e
                                                                            ?.target
                                                                            ?.value,
                                                                    ),
                                                                );
                                                            },
                                                            suffix: checkedVal,
                                                        }}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div
                                                className={
                                                    CheckoutStyle.placeholderSize
                                                }
                                            >
                                                <FormGroup>
                                                    <InputField
                                                        {...{
                                                            register,
                                                            formState,
                                                            id: "cardName",
                                                            label:
                                                                "Cardholder's Name",
                                                            className:
                                                                "capitalize",
                                                            placeholder:
                                                                "Enter Cardholder's Name",
                                                        }}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <Row gutter={15}>
                                                <Col
                                                    span={12}
                                                    className="!pr-3"
                                                >
                                                    <FormGroup
                                                        className={`mb-0 ${CheckoutStyle.expiryDate}`}
                                                    >
                                                        <InputCreditDateField
                                                            {...{
                                                                register,
                                                                formState,
                                                                control,
                                                                id: "exp_month",
                                                                label:
                                                                    "Expiry Date",
                                                                placeholder:
                                                                    "MM/YYYY",
                                                                picker: "month",
                                                                format: monthFormat,
                                                                isDisabledPast: true,
                                                            }}
                                                        />
                                                        {/* <InputDateField
                                                            {...{
                                                                register,
                                                                formState,
                                                                control,
                                                                id: "exp_month",
                                                                label:
                                                                    "Expiry Date",
                                                                placeholder:
                                                                    "YYYY/MM",
                                                                isDisabledPast: true,
                                                                fromDate: new Date(),
                                                                picker: "month",
                                                                dateFormat: monthFormat,
                                                                // defaultValue:
                                                                //     mode === MODE.EDIT
                                                                //         ? formValues?.exp_month
                                                                //         : "",
                                                                className:
                                                                    "items-center justify-center",
                                                            }}
                                                        /> */}
                                                    </FormGroup>
                                                </Col>
                                                <Col
                                                    span={12}
                                                    className="!pl-3"
                                                >
                                                    <div>
                                                        <FormGroup
                                                            className={`mb-0 ${CheckoutStyle.cvv}`}
                                                        >
                                                            <InputField
                                                                {...{
                                                                    register,
                                                                    formState,
                                                                    id: "cvv",
                                                                    label:
                                                                        "CVV",
                                                                    minLength: 3,
                                                                    maxLength: 4,
                                                                    placeholder:
                                                                        "Enter CVV",
                                                                }}
                                                                onChange={(
                                                                    e: any,
                                                                ) => {
                                                                    setValue(
                                                                        "cvv",
                                                                        getCVVFormat(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        ),
                                                                    );
                                                                }}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <p className="text-base 2xl:text-lg text-left font-bold mb-5 mt-7">
                                            Billing Address
                                        </p>
                                        <div className="flex items-start mt-4">
                                            <CheckBoxField
                                                {...{
                                                    register,
                                                    formState,
                                                    name: "setDefaultAddress",
                                                    type: "Checkbox",
                                                    className:
                                                        "mt-1 w-[16px] h-[16px]",
                                                    id: "setDefaultAddress",
                                                }}
                                                onChange={(e: any) => {
                                                    handleSetDefaultAddress(e);
                                                }}
                                            />
                                            <label
                                                htmlFor="setDefaultAddress"
                                                className="2xl:text-base xl:text-sm text-start ml-3 font-medium cursor-pointer"
                                            >
                                                Use shipping address as billing
                                                address
                                            </label>
                                        </div>
                                        <div className="border border-input rounded-[10px] p-5 mt-4">
                                            <FormGroup
                                                className={`!mb-6 ${CheckoutStyle.addressLine1}`}
                                            >
                                                <InputGoogleAutoCompleteField
                                                    {...{
                                                        register,
                                                        formState,
                                                        id: "addressLine1",
                                                        label: "Address Line 1",
                                                        maxLength: 60,
                                                        placeholder:
                                                            "Enter Address Line 1",
                                                        autoComplete: "off",
                                                        googleAutoCompleteConfig: {
                                                            setValue,
                                                            autoCompleteId:
                                                                "addressLine1",
                                                            autoPopulateFields: {
                                                                addressLine1:
                                                                    "addressLine1",
                                                                addressLine2:
                                                                    "addressLine2",
                                                                city: "city",
                                                                province:
                                                                    "province",
                                                                zip:
                                                                    "postalCode",
                                                                country:
                                                                    "country",
                                                                className:
                                                                    "capitalize",
                                                            },
                                                        },
                                                    }}
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                className={`!mb-6 ${CheckoutStyle.addressLine2}`}
                                            >
                                                <InputField
                                                    {...{
                                                        register,
                                                        formState,
                                                        id: "addressLine2",
                                                        label: "Address Line 2",
                                                        placeholder:
                                                            "Enter Address Line 2",
                                                        className: "capitalize",
                                                        autoComplete: "off",
                                                    }}
                                                />
                                            </FormGroup>
                                            <Row gutter={15}>
                                                <Col
                                                    span={24}
                                                    md={12}
                                                    className={`!px-[6px] md:!pr-3 ${CheckoutStyle.city}`}
                                                >
                                                    <FormGroup className="!mb-6">
                                                        <InputField
                                                            {...{
                                                                register,
                                                                formState,
                                                                control,
                                                                id: "city",
                                                                name:
                                                                    "citySelect",
                                                                label: "City",
                                                                placeholder:
                                                                    "Enter City",
                                                                maxLength: 40,
                                                                className:
                                                                    "capitalize",
                                                                autoComplete:
                                                                    "off",
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col
                                                    span={24}
                                                    md={12}
                                                    className={`!px-[6px] md:!pl-3 ${CheckoutStyle.province}`}
                                                >
                                                    <FormGroup className="!mb-6">
                                                        <InputField
                                                            {...{
                                                                register,
                                                                formState,
                                                                control,
                                                                id: "province",
                                                                name:
                                                                    "provinceSelect",
                                                                label:
                                                                    "Province",
                                                                placeholder:
                                                                    "Enter Province",
                                                                maxLength: 40,
                                                                className:
                                                                    "capitalize",
                                                                autoComplete:
                                                                    "off",
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24} md={24}>
                                                    <FormGroup
                                                        className={`!mb-0 w-full md:w-[97%] ${CheckoutStyle.postalCode}}`}
                                                    >
                                                        <InputField
                                                            {...{
                                                                id:
                                                                    "postalCode",
                                                                placeholder:
                                                                    "Enter Postal Code",
                                                                register,
                                                                label:
                                                                    "Postal Code",
                                                                formState,
                                                                maxLength: 7,
                                                                className:
                                                                    "capitalize",
                                                                autoComplete:
                                                                    "off",
                                                            }}
                                                            onChange={(
                                                                e: any,
                                                            ) => {
                                                                e.target.value
                                                                    .length ===
                                                                    6 &&
                                                                    setValue(
                                                                        "postalCode",
                                                                        getPostalCodeFormat(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        ),
                                                                        {
                                                                            shouldValidate: true,
                                                                        },
                                                                    );
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col span={12} hidden>
                                                    <FormGroup className="!mb-4">
                                                        <InputField
                                                            {...{
                                                                register,
                                                                formState,
                                                                control,
                                                                id: "country",
                                                                name:
                                                                    "countrySelect",
                                                                label:
                                                                    "Country",
                                                                placeholder:
                                                                    "Enter Country",
                                                                maxLength: 40,
                                                                className:
                                                                    "capitalize",
                                                                autoComplete:
                                                                    "off",
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                    </form>
                                </div>
                            )}
                        {!isLoadingCreditCardList && (
                            <Col span={24}>
                                <div className="flex items-center justify-center xl:block mb-6 xl:mb-0">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loadingAddCard}
                                        form="addNewCreditForm"
                                        onClick={() => {
                                            if (
                                                creditCardData?.list?.length !==
                                                0
                                            ) {
                                                setIsCreditCardModal(true);
                                            }
                                        }}
                                        className={`btn-primary mt-5 antLoaderButton
                            `}
                                    >
                                        Add Card
                                    </Button>
                                </div>
                            </Col>
                        )}
                    </Row>
                </Col>
                <Col span={24} xl={12}>
                    <div className="!border-input border p-4 rounded-[10px]">
                        <div className="flex items-center mb-3">
                            <p className="text-start font-bold mr-2 2xl:text-base xl:text-base">
                                Assessment Fee
                            </p>
                            <Tooltip
                                placement="bottom"
                                title={
                                    <p className="font-medium">
                                        The Assessment Fee covers a consultation
                                        with a healthcare professional, the
                                        issuance of a prescription if approved,
                                        and any subsequent prescription
                                        renewals.
                                    </p>
                                }
                                overlayStyle={{
                                    minWidth: "20px",
                                }}
                            >
                                <p className="ml-2 mb-[2px] cursor-pointer">
                                    <QuestionCircleIconIcon className="text-grey-300" />
                                </p>
                            </Tooltip>
                        </div>
                        <hr />
                        <div className="flex items-start justify-between py-3">
                            <p className="font-semibold 2xl:text-base xl:w-[120px] 2xl:w-[140px]">
                                Assessment Fee (payable now)
                            </p>
                            <p className="font-semibold 2xl:text-base xl:text-sm break-all">
                                $ {(assessment?.assessmentPrice).toFixed(2)}
                            </p>
                        </div>
                        {paymentState?.promoCode && (
                            <div className="my-3">
                                <p className="font-semibold text-base text-left">
                                    Promo Code Discount
                                </p>
                                <div className="flex items-center justify-between">
                                    <p className="flex items-center pt-1">
                                        {" "}
                                        <span className="font-semibold">
                                            {
                                                paymentState?.promoCode
                                                    ?.couponCode
                                            }
                                        </span>
                                        <CrossOutlineIcon
                                            className="text-danger ml-2 cursor-pointer"
                                            onClick={() => {
                                                setPaymentState((d: any) => {
                                                    return {
                                                        ...d,
                                                        promoCode: null,
                                                    };
                                                });
                                                setValue("promocode", "");
                                                setPromoCodeStringValue("");
                                            }}
                                        />
                                    </p>
                                    <p className="font-semibold text-base text-success">
                                        - ${" "}
                                        {(paymentState?.promoCode?.amount).toFixed(
                                            2,
                                        )}
                                    </p>
                                </div>
                            </div>
                        )}
                        {paymentState?.promoCode && (
                            <div className="flex items-start justify-between pt-4">
                                <p className="font-semibold 2xl:text-base xl:text-sm">
                                    Total
                                </p>
                                <p className="font-semibold 2xl:text-base xl:text-sm">
                                    ${" "}
                                    {paymentState?.promoCode?.amount
                                        ? (
                                              assessment?.assessmentPrice -
                                              paymentState?.promoCode?.amount
                                          ).toFixed(2)
                                        : (assessment?.assessmentPrice).toFixed(
                                              2,
                                          )}
                                </p>
                            </div>
                        )}
                    </div>
                    {treatment && !treatment?.hasLocalPharmacy && (
                        <div className={`mt-4 ${CheckoutStyle.applyPromoCode}`}>
                            <Space direction="vertical">
                                <Collapse collapsible="header">
                                    <Panel
                                        header="Apply Promo Code"
                                        key="1"
                                        className="p-4"
                                    >
                                        <hr />
                                        <div className="flex flex-col md:flex-row items-start justify-between pt-4">
                                            <FormGroup
                                                className={`!mb-0 w-full md:pr-5 ${CheckoutStyle.applyInput}`}
                                            >
                                                <InputField
                                                    {...{
                                                        register,
                                                        formState,
                                                        disabled:
                                                            paymentState
                                                                ?.promoCode
                                                                ?.amount,
                                                        className: "!h-[40px]",
                                                        id: "promocode",
                                                        placeholder:
                                                            "Promo Code",
                                                        onChange: (e: any) => {
                                                            setPromoCodeStringValue(
                                                                e?.target
                                                                    ?.value,
                                                            );
                                                        },
                                                    }}
                                                />
                                            </FormGroup>
                                            <Button
                                                onClick={() =>
                                                    handlePromocodeValidate()
                                                }
                                                loading={
                                                    loadingCheckoutState?.isvalidatingPromoCode
                                                }
                                                disabled={
                                                    paymentState?.promoCode
                                                        ?.amount ||
                                                    promoCodeStringValue === ""
                                                }
                                                className="btn-primary mx-auto mt-4 md:mt-0 xl:!min-w-[110px] antLoaderButton"
                                            >
                                                Apply
                                            </Button>
                                        </div>
                                    </Panel>
                                </Collapse>
                            </Space>
                        </div>
                    )}
                    <div className="!border-input border px-4 rounded-[10px] mt-4">
                        <div className="flex justify-between mt-4">
                            <p className="text-start font-bold 2xl:text-base text-sm">
                                Treatment Summary
                            </p>
                            <div
                                className="flex items-center cursor-pointer"
                                onClick={() => {
                                    router.query.activeQuestionId =
                                        "treatment-options";
                                    router.push(router);
                                }}
                            >
                                <EditIcon className="text-secondary" />
                                <p className="text-secondary font-semibold ml-2 2xl:text-base xl:text-sm">
                                    Edit
                                </p>
                            </div>
                        </div>
                        <p className="font-medium text-start pt-1 pb-3 2xl:text-base xl:text-sm">
                            (Shipped every month)
                        </p>
                        <hr />
                        {[product] &&
                            [product].map((s: any) => (
                                <div className="mt-5 flex justify-between">
                                    <div className="flex">
                                        <p className="font-medium text-start w-[150px] 2xl:text-base xl:text-sm break-words">
                                            {s?.name} -{" "}
                                            {s?.dosageUnit !== "NUMBER" &&
                                                convertToTitleCaseAndRemoveUnderscore(
                                                    s?.form,
                                                )}{" "}
                                            {s?.selectAvailability ===
                                                "COMPOUNDED" &&
                                                `(${convertToTitleCaseAndRemoveUnderscore(
                                                    s?.selectAvailability,
                                                )})`}
                                        </p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="font-medium 2xl:text-base xl:text-sm ml-2">
                                            $ {s?.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        {supplementIds &&
                            supplementIds.length > 0 &&
                            supplements &&
                            supplements.map((s: any) => (
                                <div className="mt-4 flex justify-between">
                                    <div className="flex">
                                        <p className="font-medium text-start w-[150px] lg:w-[160px] 2xl:text-base xl:text-sm">
                                            {s?.name}
                                        </p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="font-medium 2xl:text-base xl:text-sm ml-2">
                                            $ {(s?.price).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        <div className="flex items-start justify-between pt-4">
                            <p className="font-semibold 2xl:text-base xl:text-sm">
                                Tax amount
                            </p>
                            <p className="font-semibold 2xl:text-base xl:text-sm">
                                $ {calculateTotalTax()}
                            </p>
                        </div>
                        <hr className="mt-4" />
                        <div className="flex items-start justify-between pt-4">
                            <p className="font-semibold 2xl:text-base xl:text-sm">
                                Total
                            </p>
                            <p className="font-semibold 2xl:text-base xl:text-sm">
                                $ {calculateProductPrice().toFixed(2)}
                            </p>
                        </div>
                        <Row className="my-5">
                            <Col span={2}>
                                <div>
                                    <InformationIcon className="w-[15px] h-[15px] xl:w-[19px] xl:h-[19px] mt-[2px]" />
                                </div>
                            </Col>
                            <Col span={22}>
                                <p className="text-xs text-start font-medium">
                                    1. Subject to an approved prescription. If
                                    you are prescribed a different medication
                                    for any reason, you will be notified.
                                </p>
                                <p className="text-xs text-start mt-3 font-medium">
                                    2. Any insurance or benefits coverage will
                                    be applied to the cost of your medication.
                                </p>
                            </Col>
                        </Row>
                    </div>
                    {!treatment?.hasLocalPharmacy && (
                        <div className="!border-input border px-4 rounded-[10px] mt-4">
                            <div className="flex justify-between mt-4">
                                <p className="text-start font-bold 2xl:text-base xl:text-sm">
                                    Shipping Details
                                </p>
                                <div
                                    className="flex items-center cursor-pointer"
                                    onClick={() => {
                                        router.query.activeQuestionId =
                                            "delivery-address";
                                        router.push(router);
                                    }}
                                >
                                    <EditIcon className="text-secondary" />
                                    <p className="text-secondary font-semibold ml-2 2xl:text-base xl:text-sm">
                                        Edit
                                    </p>
                                </div>
                            </div>
                            <hr className="mt-3" />
                            <Row className="mt-4">
                                <Col span={12}>
                                    <p className="font-bold 2xl:text-base xl:text-sm text-start">
                                        Shipping Address
                                    </p>
                                </Col>
                                <Col span={12} className="text-end">
                                    <p className="font-medium 2xl:text-base xl:text-sm text-right break-words">
                                        {shippingAddress?.addressLine1},{" "}
                                        {shippingAddress?.addressLine2 &&
                                            `${shippingAddress?.addressLine2},`}{" "}
                                        {shippingAddress?.city},{" "}
                                    </p>
                                    <p className="font-medium 2xl:text-base xl:text-sm text-right break-words">
                                        {shippingAddress?.province},{" "}
                                        {shippingAddress?.postalCode}
                                    </p>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col span={12}>
                                    <p className="font-bold 2xl:text-base xl:text-sm text-start">
                                        Contact Number
                                    </p>
                                </Col>
                                <Col span={12} className="text-end">
                                    <p className="font-medium 2xl:text-base xl:text-sm text-right">
                                        {americanPhoneFormat(
                                            (shippingAddress?.contactNumber).substring(
                                                2,
                                            ),
                                        )}
                                    </p>
                                </Col>
                            </Row>
                            <Row className="my-4">
                                <Col span={12}>
                                    <p className="font-bold 2xl:text-base xl:text-sm text-start">
                                        Shipping Charges
                                    </p>
                                </Col>
                                <Col span={12} className="text-end">
                                    <p className="font-semibold 2xl:text-base xl:text-sm text-right text-success">
                                        Free!
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Col>
            </Row>
            <div className="flex items-start mt-8 ">
                <CheckBoxField
                    {...{
                        register,
                        formState,
                        name: "thickened skin",
                        type: "Checkbox",
                        className: "mt-[2px] w-[16px] h-[16px] cursor-pointer",
                        id: "one",
                    }}
                    isChecked={paymentState?.creditCardConsent}
                    onChange={(e: any) => {
                        setPaymentState((d: any) => {
                            return {
                                ...d,
                                creditCardConsent: !d.creditCardConsent,
                            };
                        });
                    }}
                />
                <label
                    htmlFor="one"
                    className="text-xs text-grey-300 font-medium text-start ml-4 cursor-pointer"
                >
                    By checking this box, I consent that charges related to
                    co-pays, non-covered instances or pay-and-submit insurance
                    claims will be charged to my credit card. The Jupiter
                    affiliated pharmacy will facilitate all necessary
                    documentation for reimbursement purposes.
                </label>
            </div>
            <div className="flex items-start mt-3">
                <CheckBoxField
                    {...{
                        register,
                        formState,
                        name: "thickened skin",
                        type: "Checkbox",
                        className: "mt-[2px] w-[16px] h-[16px] cursor-pointer",
                        id: "one1",
                    }}
                    isChecked={paymentState?.jupiterConsent}
                    onChange={(e: any) => {
                        setPaymentState((d: any) => {
                            return {
                                ...d,
                                jupiterConsent: !d.jupiterConsent,
                            };
                        });
                    }}
                />
                <label
                    htmlFor="one1"
                    className="text-xs text-grey-300 font-medium text-start ml-4 cursor-pointer"
                >
                    I have read and accept Jupiter Health’s virtual care{" "}
                    <span
                        className="text-secondary underline"
                        onClick={() => setIsConsentFormModalOpen(true)}
                    >
                        Consent form.
                    </span>
                </label>
            </div>
            {isCreditCardModal && (
                <AddAssessmentCardModal
                    isOpen={isCreditCardModal}
                    creditCardData={creditCardData}
                    onClose={(d: any) => {
                        setIsCreditCardModal(false);
                        getCreditCards();
                    }}
                    setSelectedCreditCardData={setSelectedCreditCardData}
                    setPaymentState={setPaymentState}
                    shippingAddress={shippingAddress}
                />
            )}
            {consentFormModalOpen && (
                <ConsentFormModal
                    {...{
                        isOpen: consentFormModalOpen,
                        handleCancel: handleOk,
                        handleOk,
                    }}
                />
            )}
        </>
    );
};

export default SubmitAssesment;
