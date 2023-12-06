import { questionObj } from "@redux/slices/assessment";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import PainQuestionsStyle from "../painQuestionsStyle.module.scss";
import { Col, Row } from "antd";

export interface ScaleOfPainProps {
    currentQuestionObj: questionObj;
    setCurrentQuestionObj: (d?: any) => void;
    register: (d?: any) => void;
    formState: any;
    watch: any;
    scale?: number;
    setScale: (d?: any) => void;
}

const ScaleOfPain = (props: ScaleOfPainProps) => {
    const {
        register,
        formState,
        currentQuestionObj,
        setCurrentQuestionObj,
        scale,
        setScale,
    } = props;
    const marks = {
        0: "0",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
    };
    const log = (value: any) => {
        setScale(value);
    };
    return (
        <>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary md:w-[660px] mx-auto">
                On a scale of 0 to 10, how would you rate the pain?
                {/* <p className="font-medium">
                    (0 means no pain, 10 means the worst pain you ever
                    experienced)
                </p> */}
            </h1>
            <div className="md:ml-20 lg:mx-10 xl:mx-16 mt-6">
                <div>
                    <Row>
                        <Col span={4} md={2}>
                            <p className="text-left text-lg font-bold text-[#503EAD]">
                                0
                            </p>
                        </Col>
                        <Col span={20} md={7}>
                            <p className="text-left text-base font-semibold text-secondary">
                                no pain
                            </p>
                        </Col>
                        <Col span={24} md={15}></Col>
                    </Row>
                    <Row>
                        <Col span={4} md={2}>
                            <p className="text-left text-lg font-bold text-[#573FB2]">
                                1-3
                            </p>
                        </Col>
                        <Col span={20} md={7}>
                            <p className="text-left text-base font-semibold text-secondary">
                                mild pain
                            </p>
                            <p className="text-left text-sm md:text-base font-semibold text-secondary md:hidden">
                                (no loss of mobility or quality of life)
                            </p>
                        </Col>
                        <Col span={24} md={15} className="hidden md:block">
                            <p className="text-left text-base font-semibold text-secondary">
                                (no loss of mobility or quality of life)
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4} md={2}>
                            <p className="text-left text-lg font-bold text-[#8F43DC]">
                                4-6
                            </p>
                        </Col>
                        <Col span={20} md={7}>
                            <p className="text-left text-base font-semibold text-secondary">
                                moderate pain
                            </p>
                            <p className="text-left text-sm md:text-base font-semibold text-secondary md:hidden">
                                (some loss of mobility or quality of life)
                            </p>
                        </Col>
                        <Col span={17} md={15} className="hidden md:block">
                            <p className="text-left text-base font-semibold text-secondary">
                                (some loss of mobility or quality of life)
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4} md={2}>
                            <p className="text-left text-lg font-bold text-[#C43ED5]">
                                7-9
                            </p>
                        </Col>
                        <Col span={20} md={7}>
                            <p className="text-left text-base font-semibold text-secondary">
                                severe pain
                            </p>
                            <p className="text-left text-sm md:text-base font-semibold text-secondary md:hidden">
                                (major loss of mobility or quality of life)
                            </p>
                        </Col>
                        <Col span={24} md={15} className="hidden md:block">
                            <p className="text-left text-base font-semibold text-secondary">
                                (major loss of mobility or quality of life)
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4} md={2}>
                            <p className="text-left text-lg font-bold text-[#D835B2]">
                                10
                            </p>
                        </Col>
                        <Col span={20} md={7}>
                            <p className="text-left text-base font-semibold text-secondary">
                                excruciating pain
                            </p>
                            <p className="text-left text-sm md:text-base font-semibold text-secondary md:hidden">
                                (worst pain I have ever experienced)
                            </p>
                        </Col>
                        <Col span={24} md={15} className="hidden md:block">
                            <p className="text-left text-base font-semibold text-secondary">
                                (worst pain I have ever experienced)
                            </p>
                        </Col>
                    </Row>
                </div>
            </div>
            <div
                className={`mt-5 md:mt-9 !mb-16 ${PainQuestionsStyle.scaleOfPAain}`}
            >
                <Slider
                    min={0}
                    max={10}
                    marks={marks}
                    step={1}
                    value={scale}
                    onChange={log}
                    className="mx-auto mt-10 mb-10"
                />
            </div>
        </>
    );
};

export default ScaleOfPain;
