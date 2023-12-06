import React, { useEffect } from "react";
import jQuery from "jquery";
import { loadScript } from "jupiter-commons/src/components/libs/helpers";

let autoComplete: any;
declare const window: any;

export interface GoogleAutoCompleteComponentProps {
    children: any;
    autoCompleteId: string;
    onPlaceSelect?: (addressObject?: any) => void;
    autoPopulateFields: any;
    setValue: (field: any, value: any, config?: any) => void;
}

const GoogleAutoCompleteComponent = (
    props: GoogleAutoCompleteComponentProps,
) => {
    const {
        children,
        autoCompleteId,
        onPlaceSelect,
        autoPopulateFields,
        setValue,
    } = props;

    const handlePlaceSelect = async () => {
        const addressObject = await autoComplete.getPlace();

        if (addressObject?.address_components) {
            const address = {
                addressLine1: "",
                addressLine2: "",
                province: "",
                city: "",
                zip: "",
                country: "",
                countryCode: "",
            };
            if (
                "addressLine1" in autoPopulateFields &&
                typeof setValue === "function"
            ) {
                setValue(autoPopulateFields["addressLine1"], "");
            }
            if (
                "addressLine2" in autoPopulateFields &&
                typeof setValue === "function"
            ) {
                setValue(autoPopulateFields["addressLine2"], "");
            }
            if (
                "province" in autoPopulateFields &&
                typeof setValue === "function"
            ) {
                setValue(autoPopulateFields["province"], "");
            }
            if (
                "city" in autoPopulateFields &&
                typeof setValue === "function"
            ) {
                setValue(autoPopulateFields["city"], "");
            }
            if ("zip" in autoPopulateFields && typeof setValue === "function") {
                setValue(autoPopulateFields["zip"], "");
            }
            if (
                "country" in autoPopulateFields &&
                typeof setValue === "function"
            ) {
                setValue(autoPopulateFields["country"], "");
            }
            await addressObject?.address_components.forEach(
                (component: any) => {
                    const componentType = component?.types[0];

                    switch (componentType) {
                        case "street_number": {
                            address.addressLine1 = component?.long_name || "";
                            if (
                                "addressLine1" in autoPopulateFields &&
                                typeof setValue === "function"
                            ) {
                                setValue(
                                    autoPopulateFields["addressLine1"],
                                    address.addressLine1,
                                    { shouldValidate: true },
                                );
                            }
                            break;
                        }

                        case "route": {
                            address.addressLine1 = `${
                                address.addressLine1 || ""
                            } ${component?.short_name || ""}`;
                            if (
                                "addressLine1" in autoPopulateFields &&
                                typeof setValue === "function"
                            ) {
                                setValue(
                                    autoPopulateFields["addressLine1"],
                                    address.addressLine1,
                                    { shouldValidate: true },
                                );
                            }
                            break;
                        }

                        // case 'administrative_area_level_2': {
                        //     address.addressLine2 = component?.long_name || '';
                        //     if (
                        //         'addressLine2' in autoPopulateFields &&
                        //         typeof onaAutoFieldsChange === 'function'
                        //     ) {
                        //         onaAutoFieldsChange(
                        //             autoPopulateFields['addressLine2'],
                        //             address.addressLine2
                        //         );
                        //     }
                        //     break;
                        // }

                        case "postal_code": {
                            address.zip = component?.long_name || "";
                            if (
                                "zip" in autoPopulateFields &&
                                typeof setValue === "function"
                            ) {
                                setValue(
                                    autoPopulateFields["zip"],
                                    address.zip,
                                    { shouldValidate: true },
                                );
                            }
                            break;
                        }

                        case "postal_code_suffix": {
                            address.zip = `${address.zip}-${
                                component.long_name || ""
                            }`;
                            break;
                        }

                        case "locality": {
                            address.city = component?.long_name || "";
                            if (
                                "city" in autoPopulateFields &&
                                typeof setValue === "function"
                            ) {
                                setValue(
                                    autoPopulateFields["city"],
                                    address.city,
                                    { shouldValidate: true },
                                );
                            }
                            break;
                        }

                        case "administrative_area_level_1": {
                            address.province = component?.short_name || "";
                            if (
                                "province" in autoPopulateFields &&
                                typeof setValue === "function"
                            ) {
                                setValue(
                                    autoPopulateFields["province"],
                                    address.province,
                                    { shouldValidate: true },
                                );
                            }
                            break;
                        }

                        case "country":
                            address.country = component?.long_name || "";
                            address.countryCode = component?.short_name || "";
                            if (
                                "country" in autoPopulateFields &&
                                typeof setValue === "function"
                            ) {
                                setValue(
                                    autoPopulateFields["country"],
                                    address.country,
                                    { shouldValidate: true },
                                );
                            }
                            break;
                    }
                },
            );
            if (typeof onPlaceSelect === "function") {
                onPlaceSelect(address);
            }
        }
    };

    const handleScriptLoad = () => {
        if (typeof window !== "undefined") {
            const element = document.getElementById(autoCompleteId);
            autoComplete = new window.google.maps.places.Autocomplete(element, {
                types: ["address"],
                componentRestrictions: { country: "CA" },
            });
            autoComplete.setFields(["address_components"]);
            autoComplete.addListener("place_changed", handlePlaceSelect);

            setTimeout(function () {
                jQuery(".pac-container").prependTo("#mapMoveHere");
            }, 300);
        }
    };

    useEffect(() => {
        const REACT_APP_GOOGLE_API_KEY =
            "AIzaSyAyqd8ltbLyjq-L58vt2g_GSE97_sI5ZNY";
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_API_KEY}&libraries=places`,
            () => handleScriptLoad(),
        );
    }, []);

    return <>{children}</>;
};

export default GoogleAutoCompleteComponent;
