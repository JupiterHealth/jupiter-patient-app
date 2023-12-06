import { MainLayoutComponent } from "@components/layout/mainLayout";
import AddEditCreditCardModal from "@components/theme/modal/addEditCreditCardModal/addEditCreditCardModal";
import DeleteCreditCardModal from "@components/theme/modal/deleteCreditCardModal/deleteCreditCardModal";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    fetchCreditCardListApi,
    makeDefaultCardApi,
} from "@redux/services/patient-payment-method.api";
import useList from "jupiter-commons/src/components/libs/useList";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    VerificationFormInputs,
    VerificationFormValidateSchema,
} from "src/schemas/validationFormInput";
import MyCreditCardScene from "./myCreditCardScene";

const MyCreditCardContainer = () => {
    const [isCreditCardModal, setIsCreditCardModal] = useState(false);
    const [selectedCreditCardData, setSelectedCreditCardData] = useState<any>(
        null,
    );
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [
        isLoadingCreditCardList,
        setIsLoadingCreditCardList,
    ] = useState<boolean>(false);
    const [creditCardData, setCreditCardData] = useState<any>(null);
    const [isLoadingMakeDefault, setIsLoadingMakeDefault] = useState<boolean>(
        false,
    );
    const [mode, setMode] = useState("");
    const { register, formState } = useForm<VerificationFormInputs>({
        resolver: yupResolver(VerificationFormValidateSchema),
    });
    const { apiParam } = useList({
        queryParams: {
            take: 20,
            skip: 0,
            include: ["patientUserAddress"],
        },
    });

    const getCreditCards = async () => {
        try {
            setIsLoadingCreditCardList(true);
            const res = await fetchCreditCardListApi(apiParam);
            if (res) {
                setCreditCardData(res);
                setIsLoadingCreditCardList(false);
            }
        } catch (error) {
            console.log("error", error);
            setIsLoadingCreditCardList(false);
        }
    };

    const makeDefaultCard = async (id: any) => {
        try {
            setIsLoadingMakeDefault(true);
            const res = await makeDefaultCardApi(id);
            if (res) {
                setIsLoadingMakeDefault(false);
                getCreditCards();
            }
        } catch (error) {
            console.log("error");
            setIsLoadingMakeDefault(false);
        }
    };

    useEffect(() => {
        getCreditCards();
        return () => {
            setIsCreditCardModal(false);
            setIsDeleteModalOpen(false);
            setIsLoadingCreditCardList(false);
            setIsLoadingMakeDefault(false);
            setSelectedCreditCardData(null);
            setCreditCardData(null);
            setMode("");
        };
    }, [apiParam]);

    return (
        <>
            <MyCreditCardScene
                {...{
                    register,
                    formState,
                    setSelectedCreditCardData,
                    setIsCreditCardModal,
                    setMode,
                    setIsDeleteModalOpen,
                    creditCardData,
                    isLoadingCreditCardList,
                    isLoadingMakeDefault,
                    makeDefaultCard,
                }}
            />
            {isCreditCardModal && (
                <AddEditCreditCardModal
                    isOpen={isCreditCardModal}
                    creditCardData={creditCardData}
                    mode={mode}
                    selectedCreditCardData={selectedCreditCardData}
                    onClose={(d: any) => {
                        if (d && d?.id) {
                            getCreditCards();
                        }
                        setIsCreditCardModal(false);
                    }}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteCreditCardModal
                    isOpen={isDeleteModalOpen}
                    deleteItemId={selectedCreditCardData?.id}
                    onClose={(d: any) => {
                        if (d && d?.id) {
                            getCreditCards();
                        }
                        setIsDeleteModalOpen(false);
                    }}
                />
            )}
        </>
    );
};
MyCreditCardContainer.Layout = MainLayoutComponent;
export default MyCreditCardContainer;
