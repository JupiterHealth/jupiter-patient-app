import React, { useState } from "react";
import Link from "next/link";
import DermatologyStyles from "./dermatologyStyles.module.scss";
import { Button, Steps } from "antd";
import Step1Component from "./stepper/step1Component";
import Step2Component from "./stepper/step2Component";
import Step3Component from "./stepper/step3Component";
import Step4Component from "./stepper/step4Component";
import Step5Component from "./stepper/step5Component";

const steps = [
    {
        title: "Profile Questions",
        component: Step1Component,
    },
    {
        title: "Dermatology Questions",
        component: Step2Component,
    },
    {
        title: "Medical History",
        component: Step3Component,
    },
    {
        title: "Treatment Options",
        component: Step4Component,
    },
    {
        title: "Checkout",
        component: Step5Component,
    },
];

const DermatologyScene = () => {
    const [current, setCurrent] = useState(0);

    const next = () => {
        const updateActiveStep = current + 1;
        if (updateActiveStep !== 5) {
            setCurrent(updateActiveStep);
        }
    };

    const handleOnPrevButton = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    return (
        <div>
            <div className={DermatologyStyles.customStepper}>
                <Steps
                    current={current}
                    labelPlacement="vertical"
                    items={items}
                    className="px-7 sticky top-0 z-[1] pb-4 bg-white"
                />
                <div className="container mx-auto">
                    <div className="mt-4 ">
                        {steps.map((s: any, index: any) => (
                            <div key={index}>
                                {index === current && <s.component />}
                            </div>
                        ))}
                    </div>
                    <div className="mt-6">
                        {current !== 0 && (
                            <Button
                                type="primary"
                                onClick={() => handleOnPrevButton()}
                                className="btn-outline mr-5 px-5 text-lg font-bold !text-light-black"
                            >
                                Go Back
                            </Button>
                        )}
                        <Button
                            type="primary"
                            // onClick={() => handleOnNextButton()}
                            className="btn-primary px-10 text-lg font-semibold"
                        >
                            {current === steps.length - 1
                                ? "MAKE A PAYMENT"
                                : "Next"}
                        </Button>
                    </div>
                    <div className="mt-6">
                        <p className="text-lg font-medium text-light-black">
                            By clicking “Begin assessment”, you are agreeing to
                            the <br />
                            <span className="flex justify-center items-center">
                                <Link href="/">
                                    <p className="text-secondary underline">
                                        Terms of Use
                                    </p>
                                </Link>
                                <span className="mx-2"> and</span>
                                <Link href="/">
                                    <p className="text-secondary underline">
                                        Privacy Policy
                                    </p>
                                </Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DermatologyScene;
