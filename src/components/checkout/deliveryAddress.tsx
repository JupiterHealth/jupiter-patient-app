import { RootState } from "@redux/reducers";
import { checkoutPayload } from "@redux/slices/assessment";
import { LoginUserState, SignupUserState } from "@redux/slices/auth";
import { Col, Row } from "antd";
import {
    getPhoneNumberFormat,
    getPostalCodeFormat,
} from "jupiter-commons/src/components/libs/helpers";
import {
    FormGroup,
    InputField,
    InputGoogleAutoCompleteField,
    InputTypeField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutStyle from "./checkoutStyle.module.scss";

export interface DeliveryAddressProps {
    formState: any;
    register: (d: any) => void;
    handleSubmit: (d: any) => any;
    control: any;
    checkoutPayload: checkoutPayload;
    setCheckoutPayload: (d: any) => any;
    setValue: any;
    reset: (d?: any) => any;
    submitAddress: (d: any) => any;
    assessMentDetails?: any;
}

const DeliveryAddress = (props: DeliveryAddressProps) => {
    const {
        register,
        formState,
        handleSubmit,
        control,
        checkoutPayload,
        setCheckoutPayload,
        setValue,
        reset,
        submitAddress,
        assessMentDetails,
    } = props;

    const [formattedValue, setFormattedValue] = useState("");
    const { data: loginUserData }: LoginUserState = useSelector(
        (state: RootState) => state.loginUser,
    );
    const { data: signupUserData }: SignupUserState = useSelector(
        (state: RootState) => state.signupUser,
    );

    const handleChange = (event: any) => {
        const inputValue = event.target.value;
        const formattedInput = inputValue
            .replace(/\s/g, "")
            .match(/.{1,3}/g)
            ?.join(" ");
        const capitalizedInput = formattedInput?.replace(
            /\b\w/g,
            (match: any) => match.toUpperCase(),
        );
        setFormattedValue(capitalizedInput || "");
    };

    useEffect(() => {
        if (loginUserData && loginUserData?.user?.id) {
            const initializeValues: any = {};
            const addresses: any[] = loginUserData?.user?.patientUserAddress;
            initializeValues.addressLine1 = addresses[0]?.addressLine1;
            initializeValues.addressLine2 = addresses[0]?.addressLine2;
            initializeValues.city = addresses[0]?.city;
            initializeValues.province = addresses[0]?.province;
            initializeValues.postalCode = addresses[0]?.postalCode;
            reset(initializeValues);
        } else if (signupUserData && signupUserData?.user?.id) {
            const initializeValues: any = {};
            const addresses: any[] = signupUserData?.user?.patientUserAddress;
            initializeValues.addressLine1 = addresses[0]?.addressLine1;
            initializeValues.addressLine2 = addresses[0]?.addressLine2;
            initializeValues.city = addresses[0]?.city;
            initializeValues.province = addresses[0]?.province;
            initializeValues.postalCode = addresses[0]?.postalCode;
            reset(initializeValues);
        }

        return () => {
            reset();
        };
    }, []);

    return (
        <div>
            {/* {assessMentDetails?.treatmentOption?.hasLocalPharmacy && (
                <div></div>
            )} */}
            <form
                id="deliveryAddressForm"
                onSubmit={handleSubmit(submitAddress)}
            ></form>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
                Delivery Address
            </h1>
            <p className="text-sm xl:text-base font-bold mt-2">
                Please enter delivery address for your medication.
            </p>
            <FormGroup className="!mb-4 mt-5 md:mt-9">
                <div className="flex mb-2">
                    <p className="text-base font-medium text-start">
                        Address Line 1
                    </p>
                    <span className="text-danger">*</span>
                </div>
                <InputGoogleAutoCompleteField
                    {...{
                        register,
                        formState,
                        id: "addressLine1",
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
            <FormGroup className="!mb-4">
                <div className="flex mb-2">
                    <p className="text-base font-medium text-start">
                        Address Line 2
                    </p>
                </div>
                <InputField
                    {...{
                        register,
                        formState,
                        maxLength: 60,
                        id: "addressLine2",
                        placeholder: "Enter Address Line 2",
                    }}
                />
            </FormGroup>
            <Row>
                <Col span={24} lg={12} className="lg:pr-2.5">
                    <FormGroup className="!mb-4">
                        <div className="flex mb-2">
                            <p className="text-base font-medium text-start">
                                Select City
                            </p>
                            <span className="text-danger">*</span>
                        </div>
                        <InputField
                            {...{
                                register,
                                formState,
                                control,
                                id: "city",
                                isClearable: false,
                                placeholder: "Select City",
                                name: "citySelect",
                            }}
                        />
                    </FormGroup>
                </Col>
                <Col span={24} lg={12} className="lg:pl-2.5">
                    <FormGroup className="!mb-4">
                        <div className="flex mb-2">
                            <p className="text-base font-medium text-start">
                                Select Province
                            </p>
                            <span className="text-danger">*</span>
                        </div>
                        <InputField
                            {...{
                                register,
                                formState,
                                control,
                                id: "province",
                                isClearable: false,
                                placeholder: "Select Province",
                                name: "provinceSelect",
                            }}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col span={24} lg={12} className="lg:pr-2.5">
                    <FormGroup className="!mb-0">
                        <div className="flex mb-2">
                            <p className="text-base font-medium text-start">
                                Postal Code
                            </p>
                            <span className="text-danger">*</span>
                        </div>
                        <InputField
                            {...{
                                id: "postalCode",
                                placeholder: "Enter Postal Code",
                                register,
                                value: formattedValue,
                                onChange: handleChange,
                                formState,
                                maxLength: 7,
                                className: "capitalize",
                                autoComplete: "off",
                            }}
                            onChange={(e: any) => {
                                e.target.value.length === 6 &&
                                    setValue(
                                        "postalCode",
                                        getPostalCodeFormat(e.target.value),
                                        {
                                            shouldValidate: true,
                                        },
                                    );
                            }}
                        />
                    </FormGroup>
                </Col>
                <Col span={24} lg={12} className="pt-4 lg:pt-0 lg:pl-2.5">
                    <FormGroup className={`!mb-0 ${CheckoutStyle.phoneInput}`}>
                        <div className="flex mb-2">
                            <p className="text-base font-medium text-start">
                                Contact Number
                            </p>
                            <span className="text-danger">*</span>
                        </div>
                        <InputTypeField
                            {...{
                                register,
                                formState,
                                id: "phoneNumber",
                                placeholder: " Enter Contact Number",
                                maxLength: 10,
                                prefix: "+1  |",
                                autoComplete: "off",
                            }}
                            onChange={(e: any) => {
                                setValue(
                                    "phoneNumber",
                                    getPhoneNumberFormat(e.target.value),
                                );
                            }}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </div>
    );
};

export default DeliveryAddress;
