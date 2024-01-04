import { uploadFileAPI } from "@redux/services/general.api";
import { deepClone } from "jupiter-commons/src/components/libs/helpers";
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

export interface WebCamComponentPops {
    setImageData: (data: any) => any;
    setCaptureEnable: (data: any) => any;
    // setIsPhotoCapture: (data: any) => any;

    isCaptureEnable: any;
}

const WebCamComponent = (props: WebCamComponentPops) => {
    const {
        setImageData,
        setCaptureEnable,
        isCaptureEnable,
        // setIsPhotoCapture,
    } = props;

    const videoConstraints = {
        width: 720,
        height: 360,
        facingMode: "user",
    };
    const webcamRef = useRef<Webcam>(null);
    const [url, setUrl] = useState<string | null>(null);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setUrl(imageSrc);
            handleUpload({ img: imageSrc });
        }
    }, [webcamRef]);

    const handleUpload = async ({ img }: any) => {
        try {
            // Create a FormData object to send the file
            const formData = new FormData();
            // Append the file to the FormData object
            formData.append("file", dataURItoBlob(img), "screenshot.jpg");

            // You can add additional fields to the FormData if required
            formData.append("type", "Product");

            // Make the API call using the FormData
            const res = await uploadFileAPI({
                payload: formData,
            });

            if (res) {
                setImageData((d: any) => {
                    const temp = deepClone(d);
                    temp.push(res);
                    return temp;
                });
                setCaptureEnable(false);
            }
        } catch (e) {
            console.error("Error uploading file:", e);
        }
    };

    // Function to convert data URI to Blob
    const dataURItoBlob = (dataURI: string) => {
        const byteString = atob(dataURI.split(",")[1]);
        const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    return (
        <>
            {isCaptureEnable && (
                <>
                    <div>
                        <Webcam
                            audio={false}
                            width={540}
                            height={360}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                        />
                    </div>
                    <button className="btn-primary mt-3 mb-3" onClick={capture}>
                        Capture
                    </button>
                    <button
                        className="btn-primary mt-3 mb-3 !min-w-[30%] ml-2"
                        onClick={() => {
                            setCaptureEnable(false);
                        }}
                    >
                        End
                    </button>
                </>
            )}
        </>
    );
};

export default WebCamComponent;
