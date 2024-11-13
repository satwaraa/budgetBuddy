import {View, Text, Alert, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import {useSignupMutation} from "../api/user";
import {CommonActions, useNavigation} from "@react-navigation/native";
// import { router } from "expo-router";

interface signUpDataType {
    email: string;
    name: string;
    password: string;
    userName: string;
}

const SignUp = () => {
    const [form, setForm] = useState<signUpDataType>({
        email: "",
        userName: "",
        name: "",
        password: "",
    });
    const [
        signMeUp,
        {
            data: signupData,
            error: signupError,
            isSuccess: signupSuccess,
            isLoading: isSignupLoading,
        },
    ] = useSignupMutation();
    const navigation = useNavigation();
    useEffect(() => {
        if (signupError) {
            // @ts-ignore
            if (signupError.status == 400) {
                // @ts-ignore
                Alert.alert("Warning!!", signupError.data);
            }
        }
        if (signupSuccess) {
            setForm({
                email: "",
                userName: "",
                name: "",
                password: "",
            });

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{name: "Login"}],
                }),
            );
        }
    }, [signupData, signupError, signupSuccess]);

    return (
        <SafeAreaView className="bg-primary h-full">
            <View>
                <Text className="text-white">signUp</Text>
            </View>
            <View className="mt-5">
                <FormField
                    title="Name"
                    value={form.name}
                    handleChangeText={(e: any) => setForm({...form, name: e})}
                    placeholder="Name"
                />
            </View>
            <View className="mt-5">
                <FormField
                    title="userName"
                    value={form.userName}
                    handleChangeText={(e: any) => setForm({...form, userName: e})}
                    placeholder="userName"
                />
            </View>
            <View className="mt-5">
                <FormField
                    title="Email"
                    value={form.email}
                    handleChangeText={(e: any) => setForm({...form, email: e})}
                    placeholder="Email"
                />
            </View>
            <View className="mt-5">
                <FormField
                    title="Password"
                    value={form.password}
                    handleChangeText={(e: any) => setForm({...form, password: e})}
                    placeholder="password"
                />
            </View>
            <View className="w-full justify-center items-center flex-row mt-2 mb-0 pb-0">
                <TouchableOpacity
                    className="m-0 p-0 flex-row"
                    onPress={() => {
                        navigation.navigate("Login");
                    }}>
                    <Text className="font-bold">Already have an Account? </Text>
                    <Text className=" font-bold text-secondary-100">Login</Text>
                </TouchableOpacity>
            </View>
            <View className="justify-center items-center">
                <CustomButton
                    title="SignIn"
                    isLoading={isSignupLoading}
                    handlePress={() => {
                        if (
                            form.email != "" &&
                            form.password != "" &&
                            form.name != "" &&
                            form.userName != ""
                        ) {
                            signMeUp({signUp: form});
                        } else {
                            Alert.alert("Warning", "All feilds are required.");
                        }
                    }}
                    containerStyles="w-[90%] mt-2"
                    textStyles="text-white"
                />
            </View>
        </SafeAreaView>
    );
};

export default SignUp;
