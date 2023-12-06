import React from "react";
import { Col, Row } from "antd";
import { UploadPhotoIcon } from "jupiter-commons/src/components/theme/icons/uploadPhotoIcon";
import { CameraIcon } from "jupiter-commons/src/components/theme/icons/cameraIcon";
import { DeleteIcon } from "jupiter-commons/src/components/theme/icons/deleteIcon";

const PhotoRequirement = () => {
    return (
        <div className="mx-24">
            <h1 className="text-2xl font-bold text-secondary">
                Please take/upload a photo of your skin condition so we can
                analyze it as part of your skin assessment.
            </h1>
            <div className="bg-[#F9F9F9] mt-5 rounded-[20px]">
                <p className="font-bold text-lg pt-5 pb-3">
                    Photo Requirements
                </p>
                <p className="text-lg font-semibold px-10 pb-5">
                    At least 3 photo(s) required to assess your skin condition.
                    Make sure that your face is well lit and evenly illuminated.
                </p>
            </div>
            <Row className="mt-8">
                <Col
                    span={11}
                    className="border-dashed border-2 rounded-[20px]"
                >
                    <div className="my-7">
                        <span className="flex justify-center">
                            <UploadPhotoIcon className="text-secondary" />
                        </span>
                        <p className="text-secondary underline mt-2 text-lg font-semibold">
                            Upload Photos
                        </p>
                        <p className="px-7 mt-2 text-lg font-medium">
                            or drag and drop your photo(s) to this area. We
                            accept JPEG, PNG, GIF, BMP, PDF or HEIC at 10mb or
                            less.
                        </p>
                    </div>
                </Col>
                <Col span={2} className="font-bold text-lg my-auto">
                    OR
                </Col>
                <Col
                    span={11}
                    className="border-dashed border-2 rounded-[20px]"
                >
                    <div className="my-7">
                        <span className="flex justify-center">
                            <CameraIcon className="text-secondary" />
                        </span>
                        <p className="text-secondary underline mt-2 text-lg font-semibold">
                            Take Photos
                        </p>
                        <p className="px-7 mt-2 text-lg font-medium">
                            Take left side, front side and right side photos of
                            your face in a clear and well lit area.
                        </p>
                    </div>
                </Col>
            </Row>
            <div className="mx-auto my-8">
                <p className="text-secondary text-lg font-semibold underline">
                    <span className="underline">Continue</span>
                    <span className="underline ml-1">without</span>
                    <span className="underline ml-1">sharing</span>
                    <span className="underline ml-1">photos</span>
                    <span className="underline ml-1">or</span>
                    <span className="underline ml-1">do</span>
                    <span className="underline ml-1">it</span>
                    <span className="underline ml-1">later</span>
                </p>
            </div>
            <div className="flex justify-center">
                <div className="relative">
                    <DeleteIcon className="absolute top-[-10px] right-4 text-danger cursor-pointer" />
                    <img src="/images/image.png" alt="" className="mr-7" />
                </div>
                <div className="relative">
                    <DeleteIcon className="absolute top-[-10px] right-4 text-danger cursor-pointer" />
                    <img src="/images/image.png" alt="" className="mr-7" />
                </div>
                <div className="relative">
                    <DeleteIcon className="absolute top-[-10px] right-[-12px] text-danger cursor-pointer" />
                    <img src="/images/image.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default PhotoRequirement;
