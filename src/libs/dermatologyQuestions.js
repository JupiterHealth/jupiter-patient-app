export const dermatologyQuestions = [
    {
        triggerName: [
            "Melasma",
            "Acne",
            "Rosacea",
            "Sweaty HPF",
            "Scar",
            "Anti aging",
        ],
        qId: "QUE_1",
        qKey: "1",
        question: "What are your skin concerns or conditions?",
        answers: [],
        options: [
            {
                label: "Melasma (dark or sun spots)",
                key: "QUE_1_ANS_1",
                flag: "",
                trigger: "Melasma",
            },
            {
                label: "Acne (breakouts)",
                key: "QUE_1_ANS_2",
                flag: "",
                trigger: "Acne",
            },
            {
                label: "Rosacea (facial redness)",
                key: "QUE_1_ANS_3",
                flag: "",
                trigger: "Rosacea",
            },
            {
                label:
                    "Anti-aging (wrinkles, large pores, dull skin and uneven texture)",
                key: "QUE_1_ANS_4",
                flag: "",
                trigger: "Anti aging",
            },
            {
                label:
                    "Hyperhidrosis (excessive sweating of palms, hands or feet)",
                key: "QUE_1_ANS_5",
                flag: "",
                trigger: "Sweaty HPF",
            },
            {
                label: "Scar(s)",
                key: "QUE_1_ANS_6",
                flag: "",
                trigger: "Scar",
            },
        ],
    },
    {
        triggerName: ["Melasma", "Acne", "Rosacea", "Sweaty HPF", "Scar"],
        qId: "QUE_2",
        qKey: "2",
        question:
            "Have you seen a dermatologist or healthcare provider for these concerns in the past?",
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
        triggerName: ["Melasma", "Acne", "Rosacea", "Sweaty HPF", "Scar"],
        qId: "QUE_3",
        qKey: "3",
        question:
            "Have you used any medications for this condition in the past?",
        answers: [],
        options: [
            {
                label: "Yes",
                key: "QUE_3_ANS_1",
            },
            {
                label: "No",
                key: "QUE_3_ANS_2",
            },
        ],
    },
    {
        triggerName: ["Melasma", "Acne", "Rosacea", "Sweaty HPF", "Scar"],
        qId: "QUE_4",
        qKey: "4",
        question: "Which of the following best describes your skin type?",
        answers: [],
        options: [
            {
                label: "Dry",
                key: "QUE_4_ANS_1",
                flag: "",
            },
            {
                label: "Regular",
                key: "QUE_4_ANS_2",
                flag: "",
            },
            {
                label: "Oily",
                key: "QUE_4_ANS_3",
                flag: "",
            },
            {
                label: "Unsure",
                key: "QUE_4_ANS_4",
                flag: "",
            },
        ],
    },
    {
        triggerName: ["Melasma", "Acne", "Rosacea", "Sweaty HPF"],
        qId: "QUE_5",
        qKey: "5",
        question: "Do you have a history of skin cancer?",
        answers: [],
        options: [
            {
                label: "Yes",
                key: "QUE_5_ANS_1",
            },
            {
                label: "No",
                key: "QUE_5_ANS_2",
            },
        ],
    },
    {
        triggerName: ["Melasma", "Acne", "Rosacea", "Scar"],
        qId: "QUE_6",
        qKey: "6",
        question:
            "Please upload photos of your skin condition(s) so we can analyze it as part of your skin assessment (instructions: Make sure the affected area is well lit and evenly illuminated)",
        answers: [],
        options: [
            {
                label: "Upload photos",
                key: "QUE_6_ANS_1",
            },
        ],
    },
    {
        triggerName: ["Melasma", "Acne", "Rosacea", "Sweaty HPF"],
        qId: "QUE_7",
        qKey: "7",
        question: "How long have you been experiencing your symptoms?",
        answers: [],
        options: [
            {
                label: "Less than 3 months",
                key: "QUE_7_ANS_1",
                flag: "",
            },
            {
                label: "3-12 months",
                key: "QUE_7_ANS_2",
                flag: "",
            },
            {
                label: "Over 1 year",
                key: "QUE_7_ANS_3",
                flag: "",
            },
        ],
    },
    {
        triggerName: ["Melasma", "Acne", "Rosacea", "Sweaty HPF"],
        qId: "QUE_8",
        qKey: "8",
        question: "Which of the following describes your skin condition?",
        answers: [],
        options: [
            {
                label: "Stable/consistent",
                key: "QUE_8_ANS_1",
                flag: "",
            },
            {
                label: "Worsening/progressing",
                key: "QUE_8_ANS_2",
                flag: "",
            },
        ],
    },
    {
        triggerName: ["Rosacea"],
        qId: "QUE_9",
        qKey: "9",
        question:
            "Please choose the best description of your Rosacea symptoms?",
        answers: [],
        flagTitle: "Acknowledgment Required",
        flagText:
            "We recommend that you consult with an ophthalmologist to address your eye-related concerns. The Rosacea treatments we offer are designed to address skin-related issues only. If you are seeking treatment for other conditions, you may proceed with those. Thank you for your understanding.",
        options: [
            {
                label: "Redness, blushing, visible blood vessels",
                key: "QUE_9_ANS_1",
                flag: "",
            },
            {
                label: "Bumps, small whiteheads",
                key: "QUE_9_ANS_2",
                flag: "",
            },
            {
                label: "Thickened, bumpy nose",
                key: "QUE_9_ANS_3",
                flag: "",
            },
            {
                label: "It is affecting my eyes (i.e. dryness, irritation)",
                key: "QUE_9_ANS_4",
                flag: "Red",
            },
            {
                label: "Unsure",
                key: "QUE_9_ANS_5",
                flag: "",
            },
        ],
    },
    {
        triggerName: ["Rosacea"],
        qId: "QUE_10",
        qKey: "10",
        question:
            "Are you experiencing any of the following symptoms (Rosacea)?",
        answers: [],
        options: [
            {
                label: "Flakiness or dandruff on scalp or eyebrows",
                key: "QUE_10_ANS_1",
                flag: "",
            },
            {
                label: "Joint pain/swelling, stiffness or unexplained pain",
                key: "QUE_10_ANS_2",
                flag: "Red",
            },
            {
                label: "None of the above",
                key: "QUE_10_ANS_3",
                flag: "",
            },
        ],
    },
    {
        triggerName: ["Melasma"],
        qId: "QUE_11",
        qKey: "11",
        question: "Are you experiencing any of the following (melasma)?",
        answers: [],
        options: [
            {
                label: "Asymmetry or irregular borders in pigmented areas",
                key: "QUE_11_ANS_1",
                flag: "",
            },

            {
                label: "Itching, pain, or bleeding",
                key: "QUE_11_ANS_2",
                flag: "",
            },
            {
                label: "Colors present in the patches besides brown",
                key: "QUE_11_ANS_3",
                flag: "",
            },
            {
                label: "Unexpected weight loss or persistent fatigue",
                key: "QUE_11_ANS_4",
                flag: "",
            },
        ],
    },
    {
        triggerName: ["Acne"],
        qId: "QUE_12",
        qKey: "12",
        question: "Please choose the best description of your Acne?",
        answers: [],
        options: [
            {
                label: "Mild",
                key: "QUE_12_ANS_1",
                flag: "",
            },
            {
                label: "Moderate",
                key: "QUE_12_ANS_2",
                flag: "",
            },
            {
                label: "Severe",
                key: "QUE_12_ANS_3",
                flag: "",
            },
            {
                label: "Unsure",
                key: "QUE_12_ANS_4",
                flag: "",
            },
        ],
    },
    {
        triggerName: ["Scar"],
        qId: "QUE_13",
        qKey: "13",
        question: "What caused your scar?",
        answers: [],
        options: [
            {
                label: "Medical procedure",
                key: "QUE_13_ANS_1",
                flag: "",
            },
            {
                label: "Burn (heat)",
                key: "QUE_13_ANS_2",
                flag: "",
            },
            {
                label: "Chemical burn",
                key: "QUE_13_ANS_3",
                flag: "",
            },
            {
                label: "Injury/stitches",
                key: "QUE_13_ANS_4",
                flag: "",
            },
            {
                label: "Other",
                key: "QUE_13_ANS_5",
                flag: "",
            },
            {
                label: "Unsure",
                key: "QUE_13_ANS_6",
                flag: "",
            },
        ],
    },
    {
        triggerName: ["Scar"],
        qId: "QUE_14",
        qKey: "14",
        question: "How long has the scar been present?",
        answers: [],
        options: [
            {
                label: "Less than 1 week",
                key: "QUE_14_ANS_1",
                flag: "Red",
            },
            {
                label: "1-6 months",
                key: "QUE_14_ANS_2",
                flag: "",
            },
            {
                label: "6 months - 2 years",
                key: "QUE_14_ANS_3",
                flag: "",
            },
            {
                label: "2 years +",
                key: "QUE_14_ANS_4",
                flag: "Red",
            },
        ],
    },
    {
        triggerName: ["Scar"],
        qId: "QUE_15",
        qKey: "15",
        question: "Which of the following apply to your scar?",
        answers: [],
        options: [
            {
                label: "Darkening of skin (hyperpigmentation)",
                key: "QUE_15_ANS_1",
                flag: "",
            },
            {
                label: "Raised or thickened skin (keloid)",
                key: "QUE_15_ANS_2",
                flag: "",
            },
            {
                label: "Dark and thickened skin",
                key: "QUE_15_ANS_3",
                flag: "",
            },
            {
                label: "None of these",
                key: "QUE_15_ANS_4",
                flag: "",
            },
        ],
    },
    {
        triggerName: ["Sweaty HPF"],
        qId: "QUE_16",
        qKey: "16",
        question: "Which of the following applies to your sweating symptoms?",
        answers: [],
        options: [
            {
                label: "Only on my hands/feet",
                key: "QUE_16_ANS_1",
                flag: "",
            },
            {
                label: "I experience sweating all over the body",
                key: "QUE_16_ANS_2",
                flag: "Red",
            },
        ],
    },
    {
        triggerName: ["Sweaty HPF"],
        qId: "QUE_17",
        qKey: "17",
        question: "Do any of the following apply to you (hyperhidrosis)?",
        answers: [],
        options: [
            {
                label:
                    "Taking any medications that may cause sweating as a side effect",
                key: "QUE_17_ANS_1",
                flag: "Red",
            },
            {
                label: "Any skin changes or infections (related to sweating)",
                key: "QUE_17_ANS_2",
                flag: "Red",
            },
            {
                label: "Sweating while sleeping at night",
                key: "QUE_17_ANS_3",
                flag: "Yellow",
            },
            {
                label: "Abnormal heart rhythm",
                key: "QUE_17_ANS_4",
                flag: "Red",
            },
            {
                label: "Dry mouth or eyes",
                key: "QUE_17_ANS_5",
                flag: "Red",
            },
            {
                label: "Blurred vision",
                key: "QUE_17_ANS_6",
                flag: "Red",
            },
            {
                label: "None",
                key: "QUE_17_ANS_7",
                flag: "",
            },
        ],
    },
    {
        triggerName: [
            "Melasma",
            "Acne",
            "Rosacea",
            "Sweaty HPF",
            "Scar",
            "Anti aging",
        ],
        qId: "QUE_18",
        qKey: "18",
        question:
            "Do you have any questions or information you would like share with the medical practitioner?",
        answers: [],
        options: [
            {
                label: "Free form",
                key: "QUE_18_ANS_1",
                flag: "",
            },
        ],
    },
];
