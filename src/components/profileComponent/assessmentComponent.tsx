import Image from "next/image";

const AssessmentComponent = () => {
    return (
        <div>
            <Image
                src="/images/Jupiter-Begin-Assessment.png"
                width={100}
                height={100}
                alt="assessment"
                className="mx-auto"
            />
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary mt-9">
                Begin your assessment
            </h1>
            <p className="text-sm xl:text-base font-bold text-light-black mt-3 mb-2 text-center">
                All information provided is encrypted and can only be viewed by
                <br className="hidden md:block" />a licensed clinician and
                pharmacist.
            </p>
            <p className="block md:hidden text-sm xl:text-base font-medium text-light-black mt-3 mb-2 text-center">
                To make your experience as smooth as possible, please have your
                health card, insurance/benefits card (if you have one), and
                credit card accessible
            </p>
        </div>
    );
};

export default AssessmentComponent;
