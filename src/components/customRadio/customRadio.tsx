import React from "react";
import { Col, Row } from "antd";
import { MaleIcon } from "jupiter-commons/src/components/theme/icons/maleIcon";
import { FemaleIcon } from "jupiter-commons/src/components/theme/icons/femaleIcon";

const CustomRadio = () => {
    return (
        <Row>
            <Col span={11}>
                <div className="flex items-center">
                    <input
                        className="checkbox-tools hidden"
                        type="radio"
                        name="tools"
                        id="tool-1"
                        checked
                    />
                    <label htmlFor="tool-1">
                        <MaleIcon />
                    </label>
                    <label
                        className="text-base text-light-black font-medium ml-4 cursor-pointer"
                        htmlFor="tool-1"
                    >
                        Male
                    </label>
                </div>
            </Col>
            <Col span={12}>
                <div className="flex items-center">
                    <input
                        className="checkbox-tools hidden"
                        type="radio"
                        name="tools"
                        id="tool-2"
                    />
                    <label className="" htmlFor="tool-2">
                        <FemaleIcon />
                    </label>
                    <label
                        className="text-base text-light-black font-medium ml-4 cursor-pointer"
                        htmlFor="tool-2"
                    >
                        Female
                    </label>
                </div>
            </Col>
        </Row>
    );
};

export default CustomRadio;
