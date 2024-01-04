import React, { useState } from "react";
import { Col, Row, Upload, message } from "antd";
import { UploadPhotoIcon } from "jupiter-commons/src/components/theme/icons/uploadPhotoIcon";
import { CameraIcon } from "jupiter-commons/src/components/theme/icons/cameraIcon";
import { deleteFileAPI } from "@redux/services/general.api";
import { deepClone } from "jupiter-commons/src/components/libs/helpers";
import {
    UPLOAD_TYPE,
    acceptedImageTypes,
} from "jupiter-commons/src/components/libs/constants";
import Spinner from "jupiter-commons/src/components/theme/spinner";
import { questionObj } from "@redux/slices/assessment";
import WebCamComponent from "@components/webCamComponent/webCamComponent";
import { DeletePhotoIcon } from "jupiter-commons/src/components/theme/icons/deletePhotoIcon";

export interface PhotoRequirementProps {
    imageData: any;
    router: any;
    setImageData: (d: any) => any;
    currentQuestionObj: questionObj;
}

const PhotoRequirement = (props: PhotoRequirementProps) => {
    const { imageData, currentQuestionObj, router, setImageData } = props;
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [isImageDeleting, setIsImageDeleting] = useState(false);
    const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);

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
                    temp.push(info?.file?.response);
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
            if (file && file?.Key) {
                setIsImageDeleting(true);
                await deleteFileAPI({
                    payload: { fileName: file?.Key },
                });
                setIsImageDeleting(false);
                setImageData((d: any) =>
                    d.filter((item: any) => item?.Key !== file?.Key),
                );
                message.success(
                    `${file?.originalname} file deleted successfully.`,
                );
            }
        } catch (error) {
            console.log("error: ", error);
            setIsImageDeleting(false);
            message.error(`Failed to delete ${file?.originalname}.`);
        }
    };

    const handleNextQue = () => {
        if (currentQuestionObj?.qId === "QUE_6") {
            router.query.activeQuestionId = "QUE_7";
            router.push(router);
        }
    };

    return (
        <div className="md:mx-24 mx-12">
            <h1 className="md:text-xl text-lg font-bold text-secondary">
                {currentQuestionObj?.question}
            </h1>
            <div className="bg-[#F9F9F9] mt-5 rounded-[20px]">
                <p className="font-bold text-base pt-5 pb-3">
                    Photo Requirements
                </p>
                <p className="text-base font-semibold px-10 pb-5">
                    At least 3 photo(s) required to assess your skin condition.
                    Make sure that your face is well lit and evenly illuminated.
                </p>
            </div>
            <Row className="mt-8">
                <Col
                    span={24}
                    md={11}
                    className="border-dashed border-2 rounded-[20px]"
                >
                    <div className="my-5">
                        <Upload {...uploadProps}>
                            {(isImageUploading || isImageDeleting) && (
                                <Spinner
                                    size={22}
                                    className="flex justify-center items-center pt-12"
                                />
                            )}
                            {!isImageUploading && !isImageDeleting && (
                                <>
                                    <span className="flex justify-center">
                                        <UploadPhotoIcon className="text-secondary w-5 h-5" />
                                    </span>
                                    <p className="text-secondary underline mt-2 text-base font-semibold pt-2">
                                        Upload Photos
                                    </p>
                                    <p className="px-5 mt-2 text-base font-medium">
                                        or drag and drop your photo(s) to this
                                        area. We accept JPEG, PNG, GIF, BMP, PDF
                                        or HEIC at 10mb or less.
                                    </p>
                                </>
                            )}
                        </Upload>
                    </div>
                </Col>
                <Col span={24} md={2} className="font-bold text-lg my-auto">
                    OR
                </Col>
                {!isCaptureEnable && (
                    <Col
                        span={24}
                        md={11}
                        className="border-dashed border-2 rounded-[20px] cursor-pointer"
                        onClick={() => {
                            // setIsPhotoCapture(true);
                            setCaptureEnable(true);
                        }}
                    >
                        <div className="my-5">
                            <span className="flex justify-center">
                                <CameraIcon className="text-secondary w-6 h-6 mt-0" />
                            </span>
                            <p className="text-secondary underline mt-1 text-base font-semibold">
                                Take Photos
                            </p>
                            <p className="px-5 mt-2 text-base font-medium">
                                Take left side, front side and right side photos
                                of your face in a clear and well lit area.
                            </p>
                        </div>
                    </Col>
                )}
                {isCaptureEnable && (
                    <Col
                        span={24}
                        md={11}
                        className="border-dashed border-2 rounded-[20px]"
                    >
                        <WebCamComponent
                            {...{
                                setImageData,
                                setCaptureEnable,
                                isCaptureEnable,
                            }}
                        />
                    </Col>
                )}
            </Row>
            {imageData && imageData.length <= 0 && (
                <div className="mx-auto my-8" onClick={handleNextQue}>
                    <p className="text-secondary text-base font-semibold underline cursor-pointer">
                        <span className="underline">
                            Continue without sharing photos or do it later
                        </span>
                    </p>
                </div>
            )}

            {imageData && imageData.length > 0 && (
                <div className="flex justify-center">
                    {imageData &&
                        imageData?.length > 0 &&
                        imageData?.map((e: any, index: any) => (
                            <div
                                className={`relative ${
                                    imageData && imageData.length > 0 && "mt-10"
                                }`}
                            >
                                <DeletePhotoIcon
                                    className="absolute top-[-10px] right-4 text-danger cursor-pointer"
                                    onClick={() =>
                                        handleDeleteFile({ file: e })
                                    }
                                />
                                <img
                                    src={e?.Location}
                                    alt={e?.originalname}
                                    className="mr-7 mb-4 md:mb-0 object-contain w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] xl:w-[120px] xl:h-[120px]"
                                    width={100}
                                    height={100}
                                />
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default PhotoRequirement;
