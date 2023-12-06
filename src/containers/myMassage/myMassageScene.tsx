import React from "react";
import { Col, Row, Select } from "antd";
import HeaderSectionComponent from "@components/headerSectionComponent/headerSectionComponent";
import { TableColumnsProps } from "jupiter-commons/src/components/libs/types";
import TableComponent from "jupiter-commons/src/components/theme/table/tableComponent";
import {
    FormGroup,
    InputDateField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { GENDER_OPTIONS } from "jupiter-commons/src/components/libs/constants";
import { FilterIcon } from "jupiter-commons/src/components/theme/icons/filterIcon";
import myMassageStyle from "./myMassageStyle.module.scss";
import { SearchInputComponent } from "jupiter-commons/src/components/theme/searchInput/searchInputComponent";

export interface MyMassageSceneProps {
    tableColumnsData: any;
    patientData: any;
    register: any;
    // selectedOption: any;
    handleTypeSelect: any;
    formState: any;
    control: any;
    medicationListColumns?: TableColumnsProps[];
}

const MyMassageScene = (props: MyMassageSceneProps) => {
    const {
        tableColumnsData,
        patientData,
        register,
        formState,
        // selectedOption,
        handleTypeSelect,
        control,
    } = props;
    return (
        <>
            <div className="flex justify-between">
                <HeaderSectionComponent
                    {...{
                        title: "My Messages",
                        description:
                            "View all your messages by prescribers and pharmacy here.",
                    }}
                />
            </div>
            <Row className="my-7 mb-1" gutter={15}>
                <Col span={14}>
                    <SearchInputComponent
                        handleSearch={patientData}
                        placeholder="Search by Assessment Number"
                    />
                </Col>
                <Col span={5}>
                    <FormGroup className="antdDataPickerWithoutLabel">
                        <InputDateField
                            {...{
                                register,
                                formState,
                                control,
                                label: "",
                                id: "Expiry Date",
                                placeholder: "Date",
                                isDisableFuture: true,
                            }}
                        />
                    </FormGroup>
                </Col>
                <Col span={5}>
                    <Select
                        options={GENDER_OPTIONS}
                        className={`!w-full ${myMassageStyle.filter}`}
                        onChange={handleTypeSelect}
                        // value={selectedOption}
                        // styles={customStyles}
                        placeholder="All"
                        // isSearchable={false}
                        // hideSelectedOptions
                        // controlShouldRenderValue={false}
                        suffixIcon={
                            <FilterIcon className="w-[16px] h-[16px]" />
                        }
                    />
                </Col>
            </Row>
            <TableComponent
                rowKey={""}
                columns={tableColumnsData}
                dataSource={patientData?.list}
                loading={false}
                // onTableChange={}
                className={myMassageStyle.customTable}
                // pagination={}
            />
        </>
    );
};

export default MyMassageScene;
