import { combineReducers } from "redux";

import {
    loginSlice,
    loginUserSlice,
    signupSlice,
    signupUserSlice,
} from "./slices/auth";
import { paymentMethodCardsSlice } from "./slices/paymentMethod";
import { prescriberSlice } from "./slices/prescriber";
import { myAssessmentSlice } from "./slices/myAssessment";
import { allTransactionSlice } from "./slices/transaction";

const rootReducer = combineReducers({
    login: loginSlice.reducer,
    loginUser: loginUserSlice.reducer,
    signup: signupSlice.reducer,
    signupUser: signupUserSlice.reducer,
    paymentMethod: paymentMethodCardsSlice.reducer,
    prescriber: prescriberSlice.reducer,
    myAssessment: myAssessmentSlice.reducer,
    allTransaction: allTransactionSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
