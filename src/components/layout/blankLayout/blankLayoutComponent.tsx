import { QuestionCircleIconIcon } from "jupiter-commons/src/components/theme/icons/questionCircleIcon";
import { Logo } from "jupiter-commons/src/components/theme/logo/logo";
import Link from "next/link";
import BlankLayoutStyles from "./blankLayoutStyles.module.scss";
import ExitAssessmentModal from "@components/commonModalComponent/exitAssessmentModal";
import { useState } from "react";
import TermsOfUseModal from "@components/theme/modal/termsOfUseModal/termsOfUseModal";
import PrivacyPolicyModal from "@components/theme/modal/privacyPolicyModal/privacyPolicyModal";
import { DEFAULT_SUPPORT_EMAIL } from "jupiter-commons/src/components/libs/constants";

const BlankLayoutComponent = ({ children }: any) => {
    const [assessmentExit, setAssessmentExit] = useState<any>(false);
    const [privacyModalOpen, setIsPrivacyModalOpen] = useState(false);
    const [termsOfUseModalOpen, setIsTermsOfUseModalOpen] = useState(false);

    const handleOk = () => {
        setIsPrivacyModalOpen(false);
        setIsTermsOfUseModalOpen(false);
    };

    return (
        <div className="relative h-screen">
            <div
                className={`hidden md:flex items-center justify-between fixed w-full px-10 h-16 border-bottom-light-primary bg-white shadow-lg z-10 blanklayoutLandscape `}
            >
                <div>
                    <Link href="/dashboard">
                        <Logo className="w-32" />
                    </Link>
                </div>
                <a href={`mailto:${DEFAULT_SUPPORT_EMAIL}`} target="_blank">
                    <div className="flex items-center cursor-pointer">
                        <QuestionCircleIconIcon className="text-secondary w-4 mr-1" />
                        <h1 className="text-secondary font-semibold text-base">
                            Help
                        </h1>
                    </div>
                </a>
            </div>
            <div className="flex items-center h-full relative overflow-hidden">
                <div
                    className={`text-center mx-3 md:mx-0 overflow-y-auto lg:!max-h-[calc(100vh-190px)] md:absolute md:left-1/2 md:translate-x-[-50%] md:bg-white w-full md:w-auto rounded-none md:rounded-[30px] authshadow blanklayoutLandscapeContainer ${BlankLayoutStyles.profileComponent}`}
                >
                    <div
                        className={`flex items-center justify-center ${BlankLayoutStyles.blankLayoutContainer}`}
                    >
                        <div className="w-full">{children}</div>
                    </div>
                </div>
            </div>
            <div
                className={`hidden md:block bg-white mx-auto text-center py-[15px] border-t-[1px] border-input-border w-full fixed bottom-0 right-0 left-0  blanklayoutLandscape`}
            >
                <div className="flex items-center justify-center">
                    <p
                        className="text-sm font-medium text-secondary underline cursor-pointer"
                        onClick={() => setIsPrivacyModalOpen(true)}
                    >
                        Privacy Policy
                    </p>
                    <p className="mx-3 text-secondary">|</p>
                    <p
                        className="text-sm font-medium text-secondary underline cursor-pointer"
                        onClick={() => setIsTermsOfUseModalOpen(true)}
                    >
                        Terms of Use
                    </p>
                </div>
                <h1 className="mt-1.5 text-sm font-semibold">
                    © Jupiter Health 2023
                </h1>
            </div>
            {assessmentExit && (
                <ExitAssessmentModal
                    isOpen={assessmentExit}
                    onClose={() => {
                        setAssessmentExit(false);
                    }}
                />
            )}
            {privacyModalOpen && (
                <PrivacyPolicyModal
                    {...{
                        isOpen: privacyModalOpen,
                        handleCancel: handleOk,
                        handleOk,
                    }}
                />
            )}
            {termsOfUseModalOpen && (
                <TermsOfUseModal
                    {...{
                        isOpen: termsOfUseModalOpen,
                        handleCancel: handleOk,
                        handleOk,
                    }}
                />
            )}
        </div>
    );
};

export default BlankLayoutComponent;
