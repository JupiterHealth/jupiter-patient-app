import { deleteFileAPI } from "@redux/services/general.api";
import { Upload, message } from "antd";
import {
    UPLOAD_TYPE,
    acceptedImageTypes,
} from "jupiter-commons/src/components/libs/constants";
import { deepClone } from "jupiter-commons/src/components/libs/helpers";
import { DeletePhotoIcon } from "jupiter-commons/src/components/theme/icons/deletePhotoIcon";
import { UploadPhotoIcon } from "jupiter-commons/src/components/theme/icons/uploadPhotoIcon";
import Spinner from "jupiter-commons/src/components/theme/spinner";
import { useState } from "react";
import CheckoutStyle from "./checkoutStyle.module.scss";

export interface UploadIdentificationProps {
    imageData: any;
    setImageData: (d: any) => any;
}
const UploadIdentification = (props: UploadIdentificationProps) => {
    const { imageData, setImageData } = props;
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
                    payload: { fileName: file?.response?.key },
                });
                setIsImageDeleting(false);
                setImageData((d: any) =>
                    d.filter(
                        (item: any) =>
                            item?.response?.key !== file?.response?.key,
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
        <>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
                Upload Identification
            </h1>
            <p className="text-sm xl:text-base font-bold mt-2">
                Please upload a photo of your I.D. so we can verify your
                identity
            </p>
            <div className="flex mb-2 pt-5 md:pt-9">
                <p className="text-base font-medium text-start">
                    Upload a photo of your I.D.
                </p>
                <span className="text-danger">*</span>
            </div>
            <div className={`${CheckoutStyle.uploadBox}`}>
                <Upload {...uploadProps}>
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
                            <p className="md:px-16 mt-2 text-base font-medium text-center">
                                or drag and drop your photo(s) to this area. We
                                accept JPG, JPEG, PNG or HEIC at 10MB or less
                            </p>
                        </>
                    )}
                </Upload>
            </div>
            {imageData && imageData.length > 0 && (
                <div className="flex flex-wrap justify-center mt-7">
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
                                    className="mr-7 mb-4 md:mb-0 object-contain w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] xl:w-[120px] xl:h-[120px]"
                                    width={100}
                                    height={100}
                                />
                            </div>
                        ))}
                </div>
            )}
            <div
                className={`bg-[#e7f0fa] rounded-[10px] p-3 mt-7 ${CheckoutStyle.uploadIdentification}`}
            >
                <p className="font-medium text-xs opacity-100 circleSecondaryTop text-left ml-6">
                    Valid forms of I.D included a Driver's License, Health Card
                    or Passport
                </p>
                <p className="font-medium text-xs opacity-100 circleSecondaryTop ml-6 text-left mt-2">
                    Please make sure the image is clear and not cut off
                </p>
            </div>
        </>
    );
};

export default UploadIdentification;
