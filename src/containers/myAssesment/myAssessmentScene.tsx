import { Col, Row, Select } from "antd";
import React from "react";
import myAssessmentStyle from "./myAssessmentStyle.module.scss";
import HeaderSectionComponent from "@components/headerSectionComponent/headerSectionComponent";
import {
    FormGroup,
    InputDateField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { ASSESSMENT_FILTER_OPTIONS } from "jupiter-commons/src/components/libs/constants";
import { FilterIcon } from "jupiter-commons/src/components/theme/icons/filterIcon";
import TableComponent from "jupiter-commons/src/components/theme/table/tableComponent";
import { TableColumnsProps } from "jupiter-commons/src/components/libs/types";
import { SearchInputComponent } from "jupiter-commons/src/components/theme/searchInput/searchInputComponent";
import { convertToTitleCase } from "jupiter-commons/src/components/libs/helpers";
import MyAssessmentStyles from "./myAssessmentStyle.module.scss";

export interface MyAssessmentSceneProps {
    myAssessmentListColumns: any;
    register: any;
    formState: any;
    control: any;
    medicationListColumns?: TableColumnsProps[];
    handleSearch: any;
    MyAssessmentList: any;
    handleOnTableChange: (d: any) => void;
    isLoading: any;
    handleDateSearch: any;
    handleFilterChange?: (d?: any) => void;
    paginationObj?: any;
}

const MyAssessmentScene = (props: MyAssessmentSceneProps) => {
    const {
        myAssessmentListColumns,
        register,
        formState,
        control,
        handleSearch,
        MyAssessmentList,
        isLoading,
        handleDateSearch,
        handleOnTableChange,
        handleFilterChange,
        paginationObj,
    } = props;
    return (
        <div className="py-3 px-4">
            <div className="flex justify-between">
                <HeaderSectionComponent
                    {...{
                        title: "My Assessments",
                        description:
                            "View all your past and recent assessments.",
                    }}
                />
            </div>
            <Row className="my-7 mb-1" gutter={15}>
                <Col span={24} md={14} className="pb-4 md:pb-0">
                    <SearchInputComponent
                        handleSearch={handleSearch}
                        placeholder="Search"
                    />
                </Col>
                <Col span={12} md={5}>
                    <div className={`${MyAssessmentStyles.datePicker}`}>
                        <FormGroup className="antdDataPickerWithoutLabel">
                            <InputDateField
                                {...{
                                    register,
                                    formState,
                                    control,
                                    id: "Expiry Date",
                                    placeholder: "Date",
                                    isDisableFuture: true,
                                    allowClear: true,
                                }}
                                onChange={handleDateSearch}
                            />
                        </FormGroup>
                    </div>
                </Col>
                <Col span={12} md={5}>
                    <Select
                        options={ASSESSMENT_FILTER_OPTIONS.map((option) => ({
                            ...option,
                            label: convertToTitleCase(
                                option.label.replace(/_/g, " "),
                            ),
                        }))}
                        className={`!w-full filter text-lg font-medium text-grey-300`}
                        placeholder="All"
                        suffixIcon={
                            <FilterIcon className="w-[16px] h-[16px]" />
                        }
                        onChange={handleFilterChange}
                        showArrow
                        allowClear
                        onClear={handleFilterChange}
                    />
                </Col>
            </Row>
            <TableComponent
                rowKey={""}
                columns={myAssessmentListColumns}
                dataSource={MyAssessmentList?.list || []}
                loading={isLoading}
                onTableChange={handleOnTableChange}
                className={myAssessmentStyle.customTable}
                pagination={
                    MyAssessmentList?.total > 10 ? paginationObj : false
                }
            />
        </div>
    );
};

export default MyAssessmentScene;
