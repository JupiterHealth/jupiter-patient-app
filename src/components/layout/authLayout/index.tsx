import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "jupiter-commons/src/components/theme/logo/logo";
import { QuestionCircleIconIcon } from "jupiter-commons/src/components/theme/icons/questionCircleIcon";
import authLayoutStyles from "./authLayoutStyles.module.scss";
import PrivacyPolicyModal from "@components/theme/modal/privacyPolicyModal/privacyPolicyModal";
import TermsOfUseModal from "@components/theme/modal/termsOfUseModal/termsOfUseModal";

export const AuthLayoutComponent: React.FC = ({ children }: any) => {
    const [privacyModalOpen, setIsPrivacyModalOpen] = useState(false);
    const [termsOfUseModalOpen, setIsTermsOfUseModalOpen] = useState(false);

    const handleOk = () => {
        setIsPrivacyModalOpen(false);
        setIsTermsOfUseModalOpen(false);
    };

    return (
        <>
            <div className={authLayoutStyles.layoutContainer}>
                <div
                    className={`hidden md:flex items-center justify-between fixed w-full px-10 h-16 border-bottom-light-primary bg-white shadow-lg z-10`}
                >
                    <div>
                        <Link href="/">
                            <Logo className="w-32" />
                        </Link>
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <QuestionCircleIconIcon className="text-secondary w-4 mr-1" />
                        <h1 className="text-secondary font-semibold text-base">
                            Help
                        </h1>
                    </div>
                </div>
                <div
                    className={authLayoutStyles.layoutContainer__layoutWrapper}
                >
                    <div
                        className={`${authLayoutStyles.layoutContainer__formContainer}`}
                    >
                        <div className="text-center bg-white w-auto md:w-[65%] md:rounded-[30px] md:py-6 authshadow">
                            <div className="landscapeLayout md:h-[67vh] px-3 py-6 md:p-5 xl:p-0 md:overflow-y-auto modern-scrollbar flex items-center justify-center">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`${authLayoutStyles.layoutContainer__authFooter} hidden md:block bg-white border-t-[1px] border-input-border absolute bottom-0 right-0 left-0`}
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
        </>
    );
};
