import { yupResolver } from "@hookform/resolvers/yup";
import { addPaymentMethodAPI } from "@redux/services/patient-payment-method.api";
import { paymentMethodCardsListResponse } from "@redux/slices/paymentMethod";
import { Button, Col, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    AddNewCardFormInputs,
    AddNewCardFormValidateSchema,
} from "src/schemas/addNewCardSchema";
import {
    RADIO_BUTTON,
    cards,
} from "jupiter-commons/src/components/libs/constants";
import {
    convertToTitleCase,
    getCVVFormat,
    getCreditCardFormat,
    getPostalCodeFormat,
} from "jupiter-commons/src/components/libs/helpers";
import {
    CheckBoxField,
    FormGroup,
    InputCreditDateField,
    InputDateField,
    InputField,
    InputGoogleAutoCompleteField,
    InputRadioField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { stripe } from "../../../../libs/stripe";
import CreditCardModalStyle from "./addAssessmentCardModalStyle.module.scss";

export interface AddAssessmentCardModalProps {
    isOpen?: boolean;
    onClose: (data?: any) => void;
    creditCardData?: paymentMethodCardsListResponse;
    selectedCreditCardData?: any;
    setSelectedCreditCardData?: (data?: any) => any;
    setPaymentState: (d?: any) => any;
    shippingAddress?: any;
}

const AddAssessmentCardModal = (props: AddAssessmentCardModalProps) => {
    const {
        isOpen,
        onClose,
        creditCardData,
        selectedCreditCardData,
        setSelectedCreditCardData,
        setPaymentState,
        shippingAddress,
    } = props;
    const {
        register,
        formState,
        control,
        setValue,
        setFocus,
        handleSubmit,
        reset,
        watch,
    } = useForm<AddNewCardFormInputs>({
        resolver: yupResolver(AddNewCardFormValidateSchema),
    });
    const [checkedVal, setCheckedVal]: any = useState([]);
    const [isSetDefault, setIsSetDefault] = useState(false);
    const monthFormat = "MM/YYYY";

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
                isDefault: isSetDefault,
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
                    isDefault: isSetDefault,
                };

                res = await addPaymentMethodAPI(finalpayload);
            }
            onClose();
            setPaymentState((d: any) => {
                return {
                    ...d,
                    creditCardId: res?.id,
                };
            });
        } catch (error: any) {
            console.log("error: ", error);
        }
    };

    const handleSetDefaultAddress = (e: any) => {
        if (e?.target?.checked) {
            const addresses: any = shippingAddress;
            setValue("addressLine1", addresses?.addressLine1);
            setValue("addressLine2", addresses?.addressLine2);
            setValue("city", addresses?.city);
            setValue("postalCode", addresses?.postalCode);
            setValue("province", addresses?.province);
        } else {
            setValue("addressLine1", "");
            setValue("addressLine2", "");
            setValue("city", "");
            setValue("postalCode", "");
            setValue("province", "");
        }
    };

    useEffect(() => {
        if (creditCardData && creditCardData?.total === 0) {
            setIsSetDefault(true);
        }
    }, [creditCardData]);

    useEffect(() => {
        setFocus("cardNumber");
        return () => {
            setCheckedVal([]);
            setIsSetDefault(false);
        };
    }, []);

    return (
        <>
            <Modal
                title={
                    <h1 className="text-2xl font-bold text-secondary">
                        Add Credit Card
                    </h1>
                }
                width={750}
                open={isOpen}
                onCancel={onClose}
                maskClosable={false}
                centered
                footer={
                    <div className="flex items-center justify-center mt-14 mb-3">
                        <Button
                            className="!border-light-black !text-light-black hover:!text-primary hover:!border-primary rounded-[10px] !font-bold text-base min-btn-width
                            min-btn-height"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            form="addNewCreditForm2"
                            className={`btn-primary !ml-7 rounded-[10px] text-white text-base !font-bold min-btn-width h-40 antLoaderButton
                            `}
                            loading={formState?.isSubmitting}
                            disabled={formState?.isSubmitting}
                        >
                            Add Card
                        </Button>
                    </div>
                }
            >
                <p className="text-lg font-bold mb-5">Enter Card Details</p>
                <form onSubmit={handleSubmit(onSubmit)} id="addNewCreditForm2">
                    <div className="border border-input rounded-[10px] p-5 pt-4">
                        <div className="flex justify-between mb-2">
                            <p className="text-lg font-semibold">Card</p>

                            <InputRadioField
                                {...{
                                    register,
                                    formState,
                                    id: "isDefault",
                                    name: "isPrimary",
                                    value: RADIO_BUTTON.One,
                                    className: "mb-2",
                                    htmlFor: "isPrimary",
                                    label: "Mark as Default",
                                    checked: isSetDefault,
                                    onClick: () => {
                                        setIsSetDefault(!isSetDefault);
                                    },
                                }}
                            />
                        </div>
                        <hr className="my-1" />
                        <div className="mt-5">
                            <FormGroup>
                                <InputField
                                    {...{
                                        register,
                                        formState,
                                        id: "cardNumber",
                                        label: "Card Number",
                                        placeholder: "Enter Card Number",
                                        maxLength: 16,
                                        onChange: (e: any) => {
                                            checkValidation(e?.target?.value);
                                            setValue(
                                                "cardNumber",
                                                getCreditCardFormat(
                                                    e?.target?.value,
                                                ),
                                            );
                                        },
                                        suffix: checkedVal,
                                    }}
                                />
                            </FormGroup>
                        </div>
                        <div>
                            <FormGroup>
                                <InputField
                                    {...{
                                        register,
                                        formState,
                                        id: "cardName",
                                        label: "Cardholder's Name",
                                        className: "capitalize",
                                        placeholder: "Enter Cardholder's Name",
                                    }}
                                />
                            </FormGroup>
                        </div>
                        <Row>
                            <Col span={24} md={12} className="!px-0 md:!pr-3">
                                <FormGroup className={`md:mb-0`}>
                                    <InputCreditDateField
                                        {...{
                                            register,
                                            formState,
                                            control,
                                            id: "exp_month",
                                            label: "Expiry Date",
                                            placeholder: "MM/YYYY",
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
                                            label: "Expiry Date",
                                            placeholder: "YYYY/MM",
                                            isDisabledPast: true,
                                            fromDate: new Date(),
                                            picker: "month",
                                            dateFormat: monthFormat,
                                            // defaultValue:
                                            //     mode === MODE.EDIT
                                            //         ? formValues?.exp_month
                                            //         : "",
                                            className:
                                                "items-center justify-center w-full",
                                        }}
                                    /> */}
                                </FormGroup>
                            </Col>
                            <Col span={24} md={12} className="!px-0 md:!pl-3">
                                <div>
                                    <FormGroup className={`mb-0`}>
                                        <InputField
                                            {...{
                                                register,
                                                formState,
                                                id: "cvv",
                                                label: "CVV",
                                                minLength: 3,
                                                maxLength: 4,
                                                placeholder: "Enter CVV",
                                            }}
                                            onChange={(e: any) => {
                                                setValue(
                                                    "cvv",
                                                    getCVVFormat(
                                                        e.target.value,
                                                    ),
                                                );
                                            }}
                                        />
                                    </FormGroup>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <p className="text-lg font-bold mb-5 mt-7">
                        Billing Address
                    </p>
                    <div className="flex items-start pb-4">
                        <div>
                            <CheckBoxField
                                {...{
                                    register,
                                    formState,
                                    name: "setDefaultAddress",
                                    type: "Checkbox",
                                    label: (
                                        <p className="2xl:text-base xl:text-sm text-start font-medium">
                                            Use shipping address as billing
                                            address
                                        </p>
                                    ),
                                    className: "mt-1 w-[16px] h-[16px]",
                                    id: "setDefaultAddress",
                                }}
                                onChange={(e: any) => {
                                    handleSetDefaultAddress(e);
                                }}
                            />
                        </div>
                    </div>
                    <div className="border border-input rounded-[10px] p-5 pt-4">
                        <FormGroup className={`!mb-6`}>
                            <InputGoogleAutoCompleteField
                                {...{
                                    register,
                                    formState,
                                    id: "addressLine1",
                                    label: "Address Line 1",
                                    maxLength: 60,
                                    placeholder: "Enter Address Line 1",
                                    autoComplete: "off",
                                    googleAutoCompleteConfig: {
                                        setValue,
                                        autoCompleteId: "addressLine1",
                                        autoPopulateFields: {
                                            addressLine1: "addressLine1",
                                            addressLine2: "addressLine2",
                                            city: "city",
                                            province: "province",
                                            zip: "postalCode",
                                            country: "country",
                                            className: "capitalize",
                                        },
                                    },
                                }}
                            />
                        </FormGroup>
                        <FormGroup
                            className={`!mb-6 ${CreditCardModalStyle.activeIngredient}`}
                        >
                            <InputField
                                {...{
                                    register,
                                    formState,
                                    id: "addressLine2",
                                    label: "Address Line 2",
                                    placeholder: "Enter Address Line 2",
                                    className: "capitalize",
                                    autoComplete: "off",
                                }}
                            />
                        </FormGroup>
                        <Row>
                            <Col span={24} md={12} className="!pr-0 md:!pr-3">
                                <FormGroup className="!mb-6">
                                    <InputField
                                        {...{
                                            register,
                                            formState,
                                            control,
                                            id: "city",
                                            name: "citySelect",
                                            label: "City",
                                            placeholder: "Enter City",
                                            maxLength: 40,
                                            className: "capitalize",
                                            autoComplete: "off",
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col span={24} md={12} className="!pl-0 md:!pl-3">
                                <FormGroup className="!mb-6">
                                    <InputField
                                        {...{
                                            register,
                                            formState,
                                            control,
                                            id: "province",
                                            name: "provinceSelect",
                                            label: "Province",
                                            placeholder: "Enter Province",
                                            maxLength: 40,
                                            className: "capitalize",
                                            autoComplete: "off",
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} md={12}>
                                <FormGroup className="!mb-0 w-full md:w-[97%]">
                                    <InputField
                                        {...{
                                            id: "postalCode",
                                            placeholder: "Enter Postal Code",
                                            register,
                                            label: "Postal Code",
                                            formState,
                                            maxLength: 7,
                                            className: "capitalize",
                                            autoComplete: "off",
                                        }}
                                        onChange={(e: any) => {
                                            e.target.value.length === 6 &&
                                                setValue(
                                                    "postalCode",
                                                    getPostalCodeFormat(
                                                        e.target.value,
                                                    ),
                                                    {
                                                        shouldValidate: true,
                                                    },
                                                );
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col span={24} md={12} hidden>
                                <FormGroup className="!mb-4">
                                    <InputField
                                        {...{
                                            register,
                                            formState,
                                            control,
                                            id: "country",
                                            name: "countrySelect",
                                            label: "Country",
                                            placeholder: "Enter Country",
                                            maxLength: 40,
                                            className: "capitalize",
                                            autoComplete: "off",
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                </form>
            </Modal>
        </>
    );
};
export default AddAssessmentCardModal;
