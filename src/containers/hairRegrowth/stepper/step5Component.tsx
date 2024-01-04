import DeliveryAddress from "@components/checkout/deliveryAddress";
import SubmitAssesment from "@components/checkout/submitAssesment";
import UploadIdentification from "@components/checkout/uploadIdentification";
import UploadInsurer from "@components/checkout/uploadInsurer";
import { checkoutPayload } from "@redux/slices/assessment";

export interface Step5ComponentProps {
    activeQuestionId?: string;
    formState: any;
    register: (d: any) => void;
    handleSubmit: (d: any) => void;
    control: any;
    checkoutPayload: checkoutPayload;
    setCheckoutPayload: (d: any) => any;
    reset: (d: any) => any;
    submitAddress: (d: any) => any;
    imageData: any;
    setImageData: (d: any) => any;
    assessMentDetails: any;
    paymentState: any;
    setPaymentState: (d?: any) => any;
    assessmentId: string;
    setValue?: any;
}

const Step5Component = (props: Step5ComponentProps) => {
    const {
        activeQuestionId,
        register,
        formState,
        handleSubmit,
        control,
        checkoutPayload,
        setCheckoutPayload,
        setValue,
        reset,
        submitAddress,
        imageData,
        setImageData,
        assessMentDetails,
        setPaymentState,
        paymentState,
        assessmentId,
    } = props;
    return (
        <div>
            {activeQuestionId === "delivery-address" && (
                <DeliveryAddress
                    {...{
                        register,
                        formState,
                        handleSubmit,
                        control,
                        checkoutPayload,
                        setCheckoutPayload,
                        setValue,
                        submitAddress,
                        reset,
                        assessMentDetails,
                    }}
                />
            )}
            {activeQuestionId === "upload-identification" && (
                <UploadIdentification {...{ imageData, setImageData }} />
            )}
            {activeQuestionId === "upload-insurance" && (
                <UploadInsurer
                    {...{
                        imageData,
                        setImageData,
                        checkoutPayload,
                        setCheckoutPayload,
                        formState,
                        register,
                        setValue,
                    }}
                />
            )}
            {activeQuestionId === "checkout" && (
                <SubmitAssesment
                    {...{
                        assessMentDetails,
                        setPaymentState,
                        paymentState,
                        assessmentId,
                    }}
                />
            )}
        </div>
    );
};

export default Step5Component;
