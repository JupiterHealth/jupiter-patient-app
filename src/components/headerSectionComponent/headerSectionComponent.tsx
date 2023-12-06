import React from "react";

export interface HeaderSectionComponentProps {
    title: string;
    description: string;
}
const HeaderSectionComponent = (props: HeaderSectionComponentProps) => {
    const { title, description } = props;
    return (
        <div>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold mt-2 text-secondary">
                {title}
            </h1>
            <p className="text-sm md:text-base font-bold mt-1">{description}</p>
        </div>
    );
};

export default HeaderSectionComponent;
