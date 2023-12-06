export const painManagementQuestions = [
    {
        qId: "QUE_1",
        qKey: "1",
        question: "Are you here to treat any of the following conditions?",
        answers: [],
        options: [
            {
                label: "Arthritic or swollen joints",
                key: "QUE_1_ANS_1",
                flag: "",
            },
            {
                label: "Sports-related injury",
                key: "QUE_1_ANS_2",
                flag: "",
            },
            {
                label: "Nerve pain",
                key: "QUE_1_ANS_3",
                flag: "",
            },
            {
                label: "Lower back pain",
                key: "QUE_1_ANS_4",
                flag: "",
            },

            {
                label: "Other pain",
                key: "QUE_1_ANS_5",
                flag: "",
            },
        ],
    },
    {
        qId: "QUE_2",
        qKey: "2",
        question: "Have you seen a doctor about your pain?",
        answers: [],
        options: [
            {
                label: "Yes",
                key: "QUE_2_ANS_1",
            },
            {
                label: "No",
                key: "QUE_2_ANS_2",
            },
        ],
    },
    {
        qId: "QUE_3",
        qKey: "3",
        answers: [],
        question: "Is your pain caused by any of the following?",
        options: [
            {
                label: "Motor vehicle accident",
                key: "QUE_3_ANS_1",
                flag: "Yellow",
            },
            {
                label: "Work related injury (WSIB)",
                key: "QUE_3_ANS_2",
                flag: "Yellow",
            },
            {
                label: "Spinal injury",
                key: "QUE_3_ANS_3",
                flag: "Yellow",
            },
            {
                label: "Head or neck injury",
                key: "QUE_3_ANS_4",
                flag: "Yellow",
            },
            {
                label: "Slip and fall accident",
                key: "QUE_3_ANS_5",
                flag: "Yellow",
            },
            {
                label: "None of the above",
                key: "QUE_3_ANS_6",
                flag: "",
            },
        ],
    },
    {
        qId: "QUE_3_A",
        qKey: "3_A",
        question:
            "Are currently seeking or receiving legal advice related to any of your injuries?",
        options: [
            {
                label: "Yes",
                key: "QUE_3_A_ANS_1",
                flag: "Red",
            },
            {
                label: "No",
                key: "QUE_3_A_ANS_2",
                flag: "",
            },
        ],
        answers: [],
        flagTitle: "Important Health Notice",
        flagText:
            "We apologize for the inconvenience but we are unable to proceed with your assessment at this time. Based on your responses, it appears you may have a health issue that requires an in-person medical evaluation. Please contact your doctor or visit the nearest emergency room.",
    },
    {
        qId: "QUE_4",
        answers: [],
        qKey: "4",
        question: "Have you been diagnosed with any of the following?",
        flagTitle: "Important Health Notice",
        flagText:
            "We apologize for the inconvenience but we are unable to proceed with your assessment at this time. Based on your responses, it appears you may have a health issue that requires an in-person medical evaluation. Please contact your doctor or visit the nearest emergency room.",
        options: [
            {
                label: "Aneurysm",
                key: "QUE_4_ANS_1",
                flag: "Red",
            },
            {
                label: "Blood clotting disorder",
                key: "QUE_4_ANS_2",
                flag: "Red",
            },
            {
                label: "COPD (Chronic Obstructive Pulmonary Disease)",
                key: "QUE_4_ANS_3",
                flag: "Yellow",
            },
            {
                label: "Diabetes",
                key: "QUE_4_ANS_4",
                flag: "",
            },
            {
                label: "Kidney stones",
                key: "QUE_4_ANS_5",
                flag: "Yellow",
            },
            {
                label: "Kidney, liver or heart failure",
                key: "QUE_4_ANS_6",
                flag: "Red",
            },
            {
                label: "Past or present diagnosis of cancer",
                key: "QUE_4_ANS_7",
                flag: "Yellow",
            },
            {
                label: "Seizure disorder / epilepsy",
                key: "QUE_4_ANS_8",
                flag: "Red",
            },
            {
                label: "Stomach ulcer",
                key: "QUE_4_ANS_9",
                flag: "",
            },
            {
                label: "Uncontrolled high blood pressure",
                key: "QUE_4_ANS_10",
                flag: "Red",
            },
            {
                label: "Unstable heart problems",
                key: "QUE_4_ANS_11",
                flag: "Red",
            },
            {
                label: "None of the above",
                key: "QUE_4_ANS_12",
                flag: "",
            },
        ],
    },

    {
        qId: "QUE_5",
        qKey: "5",
        answers: [],
        question: "Are you currently taking any of the following medications?",
        flagTitle: "Important Health Notice",
        flagText:
            "We apologize for the inconvenience but we are unable to proceed with your assessment at this time. Based on your responses, it appears you may have a health issue that requires an in-person medical evaluation. Please contact your doctor or visit the nearest emergency room.",
        options: [
            {
                label:
                    "Blood thinners e.g. Warfarin, Clopidogrel (Plavix), Rivaroxaban (Xarelto)",
                key: "QUE_5_ANS_1",
                flag: "Yellow",
            },
            {
                label: "Anti-platelet e.g. Aspirin",
                key: "QUE_5_ANS_2",
                flag: "",
            },
            {
                label: "Antibiotics",
                key: "QUE_5_ANS_3",
                flag: "Red",
            },
            {
                label: "Chemotherapy drugs",
                key: "QUE_5_ANS_4",
                flag: "Red",
            },
            {
                label: "None of the above",
                key: "QUE_5_ANS_5",
                flag: "",
            },
        ],
    },
    {
        qId: "QUE_6",
        question:
            "Within the past 3 months, have you undergone any of the following surgeries or implants?",
        qKey: "6",
        flagTitle: "Important Health Notice",
        flagText:
            "We apologize for the inconvenience, but we are unable to proceed with your assessment at this time due to the time elapsed since your last procedure. We would be happy to serve your after at least 3 months have passed and once your healing process is complete. For immediate support, we recommend that you seek assistance from your specialist or family doctor. We appreciate your understanding, and our team looks forward to assisting you in the future.",
        answers: [],
        options: [
            {
                label:
                    "Cardiac devices such as pacemakers, implantable cardioverter defibrillators (ICDs), and cardiac resynchronization therapy (CRT) devices",
                key: "QUE_6_ANS_1",
                flag: "Red",
            },
            {
                label: "Joint replacement (i.e. hip, knee, shoulder)",
                key: "QUE_6_ANS_2",
                flag: "Yellow",
            },
            {
                label:
                    "Implantable drug pumps such as intrathecal pumps and insulin pumps",
                key: "QUE_6_ANS_3",
                flag: "Red",
            },
            {
                label: "Retinal implants and other ocular devices",
                key: "QUE_6_ANS_4",
                flag: "Red",
            },
            {
                label: "Other",
                key: "QUE_6_ANS_5",
                flag: "Yellow",
            },
            {
                label: "None of the above",
                key: "QUE_6_ANS_6",
                flag: "",
            },
        ],
    },
    {
        qId: "QUE_7",
        question:
            "Are you currently experiencing any of the following symptoms?",
        qKey: "7",
        answers: [],
        flagTitle: "Important Health Notice",
        flagText:
            "Your response suggests that you might be experiencing a medical emergency. We urge you to reach out to the emergency services in your area or make your way to the nearest hospital or healthcare center immediately. We value your understanding, and our team eagerly anticipates the opportunity to assist you in the future. Your well-being is our top priority.",
        options: [
            {
                label:
                    "Abdominal distention (rapid/severe swelling or bloating)",
                key: "QUE_7_ANS_1",
                flag: "Red",
            },
            {
                label: "Blue lips, fingertips or toes",
                key: "QUE_7_ANS_2",
                flag: "Red",
            },
            {
                label:
                    "Chest pressure or pain that extends to arm, neck or jaw",
                key: "QUE_7_ANS_3",
                flag: "Red",
            },
            {
                label: "Complete loss of bowel or bladder function",
                key: "QUE_7_ANS_4",
                flag: "Red",
            },
            {
                label: "Coughing blood or blood in stool/vomit",
                key: "QUE_7_ANS_5",
                flag: "Red",
            },
            {
                label: "Episodes of seizures or loss of consciousness",
                key: "QUE_7_ANS_6",
                flag: "Red",
            },
            {
                label:
                    "High fever (over 38.3° C/101° F), dizziness or cold/sweaty skin",
                key: "QUE_7_ANS_7",
                flag: "Red",
            },
            {
                label:
                    "Joint stiffness that lasts longer than 1 hour every morning",
                key: "QUE_7_ANS_8",
                flag: "Yellow",
            },
            {
                label: "Muscle weakness or progressive paralysis",
                key: "QUE_7_ANS_9",
                flag: "Red",
            },
            {
                label: "Nausea or vomiting",
                key: "QUE_7_ANS_10",
                flag: "Red",
            },
            {
                label: "New onset of severe headache",
                key: "QUE_7_ANS_11",
                flag: "Red",
            },
            {
                label: "Painful swelling in legs or ankles",
                key: "QUE_7_ANS_12",
                flag: "Red",
            },
            {
                label: "Rapid or irregular heartbeat/breathing",
                key: "QUE_7_ANS_13",
                flag: "Red",
            },
            {
                label:
                    "Severe chest discomfort after physical activity or while breathing",
                key: "QUE_7_ANS_14",
                flag: "Red",
            },
            {
                label:
                    "Symmetrically swollen painful joints in hands or fingers",
                key: "QUE_7_ANS_15",
                flag: "Yellow",
            },
            {
                label: "Thoughts of suicide or self-harm",
                key: "QUE_7_ANS_16",
                flag: "Red",
            },
            {
                label: "Trouble breathing while resting",
                key: "QUE_7_ANS_17",
                flag: "Red",
            },
            {
                label: "Unexplained bruising or bleeding",
                key: "QUE_7_ANS_18",
                flag: "Red",
            },
            {
                label: "Unexplained sudden or sharp pain",
                key: "QUE_7_ANS_19",
                flag: "Yellow",
            },
            {
                label: "Unexplained weight loss",
                key: "QUE_7_ANS_20",
                flag: "Red",
            },
            {
                label: "None of the above",
                key: "QUE_7_ANS_21",
                flag: "",
            },
        ],
    },
    {
        qId: "QUE_8",
        question:
            "Please select the location of pain on the diagram (as many areas as apply)",
        qKey: "8",
        answers: [],
        options: [],
    },
    {
        qId: "QUE_G_1",
        question: "How large is the area(s) affected by your pain?",
        qKey: "9",
        answers: [],
        flagTitle: "Important Health Notice",
        flagText:
            "We apologize for the inconvenience but we are unable to proceed with your assessment at this time. Based on your responses, it appears you may have a health issue that requires an in-person medical evaluation. Please contact your doctor or visit the nearest emergency room.",
        options: [
            {
                label: "As small as a quarter or less",
                key: "QUE_G_1_ANS_1",
                flag: "",
            },
            {
                label: "The size of a tennis ball",
                key: "QUE_G_1_ANS_2",
                flag: "",
            },
            {
                label: "The size of a basketball",
                key: "QUE_G_1_ANS_3",
                flag: "",
            },
            {
                label: "More than half of my body",
                key: "QUE_G_1_ANS_4",
                flag: "Red",
            },
        ],
    },
    {
        qId: "QUE_10",
        qKey: "10",
        question:
            "Do you have cracked, broken skin or stitches at the site of pain?",
        answers: [],
        flagTitle: "Important Health Notice",
        flagText:
            "We apologize for the inconvenience but we are unable to proceed with your assessment at this time. Based on your responses, it appears you may have a health issue that requires an in-person medical evaluation. Please contact your doctor or visit the nearest emergency room.",
        options: [
            {
                label: "Yes",
                key: "QUE_10_ANS_1",
                flag: "Red",
            },
            {
                label: "No",
                key: "QUE_10_ANS_2",
                flag: "",
            },
        ],
    },
    {
        qId: "QUE_11",
        question:
            "Is there any skin irritation or rash in the area(s) where you're experiencing pain?",
        qKey: "11",
        answers: [],
        options: [
            {
                label: "Yes",
                key: "QUE_11_ANS_1",
                flag: "Yellow",
            },
            {
                label: "No",
                key: "QUE_11_ANS_2",
                flag: "",
            },
        ],
    },
    {
        qId: "QUE_12",
        question:
            "Does your pain remain in one specific area or does it change locations?",
        qKey: "12",
        answers: [],
        options: [
            {
                label: "Yes, it remains in one area",
                key: "QUE_12_ANS_1",
                flag: "",
            },
            {
                label: "No, it changes location",
                key: "QUE_12_ANS_2",
                flag: "Yellow",
            },
        ],
    },
    {
        qId: "QUE_13",
        question: "How long have you been experiencing pain?",
        qKey: "13",
        answers: [],
        options: [
            {
                label: "Less than 1 month",
                key: "QUE_13_ANS_1",
                flag: "Yellow",
            },
            {
                label: "1 to 6 months",
                key: "QUE_13_ANS_2",
                flag: "",
            },
            {
                label: "Over 6 months",
                key: "QUE_13_ANS_3",
                flag: "",
            },
        ],
    },
    {
        qId: "QUE_14",
        question: "Did any of the following occur before your pain started?",
        qKey: "14",
        answers: [],
        options: [
            {
                label: "Accident",
                key: "QUE_14_ANS_1",
                flag: "",
            },
            {
                label: "Infection",
                key: "QUE_14_ANS_2",
                flag: "Yellow",
            },
            {
                label: "Insect bite",
                key: "QUE_14_ANS_3",
                flag: "Yellow",
            },
            {
                label: "Surgery",
                key: "QUE_14_ANS_4",
                flag: "",
            },
            {
                label: "Sports-related injury",
                key: "QUE_14_ANS_5",
                flag: "",
            },
            {
                label: "Other",
                key: "QUE_14_ANS_6",
                flag: "",
            },
            {
                label: "Unsure",
                key: "QUE_14_ANS_7",
                flag: "",
            },
        ],
    },
    {
        qId: "QUE_P_1",
        question:
            "On a scale of 0 to 10, how would you rate the pain (0 means no pain at all, 10 means the worst pain you have ever experienced)?",
        qKey: "15",
        answers: [],
        options: [],
    },
    {
        qId: "QUE_G_2",
        qKey: "16",
        question: "How many days a week do you experience pain?",
        options: [],
        answers: [],
    },
    {
        qId: "QUE_G_3",
        question: "When do you experience pain throughout the day?",
        qKey: "17",
        answers: [],
        options: [
            {
                label: "Morning",
                key: "QUE_G_3_ANS_1",
                flag: "",
            },
            {
                label: "Mid-day",
                key: "QUE_G_3_ANS_2",
                flag: "",
            },
            {
                label: "Evening",
                key: "QUE_G_3_ANS_3",
                flag: "",
            },
            {
                label: "All day",
                key: "QUE_G_3_ANS_4",
                flag: "",
            },
        ],
    },
    {
        qId: "QUE_P_2",
        question: "Which of the following best describes your symptoms?",
        qKey: "18",
        answers: [],
        options: [
            {
                label: "Dull or aching pain",
                key: "QUE_P_2_ANS_1",
                flag: "",
                category: "Inflammatory",
            },
            {
                label: "Warmth or heat sensation",
                key: "QUE_P_2_ANS_2",
                flag: "",
                category: "Inflammatory",
            },
            {
                label: "Throbbing or gnawing pain",
                key: "QUE_P_2_ANS_3",
                flag: "",
                category: "Inflammatory",
            },
            {
                label: "Swelling or redness",
                key: "QUE_P_2_ANS_4",
                flag: "",
                category: "Inflammatory",
            },
            {
                label: "Muscle cramps or spasms",
                key: "QUE_P_2_ANS_5",
                flag: "",
                category: "Musculoskeletal",
            },
            {
                label: "Muscle tenderness",
                key: "QUE_P_2_ANS_6",
                flag: "",
                category: "Musculoskeletal",
            },
            {
                label: "Muscle tightness",
                key: "QUE_P_2_ANS_7",
                flag: "",
                category: "Musculoskeletal",
            },
            {
                label: "Electric-shock-like pain",
                key: "QUE_P_2_ANS_8",
                flag: "",
                category: "Neuropathic",
            },
            {
                label: "Pain worsens with cold",
                key: "QUE_P_2_ANS_9",
                flag: "",
                category: "Neuropathic",
            },
            {
                label: "Shooting, stabbing or burning sensation",
                key: "QUE_P_2_ANS_10",
                flag: "",
                category: "Neuropathic",
            },
            {
                label: "Pins & needles, tingling or itching sensation",
                key: "QUE_P_2_ANS_11",
                flag: "",
                category: "Neuropathic",
            },
            {
                label: "Numbness, cold or bluish skin",
                key: "QUE_P_2_ANS_12",
                flag: "",
                category: "Neuropathic",
            },
        ],
    },

    {
        qId: "QUE_19",
        question:
            "Do you have any questions or additional information you would like to share with the medical practitioner?",
        qKey: "19",
        answers: [],
        options: [],
    },
];
