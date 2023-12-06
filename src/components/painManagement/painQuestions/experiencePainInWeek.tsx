import { questionObj } from "@redux/slices/assessment";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import PainQuestionsStyle from "../painQuestionsStyle.module.scss";

export interface ExperiencePainInWeekProps {
    currentQuestionObj: questionObj;
    setCurrentQuestionObj: (d?: any) => void;
    register: (d?: any) => void;
    formState: any;
    watch: any;
    scale?: number;
    setScale: (d?: any) => void;
}

const ExperiencePainInWeek = (props: ExperiencePainInWeekProps) => {
    const {
        register,
        formState,
        currentQuestionObj,
        setCurrentQuestionObj,
        setScale,
        scale,
    } = props;

    const marks = {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
    };
    const log = (value: any) => {
        setScale(value);
    };
    return (
        <>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
                How many days a week do you experience pain?
            </h1>
            <div
                className={`!mt-5 md:!mt-9 !mb-20 ${PainQuestionsStyle.scaleOfPAain}`}
            >
                <Slider
                    min={1}
                    max={7}
                    marks={marks}
                    step={1}
                    value={scale}
                    defaultValue={7}
                    onChange={log}
                    className="mx-auto mt-10 mb-10"
                />
            </div>
        </>
    );
};

export default ExperiencePainInWeek;
