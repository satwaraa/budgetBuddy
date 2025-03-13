import {Alert, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import {useLoginMutation} from "../api/user";
import FormField from "../components/FormField";
import {CommonActions} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {setUserInfomation} from "../api/userSlice";

interface logInInfo {
    email: string;
    password: string;
}

const LogIn = ({navigation}: any) => {
    const dispatch = useDispatch();
    const [
        logInUser,
        {data: loginData, error: loginError, isSuccess: loginSuccess, isLoading},
    ] = useLoginMutation();

    const [form, setForm] = useState<logInInfo>({
        email: "",
        password: "",
    });

    useEffect(() => {
        console.log(loginError, loginData, loginSuccess);
        if (loginData?.userInformation) {
            dispatch(setUserInfomation(loginData.userInformation));
        }
        if (loginError) {
            // @ts-ignore
            const status = loginError.status;
            if (status == 401) {
                // @ts-ignore
                Alert.alert("Alert!!", loginError.data.message.toString());
            }
        }
        if (loginSuccess) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{name: "GroupCollection"}],
                }),
            );
        }
    }, [loginError, loginData, loginSuccess]);

    return (
        <SafeAreaView className="bg-primary h-full">
            <View className="mt-5">
                <FormField
                    title="Email"
                    value={form.email}
                    handleChangeText={(e: any) => setForm({...form, email: e})}
                    placeholder="Email"
                    autoCapitalize="none"
                />
            </View>
            <View className="mt-5">
                <FormField
                    title="Password"
                    value={form.password}
                    handleChangeText={(e: any) => setForm({...form, password: e})}
                    placeholder="Password"
                    autoCapitalize="none"
                />
            </View>
            <View className="w-full justify-center items-center flex-row mt-2 mb-0 pb-0">
                <TouchableOpacity
                    className="m-0 p-0 flex-row"
                    onPress={() => {
                        navigation.navigate("SignUp");
                    }}>
                    <Text className="font-bold">Don't have an Account? </Text>
                    <Text className=" font-bold text-secondary-100">SignUp</Text>
                </TouchableOpacity>
            </View>
            <View className="justify-center items-center mt-0 pt-0">
                <CustomButton
                    title="Log In"
                    isLoading={isLoading}
                    handlePress={() => {
                        if (form.email != "" && form.password != "") {
                            logInUser(form);
                        } else {
                            Alert.alert("Warning", "Email and password required.");
                        }
                    }}
                    containerStyles="w-[90%] mt-2"
                    textStyles="text-white"
                />
            </View>
        </SafeAreaView>
    );
};

export default LogIn;
