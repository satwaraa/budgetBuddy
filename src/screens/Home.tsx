import {useLazyWhoAmIQuery, useSayHelloMutation} from "../api/user";
import CustomButton from "../components/CustomButton";
import {useEffect} from "react";
import {View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

import SplashScreen from "react-native-splash-screen";
import {CommonActions} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {setUserInfomation} from "../api/userSlice";
interface userInformation {
    userInformation: {
        id: string;
        name: string;
        email: string;
        userName: string;
        avatar_url: string;
    };
}

const Home = ({navigation}: any) => {
    const dispatch = useDispatch();
    const [whoAmI, result] = useLazyWhoAmIQuery();
    const {
        data,
        error,
        isLoading,
        isSuccess,
    }: {
        data?: userInformation;
        error?: any;
        isLoading: boolean;
        isSuccess: boolean;
    } = result;

    useEffect(() => {
        whoAmI("");
    }, []);
    useEffect(() => {
        console.log("it's this -> ", data, error, isLoading, isSuccess);
    }, [data, error, isLoading, isSuccess]);

    useEffect(() => {
        if (data?.userInformation) {
            dispatch(setUserInfomation(data.userInformation));
        }

        if (error) {
            console.log("removing splashScreen", data, error, isLoading, isSuccess);

            SplashScreen.hide();
        }
        if (isSuccess) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{name: "GroupCollection"}],
                }),
            );
        }
    }, [error, isLoading, isSuccess]);

    return (
        <SafeAreaView className="bg-primary h-full">
            <View className="justify-center items-center">
                <CustomButton
                    title="logIn"
                    handlePress={() => {
                        navigation.navigate("Login");
                    }}
                    containerStyles="w-[90%] mt-7"
                    textStyles="text-white "
                />
            </View>
            <View className="justify-center items-center">
                <CustomButton
                    title="Sign Up"
                    handlePress={() => {
                        navigation.navigate("SignUp");
                        // router.push("/signUp");
                    }}
                    containerStyles="w-[90%] mt-7 "
                    textStyles="text-white "
                />
            </View>
        </SafeAreaView>
    );
};
export default Home;
