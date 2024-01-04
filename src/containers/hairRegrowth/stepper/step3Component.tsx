import Allergies from "@components/medicalHistory/allergies";
import Hospitalized from "@components/medicalHistory/hospitalized";
import Medication from "@components/medicalHistory/medication";
import { questionObj } from "@redux/slices/assessment";
import axios from "axios";
import {
    PILLEO_API_URL,
    PILLEO_AUTHORIZATION_CODE,
} from "jupiter-commons/src/components/libs/constants";
import useList from "jupiter-commons/src/components/libs/useList";
import { useEffect, useState } from "react";

export interface Step3ComponentProps {
    activeQuestionId?: string;
    currentQuestionObj: questionObj;
    setCurrentQuestionObj: (d?: any) => void;
    register: (d?: any) => void;
    formState: any;
    medicines: any;
    setMedicines: (d?: any) => void;
    control?: any;
    unregister: (d?: any) => void;
    setValue: (d?: any) => any;
}

export const medicinesOptions = [
    {
        label: "Aspirin",
        value: "aspirin",
    },
    {
        label: "Ibuprofen",
        value: "ibuprofen",
    },
    {
        label: "Paracetamol",
        value: "paracetamol",
    },
    {
        label: "Amoxicillin",
        value: "amoxicillin",
    },
    {
        label: "Ciprofloxacin",
        value: "ciprofloxacin",
    },
    {
        label: "Amlodipine",
        value: "amlodipine",
    },
    {
        label: "Metoprolol",
        value: "metoprolol",
    },
];

const Step3Component = (props: Step3ComponentProps) => {
    const {
        activeQuestionId,
        currentQuestionObj,
        setCurrentQuestionObj,
        register,
        formState,
        medicines,
        setMedicines,
        control,
        unregister,
        setValue,
    } = props;

    const { apiParam } = useList({
        queryParams: {
            skip: 0,
            take: 50,
        },
    });

    const [searchMedicine, setSearchMedicine] = useState<any>("");
    const [allergy, setAllergy] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<any>(false);
    const [supplements, setSupplements] = useState<any[]>([]);

    const fetchAllergy = async (search?: string) => {
        const options: any = {
            method: "GET",
            url: `${PILLEO_API_URL}/allergy/list`,
            params: {
                ...apiParam,
                status: "ENABLED",
                search,
                searchColumn: "description",
            },
            headers: {
                accept: "application/json",
                authorization: PILLEO_AUTHORIZATION_CODE,
            },
        };
        setIsLoading(true);
        await axios
            .request(options)
            .then(function (response) {
                const temp: any = [];
                response.data?.data?.list?.map((item: any) => {
                    return temp.push({
                        value: item?.id,
                        label: item?.description,
                    });
                });
                setAllergy(temp);
            })
            .catch(function (error) {
                console.error(error);
            });
        setIsLoading(false);
    };

    const fetchSupplements = async (search?: string) => {
        const options: any = {
            method: "GET",
            url: `${PILLEO_API_URL}/medical-condition/list`,
            params: {
                ...apiParam,
                status: "ENABLED",
                search,
                searchColumn: "FdbdxDesc",
            },
            headers: {
                accept: "application/json",
                authorization: PILLEO_AUTHORIZATION_CODE,
            },
        };
        setIsLoading(true);
        await axios
            .request(options)
            .then(function (response) {
                const temp: any = [];
                response.data?.data?.list?.map((item: any) => {
                    return temp.push({
                        value: item?.id,
                        label: item?.FdbdxDesc,
                    });
                });
                setSupplements(temp);
            })
            .catch(function (error) {
                console.error(error);
            });
        setIsLoading(false);
    };

    useEffect(() => {
        fetchAllergy();
        fetchSupplements();
    }, [apiParam]);

    return (
        <div>
            {activeQuestionId === "ME_QUE_1" && (
                <Medication
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        medicines,
                        setMedicines,
                        control,
                        unregister,
                        setValue,
                        selectOptions: medicinesOptions,
                        setSearchMedicine,
                        fetchSupplements,
                    }}
                />
            )}
            {activeQuestionId === "ME_QUE_2" && (
                <Allergies
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        medicines,
                        setMedicines,
                        setValue,
                        control,
                        selectOptions: allergy,
                        searchMedicine,
                        setSearchMedicine,
                        fetchAllergy,
                        isLoading,
                    }}
                />
            )}
            {activeQuestionId === "ME_QUE_3" && (
                <Hospitalized
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        medicines,
                        setMedicines,
                        setValue,
                    }}
                />
            )}
            {activeQuestionId === "ME_QUE_4" && (
                <Hospitalized
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        medicines,
                        setMedicines,
                        setValue,
                    }}
                />
            )}
            {activeQuestionId === "ME_QUE_5" && (
                <Medication
                    {...{
                        currentQuestionObj,
                        setCurrentQuestionObj,
                        register,
                        formState,
                        medicines,
                        setMedicines,
                        unregister,
                        setValue,
                        control,
                        selectOptions: supplements,
                        searchMedicine,
                        setSearchMedicine,
                        fetchSupplements,
                        isLoading,
                    }}
                />
            )}
        </div>
    );
};

export default Step3Component;
