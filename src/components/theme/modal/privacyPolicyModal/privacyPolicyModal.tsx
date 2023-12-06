import React from "react";
import { Modal } from "antd";
import PrivacyPolicyStyles from "./privacyPolicyModal.module.scss";
import { Button } from "jupiter-commons/src/components/theme/button/button";
import {
    DEFAULT_PRIVACY_EMAIL,
    DEFAULT_SUPPORT_EMAIL,
} from "jupiter-commons/src/components/libs/constants";
export interface PrivacyPolicyModalProps {
    isOpen?: boolean;
    handleOk?: (data?: any) => void;
    handleCancel: (data: any) => void;
}

const PrivacyPolicyModal = (props: PrivacyPolicyModalProps) => {
    const { isOpen, handleOk, handleCancel } = props;
    return (
        <Modal
            title={
                <p className="font-bold text-2xl text-secondary">
                    Privacy Policy
                </p>
            }
            width={800}
            open={isOpen}
            onOk={handleOk}
            maskClosable={false}
            centered
            closable={false}
            className={PrivacyPolicyStyles.modalBody}
            footer={
                <div className="flex justify-right items-center mb-3">
                    <Button
                        className="!border-light-black !text-light-black hover:!text-primary hover:!border-primary rounded-[10px] !font-bold text-base min-btn-width min-btn-height"
                        onClick={handleCancel}
                    >
                        Close
                    </Button>
                </div>
            }
        >
            <div className={`px-8 py-4 ${PrivacyPolicyStyles.modalContent}`}>
                <div>
                    <h2 className="text-base font-bold text-secondary">
                        <span className="text-base font-bold pr-2">1.</span>
                        Introduction
                    </h2>
                    <h3 className="text-sm font-medium">
                        Last Revised Date: November 28, 2023
                    </h3>
                    <p className="text-sm font-medium pt-2">
                        Jupiter Health Inc. ("Jupiter", "we"; or "us") is
                        unwaveringly dedicated to preserving the confidentiality
                        of your Personal Information ("PI") and Personal Health
                        Information ("PHI") and employs robust measures to
                        safeguard it.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        This Privacy Policy ("Policy") strictly aligns with the
                        Personal Information Protection and Electronic Documents
                        Act (PIPEDA), the Health Information Protection Act
                        (HIPA), and other applicable Canadian regulations and
                        laws.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">2.</span>
                        Purpose and Scope
                    </h2>
                    <p className="text-sm font-medium">
                        This Policy delineates the methods and intentions behind
                        Jupiter's collection, usage, storage, and disclosure of
                        PI and PHI.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        This Policy extends to all Users interacting with the
                        Jupiter Health Platform.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        This Policy governs both the PI and PHI obtained
                        directly from Users as well as data gathered from
                        third-party sources.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">3.</span>
                        Interpretation and Definitions
                    </h2>
                    <p className="text-sm font-medium">
                        The terms defined in this Policy should be interpreted
                        as having the same meaning when used in other official
                        documents unless otherwise specified.
                    </p>
                    <h3 className="text-sm font-medium pt-2">Definitions:</h3>
                    <p className="text-sm font-medium">
                        "Jupiter Health Platform": encompasses all our hardware,
                        software, websites, content, products, and services
                        owned or operated by Jupiter. Its primary function is to
                        enable the delivery of virtual healthcare services to
                        Users, among other capabilities.
                        <br />
                        "User": Any individual or entity that utilizes the
                        Jupiter Health Platform.
                        <br />
                        "Licensed Healthcare Professionals": Physicians and
                        Nurse Practitioners licensed to practice medicine in a
                        province within Canada.
                        <br />
                        "Other Licensed Providers”: Other healthcare providers
                        such as Pharmacists, pharmacy staff or laboratory staff.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        This Policy is subject to the laws and jurisdiction of
                        the province of Ontario and any other applicable laws.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">4.</span>
                        Information Collection
                    </h2>
                    <p className="text-sm font-medium">
                        Jupiter collects PI and PHI through several means:
                    </p>
                    <ul className="!list-disc pl-11 pt-2 font-medium">
                        <li>
                            Voluntary submission by the User during account
                            creation, updates, or service usage.
                        </li>
                        <li>
                            Indirectly from third-party healthcare providers and
                            affiliates.
                        </li>
                        <li>
                            Automated technologies, such as cookies, device IDs,
                            and server logs
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">5.</span>
                        Types of Personal Information Collected
                    </h2>
                    <h2 className="text-sm font-medium">
                        Data categories may include:
                    </h2>
                    <ul className="!list-disc pl-11 pt-2 font-medium">
                        <li>
                            Demographic information like name, age, and gender.
                        </li>
                        <li>
                            Medical history, including medications, treatments,
                            and diagnoses.
                        </li>
                        <li>
                            Financial information required for billing and
                            insurance claims.
                        </li>
                    </ul>
                    <h2 className="text-sm font-medium pt-2">
                        Information is accumulated for defined objectives:
                    </h2>
                    <ul className="!list-disc pl-11 pt-2 font-medium">
                        <li>Provision of healthcare services.</li>
                        <li>Regulatory compliance.</li>
                        <li>Quality assurance and service enhancement.</li>
                    </ul>
                    <p className="text-sm font-medium pt-2">
                        Jupiter confines its collection of data to elements
                        critical for delivering its services or fulfilling legal
                        requirements, and only with explicit User consent or
                        legal authorization.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">6.</span>
                        Information Storage
                    </h2>
                    <ul className="!list-disc pl-11 pt-2 font-medium">
                        <li>
                            <span className="text-sm font-bold pr-2">
                                Storage Locations:
                            </span>
                            Personal information, including both Personal
                            Information("PI") and Personal Health Information
                            ("PHI"), is securely stored in Jupiter's offices or
                            at data centers that adhere to stringent Canadian
                            regulatory standards. All storage facilities are
                            located exclusively within Canada.
                        </li>
                        <li>
                            <span className="text-sm font-bold pr-2">
                                Security Measures:
                            </span>
                            Advanced security measures are in place to safeguard
                            the stored information. These include advanced
                            encryption, multi-factor authentication, and
                            intrusion detection systems to ensure the highest
                            level of security.
                        </li>
                        <li>
                            <span className="text-sm font-bold pr-2">
                                Types of Data Collected:
                            </span>
                            The stored information encompasses various data
                            types, such as demographic profiles, health records
                            including medical histories and lab results, and
                            financial information pertinent to billing and
                            insurance.
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">7.</span>
                        Recipient Categories
                    </h2>
                    <p className="text-sm font-medium">
                        We may disclose your personal information to authorized
                        personnel and specific third parties, as outlined below:
                    </p>
                    <ul className="!list-disc pl-11 pt-2 text-sm font-medium">
                        <li>
                            Licensed Healthcare Professionals and Other Licensed
                            Providers offering services through the Jupiter
                            Health Platform
                        </li>
                        <li>Payment processors facilitating transactions</li>
                        <li>
                            Service providers assisting in the operation of the
                            Jupiter Health Platform, such as hosting and
                            technical support providers
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">8.</span>
                        Legal and Regulatory Compliance
                    </h2>
                    <p className="text-sm font-medium">
                        We may also disclose personal information to legal and
                        regulatory authorities when required by applicable laws,
                        as well as for the purposes of investigating legal
                        claims.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">9.</span>
                        Information Utilization
                    </h2>
                    <p className="text-sm font-medium">
                        The Jupiter Health Platform uses PI and PHI for the
                        following purposes, including but not limited to:
                    </p>
                    <ul className="!list-disc pl-11 pt-2 text-sm font-medium">
                        <li>
                            Conducting healthcare services, including
                            assessments, consultations and medical advice
                        </li>
                        <li>
                            To process payments for services, including private
                            or public insurance information
                        </li>
                        <li>
                            To enable communication with contracted third-party
                            service providers, including but not limited to
                            Physicians, Nurse Practitioners, and Pharmacists.
                        </li>
                        <li>
                            To improve the Jupiter Health Platform’s services
                            and functionality
                        </li>
                        <li>
                            To comply with legal and regulatory requirements
                        </li>
                        <li>
                            To notify Users about relevant programs or services
                        </li>
                        <li>To collect feedback</li>
                        <li> To investigate legal claims</li>
                        <li>
                            Other purposes, as permitted by law, for which we
                            may obtain consent
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">10.</span>
                        Agreements and Terms of Use
                    </h2>
                    <p className="text-sm font-medium">
                        Consent Requirements: By interacting with, accessing or
                        using the Jupiter Health Platform, Users automatically
                        consent to this Privacy Policy as well as Jupiter’s
                        broader Terms of Use.
                    </p>
                    <p className="pt-2 text-sm font-medium">
                        Jupiter Healthcare Services Agreement: A distinct
                        agreement exists for Licensed Healthcare Professionals,
                        elaborating on their responsibilities concerning data
                        management and confidentiality.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">11.</span>
                        Information Disclosure
                    </h2>
                    <p className="text-sm font-medium">
                        PI and PHI are selectively disclosed to Licensed
                        Healthcare Professionals, third-party service providers,
                        and affiliates in alignment with the objectives
                        specified in this Policy.
                    </p>
                    <p className="pt-2 text-sm font-medium">
                        We maintain partnerships with other healthcare
                        organizations and may share data for mutually agreed
                        purposes, like insurance claims and research.
                    </p>
                    <p className="pt-2 text-sm font-medium">
                        In the case of a corporate merger, sale, or acquisition,
                        data may be shared under stringent confidentiality
                        conditions.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">12.</span>
                        Rights and Obligations
                    </h2>
                    <p className="text-sm font-medium">
                        Of Users: Users maintain the right to access, correct,
                        or delete their PI and PHI, subject to exceptions
                        outlined by law.
                    </p>
                    <p className="pt-2 text-sm font-medium">
                        Of Licensed Healthcare Professionals: Licensed
                        Physicians and Nurse Practitioners are mandated to
                        safeguard PHI and comply with this Policy and relevant
                        legislation.
                    </p>
                    <p className="pt-2 text-sm font-medium">
                        Of Other Licensed Providers: Other healthcare providers
                        have comparable obligations concerning PI and PHI.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">13.</span>
                        Data Handling, Consent, and Security Measures
                    </h2>
                    <h2 className="pb-2 text-sm font-medium">
                        Consent Procedures:
                    </h2>
                    <ul className="!list-disc pl-11">
                        <li className="text-sm font-medium">
                            <span className="text-sm font-bold pr-2">
                                Obtaining Consent:
                            </span>
                            Explicit consent is sought from Users for the
                            collection, use, and disclosure of Personal
                            Information ("PI") and Personal Health Information
                            ("PHI"), unless exemptions are provided by law.
                        </li>
                        <li className="text-sm font-medium">
                            <span className="text-sm font-bold pr-2">
                                Withdrawing Consent:
                            </span>
                            : Users may revoke their consent at any time. Please
                            note that revoking consent may limit access to
                            specific features or services on the Jupiter Health
                            Platform.
                        </li>
                        <li className="text-sm font-medium">
                            Service providers assisting in the operation of the
                            Jupiter Health Platform, such as hosting and
                            technical support providers
                        </li>
                    </ul>
                    <h2 className="pt-2 pb-2 text-sm font-medium">
                        Security Measures:
                    </h2>
                    <ul className="!list-disc pl-11">
                        <li className="text-sm font-medium">
                            <span className="text-sm font-bold pr-2">
                                Comprehensive Safeguards:
                            </span>
                            The Jupiter Health Platform deploys a range of
                            security measures to protect personal information
                            from unauthorized access, use, and disclosure. These
                            safeguards encompass physical, technical, and
                            administrative layers of protection.
                        </li>
                        <p className="text-sm font-medium">
                            By using the Jupiter Health Platform, you
                            acknowledge and consent to these data handling,
                            consent, and security measures.
                        </p>
                    </ul>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">14.</span>
                        Communication with Users
                    </h2>
                    <p className="text-sm font-medium">
                        The Jupiter Health Platform does not serve as a
                        substitute for emergency medical services. Dial
                        emergency numbers for immediate assistance.
                    </p>
                    <p className="pt-2 text-sm font-medium">
                        Periodic communications regarding healthcare services,
                        policy changes, or promotional offerings may be sent to
                        Users. Unsubscribing options are available.
                    </p>
                    <p className="pt-2 text-sm font-medium">
                        For technical or healthcare-related inquiries, our
                        Customer Support Team can be reached via the contact
                        options on the Jupiter Health Platform.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">15.</span>
                        Affiliates and Third-Party Relations
                    </h2>
                    <p className="text-sm font-medium">
                        All affiliates and third-party service providers are
                        bound by contracts to ensure compliance with this
                        Privacy Policy and all applicable laws.
                    </p>
                    <p className="pt-2 text-sm font-medium">
                        Adequate data protection measures are mandated for third
                        parties to prevent unauthorized data access or
                        disclosure.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">16.</span>
                        Retention Policies
                    </h2>
                    <p className="text-sm font-medium">
                        PI and PHI are retained for durations mandated by legal
                        requirements or as necessary for the services provided.
                    </p>
                    <p className="pt-2 text-sm font-medium">
                        Extended retention may be necessary to comply with
                        auditing, legal, and reporting mandates.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">17.</span>
                        Access and Review
                    </h2>
                    <p className="text-sm font-medium">
                        Users can petition for access or amendments to their PI
                        and PHI by contacting{" "}
                        <a
                            href={`mailto:${DEFAULT_PRIVACY_EMAIL}`}
                            target="_blank"
                        >
                            <span className="text-secondary font-medium">
                                {DEFAULT_PRIVACY_EMAIL}
                            </span>
                        </a>
                    </p>
                    <p className="pt-2 text-sm font-medium">
                        Diligent measures are taken to maintain the accuracy of
                        collected PI and PHI.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">18.</span>
                        Amendments to Policy
                    </h2>
                    <p className="text-sm font-medium">
                        Revisions to this Policy may occur periodically to align
                        with legal amendments or internal policy changes.
                    </p>
                    <p className="pt-2 text-sm font-medium">
                        Please verify if we have updated the Policy since your
                        last use of the Jupiter Health Platform to ensure that
                        you are informed and in agreement with our current
                        privacy practices.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">19.</span>
                        Tracking Technologies and Cookies
                    </h2>
                    <p className="text-sm font-medium">
                        Both session and persistent cookies may be utilized for
                        enhancing user experience and data analytics. Usage of
                        the Jupiter Health Platform signifies consent to our
                        cookies policy as outlined herein.
                    </p>
                    <p className="pt-2 text-sm font-medium">
                        For retaining user settings and preferences, flash
                        cookies may be employed.
                    </p>
                    <p className="pt-2 text-sm font-medium">
                        User activity may be tracked for analytical purposes
                        through web beacons.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">20.</span>
                        Costs and Charges
                    </h2>
                    <p className="text-sm font-medium">
                        Costs associated with healthcare and informational
                        services via the Jupiter Health Platform are
                        transparently presented at the point of transaction.
                    </p>
                    <p className="pt-2 text-sm font-medium">
                        While exactness in cost estimates is targeted,
                        variations may occur based on service specifics.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">21.</span>
                        Identity Verification
                    </h2>
                    <p className="text-sm font-medium">
                        For secure access and service provisioning, multiple
                        forms of identification, including government-issued IDs
                        and biometric data, may be required.
                    </p>
                    <p className="pt-2 text-sm font-medium">
                        These identity verification methods are exclusively for
                        secure account access and healthcare service provision.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">22.</span>
                        Safeguarding Information
                    </h2>
                    <p className="text-sm font-medium">
                        A composite of physical, technical, and administrative
                        security measures are employed to safeguard PI and PHI.
                    </p>
                    <p className="pt-2 text-sm font-medium">
                        Stringent controls regulate employee access to sensitive
                        data, enforcing compliance with this Privacy Policy.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">23.</span>
                        Contact Information
                    </h2>
                    <p className="text-sm font-medium">
                        Concerns regarding this Privacy Policy or data practices
                        can be directed to our Privacy Officer at{" "}
                        <a
                            href={`mailto:${DEFAULT_PRIVACY_EMAIL}`}
                            target="_blank"
                        >
                            <span className="text-secondary font-medium">
                                {DEFAULT_PRIVACY_EMAIL}
                            </span>
                        </a>
                    </p>
                    <p className="pt-2 text-sm font-medium">
                        General inquiries may be sent to{" "}
                        <a
                            href={`mailto:${DEFAULT_SUPPORT_EMAIL}`}
                            target="_blank"
                        >
                            <span className="text-secondary font-medium">
                                {DEFAULT_SUPPORT_EMAIL}{" "}
                            </span>
                        </a>
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default PrivacyPolicyModal;
