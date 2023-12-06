import { AnyAction, Store, configureStore } from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./reducers";
import { setupListeners } from "@reduxjs/toolkit/query";
import { HYDRATE, MakeStore, createWrapper } from "next-redux-wrapper";

const reducer = (state: any, action: AnyAction) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };

        return nextState;
    } else {
        return rootReducer(state, action);
    }
};

export const getStore = () => {
    return configureStore({
        reducer,
    });
};

setupListeners(getStore().dispatch);

const makeStore: MakeStore<Store<RootState>> = () => {
    return getStore();
};

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
    debug: false,
});

export default makeStore;
