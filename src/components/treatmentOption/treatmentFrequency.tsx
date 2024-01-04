import { InputRadioField } from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { InformationIcon } from "jupiter-commons/src/components/theme/icons/informationIcon";
import treatmentStyle from "./treatmentStyle.module.scss";

export interface TreatmentFrequencyProps {
    setSendPrescriptionModal: (d?: any) => void;
    register: (d: any) => any;
    formState: any;
    assessMentDetails?: any;
}

const TreatmentFrequency = (props: TreatmentFrequencyProps) => {
    const {
        setSendPrescriptionModal,
        formState,
        register,
        assessMentDetails,
    } = props;

    const { treatmentOption } = assessMentDetails;
    const { product } = treatmentOption;
    const { supplements } = treatmentOption;
    const { treatment } = treatmentOption;
    const { supplementIds } = treatment;

    return (
        <>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
                Treatment Delivery Frequency
            </h1>
            <p className="font-bold text-base md:text-base mt-3">
                Please select the desired frequency for your treatment delivery
            </p>
            <div className="border rounded-[10px] mt-5 md:mt-9">
                <div
                    className={`p-5 pl-7 border-b ${treatmentStyle.treatmentInput}`}
                >
                    <div className="flex items-center">
                        <InputRadioField
                            {...{
                                register,
                                formState,
                                id: "one",
                                name: "deliveryFrequency",
                                value: "1",
                                label: "Monthly",
                            }}
                            defaultChecked
                        />
                        <p className="md:text-base font-medium text-grey-500 ml-[2px] text-xs">
                            (Pause or cancel at anytime)
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row pt-6 lg:py-6 px-5 mx-auto lg:overflow-x-auto lg:w-[660px] modern-scrollbar">
                    {product &&
                        product.map((s: any) => (
                            <>
                                <div className="md:mb-6 lg:mb-0 flex flex-row lg:block items-start lg:items-center w-full lg:w-[250px] min-h-[107px]">
                                    <div className="w-[97px] md:w-[130px] lg:w-full">
                                        <div className="ring-1 mr-5 lg:mr-0 ring-input-border flex items-center justify-center rounded-[10px] w-[75px] h-[75px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] xl:w-[150px] xl:h-[150px]">
                                            <img
                                                src={
                                                    s?.image[0]?.description ??
                                                    "/images/bottle.png"
                                                }
                                                className="object-contain rounded-[10px] w-[75px] h-[75px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] xl:w-[150px] xl:h-[150px]"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm 2xl:text-base font-semibold lg:w-[200px] text-left lg:text-start pt-0 lg:pt-3">
                                            {s?.name}
                                        </p>
                                        <p className="hidden md:block text-secondary text-base md:text-sm font-semibold text-start pt-2 md:pt-3 mb-6 md:mb-0">
                                            {s &&
                                                s.price &&
                                                `$${s.price.toFixed(2)}`}
                                        </p>
                                        <p className="block md:hidden pt-3 pb-4 lg:pt-0 mb-6 lg:mb-0 text-secondary text-sm md:text-sm font-semibold text-start">
                                            {s &&
                                                s.price &&
                                                `$${s.price.toFixed(2)}`}
                                        </p>
                                    </div>
                                </div>
                            </>
                        ))}
                    {supplementIds &&
                        supplementIds.length > 0 &&
                        supplements &&
                        supplements.map((s: any) => (
                            <>
                                <div className="md:mb-6 lg:mb-0 flex flex-row lg:block items-start lg:items-center min-h-[107px] w-full lg:w-[250px]">
                                    <div className="w-[97px] md:w-[130px] lg:w-full">
                                        <div className="ring-1 mr-5 lg:mr-0 ring-input-border flex items-center justify-center rounded-[10px] w-[75px] h-[75px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] xl:w-[150px] xl:h-[150px]">
                                            <img
                                                src={
                                                    s?.image[0]?.description ??
                                                    "/images/bottle.png"
                                                }
                                                className="object-contain rounded-[10px] w-[75px] h-[75px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] xl:w-[150px] xl:h-[150px]"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-xs md:text-sm 2xl:text-base font-semibold lg:w-[200px] text-left lg:text-start pt-0 lg:pt-3">
                                            {s?.name}
                                        </p>
                                        <p className="hidden md:block text-secondary text-base md:text-sm font-semibold text-start pt-2 md:pt-2 mb-6 md:mb-0">
                                            {s &&
                                                s.price &&
                                                `$${s.price.toFixed(2)}`}
                                        </p>
                                        <p className="block md:hidden pt-2 lg:pt-0 mb-6 lg:mb-0 text-secondary text-sm md:text-sm font-semibold text-start">
                                            {s &&
                                                s.price &&
                                                `$${s.price.toFixed(2)}`}
                                        </p>
                                    </div>
                                </div>
                            </>
                        ))}
                </div>
            </div>
            <div className="flex items-start text-xs mt-4">
                <div>
                    <InformationIcon className="text-gray-300 w-4 h-4 lg:w-[18px] lg:h-[18px]" />
                </div>
                <div>
                    <p className="text-start font-medium ml-2 text-light-black">
                        We recommend that you begin with a monthly refill
                        frequency to assess the effectiveness of the medication
                        in treating your condition. You will have the option to
                        switch to a 3 month frequency after the first fill.
                    </p>
                </div>
            </div>
            <div
                className={`border rounded-[10px] mt-7 cursor-no-drop
            ${treatmentStyle.overlayContainer}`}
            >
                <div
                    className={`p-5 pl-7 !border-b !border-[#7c7c7c] cursor-no-drop ${treatmentStyle.treatmentOverlayInput}`}
                >
                    <InputRadioField
                        {...{
                            register,
                            className: "cursor-no-drop",
                            formState,
                            disabled: true,
                            id: "three",
                            name: "deliveryFrequency",
                            value: "3",
                            label: "Every 3 Month",
                        }}
                    />
                </div>
                <div className="flex flex-col lg:flex-row pt-6 lg:py-6 px-5 mx-auto lg:overflow-x-auto lg:w-[660px] modern-scrollbar">
                    {product &&
                        product.map((s: any) => (
                            <>
                                <div className="mb-8 lg:mb-0 flex lg:block items-center flex-col w-full lg:w-[250px] -z-[10]">
                                    <div className="w-[97px] md:w-[130px] lg:w-full">
                                        <div className="ring-1 ring-input-border flex items-center justify-center rounded-[10px] w-[75px] h-[75px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] xl:w-[150px] xl:h-[150px]">
                                            <img
                                                src={
                                                    s?.image[0]?.description ??
                                                    "/images/bottle.png"
                                                }
                                                className="object-contain rounded-[10px] w-[75px] h-[75px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] xl:w-[150px] xl:h-[150px]"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-sm 2xl:text-base font-semibold lg:w-[200px] text-left lg:text-start pt-5 lg:pt-3">
                                        {s?.name}
                                    </p>
                                    <p className="text-secondary text-sm font-semibold text-start pt-2">
                                        Monthly Cost : ${s?.price}
                                    </p>
                                    <p className="text-secondary text-base lg:text-sm font-semibold text-start pt-2 lg:pt-2">
                                        Cost per refill : ${s?.price}
                                    </p>
                                </div>
                            </>
                        ))}
                </div>
                <p
                    className={`font-semibold text-base md:text-xl text-white ${treatmentStyle.overlayText}`}
                >
                    Only available after a 1 month <br /> trial of the
                    medication.
                </p>
            </div>
            <div
                className={`bg-[#e7f0fa] w-full xl:w-4/5  mx-auto rounded-[10px] mt-7 xl:mt-14 p-3 ${treatmentStyle.circleSecondary}`}
            >
                <p className="font-medium text-xs circleSecondaryTop text-left ml-6">
                    Prescription medication pricing includes pharmacy's
                    dispensing fee
                </p>
                <p className="font-medium text-xs circleSecondaryTop mt-2 text-left ml-6">
                    Price is subject to prescribed medication
                </p>
                <p className="font-medium text-xs circleSecondaryTop mt-2 text-left ml-6">
                    If you would like to send your prescription to your local
                    pharmacy{" "}
                    <span
                        className="text-secondary underline cursor-pointer"
                        onClick={() => setSendPrescriptionModal(true)}
                    >
                        click here
                    </span>
                </p>
            </div>
        </>
    );
};

export default TreatmentFrequency;
