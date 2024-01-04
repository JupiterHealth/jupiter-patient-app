import React from "react";
import { Modal } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import imageStyle from "./imageModalStyle.module.scss";

const responsive: any = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
};

export interface ImageModalProps {
    isOpen?: boolean;
    onClose?: (data?: any) => void;
    footer?: boolean;
    images: any;
    imageTitle?: string;
    conditionKey?: string;
}

const ImageModal = (props: ImageModalProps) => {
    const { isOpen, onClose, images, imageTitle, conditionKey } = props;

    const getStaticImageSource = (key: string | undefined): any => {
        const imageMap: Record<string, string> = {
            QUE_15_ANS_1: "/images/hyperpigmentation.jpeg",
            QUE_15_ANS_2: "/images/raised-or-thickened-skin.jpeg",
            QUE_15_ANS_3: "/images/dark-and-thickened-skin.jpeg",
        };

        return imageMap[key ?? "default"];
    };

    const staticImageSource = getStaticImageSource(conditionKey);

    return (
        <Modal
            width={600}
            centered
            visible={isOpen}
            onCancel={onClose}
            title={
                <div>
                    <h1 className="md:text-2xl font-bold text-secondary text-lg">
                        {imageTitle ?? "Image"}
                    </h1>
                </div>
            }
            footer={false}
        >
            <div className={imageStyle.imagePosition}>
                {staticImageSource ? (
                    <img
                        src={staticImageSource}
                        alt={imageTitle ?? "Image"}
                        className="w-full"
                    />
                ) : (
                    Array.isArray(images) &&
                    images.length > 0 && (
                        <Carousel
                            responsive={responsive}
                            autoPlay={false}
                            swipeable={true}
                            draggable={true}
                            ssr={true}
                            showDots={false}
                            infinite={false}
                            partialVisible={false}
                            arrows={true}
                        >
                            {images.map((e: any, index) => (
                                <div key={index} className="px-20">
                                    <img
                                        src={e?.description}
                                        alt={e.name}
                                        className="w-full"
                                    />
                                </div>
                            ))}
                        </Carousel>
                    )
                )}
            </div>
            {!staticImageSource && !Array.isArray(images) && (
                <div className={`p-3 text-center`}>
                    <img src={images?.description} alt={images?.name} />
                </div>
            )}
        </Modal>
    );
};

export default ImageModal;
