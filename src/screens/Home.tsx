import {useSayHelloMutation} from "../api/user";
import CustomButton from "../components/CustomButton";
import {useEffect} from "react";
import {View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../App";
import SplashScreen from "react-native-splash-screen";

type HomeProps = NativeStackNavigationProp<RootStackParamList, "Home">;
const Home = ({navigation}: any) => {
    const [sayHello, {data, isError, isLoading, isSuccess}] = useSayHelloMutation();
    useEffect(() => {
        sayHello("");
    }, []);

    useEffect(() => {
        // @ts-ignore
        if (isError && isError.status == 401) {
            navigation.navigate("Login");
            SplashScreen.hide();
            // SplashScreen.hideAsync();
        }
        if (isSuccess) {
            navigation.navigate("GroupCollection");
            // router.replace("/group")
        }
    }, [isError, isLoading, isSuccess]);

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
