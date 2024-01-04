import React from "react";
import { Modal } from "antd";
import { Button } from "jupiter-commons/src/components/theme/button/button";
import TermsOfUseStyles from "./termsOfUseModal.module.scss";
import {
    DEFAULT_COMPLAINTS,
    DEFAULT_PRIVACY_EMAIL,
    DEFAULT_WEBSITE,
} from "jupiter-commons/src/components/libs/constants";

export interface TermsOfUseModalProps {
    isOpen?: boolean;
    handleOk?: (data?: any) => void;
    handleCancel: (data: any) => void;
}
const TermsOfUseModal = (props: TermsOfUseModalProps) => {
    const { isOpen, handleOk, handleCancel } = props;

    return (
        <Modal
            title={
                <p className="font-bold text-2xl text-secondary">
                    Terms of Use
                </p>
            }
            width={800}
            open={isOpen}
            onOk={handleOk}
            maskClosable={false}
            centered
            closable={false}
            className={TermsOfUseStyles.modalBody}
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
            <div className={`px-6 py-4 ${TermsOfUseStyles.modalContent}`}>
                <div>
                    <h2 className="text-base font-bold text-secondary">
                        <span className="text-base font-bold pr-2">1.</span>
                        Overview of Services
                    </h2>
                    <p className="text-sm font-medium">
                        Welcome to Jupiter Health Inc. (“Jupiter,” "we," "us,"
                        or "our"), Operating through the website{" "}
                        <a href={`mailto:${DEFAULT_WEBSITE}`} target="_blank">
                            <span className="text-secondary font-medium">
                                {DEFAULT_WEBSITE}{" "}
                            </span>
                        </a>{" "}
                        Our secure Platform (the “Platform”) facilitates access
                        to telemedicine services and other health related
                        services (collectively referred to as the “Services”).
                        As a user ("user," "you," or "your"), you have the
                        opportunity to register for an account, complete
                        assessment forms and questionnaires, undergo medical
                        consultations conducted by registered and qualified
                        Healthcare Professionals (the "Healthcare
                        Professionals"), and receive customized treatment plans
                        and prescriptions, as medically appropriate.
                    </p>
                    <p className="text-sm font-medium pt-4">
                        Important Note: Our Services are intended to complement,
                        not replace, in-person medical consultations and
                        treatments. They are not a substitute for comprehensive,
                        in-person medical care. These Services are rendered
                        through various mediums including text, audio, and video
                        technology, developed either by us or our partner
                        professionals who may be contractors or employees.
                    </p>
                    <p className="text-sm font-medium pt-4">
                        By accessing or using the Platform, or by being provided
                        with any of our Services, you agree to be bound by these
                        Terms of Use (the “Terms of Use” or “TOU”). You will be
                        asked to accept these Terms of Use as part of your
                        account registration. Therefore, if you do not wish to
                        be bound by these Terms of Use, please refrain from
                        accessing or using the Platform. Furthermore, you are
                        encouraged to read our Privacy Policy, which is
                        incorporated by reference into these Terms of Use.
                    </p>
                    <p className="text-sm font-medium pt-4">
                        Before engaging with our services, you are required to
                        read and complete the Virtual Care Consent Form. This
                        form outlines the risks and limitations of virtual care
                        and is crucial for obtaining your informed consent to
                        our virtual care and Services.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">2.</span>
                        Last Revised Date
                    </h2>
                    <p className="text-[15px] font-medium">
                        These Terms of Use were last updated on December 20,
                        2023. We reserve the right to update or modify these
                        Terms at any time, and you agree to be bound by such
                        modifications or updates. It is your responsibility to
                        regularly review these Terms to stay informed of any
                        changes.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">3.</span>
                        Acceptance of Terms
                    </h2>
                    <p className="text-sm font-medium">
                        BY ACCESSING, REGISTERING FOR AN ACCOUNT, OR UTILIZING
                        THE SERVICES PROVIDED THROUGH Jupiter Health, YOU HEREBY
                        AGREE TO COMPLY WITH AND BE LEGALLY BOUND BY THESE TERMS
                        OF USE. YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS
                        CAREFULLY AND UNDERSTAND YOUR LEGAL OBLIGATIONS HEREIN.
                        SHOULD YOU NOT CONSENT TO BE BOUND BY THESE TERMS, YOU
                        ARE REQUIRED TO IMMEDIATELY CEASE ALL USAGE OF OUR
                        SERVICES.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        IN ADDITION, BY ACCESSING AND UTILIZING JUPITER HEALTH,
                        YOU FURTHER AGREE TO COMPLY WITH ALL APPLICABLE FEDERAL,
                        PROVINCIAL, AND LOCAL LAWS AND REGULATIONS, INCLUDING
                        BUT NOT LIMITED TO THOSE GOVERNING TELEHEALTH AND
                        PHARMACY SERVICES WITHIN THE JURISDICTION OF ONTARIO,
                        CANADA. FAILURE TO COMPLY WITH THESE LAWS AND
                        REGULATIONS CONSTITUTES A BREACH OF THESE TERMS AND MAY
                        RESULT IN IMMEDIATE TERMINATION OF YOUR ACCOUNT AND
                        ACCESS TO OUR SERVICES.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        IMPORTANT: The Platform is intended solely for
                        non-emergency medical consultations and must not be used
                        for medical emergencies. IF YOU ARE EXPERIENCING A
                        MEDICAL EMERGENCY, IT IS IMPERATIVE THAT YOU IMMEDIATELY
                        CONTACT THE EMERGENCY SERVICES IN YOUR AREA OR PROCEED
                        TO THE NEAREST HOSPITAL OR HEALTHCARE CENTER.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">4.</span>
                        Availability, Eligibility and Use of the Jupiter
                        Platform
                    </h2>
                    <p className="flex flex-wrap text-sm font-medium">
                        <span className="text-base font-extrabold">
                            Age Requirement
                        </span>
                        Access to and use of the services provided by Jupiter
                        Health are restricted to individuals who are at least18
                        years of age. By accessing or using the services, you
                        represent and warrant that you meet the age requirement,
                        and are fully able and competent to enter into the
                        terms, conditions, obligations, affirmations,
                        representations, and warranties set forth in these terms
                        of use.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-2">
                        <span className="text-base font-extrabold">
                            Location Requirement
                        </span>
                        The Jupiter Health Platform is only available to
                        residents (permanent or temporary) within the provinces
                        of Ontario, British Columbia, Alberta, Manitoba,
                        Saskatchewan, Nova Scotia, New Brunswick, Newfoundland
                        and Labrador and Price Edward Island. You must be within
                        Canada while receiving the Services offered on the
                        Platform.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-2">
                        <span className="text-base font-extrabold">
                            Availability of the Jupiter Platform
                        </span>
                        Jupiter bears no responsibility or liability for the
                        deletion or inability to store or deliver any content
                        managed or transmitted through the Jupiter Platform.
                        Jupiter retains the right, at any given time, to alter
                        or terminate the Platform, either in whole or in part,
                        with or without prior notice. Jupiter shall not be held
                        accountable to you or any third party for any changes,
                        temporary suspensions, or discontinuation of the
                        Platform.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-2">
                        <span className="text-base font-extrabold">
                            User Account Creation and Maintenance
                        </span>
                        To avail yourself of our Services, you must register for
                        a user account ("Account"). You agree to provide
                        accurate, current, and complete information during the
                        registration process and to update such information to
                        keep it accurate, current, and complete.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-2">
                        <span className="text-base font-extrabold">
                            Password Security
                        </span>
                        You are responsible for maintaining the confidentiality
                        of your password and Account. You agree to notify
                        Jupiter Health immediately of any unauthorized use of
                        your Account or any other breach of security related to
                        the services. Jupiter Health will not be liable for any
                        loss or damage arising from your failure to comply with
                        this section.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">5.</span>
                        User Responsibility and Conduct
                    </h2>
                    <p className="flex flex-wrap text-sm font-medium">
                        <span className="text-sm font-extrabold">
                            Scope and Limitations of Telehealth Services
                        </span>
                        The Jupiter Health Platform is a technology-based
                        Platform designed to connect users with licensed
                        Healthcare Professionals, enabling them to conduct
                        consultations and formulate treatment plans based on
                        their professional judgment. While Jupiter does
                        facilitate access to these Services, Jupiter itself is
                        not registered to provide healthcare services.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        Only licensed Healthcare Professionals are permitted to
                        offer Services to users through the Jupiter Platform.
                        These Healthcare Professionals include Physicians and
                        Nurse Practitioners licensed to practice medicine in a
                        Canadian province or territory.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        The rules governing telehealth provision vary by
                        province and territory. Healthcare Professionals may not
                        always be located in the same province or territory as
                        You when providing Services.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        PLEASE ALSO NOTE THAT OUR SERVICES ARE INTENDED TO
                        SUPPLEMENT, NOT REPLACE, IN-PERSON MEDICAL CARE
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-2">
                        <span className="text-sm font-extrabold">
                            Disclaimer of Liability for Misdiagnosis{" "}
                        </span>
                        Be advised that the absence of in-person physical
                        evaluation may result in misdiagnosis and associated
                        health risks. Jupiter Health expressly disclaims any
                        liability arising from inaccuracies, misdiagnoses, or
                        omissions attributable to the lack of physical
                        examination capabilities on this Platform.
                    </p>{" "}
                    <p className="text-sm font-medium pt-2">
                        Healthcare Professionals using the Platform are
                        independent third-party providers who have opted to use
                        the Platform to offer Services. These professionals are
                        not employees or representatives of Jupiter Health. They
                        are solely responsible for upholding all applicable
                        standards of care, including those related to diagnosing
                        and prescribing.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-2">
                        <span className="text-sm font-extrabold">
                            Appropriate Use for Medical Conditions
                        </span>
                        The Services offered by Jupiter Health are specifically
                        designed for medical conditions that are deemed
                        appropriate for management through telehealth
                        consultations. The suitability of these Services is
                        solely determined by our licensed Healthcare
                        Professionals.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        Healthcare Professionals affiliated with Jupiter Health
                        reserve the right to refuse or discontinue the provision
                        of services to any user at their discretion, including
                        but not limited to cases of actual or potential misuse
                        of the services.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-2">
                        <span className="text-sm font-extrabold">
                            Assessment Limitations
                        </span>
                        It is imperative to understand that some medical
                        conditions require in-person physical assessments for
                        accurate diagnosis and appropriate treatment planning.
                        Given the inherent limitations of a telehealth Platform,
                        Jupiter Health is not equipped to perform such
                        assessments.
                    </p>
                    <p className="text-sm font-medium pt-3">
                        There are inherent risks associated with receiving
                        services via telehealth, including, but not limited to,
                        the risks of electronic data transmission and storage.
                        For specific details regarding these risks, please refer
                        to Jupiter Health' privacy policy and consent to use
                        virtual care tools and electronic communications, both
                        of which form part of these terms.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-2">
                        <span className="text-sm font-extrabold">
                            Immediate Care Instructions
                        </span>
                        Some user responses during our services may indicate
                        health concerns that fall outside the scope of the
                        services provided via our Platform and telehealth in
                        general. Users displaying certain symptoms, conditions,
                        or circumstances may be recommended to seek immediate
                        in-person medical care instead of continuing with our
                        services. Failure to comply with such guidance may
                        result in the termination of your account and may expose
                        you to increased health risks.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-2">
                        <span className="text-sm font-extrabold">
                            Emergency Situations
                        </span>
                        This Platform is not equipped to handle medical
                        emergencies. In the event of an emergency or a situation
                        requiring urgent medical attention, you are required to
                        contact emergency services immediately.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">6.</span>
                        Prescription Protocols
                    </h2>
                    <p className="flex flex-wrap text-sm font-medium">
                        <span className="text-sm font-extrabold">
                            Consultation and Prescription Process
                        </span>
                        Upon the conclusion of a consultation, Healthcare
                        Professionals may or may not issue a treatment and/or
                        prescription based on their professional judgment. You
                        have the option to fulfill these prescriptions through a
                        Jupiter affiliated pharmacy or through a pharmacy of
                        your choice.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-2">
                        <span className="text-sm font-extrabold">
                            Prohibited Medications
                        </span>
                        Please be advised that Jupiter Health does not offer
                        certain categories of medications, including but not
                        limited to narcotics, targeted and controlled
                        substances. The availability of specific medications is
                        subject to federal and provincial regulations and
                        professional guidelines.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-2">
                        <span className="text-sm font-extrabold">
                            Adverse Events Reporting
                        </span>
                        In the event of medication reactions, side effects, or
                        other adverse events, you should report them to your
                        primary care professional, the nearest walk-in clinic,
                        or emergency room, or call 911 in an emergency.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">7.</span>
                        Pharmacy Services
                    </h2>
                    <p className="flex flex-wrap text-sm font-medium">
                        <span className="text-sm font-extrabold">
                            Opt-Out Procedure
                        </span>
                        If a prescription is generated by a Healthcare
                        Professional through the Jupiter Platform, users have
                        the flexibility to direct the prescription to any
                        pharmacy of their choice. To use a local pharmacy,
                        select the option "Send to My Local Pharmacy" and
                        provide the necessary details for that pharmacy.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        If you do not select this option, you hereby consent to
                        have your prescription sent to one of Jupiter's
                        affiliated pharmacies for processing. Benefits of using
                        an affiliated pharmacy include free delivery,
                        prescription refill notifications, the ability to pause
                        or resume prescription services, and the option to
                        request prescription renewals, among other features that
                        Jupiter may introduce from time to time.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        By opting for a Jupiter-affiliated pharmacy, you
                        expressly consent to the sharing and disclosure of all
                        relevant personal and healthcare information with the
                        affiliated pharmacies. Additionally, you consent that
                        your prescription may be transferred to any Jupiter
                        affiliated pharmacy to ensure efficient processing.
                    </p>
                    <p className="text-sm font-extrabold pt-4">Counseling</p>
                    <ul className="!list-disc pl-11 text-sm font-medium pt-2">
                        <li>
                            Product Page Information: You will find a detailed
                            product page in the "My Medications" section of the
                            Platform's user portal. This page will include key
                            counseling points and product details for each
                            prescribed medication.
                        </li>
                        <li>
                            Email Correspondence: Once your prescription has
                            been issued, you will receive an email providing
                            information on how to access all relevant
                            information pertaining to your medication in
                            addition to an invitation to schedule counseling
                            with a pharmacist.
                        </li>
                        <li>
                            Package Leaflet: Each shipped package will include a
                            paper copy containing comprehensive product details
                            and counseling information for the dispensed
                            medication.
                        </li>
                        <li>
                            Contact Options: Users have multiple avenues to
                            interact with the pharmacy for consultations. These
                            include secure chat through the Platform's user
                            portal, scheduling a conversation with a member of
                            the pharmacy team, or directly calling the pharmacy
                            during available hours.
                        </li>
                    </ul>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            No Returns or Exchanges
                        </span>
                        You hereby acknowledge and agree that if a prescription
                        is filled by any Jupiter affiliated pharmacy, no refunds
                        will be issued for medications that have already been
                        dispensed at the time of pausing or terminating your
                        Account with Jupiter Health. If a dispensed medication
                        remains unclaimed at the designated delivery service, or
                        if delivery is otherwise unsuccessful for reasons beyond
                        our control, such medication will be destroyed one month
                        subsequent to the original fill date, unless you make
                        explicit contact with our Customer Support or the
                        affiliated pharmacy.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        Returns of medications or products are solely for the
                        purpose of secure disposal. These returns must either be
                        made in person or shipped at your own expense. No
                        refunds, exchanges, or store credits will be granted
                        under any circumstances, as the safety, storage, and
                        handling of the medication or product following your
                        receipt thereof cannot be assured or guaranteed.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Compounding Services
                        </span>
                        By utilizing Jupiter Health's Platform, you acknowledge
                        that some of the medications prescribed may be
                        custom-compounded by our affiliated pharmacies according
                        to a Healthcare Professional's directions. The
                        compounded medications are tailored to meet your
                        specific healthcare needs and are produced in compliance
                        with the highest standards of pharmacy practice as
                        outlined by the relevant regulatory bodies.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        While compounded medications undergo rigorous quality
                        control, it is crucial for you to follow the provided
                        storage instructions and usage guidelines carefully to
                        ensure the medication's effectiveness. Any deviation
                        from these guidelines could affect the safety and
                        efficacy of the medication. Jupiter Health and its
                        affiliated pharmacies disclaim all liability for any
                        loss, damage, or adverse effects resulting from your
                        failure to adhere to these guidelines.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Medication Recall
                        </span>
                        In the unlikely event of a medication recall affecting
                        any of the pharmaceuticals distributed by our affiliated
                        pharmacies, Jupiter Health will endeavor to notify all
                        impacted users promptly. The notification will include
                        details of the affected medication, the nature of the
                        recall, and any steps you should immediately undertake
                        for your safety. Depending on the severity and type of
                        the recall, we may also facilitate the return and
                        replacement or disposal of the affected medication.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        If you receive such a recall notification, it is
                        imperative that you discontinue use of the affected
                        medication and follow the instructions provided. Jupiter
                        Health and its affiliated pharmacies will not be held
                        liable for any harm or adverse effects experienced due
                        to continued use of a recalled product after a recall
                        notification has been issued.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        By continuing to use our Platform, you acknowledge your
                        understanding and acceptance of these terms pertaining
                        to Compounding Services and Medication Recalls.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Delays in Prescription and Pharmacy Services
                        </span>
                        Jupiter Health Inc. strives to facilitate timely
                        services through its Platform, including but not limited
                        to prescription issuance by licensed Healthcare
                        Professionals and fulfillment by associated pharmacies.
                        However, delays may occur for a variety of reasons, such
                        as system downtime, high service demand, or unforeseen
                        complexities in the evaluation or fulfillment process.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        You acknowledge and agree that Jupiter Health Inc. shall
                        not be liable for any delays in prescription issuance by
                        healthcare providers or delays in medication fulfillment
                        by pharmacies, whether such delays are caused by our
                        Platform or by third parties.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        Jupiter Health Inc. makes no guarantees regarding the
                        time required for prescription issuance or medication
                        delivery and disclaims any liability for any
                        consequences resulting from such delays.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Medication Shortages
                        </span>
                        By using Jupiter Health's Platform, you acknowledge that
                        the availability of certain medications is subject to
                        supply chain fluctuations, manufacturing constraints,
                        and regulatory changes. While Jupiter Health and its
                        affiliated pharmacies make reasonable efforts to
                        maintain a consistent supply of medications, we cannot
                        guarantee the uninterrupted availability of any specific
                        medication.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        In the event that a prescribed medication is unavailable
                        or back-ordered, we will make efforts to inform you in a
                        timely manner. Alternative treatment options may be
                        suggested by the Healthcare Professional, and it will be
                        your responsibility to consult with them to determine a
                        suitable course of action.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        Neither Jupiter Health nor its affiliated pharmacies
                        shall be liable for any loss, damage, or inconvenience
                        suffered as a result of the unavailability of any
                        medication. Your continued use of the Platform signifies
                        your understanding and acceptance of this Medication
                        Availability clause.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Dispensing Error Management
                        </span>
                        Jupiter Health Inc. and its affiliated pharmacies strive
                        to uphold the highest standards of care in the
                        dispensing of medications. Despite our rigorous
                        protocols, errors may infrequently occur. In the event
                        of a dispensing error, the patient is obliged to notify
                        Jupiter Health Inc. or the respective affiliate pharmacy
                        immediately upon discovery of the mistake.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        Upon receiving such notification, corrective measures
                        will be initiated promptly to rectify the error, which
                        may include but are not limited to:
                    </p>
                    <p className="text-sm font-medium pt-2">
                        Immediate recall of the incorrectly dispensed
                        medication;
                        <br /> Replacement with the correct medication at no
                        additional cost to the patient;
                        <br /> Clinical consultation to assess any health
                        impacts due to the error.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        Jupiter Health Inc. and its affiliate pharmacies shall
                        not be held liable for any adverse events, damages, or
                        complications arising from the dispensing error unless
                        it is established that the error occurred due to
                        negligence or willful misconduct.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">8.</span>
                        Documentation and Records
                    </h2>
                    <p className="text-sm font-medium">
                        <span className="text-sm font-extrabold">
                            Requests for Medical Expense Reports and Other
                            Documentation
                        </span>
                        <br />
                        If you are a patient of a Jupiter affiliated pharmacy,
                        upon request, Jupiter Health Inc. will provide you with
                        a detailed medical expense report and other relevant
                        documentation related to the Services you have accessed.
                        These reports are intended for personal record-keeping,
                        tax purposes, or insurance claims and will be made
                        available through your secure user portal. To request
                        such reports, please submit a written request to our
                        Customer Service Department at
                        <a
                            href={`mailto:${DEFAULT_PRIVACY_EMAIL}`}
                            target="_blank"
                            className="text-secondary font-medium ml-1"
                        >
                            {DEFAULT_PRIVACY_EMAIL}
                        </a>{" "}
                        .
                    </p>

                    <p className="text-sm font-medium pt-2">
                        Please allow up to seven (7) business days for the
                        processing of your request. While we strive for accuracy
                        in all documentation provided, Jupiter Health Inc. shall
                        not be liable for any errors or omissions in the
                        reports. You are advised to review all provided
                        documentation for accuracy and completeness upon
                        receipt.
                    </p>
                    <p className="text-sm font-medium pt-2">
                        In accordance with our data retention policy and
                        applicable provincial and federal laws, Jupiter Health
                        Inc. maintains your medical records for a period as
                        stipulated by law. After this period, we cannot
                        guarantee the availability of past medical reports or
                        other documentation. It is your responsibility to secure
                        copies of these documents within the mandated record
                        retention period.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Accuracy of Medical Records
                        </span>
                        You are responsible for ensuring the accuracy of the
                        medical records and personal information you provide.
                        Failure to do so may result in immediate termination of
                        your account and potential legal liabilities.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Record-Keeping Policy
                        </span>
                        Medical records will be retained for a duration
                        consistent with healthcare regulations in Ontario. Users
                        may request access to or deletion of their records in
                        compliance with privacy laws.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Informed Consent
                        </span>
                        By using our services, you acknowledge your awareness
                        and understanding of the inherent risks, limitations,
                        and conditions associated with telehealth consultation
                        and medication usage.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Ownership of Health Data
                        </span>
                        All patient health data is considered confidential and
                        is owned by the patient. Said data is stored and managed
                        in accordance with our privacy policy.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">9.</span>
                        Privacy and Confidentiality
                    </h2>
                    <p className="flex flex-wrap text-sm font-medium">
                        <span className="text-sm font-extrabold">
                            Privacy Policy and PHIPA Compliance
                        </span>
                        All personal and medical information collected through
                        our Platform is handled and protected in accordance with
                        Jupiter Health's privacy policy and is compliant with
                        the personal health information protection act (PHIPA)
                        of Ontario. This policy is accessible on our website.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            User Data and Confidentiality
                        </span>
                        Jupiter Health utilizes advanced security protocols,
                        aligned with PHIPA guidelines, to ensure the
                        confidentiality and integrity of your personal and
                        medical information.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            De-Identification and Use of Data
                        </span>
                        We reserve the right to anonymize and aggregate user
                        data for the purposes of medical research and quality
                        improvement, always in compliance with PHIPA and other
                        applicable regulations.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Circle of Care and Information Sharing
                        </span>
                        By using Jupiter Health's services, you consent to the
                        inclusion of your personal health information in your
                        "circle of care." This refers to the collaborative
                        approach involving Healthcare Professionals, caregivers,
                        and other stakeholders who are duly authorized to access
                        and share your medical information for the sole purpose
                        of facilitating coordinated care. Such parties may
                        include, but are not limited to, physicians,
                        pharmacists, nurses, specialists, and healthcare
                        administrators, all bound by relevant privacy laws and
                        ethical obligations to maintain the confidentiality and
                        integrity of your information. You acknowledge that this
                        circle of care is essential for delivering comprehensive
                        and continuous care, and you expressly authorize Jupiter
                        Health to disseminate your information within this
                        circle, pursuant to applicable laws and regulations.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">10.</span>
                        Payment and Billing
                    </h2>
                    <p className="flex flex-wrap text-sm font-medium">
                        <span className="text-sm font-extrabold">Payment</span>
                        All payments for services requested must be made through
                        authorized payment channels as designated by Jupiter
                        Health Inc. By entering your payment details and
                        submitting your Service request, you hereby authorize
                        Jupiter Health Inc., its affiliates, or our third-party
                        payment processors to charge the full amount due. You
                        are responsible for providing accurate, current, and
                        complete payment information. This may include not only
                        the fees for Jupiter Health's Services but also any
                        additional fees charged by affiliated healthcare
                        organizations or providers, which Jupiter Health Inc.
                        may collect on their behalf.
                    </p>
                    <p className="text-sm font-medium pt-4">
                        Failure to make complete payment or provide a valid
                        payment method shall result in immediate suspension or
                        termination of services. If your credit card expires, or
                        if for any reason we are unable to process your payment,
                        you will receive a notification to provide an
                        alternative payment method. Services will not be
                        rendered until full payment has been received and
                        verified.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Payment Authorization
                        </span>
                        By electing to use the Services provided by Jupiter
                        Health, you hereby authorize Us to charge the payment
                        method you have provided for the assessment fee, as well
                        as for any additional treatment costs that may apply.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Subscription and Auto-refill
                        </span>
                        By subscribing to any of Jupiter Health' Service plans,
                        you agree to pay all relevant fees associated with that
                        subscription, which are non-refundable unless explicitly
                        specified otherwise in these Terms. Prescription
                        medications, filled by a pharmacy affiliated with
                        Jupiter Health, will be automatically refilled in the
                        form of a subscription, along with any selected add-on
                        treatments. The refill intervals will be either every 1
                        or 3 months, depending on your preference and in
                        alignment with clinical best practices. Note that the
                        initial fill may be limited to a 1-month supply to
                        adhere to best practices.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Changes to subscription & Cancellation
                        </span>
                        You may modify, pause or cancel your subscription at any
                        time through your Account settings. Cancellation will
                        take effect at the end of the current billing cycle, and
                        you will not be charged thereafter. No refunds will be
                        issued for the unused portion of any subscription
                        period.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Eligibility for Refund
                        </span>
                        Except where explicitly stated in these terms, all
                        charges for Services rendered by Jupiter Health are
                        non-refundable. A refund of the value of assessment fee
                        may only be issued in the event that a treatment plan is
                        not generated following your consultation.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-ms font-bold pr-2">11.</span>
                        Ownership and Intellectual Property
                    </h2>
                    <p className="flex flex-wrap text-sm font-medium">
                        <span className="text-sm font-extrabold">
                            Ownership of Site Content and Intellectual Property
                            Rights
                        </span>
                        All materials displayed or otherwise accessible through
                        Jupiter Health, including but not limited to text,
                        graphics, images, and code ("content"), are protected
                        under applicable copyrights, trademarks, and other
                        proprietary (including but not limited to intellectual
                        property) rights, and are the exclusive property of
                        Jupiter Health Inc.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Intellectual Property Violations
                        </span>
                        Unauthorized use of Jupiter Health's intellectual
                        property constitutes a violation of these terms and may
                        give rise to legal action, including, but not limited
                        to, monetary damages, injunctive relief, and termination
                        of your account.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Trademarks
                        </span>
                        The trademarks, service marks, logos, and any other
                        proprietary designations ("marks") used or displayed on
                        the Platform are the registered and unregistered marks
                        of Jupiter Health Inc. Unauthorized use of any such
                        marks is strictly prohibited.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            User Content Licensing
                        </span>
                        By submitting, posting, or otherwise transmitting any
                        content to Jupiter Health, you hereby grant us a
                        non-exclusive, royalty-free, sublicensable, and
                        transferable license to use, reproduce, distribute, and
                        display said content in any manner related to the
                        operation of the Platform, subject to our privacy
                        policy.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">12.</span>
                        Third-Party Interactions
                    </h2>
                    <p className="flex flex-wrap text-sm font-medium">
                        <span className="text-sm font-extrabold">
                            Third-Party Websites and Links to Other Sites
                        </span>
                        Jupiter Health may contain hyperlinks to third-party
                        websites ("third-party sites"). Such links are provided
                        solely as a convenience to you and do not constitute an
                        endorsement, sponsorship, or recommendation by Jupiter
                        Health Inc. We assume no responsibility for the content,
                        privacy policies, or practices of any third-party sites.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Third-Party Services
                        </span>
                        Jupiter Health Inc. may engage third-party companies for
                        the purpose of fulfilling certain services, such as the
                        delivery of medications. While these companies are
                        carefully selected, Jupiter Health cannot assume
                        liability for any loss, damage, or injury you may incur
                        as a result of any act or omission of these third-party
                        companies. Your interactions with these third-party
                        entities are governed by their respective terms and
                        conditions, and Jupiter Health recommends reviewing
                        those terms prior to engagement.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">13.</span>
                        Legal and Compliance
                    </h2>
                    <p className="flex flex-wrap text-sm font-medium">
                        <span className="text-sm font-extrabold">
                            User Indemnification Responsibilities
                        </span>
                        You agree to indemnify and hold harmless Jupiter Health
                        Inc. From any and all losses, liabilities, damages, or
                        costs, including legal fees, incurred as a result of
                        your misuse of the products or services provided through
                        the Platform. Misuse includes but is not limited to the
                        use of products or services for illegal purposes,
                        non-compliance with prescribed treatment regimens, or
                        the dissemination of fraudulent information.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Limitation of Liability
                        </span>
                        TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAWS,
                        NEITHER JUPITER HEALTH INC. NOR ITS AFFILIATED ENTITIES
                        OR LICENSORS SHALL BE LIABLE TO YOU OR ANY THIRD-PARTY
                        FOR ANY DAMAGES OR LOSSES OF ANY KIND, WHETHER UNDER
                        CONTRACT, TORT, WARRANTY, OR ANY OTHER LEGAL THEORY.
                        THIS INCLUDES BUT IS NOT LIMITED TO INDIRECT,
                        INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR
                        EXEMPLARY DAMAGES, SUCH AS LOSS OF PROFITS, REVENUE, OR
                        DATA, AND HARM TO YOUR COMPUTER OR MOBILE SYSTEMS.
                        DAMAGES RELATED TO PHYSICAL OR EMOTIONAL HARM, INCLUDING
                        DEATH, ARE ALSO EXCLUDED, EVEN IF WE HAVE BEEN ADVISED
                        OF THE POSSIBILITY OF SUCH DAMAGES. FURTHERMORE, JUPITER
                        HEALTH DISCLAIMS LIABILITY FOR ANY LOSSES STEMMING FROM
                        YOUR INABILITY TO USE OUR SERVICES OR FROM UNAUTHORIZED
                        ACCESS TO YOUR ACCOUNT.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Dispute Resolution Details
                        </span>
                        Any disputes shall be resolved through binding
                        arbitration conducted in the province of Ontario, in
                        compliance with the arbitration act, 1991 (Ontario).
                        Each party shall bear their own costs of arbitration.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Dispute Resolution Mechanisms
                        </span>
                        All disputes, controversies, or claims arising out of or
                        in connection with the services provided by Jupiter
                        Health shall first be addressed through our designated
                        customer service channels.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Opting-Out of Arbitration
                        </span>
                        Users have the right to opt-out of the arbitration
                        agreement within thirty (30) days from the date of
                        initial acceptance of these terms by delivering a
                        written notice to Jupiter Health Inc.
                    </p>
                    <p className="text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Complaints and Grievance Redressal
                        </span>
                        <br />
                        Any complaints, concerns, or grievances you may have
                        about the Services provided through Jupiter Health Inc.
                        must be submitted in writing to our designated Grievance
                        Officer at{" "}
                        <a
                            href={`mailto:${DEFAULT_COMPLAINTS}`}
                            target="_blank"
                            className="text-secondary font-medium ml-1"
                        >
                            {DEFAULT_COMPLAINTS}
                        </a>
                        . We are committed to addressing your concerns in a
                        timely and effective manner. You may expect an initial
                        acknowledgment of your complaint within 48 hours, and a
                        comprehensive resolution plan within 15 business days.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Compliance with Provincial and Federal Laws
                        </span>
                        These terms are governed by and construed in accordance
                        with the laws of the province of Ontario and the federal
                        laws of Canada, as applicable, without regard to
                        conflict of law principles. You hereby consent to the
                        exclusive jurisdiction of Ontario, Canada, in all
                        disputes arising out of or related to the use of our
                        services.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">14.</span>
                        Technology and Security
                    </h2>
                    <p className="flex flex-wrap text-sm font-medium">
                        <span className="text-sm font-extrabold">
                            Encryption Standards
                        </span>
                        In our commitment to safeguarding the privacy and
                        integrity of your data, Jupiter Health employs robust
                        encryption standards to protect information transmitted
                        between you and our Platform. Below are key elements
                        detailing our encryption measures
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        SSL/TLS Protocols Jupiter Health's Platform uses Secure
                        Sockets Layer (SSL) and Transport Layer Security (TLS)
                        protocols to encrypt data during transmission. These
                        protocols establish a secure connection between your
                        device and our servers, ensuring the confidentiality and
                        integrity of information shared.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        End-to-End Encryption All communications within our
                        telemedicine sessions, including video and audio
                        exchanges, are encrypted from end-to-end. This means
                        only you and the healthcare provider can decrypt and
                        view the information, making it virtually impossible for
                        unauthorized third parties to access your data.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        Data Encryption at Rest Besides encrypting data during
                        transmission, we also encrypt data "at rest," that is,
                        when stored on our servers. We utilize advanced
                        encryption algorithms that comply with federal and
                        provincial regulations.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        Multi-Factor Authentication (MFA) To provide an
                        additional layer of security, Jupiter Health employs MFA
                        methods requiring users to validate their identity using
                        two or more verification mechanisms. This could be a
                        combination of something they know (password), something
                        they have (a mobile device), or something they are
                        (biometric verification).
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        Regular Updates Our encryption standards are routinely
                        reviewed and updated to address new security threats. We
                        adhere to a proactive approach in adopting emerging
                        encryption technologies and best practices.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        Compliance All encryption standards deployed by Jupiter
                        Health align with the Health Insurance Portability and
                        Accountability Act (HIPAA), the Personal Health
                        Information Protection Act (PHIPA), and other relevant
                        laws governing data protection and privacy in Ontario,
                        Canada.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        Third-Party Audits To ensure the efficacy of our
                        encryption measures, Jupiter Health undergoes regular
                        third-party audits. These audits scrutinize our
                        encryption protocols, ensuring they meet or exceed
                        industry standards.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            User Responsibility for Device Security
                        </span>
                        While Jupiter employs industry-standard encryption
                        methodologies to safeguard your data, you retain sole
                        responsibility for implementing security measures on
                        your device and for any unauthorized access to your
                        Account.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Cyberattacks and Security
                        </span>
                        Jupiter Health Inc. is not responsible for any damages
                        or implications caused by viruses, distributed
                        denial-of-service attacks, or other technologically
                        harmful material that may infect your computer
                        equipment, computer programs, or data due to the use of
                        our services or to your downloading of any material
                        posted on it, or any website linked to it.
                    </p>
                    <p className="text-sm font-extrabold pt-4">
                        Technology Requirements
                    </p>
                    <ul className="!list-disc pl-11 text-sm font-medium pt-3">
                        <li>
                            Software and Hardware: To utilize Jupiter Health
                            Inc.'s services, users are required to have a device
                            with internet access, a supported web browser, and,
                            where required, the appropriate software to view
                            certain content (e.g., PDF files). For telehealth
                            services, a camera, microphone, and speakers may
                            also be required. Jupiter Health Inc. is not
                            responsible for providing these requirements.
                        </li>
                        <li>
                            Updates: The Platform may update or require updates
                            and it is the user's responsibility to update to the
                            latest version of any required software to maintain
                            optimal functionality.
                        </li>
                        <li>
                            Compatibility: Jupiter Health Inc. does not warrant
                            that the Services will be compatible with all
                            hardware and software which you may use. We shall
                            not be liable for damage to, or viruses or other
                            code that may affect, any equipment, software, data,
                            or other property as a result of your access to or
                            use of the Services.
                        </li>
                        <li>
                            Data Charges: You are responsible for all internet
                            access, data download, and other network charges
                            when using our Services and we shall not be liable
                            for such charges.
                        </li>
                        <li>
                            Data Breach Policy: In the event of a data breach
                            involving personal information, Jupiter Health will
                            comply with all applicable laws and regulations
                            concerning notification and reporting.
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">15.</span>
                        Algorithmic Operations
                    </h2>
                    <p className="flex flex-wrap text-sm font-medium">
                        <span className="text-sm font-extrabold">
                            Algorithms
                        </span>
                        Jupiter Health utilizes proprietary algorithms (the
                        "algorithms") to conduct preliminary medical evaluations
                        and recommend potential treatment options. These
                        algorithms are calibrated to identify cases
                        necessitating immediate or in-person medical
                        intervention, thereby excluding them from the online
                        consultation process. The final prescription authority
                        resides solely with the designated licensed Healthcare
                        Professional, who shall exercise their professional
                        judgment independent of algorithmic recommendations.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Algorithmic Decision-Making Limitations
                        </span>
                        Jupiter Health expressly disclaims any liability for
                        errors, omissions, or inaccuracies emanating from these
                        algorithms. Algorithms serve solely as supplementary
                        tools and do not replace professional medical judgment
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">16.</span>
                        Legal Provisions
                    </h2>
                    <p className="flex flex-wrap text-sm font-medium">
                        <span className="text-sm font-extrabold">
                            Entire Agreement Clause
                        </span>
                        You agree to indemnify and hold harmless Jupiter Health
                        Inc. From any and all losses, liabilities, damages, or
                        costs, including legal fees, incurred as a result of
                        your misuse of the products or services provided through
                        the Platform. Misuse includes but is not limited to the
                        use of products or services for illegal purposes,
                        non-compliance with prescribed treatment regimens, or
                        the dissemination of fraudulent information. Jupiter
                        Health Inc. reserves the unilateral right to amend these
                        Terms at its sole discretion. Such changes shall take
                        effect immediately upon posting on the Platform. Your
                        continued engagement with the service constitutes
                        binding acceptance of any modified terms.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Severability
                        </span>
                        Should any provision of these Terms be found unlawful,
                        void, or unenforceable, such provision shall not affect
                        the validity or enforceability of the remaining
                        provisions.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            No Waiver
                        </span>
                        No failure or delay by Jupiter Health Inc. in exercising
                        any right, power, or remedy under these Terms of Use
                        shall operate as a waiver of any such right, power, or
                        remedy. No waiver by Jupiter Health Inc. of any term or
                        condition set forth herein shall be deemed a further or
                        continuing waiver of such term or condition or a waiver
                        of any other term or condition. Any waiver by Jupiter
                        Health Inc. must be in writing to be effective and shall
                        not constitute a waiver of any subsequent breach or
                        default.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            No Agency Relationship
                        </span>
                        These Terms of Use, along with any associated content,
                        materials, or features of the Platform, do not create
                        any partnership, joint venture, employment, or other
                        agency relationship between Jupiter Health Inc. and you.
                        You are not authorized to enter into any contract, incur
                        obligations, or bind Jupiter Health Inc. in any manner
                        whatsoever. Any attempt to do so is void and shall have
                        no force or effect.
                    </p>
                    <p className="text-sm font-medium pt-4">
                        This should provide Jupiter Health Inc. with robust
                        legal protections regarding the non-waiver of terms and
                        the avoidance of unintended agency relationships.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-base font-semibold">
                            Force Majeure
                        </span>
                        Jupiter Health Inc. shall not be liable for failure or
                        delay in performing its obligations due to unforeseen
                        circumstances beyond its reasonable control, including
                        but not limited to acts of God, natural disasters, wars,
                        civil disturbances, or disruption of telecommunications,
                        transportation, or utilities. In such events, Jupiter
                        Health will make reasonable efforts to notify affected
                        users and resume services as soon as practicable.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Amendment of Terms
                        </span>
                        Jupiter Health Inc. reserves the unilateral right to
                        modify or replace these Terms at any time and without
                        prior notice. Such changes shall be effective
                        immediately upon posting on the Platform. Continued use
                        after any such changes shall constitute your consent to
                        such changes.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">17.</span>
                        Notifications and Modifications
                    </h2>
                    <p className="flex flex-wrap text-sm font-medium">
                        <span className="text-sm font-extrabold">
                            Notification for Terms Modification
                        </span>
                        We reserve the right to post notices of amendments, but
                        we are not obliged to do so. Your continued use of the
                        Jupiter Platform following any changes to these Terms
                        signifies your agreement to adhere to and be bound by
                        the modified Terms.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">18.</span>
                        Other
                    </h2>
                    <p className="flex flex-wrap text-sm font-medium">
                        <span className="text-sm font-extrabold">
                            Assessments by Medical Condition
                        </span>
                        Each consultation with a Healthcare Provider via the
                        Jupiter Health Platform is limited to the assessment of
                        a single medical condition. Each new assessment is
                        subject to a fee. Any re-assessments and renewals are
                        not subject to additional fees.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Billing to Third Party Insurers
                        </span>
                        Jupiter may, in its sole discretion, offer the ability
                        to bill certain eligible costs directly to third-party
                        insurance providers. You understand and agree that
                    </p>
                    <ul className="!list-disc  pl-11 text-sm font-medium pt-4">
                        <li>
                            Insurance plans: Pricing may vary based on your
                            insurance coverage. It is your responsibility to
                            verify your insurance plan's terms and whether it
                            covers the cost of your selected services.
                        </li>
                        <li>
                            Eligibility for billing: Not all services or
                            products available through Jupiter may be eligible
                            for third-party billing.
                        </li>
                        <li>
                            User obligation: You are responsible for ensuring
                            the completeness and accuracy of all insurance
                            information provided to Jupiter.
                        </li>
                        <li>
                            Pricing changes: The prices for services or products
                            may be subject to change based on your insurance
                            coverage.
                        </li>
                        <li>
                            Claim rejections: Jupiter is not responsible for any
                            claim rejections. In such cases, you will be liable
                            for the full cost of the service or product.
                        </li>
                        <li>
                            Communication: Any communication related to
                            insurance billing or claim disputes is between you
                            and the third-party insurance provider.
                        </li>
                    </ul>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            CASL and Consent to Receive Email
                        </span>
                        In compliance with Canada’s Anti-Spam Legislation
                        ("CASL"), by creating an account with Jupiter Health,
                        you are providing explicit consent to receive electronic
                        communication, including emails related to
                    </p>
                    <ul className="!list-disc  pl-11 text-sm font-medium pt-4">
                        <li>Service updates</li>
                        <li>Medical and health information</li>
                        <li>Promotional offers</li>
                    </ul>
                    <p className="text-sm font-medium pt-4">
                        You may unsubscribe from such communications at any time
                        by following the "Unsubscribe" link in our emails.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Export Restrictions
                        </span>
                        Jupiter Health Services are intended for use within
                        Canada and are subject to Canadian export laws. You
                        agree not to:
                    </p>
                    <ul className="!list-disc  pl-11 text-sm font-medium pt-4">
                        <li>Use or access the Services outside of Canada.</li>
                        <li>
                            Export any part of the Services, including software,
                            in violation of Canadian export laws.
                        </li>
                    </ul>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Terms for Doctors and Patients
                        </span>
                    </p>
                    <ul className="!list-disc  pl-11 text-sm font-medium pt-4">
                        <li>
                            Credential Verification: Healthcare Professionals
                            are responsible for maintaining current credentials
                            and adhering to jurisdictional regulations.
                        </li>
                        <li>
                            Quality of Service: Healthcare Professionals agree
                            to provide healthcare services in accordance with
                            established medical standards.
                        </li>
                    </ul>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Waiver of Jury Trial and Class Actions Suits
                        </span>
                        By using Jupiter Health Services, you waive any
                        constitutional and statutory rights to go to court and
                        have a trial in front of a judge or a jury. Instead, all
                        disputes will be resolved by binding arbitration under
                        the Arbitration Act, 1991 (Ontario). You also waive any
                        ability to bring claims as a class member in any
                        purported class or representative proceeding.
                    </p>
                    <p className="flex flex-wrap text-sm font-medium pt-4">
                        <span className="text-sm font-extrabold">
                            Invoices and Receipts
                        </span>
                        Invoices and receipts will be provided electronically
                        through the Jupiter Health Platform. You are responsible
                        for ensuring that you have received the invoice and for
                        verifying its accuracy.
                    </p>
                </div>
                <div>
                    <h2 className="text-base font-bold pt-4 text-secondary">
                        <span className="text-base font-bold pr-2">19.</span>
                        Definitions :
                    </h2>
                    <ul className="!list-disc pl-11 pt-4 font-medium text-sm">
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Account”
                            </span>
                            means a registered profile created by a Patient to
                            access the Services provided by Jupiter Health via
                            the Platform.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Account Record”
                            </span>
                            means all data including Personal Information (PI)
                            and Patient Health Information (PHI) related to a
                            Patient's usage of the Jupiter Health’s Services.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Active Account”
                            </span>
                            refers to an Account that is currently in good
                            standing and not subject to suspension or
                            termination.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Assessment”
                            </span>
                            refers to the systematic evaluation conducted by a
                            licensed healthcare professional through Jupiter
                            Health's platform, limited to a single medical
                            condition.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Assessment Fee”
                            </span>
                            refers to the fee charged for each Assessment
                            submitted via Jupiter’s Platform.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Assessment Form”
                            </span>
                            or
                            <span className="text-sm font-extrabold pl-2">
                                “Questionnaire”
                            </span>
                            refers to the set of questions developed by us or by
                            our professionals, working as partners, contractors
                            and employees to collect pertinent information to
                            assist with medical evaluations and to provide
                            recommended treatment options.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Authorized User”
                            </span>
                            means an individual who is authorized to use the
                            Jupiter Health Services under a Patient’s Account,
                            where applicable.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Billing Information”
                            </span>
                            refers to any financial information, such as credit
                            card numbers and billing addresses, necessary for
                            the completion of transactions within the Platform.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “CASL”
                            </span>
                            means Canada’s Anti-Spam Legislation governing the
                            use of electronic communications.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Client”
                            </span>
                            or
                            <span className="text-sm font-extrabold pl-2 pr-2">
                                "Patient"
                            </span>
                            refers to an individual who has created an Account
                            to access Jupiter Health Services.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Compliance”
                            </span>
                            refers to the requirement for users to act in
                            accordance with Jupiter Health's Terms of Use,
                            policies, and applicable law.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Confidential Information”
                            </span>
                            encompasses all non-public information, written or
                            oral, disclosed through any means of communication
                            by Jupiter Health.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Consultation”
                            </span>
                            refers to the one-on-one virtual interactions
                            between Healthcare Professionals and Patients for
                            diagnosis, treatment, or advice.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Content”
                            </span>
                            refers to the one-on-one virtual interactions
                            between Healthcare Professionals and Patients for
                            diagnosis, treatment, or advice.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Credentials”
                            </span>
                            refers to the unique identifiers such as usernames
                            and passwords required for Account access.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Data Breach”
                            </span>
                            means unauthorized access or retrieval of Account
                            Records, Personal Information, and other sensitive
                            data.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Encryption”
                            </span>
                            refers to the use of algorithms to secure
                            information during data storage and transmission.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Healthcare Professionals”
                            </span>
                            or
                            <span className="text-sm font-extrabold pl-2">
                                “Healthcare Provider”
                            </span>
                            refers to licensed medical professionals contracted
                            by Jupiter Health, responsible for providing
                            healthcare services to Patients.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Inactive Account”
                            </span>
                            refers to an Account that has not been used for a
                            specified period and may be subject to deactivation.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Intellectual Property”
                            </span>
                            refers to proprietary content, trademarks, patents,
                            and copyrights owned by Jupiter Health or its
                            licensors.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Invoice”
                            </span>
                            refers to the electronic billing statement provided
                            to Patients for Services rendered by Jupiter Health.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Jupiter Affiliated Pharmacy”
                            </span>
                            refers to any pharmacy that works with Jupiter and
                            has access to Jupiter’s Platform to provide enhanced
                            prescription fulfillment services to patients.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Opt-In”
                            </span>
                            refers to the user’s explicit consent to receive
                            specific types of electronic communication from
                            Jupiter Health.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Pharmacy Services”
                            </span>
                            refers to the preparation, dispensing, and delivery
                            of medications by affiliated pharmacies.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Platform”
                            </span>
                            refers to Jupiter Health’s web-based application
                            used to offer its Services.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Prescription”
                            </span>
                            means the formal instruction by a licensed
                            Healthcare Professional for the treatment of an
                            individual Patient.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Privacy Notice”
                            </span>
                            indicates the documentation outlining how Jupiter
                            Health manages, uses, and protects Personal
                            Information and Medical Records.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Promotional Offers”
                            </span>
                            refers to any discounts, trials, or marketing offers
                            provided by Jupiter Health.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Quality of Service”
                            </span>
                            means the standard of healthcare provision that
                            Healthcare Professionals are expected to adhere to.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Re-Assessment”
                            </span>
                            refers to the subsequent evaluation conducted by a
                            licensed healthcare professional to review and
                            update a patient's medical condition, treatment
                            efficacy, or healthcare needs. This process may
                            involve revisiting previously collected medical
                            history, symptoms, and treatment plans to make
                            necessary adjustments for continued or improved
                            care.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Renewal”
                            </span>
                            refers to the process by which a Healthcare
                            Professional issues a new prescription for the same
                            treatment that was previously prescribed. This
                            occurs when a patient's existing prescription has
                            expired or is eligible for renewal. The Healthcare
                            Professional reviews the patient's medical history
                            and assesses their current health status to
                            determine if it is appropriate to renew the
                            prescription.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Service Updates”
                            </span>
                            encompasses notifications about changes,
                            enhancements, or termination of any part of Jupiter
                            Health’s Services.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Telemedicine”
                            </span>
                            or
                            <span className="text-sm font-bold pl-2">
                                “Virtual Care”
                            </span>
                            is the practice of caring for Patients remotely
                            through telecommunication technologies.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Third-Party”
                            </span>
                            means any entity other than the user or Jupiter
                            Health that may be involved in the provision or
                            usage of the Services.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “Treatment Categories”
                            </span>
                            refers to the medical areas such as Pain Management,
                            Dermatology, Anti-aging, Men's Health, and Hair Loss
                            that Jupiter Health provides Services for.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “User"
                            </span>
                            refers to any individual or entity that interacts
                            with the Jupiter Health platform, including but not
                            limited to Patients who have registered accounts to
                            access Services, and Healthcare Professionals
                            contracted to provide healthcare services.
                        </li>
                        <li>
                            <span className="text-sm font-extrabold pr-2">
                                “User Portal”
                            </span>
                            refers to the portion of the Jupiter Platform that
                            users access to view, update and access personal
                            information, information and services related to
                            prescribed medications and products, as well as
                            interact with Healthcare Professionals and Jupiter
                            affiliated pharmacies.
                        </li>
                    </ul>
                </div>
            </div>
        </Modal>
    );
};

export default TermsOfUseModal;
