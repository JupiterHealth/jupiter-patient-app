import {
    FormGroup,
    TextAreaField,
} from "jupiter-commons/src/components/theme/form/formFieldsComponent";
import { useState } from "react";

import { deleteFileAPI } from "@redux/services/general.api";
import { checkoutPayload } from "@redux/slices/assessment";
import { Checkbox, Upload, message } from "antd";
import {
    UPLOAD_TYPE,
    acceptedImageTypes,
} from "jupiter-commons/src/components/libs/constants";
import { deepClone } from "jupiter-commons/src/components/libs/helpers";
import { DeletePhotoIcon } from "jupiter-commons/src/components/theme/icons/deletePhotoIcon";
import { UploadPhotoIcon } from "jupiter-commons/src/components/theme/icons/uploadPhotoIcon";
import Spinner from "jupiter-commons/src/components/theme/spinner";
import CheckoutStyle from "./checkoutStyle.module.scss";

export interface UploadInsurerProps {
    imageData: any;
    setImageData: (d: any) => any;
    checkoutPayload: checkoutPayload;
    setCheckoutPayload: (d: any) => any;
    formState: any;
    register: (d: any) => void;
    setValue?: any;
}

const UploadInsurer = (props: UploadInsurerProps) => {
    const {
        imageData,
        setImageData,
        checkoutPayload,
        setCheckoutPayload,
        register,
        formState,
        setValue,
    } = props;
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [isImageDeleting, setIsImageDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const beforeUpload = (file: any) => {
        const isFiletype =
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "";

        if (!isFiletype) {
            message.error("You can only upload JPG, JPEG, PNG OR HEIC file!");
        }

        const isFileSize = file.size / 1024 / 1024 < 10;

        if (!isFileSize) {
            message.error("Image must smaller than 10MB!");
        }

        return isFiletype && isFileSize;
    };

    const uploadProps = {
        name: "file",
        multiple: false,
        action: `${process.env.NEXT_API_ENDPOINT}upload/uploadFile`,
        data: { type: UPLOAD_TYPE?.product },
        accept: acceptedImageTypes,
        showUploadList: false,
        beforeUpload: beforeUpload,
        onChange(info: any) {
            const { status } = info.file;
            if (status === "uploading") {
                setIsImageUploading(true);
            }
            if (status === "done") {
                setIsImageUploading(false);
                message.success(
                    `${info.file.name} file uploaded successfully.`,
                );
                setImageData((d: any) => {
                    const temp = deepClone(d);
                    temp.push(info?.file);
                    return temp;
                });
            } else if (status === "error") {
                setIsImageUploading(false);
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const handleDeleteFile = async ({ file }: any) => {
        try {
            if (file && file?.response) {
                setIsImageDeleting(true);
                await deleteFileAPI({
                    payload: { fileName: file?.response?.Key },
                });
                setIsImageDeleting(false);
                setImageData((d: any) =>
                    d.filter(
                        (item: any) =>
                            item?.response?.Key !== file?.response?.Key,
                    ),
                );
                message.success(
                    `${file?.response?.originalname} file deleted successfully.`,
                );
            }
        } catch (error) {
            console.log("error: ", error);
            setIsImageDeleting(false);
            message.error(`Failed to delete ${file?.response?.originalname}.`);
        }
    };
    return (
        <div>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
                Upload Private Insurance
            </h1>
            <p className="text-sm xl:text-base font-bold mt-2">
                Our pharmacy team will process claims on your behalf
            </p>
            <div className="flex text-base font-medium mb-2 pt-5 md:pt-9">
                <p>
                    Upload a photo of the front and back of your private
                    insurance card(s) <span className="text-danger">*</span>
                </p>
            </div>
            <div className={`${CheckoutStyle.uploadBox}`}>
                <Upload
                    {...uploadProps}
                    disabled={!checkoutPayload.applyInsurance}
                >
                    {(isImageUploading || isImageDeleting) && (
                        <Spinner size={22} />
                    )}
                    {!isImageUploading && !isImageDeleting && (
                        <>
                            <span className="flex justify-center cursor-pointer">
                                <UploadPhotoIcon className="text-secondary" />
                            </span>
                            <span className="text-secondary flex justify-center cursor-pointer underline text-lg font-semibold mt-3 mb-2">
                                Upload Photos
                            </span>
                            <p className="md:px-16 mt-2 text-lg font-medium text-center">
                                or drag and drop your photo(s) to this area. We
                                accept JPG, JPEG, PNG or HEIC at 10MB or less.
                            </p>
                        </>
                    )}
                </Upload>
            </div>
            {imageData && imageData.length > 0 && (
                <div className="flex justify-center mt-7">
                    {imageData &&
                        imageData?.length > 0 &&
                        imageData?.map((e: any, index: any) => (
                            <div
                                className="relative"
                                key={`product_image_${index}`}
                            >
                                <DeletePhotoIcon
                                    className="absolute top-[-10px] right-4 text-danger cursor-pointer"
                                    onClick={() =>
                                        handleDeleteFile({ file: e })
                                    }
                                />
                                <img
                                    src={e?.response?.Location}
                                    alt={e?.name}
                                    className="mr-7"
                                    width={100}
                                    height={100}
                                />
                            </div>
                        ))}
                </div>
            )}
            <FormGroup className={`!mb-4 mt-7 ${CheckoutStyle.asteriskRemove}`}>
                <TextAreaField
                    {...{
                        register,
                        formState,
                        maxLength: 9999,
                        disabled: !checkoutPayload.applyInsurance,
                        id: "insuranceAdditionalDetails",
                        label:
                            "Add additional details pertaining to your coverage",
                        placeholder: "Enter here",
                        setValue,
                    }}
                />
            </FormGroup>
            <div className={`flex mt-5 ${CheckoutStyle.insuranceCheckBox}`}>
                <Checkbox
                    id="insuranceCheckbox"
                    checked={!checkoutPayload.applyInsurance}
                    onChange={(e: any) => {
                        setCheckoutPayload((d: any) => {
                            const temp = deepClone(d);
                            temp["applyInsurance"] = !temp["applyInsurance"];
                            const newState = deepClone(temp);
                            return newState;
                        });
                    }}
                ></Checkbox>
                <div>
                    <label
                        htmlFor="insuranceCheckbox"
                        className="text-base text-start font-medium pl-2 flex items-center mt-[2px]"
                    >
                        I don’t have insurance or don’t want to apply insurance
                        to this prescription
                    </label>
                </div>
            </div>
        </div>
    );
};

export default UploadInsurer;
