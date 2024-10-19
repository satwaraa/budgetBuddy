import {useSayHelloMutation} from "../api/user";
import CustomButton from "../components/CustomButton";
import {useEffect} from "react";
import {View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

import SplashScreen from "react-native-splash-screen";
import {CommonActions} from "@react-navigation/native";

const Home = ({navigation}: any) => {
    const [sayHello, {data, error, isLoading, isSuccess}] = useSayHelloMutation();
    useEffect(() => {
        sayHello("");
    }, []);

    useEffect(() => {
        // @ts-ignore
        if (error && error.status == 401) {
            navigation.navigate("Login");
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
