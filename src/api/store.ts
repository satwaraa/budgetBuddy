import {configureStore} from "@reduxjs/toolkit";
import {userApi} from "./user";
import {setupListeners} from "@reduxjs/toolkit/query";
import userInformationReducer from "./userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const abc = (store: any) => (next: any) => (action: any) => {
    const setCreds = async (name: string, value: string): Promise<void> => {
        await AsyncStorage.setItem(name, value);
    };
    const removeCreds = async () => {
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
    };

    if (action?.payload?.setAccessToken) {
        setCreds("accessToken", action.payload.setAccessToken);
    }
    if (action?.payload?.setRefreshToken) {
        setCreds("refreshToken", action.payload.setRefreshToken);
    }
    if (action?.payload?.logout) {
        removeCreds();
    }
    if (action?.payload?.status === 401) {
        removeCreds();
    }
    next(action);
};
export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        userInformation: userInformationReducer,
    },
    middleware: getDefaultMiddleware =>
        // getDefaultMiddleware().concat([userApi.middleware]),
        getDefaultMiddleware().concat([userApi.middleware, abc]),

    devTools: true,
});

setupListeners(store.dispatch);
// (getDefaultMiddleware) =>getDefaultMiddleware().concat(userApi.middleware),
