import React from "react";
import { Modal } from "antd";
import { Button } from "jupiter-commons/src/components/theme/button/button";
import ConsentFormStyles from "./consentFormModal.module.scss";

export interface ConsentFormModalProps {
    isOpen?: boolean;
    handleOk?: (data?: any) => void;
    handleCancel: (data: any) => void;
}

const ConsentFormModal = (props: ConsentFormModalProps) => {
    const { isOpen, handleOk, handleCancel } = props;

    return (
        <Modal
            title={
                <p
                    className={`font-bold md:text-2xl text-secondary md:w-full text-xl w-[330px] ${ConsentFormStyles.landscapeView}`}
                >
                    Virtual Care and Electronic Communications Consent Form
                </p>
            }
            width={800}
            open={isOpen}
            onOk={handleOk}
            maskClosable={false}
            centered
            closable={false}
            className={ConsentFormStyles.modalBody}
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
            <div className={`px-6 py-4 ${ConsentFormStyles.modalContent}`}>
                <h2 className="text-base font-bold text-secondary">
                    <span className="text-base font-bold pr-2">1.</span>
                    Introduction
                </h2>
                <div>
                    <h2 className="text-base font-medium text-secondary">
                        <span className="pr-2">1.1.</span>
                        Purpose and Scope
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        The purpose of this Virtual Care Consent Form is to
                        establish the terms and conditions under which Jupiter
                        Health provides its virtual care (or telemedicine)
                        services. This policy covers the use of electronic
                        communication, privacy, data management, risks
                        associated, and the scope of healthcare services offered
                        through telemedicine. It is applicable to all patients
                        and healthcare professionals engaged with Jupiter
                        Health's specialized offerings in pain management and
                        other treatment categories.
                    </p>
                    <h2 className="text-base font-medium text-secondary pt-1">
                        <span className="pr-2">1.2.</span>
                        Acknowledgment of Understanding
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        By using the telemedicine services provided by Jupiter
                        Health, patients acknowledge that they have read,
                        understood, and agree to follow the terms outlined in
                        this policy, as well as in the Terms of Use and Privacy
                        Policy.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="pr-2">2.</span>
                        Patient Acknowledgment and Agreement
                    </h2>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">2.1.</span>
                        Understanding Risks and Limitations
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Patients acknowledge that while telemedicine can offer
                        significant convenience, there are potential risks.
                        These include, but are not limited to, data breaches,
                        limitations on medical evaluations, and potential delays
                        in medical evaluation and treatment. Patients must
                        assess the appropriateness of telemedicine services
                        considering their medical condition and needs.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 2.2. </span>
                        Selection of Electronic Services
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Jupiter Health offers multiple avenues for electronic
                        communications: secure email, text messaging, video
                        conferencing, and our proprietary Jupiter Health Web
                        App. Patients can choose their preferred means of
                        communication for consultations.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 2.3. </span>
                        Inclusion of Jupiter Health Web App
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Our proprietary Jupiter Health Web App integrates
                        seamlessly into the telemedicine process, offering an
                        additional layer of convenience, data integrity, and
                        secure messaging. This app should be used where possible
                        for optimal service delivery.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="pr-2">3.</span>
                        Terms of Use and Privacy Policy
                    </h2>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 3.1. </span>
                        Jupiter Health's Terms of Use
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Patients are required to read and agree to the Terms of
                        Use of Jupiter Health's telemedicine services. The Terms
                        of Use includes detailed clauses on eligibility, user
                        responsibility, prescription protocols, and other
                        related aspects. Refer to the full document for
                        comprehensive understanding.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 3.2. </span>
                        Jupiter Health's Privacy Policy
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Patients must read and agree to the Privacy Policy,
                        which outlines how Jupiter Health collects, uses, and
                        safeguards personal and health-related information. This
                        policy is aligned with healthcare regulatory
                        requirements and addresses issues like consent, data
                        retention, and third-party involvement.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="pr-2">4.</span>
                        Communications with Licensed Healthcare Professionals
                    </h2>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 4.1. </span>
                        Types of Professionals Involved
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Jupiter Health employs a network of licensed healthcare
                        professionals who are qualified to prescribe
                        commercially available as well as compounded medications
                        as required.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 4.2. </span>
                        Patient's Right to Email Communication
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Patients have the right to request email communication
                        with their healthcare professionals, although Jupiter
                        Health recommends the use of the Web App for security
                        reasons.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 4.3. </span>
                        Conditions and Instructions for Use
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        For effective communication, Jupiter Health requires
                        both healthcare professionals and patients to maintain
                        functional and accessible email accounts if they opt for
                        email-based communication. The use of email must adhere
                        to all data protection regulations.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="pr-2">5.</span>
                        Withdrawal of Electronic Communication
                    </h2>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 5.1. </span>
                        Patient's Right to Withdraw
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Patients have the right to withdraw consent to
                        electronic communication at any time. The withdrawal
                        request must be submitted in writing and will be
                        effective within 5 business days.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 5.2. </span>
                        Healthcare Professional's Right to Withdraw
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Healthcare professionals also reserve the right to
                        withdraw from electronic communication with a patient if
                        they deem it clinically unsuitable or for non-compliance
                        with this policy.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 5.3. </span>
                        Account Closure and Consultation Termination
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Upon withdrawal, all future consultations will require
                        manual scheduling, and electronic health records will be
                        reverted to paper format, accessible only through
                        in-person visits.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="pr-2">6.</span>
                        Privacy and Data Management
                    </h2>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 6.1. </span>
                        Jupiter Health's Privacy Officer
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        For any queries or concerns related to privacy, patients
                        can reach out to Jupiter Health's designated Privacy
                        Officer. Contact details are listed in Section 9.1.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 6.2. </span>
                        Queries and Concerns
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        All queries and concerns regarding the handling,
                        storage, or protection of personal health information
                        should be directed to the Privacy Officer.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 6.3. </span>
                        Pharmacy Location Disclosure
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        For medication deliveries, patients will be informed of
                        the originating pharmacy's location. This is essential
                        for ensuring quality control and regional compliance.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="pr-2">7.</span>
                        Risks Associated with Virtual Care Tools
                    </h2>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 7.1. </span>
                        General Risks
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        While Jupiter Health takes all reasonable measures to
                        secure patient data, users should be aware that no
                        platform can guarantee complete security. Patients
                        accept the inherent risks of data breaches when using
                        virtual care tools.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 7.2. </span>
                        Third-Party Disclosure
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Jupiter Health will not disclose personal information to
                        third parties without explicit patient consent, unless
                        required by law.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 7.3. </span>
                        Employer and Legal Oversight
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        In cases where Jupiter Health services are offered
                        through employer-based health plans, users must be aware
                        that employers may have access to non-identifiable usage
                        data.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="pr-2">8.</span>
                        Email Communication Risks
                    </h2>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 8.1. </span>
                        Additional Risks for Email Communication
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        While email communication is convenient, it presents
                        additional risks like phishing attacks and unauthorized
                        access.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 8.2. </span>
                        Unencrypted vs. Encrypted Email Risks
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Jupiter Health strongly recommends encrypted email for
                        sensitive medical information. However, if the patient
                        opts for unencrypted email, they bear the responsibility
                        for any data compromise.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2"> 8.3. </span>
                        Identity Verification
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        To ensure patient safety, email communication must be
                        initiated through verified accounts. Jupiter Health may
                        employ two-factor authentication methods for this
                        purpose.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="pr-2">9.</span>
                        Contact Information
                    </h2>
                    <h2 className="text-base font-bold pt-1 text-secondary">
                        <span className="pr-2"> 9.1. </span>
                        Jupiter Health Privacy Officer Details
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        The Privacy Officer can be reached at{" "}
                        <a
                            href="mailto:privacy@jupiterhealth.com"
                            target="_blank"
                        >
                            <span className="font-medium">
                                privacy@jupiterhealth.ca
                            </span>
                        </a>{" "}
                        for any concerns related to the privacy policy or terms
                        of use.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="pr-2">10.</span>
                        Conditions of Using the Jupiter Health Platform
                    </h2>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">10.1.</span>
                        Timeliness of Responses
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        While Jupiter Health aims for prompt responses, it does
                        not guarantee immediate medical advice. Users must
                        adhere to specified timelines for different types of
                        services.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">10.2.</span>
                        Emergency and Time-Sensitive Scenarios
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Jupiter Health is not an emergency service platform. For
                        immediate care, patients should seek traditional
                        emergency services
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">10.3.</span>
                        User Responsibilities for Communication
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Users are responsible for reading and responding to
                        Jupiter Health communications in a timely manner.
                        Failure to do so could result in delays in treatment or
                        diagnosis.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="pr-2">11.</span>
                        Instructions for Communication Using Jupiter Health
                        Platform
                    </h2>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">11.1.</span>
                        Use of Personal Devices
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Patients are responsible for using personal devices that
                        meet Jupiter Health’s security guidelines. Any
                        compromise of data due to the patient's insecure device
                        is not the responsibility of Jupiter Health.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">11.2.</span>
                        Secure and Private Setting for Virtual Care
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Patients should ensure they are in a secure and private
                        setting when receiving virtual consultations to protect
                        their confidentiality and privacy.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">11.3.</span>
                        Recording Consent
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        No consultations may be recorded without explicit
                        consent from both the healthcare provider and the
                        patient.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">11.4.</span>
                        Updating Contact Information
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        It is the patient's responsibility to maintain
                        up-to-date contact information on the Jupiter Health
                        platform.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">11.5.</span>
                        Immediate Assistance Procedures
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        For emergency medical situations, the patient should not
                        use the Jupiter Health platform and instead seek
                        immediate traditional emergency services.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">12.</span>
                        Additional Instructions for Email Communication
                    </h2>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">12.1.</span>
                        Subject Line Requirements
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        To facilitate effective communication, the subject line
                        of the email should clearly indicate the content or
                        nature of the email.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">12.2.</span>
                        Message Clarity and Completeness
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Emails should be clearly written, complete, and contain
                        all necessary information for understanding the
                        patient's condition or query.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">12.3.</span>
                        Acknowledgment of Receipt
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Patients will receive an automated acknowledgment of
                        email receipt. However, this does not constitute medical
                        advice or treatment confirmation.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">12.4.</span>
                        Security Precautions
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Patients must adhere to email security guidelines
                        provided by Jupiter Health, including the use of secure
                        and verified email accounts.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">12.5.</span>
                        Withdrawal of Consent
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Patients can withdraw consent for email communication at
                        any time by informing Jupiter Health in writing.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">12.6.</span>
                        Emergency Response Protocols
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        For urgent situations, patients should refer to Jupiter
                        Health's Emergency Protocols rather than using email
                        communications.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="pr-2">13.</span>
                        Nature and Scope of Healthcare Services
                    </h2>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">13.1.</span>
                        Service Availability by Location
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Jupiter Health provides telemedicine services within of
                        Ontario, British Columbia, Alberta, Manitoba,
                        Saskatchewan, Nova Scotia, New Brunswick, Newfoundland
                        and Labrador and Price Edward Island, adhering to
                        provincial laws. Some services may be limited by
                        location due to the scope of professional licensure.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">13.2.</span>
                        Limitations of Telehealth
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Telehealth services are not a complete replacement for
                        in-person healthcare. Physical examinations and some
                        types of testing are not possible.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">13.3.</span>
                        User Responsibility for Accurate Information
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Patients are responsible for providing accurate and
                        complete information for proper healthcare provision.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="pr-2">14.</span>
                        Jupiter Pharmacy Consent to Use Virtual Care Tools and
                        Electronic Communications
                    </h2>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">14.1.</span>
                        Acknowledgment of Risks and Limitations
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Patients must acknowledge they understand the risks and
                        limitations of using virtual care tools and electronic
                        communications for healthcare services.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">14.2.</span>
                        Consent to Conditions and Instructions
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        By using Jupiter Health’s services, the patient consents
                        to all terms, conditions, and instructions outlined in
                        this policy.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">14.3.</span>
                        Use of Unencrypted Technologies
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Unencrypted communication tools should only be used when
                        both the healthcare provider and the patient provide
                        consent.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">14.4.</span>
                        Withdrawal of Electronic Communication Option
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Either party can withdraw from using electronic
                        communications for healthcare provision at any time.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="pr-2">15.</span>
                        Definitions
                    </h2>
                    <h2 className="text-base font-meidum pt-1 text-secondary">
                        <span className="pr-2">15.1.</span>
                        Licensed Healthcare Professionals
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Defined as professionals who are licensed to provide
                        healthcare services in the patient’s province and are
                        part of Jupiter Health’s network.
                    </p>
                    <h2 className="text-base font-meidum pt-1 text-secondary">
                        <span className="pr-2">15.2.</span>
                        Electronic Communications
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Any exchange of information using electronic tools
                        including but not limited to email, chat, and video
                        conferencing.
                    </p>
                    <h2 className="text-base font-meidum pt-1 text-secondary">
                        <span className="pr-2">15.3.</span>
                        Jupiter Health Agents
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Persons authorized to act on behalf of Jupiter Health,
                        including but not limited to, employees, consultants,
                        and third-party vendors.
                    </p>
                    <h2 className="text-base font-meidum pt-1 text-secondary">
                        <span className="pr-2">15.4.</span>
                        Jupiter Health Platform
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        The digital infrastructure including all sub-platforms
                        that Jupiter Health uses to provide its services.
                    </p>
                    <h2 className="text-base font-meidum pt-1 text-secondary">
                        <span className="pr-2">15.5.</span>
                        Jupiter Pharmacy Network
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        All affiliated pharmacies fulfilling prescriptions for
                        Jupiter patients.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">16.</span>
                        Emergency and Immediate Healthcare
                    </h2>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">16.1.</span>
                        Emergency Protocols
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Jupiter Health’s platform is not equipped to handle
                        emergencies. In such cases, patients should call
                        emergency services immediately.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">16.2.</span>
                        Follow-up Recommendations
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        After receiving emergency care, patients are advised to
                        undergo follow-up care as directed by the attending
                        healthcare provider.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">16.3.</span>
                        Medication Dispensing Rules
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Jupiter Pharmacy follows stringent protocols for
                        medication dispensing, including those pertaining to
                        compounded medications, adhering to applicable
                        regulations and guidelines.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="pr-2">17.</span>
                        Additional References
                    </h2>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">17.1.</span>
                        Jupiter Health Terms of Use
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        For additional details, patients can refer to the
                        Jupiter Health Terms of Use.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">17.2.</span>
                        Privacy Policy
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        The Privacy Policy outlines how Jupiter Health collects,
                        uses, and protects personal information.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="pr-2">18.</span>
                        Acknowledgments
                    </h2>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">18.1.</span>
                        User Acknowledgment
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        By using the Jupiter Health platform, users acknowledge
                        that they have read, understood, and agreed to the terms
                        outlined in this policy document.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">18.2.</span>
                        Healthcare Professional Acknowledgment
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Healthcare professionals within Jupiter Health’s network
                        must acknowledge their understanding and compliance with
                        this policy, enhancing service integrity.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">18.3.</span>
                        Third-Party Acknowledgment
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Third parties involved in any capacity with Jupiter
                        Health must adhere to this policy, ensuring uniformity
                        in service delivery and data management.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="pr-2">19.</span>
                        Data Breach and Security Incidents
                    </h2>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">19.1.</span>
                        Reporting Obligations
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Any suspected data breach must be reported to Jupiter
                        Health's Privacy Officer immediately for remediation and
                        compliance with legal obligations.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">19.2.</span>
                        User Notification
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        In the event of a confirmed data breach affecting user
                        data, Jupiter Health will inform affected users as
                        mandated by applicable law.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">19.3.</span>
                        Remediation and Follow-Up
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Jupiter Health will enact immediate steps to secure data
                        and prevent future incidents, along with a transparent
                        post-incident report.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="pr-2">20.</span>
                        Compliance and Legal Obligations
                    </h2>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">20.1.</span>
                        Provincial and Federal Compliance
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Jupiter Health adheres to all applicable provincial and
                        federal laws in delivering its services, including
                        telehealth and pharmacy services.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">20.2.</span>
                        Audits and Reviews
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Jupiter Health is subject to periodic audits and reviews
                        by regulatory bodies to ensure ongoing compliance.
                    </p>
                    <h2 className="text-base font-medium pt-1 text-secondary">
                        <span className="pr-2">20.3.</span>
                        Policy Updates
                    </h2>
                    <p className="text-sm font-medium pt-1">
                        Jupiter Health reserves the right to update this policy
                        to reflect changes in legal requirements, healthcare
                        practices, or technology.
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default ConsentFormModal;
