import {View, Text, Image, TextInput, Alert} from "react-native";
import React, {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../api/userSlice";
import {TouchableOpacity} from "react-native-gesture-handler";
import * as ImagePicker from "react-native-image-picker";
import CheckBox from "react-native-check-box";
import {
    useChangePasswordMutation,
    useLazyWhoAmIQuery,
    useSetAvatarMutation,
} from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BallBeat from "../../components/BallBeat";
import {CommonActions, useNavigation} from "@react-navigation/native";

const createFormData = (photo: ImagePicker.ImagePickerResponse, body = {}) => {
    const data = new FormData();

    if (photo.assets && photo.assets.length > 0) {
        data.append("file", {
            name: photo.assets[0].fileName,
            type: "image/jpeg",
            uri: photo.assets[0].uri,
        });
    }

    Object.keys(body).forEach(key => {
        // @ts-ignore
        data.append(key, body[key]);
    });
    return data;
};

const Settings = () => {
    const navigation = useNavigation();
    const [info, setInfo] = useState<{
        userName: string;
        email: string;
        avatar_url: string;
        name: string;
    }>({
        userName: "budgetbuddy",
        email: "budgetBuddy",
        avatar_url: "",
        name: "budgetBuddy",
    });
    const [changePasswordSection, setChangePasswordSection] = useState(false);
    const userInformation = useSelector(selectCurrentUser);
    const [whoami] = useLazyWhoAmIQuery();
    const [changePasswordButtonDisabled, setChangePasswordButtonDisabled] =
        useState(true);
    useEffect(() => {
        if (
            userInformation.avatar_url === null ||
            userInformation.avatar_url === undefined
        ) {
            setInfo({...userInformation, avatar_url: ""});
            whoami("");
        } else {
            setInfo(userInformation);
        }
    }, [userInformation]);

    const [
        setAvatar,
        {
            data: avatarRespnose,
            error: setAvatarError,
            isLoading: setAvatarLoading,
            isSuccess: setAvatarSuccesss,
        },
    ] = useSetAvatarMutation();

    const [changePasswordForm, setChangePasswordForm] = useState<{
        oldPassword: string;
        newPassword: string;
        confirmedNewPassword: string;
        stayLoggedIn: boolean;
    }>({
        oldPassword: "",
        newPassword: "",
        confirmedNewPassword: "",
        stayLoggedIn: false,
    });
    const [
        changePassword,
        {
            data: ChangePasswordData,
            error: ChangePasswordError,
            isLoading: ChangePasswordLoading,
            isSuccess: ChangePasswordSuccess,
        },
    ] = useChangePasswordMutation();
    useEffect(() => {
        if (
            changePasswordForm.newPassword == changePasswordForm.confirmedNewPassword &&
            changePasswordForm.oldPassword != "" &&
            changePasswordForm.oldPassword != null
        ) {
            setChangePasswordButtonDisabled(false);
        } else {
            setChangePasswordButtonDisabled(true);
        }
    }, [changePasswordForm]);
    useEffect(() => {
        if (ChangePasswordSuccess) {
            setChangePasswordSection(false);
            if (changePasswordForm.stayLoggedIn == false) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{name: "Home"}],
                    }),
                );
                // @ts-ignore
                navigation.navigate("Home");
            }

            setChangePasswordForm({
                oldPassword: "",
                newPassword: "",
                confirmedNewPassword: "",
                stayLoggedIn: false,
            });
        }
    }, [ChangePasswordData, ChangePasswordError, ChangePasswordSuccess]);

    // useEffect(() => {
    //     // console.log(avatarRespnose, setAvatarError, setAvatarLoading, setAvatarSuccesss);
    // }, [avatarRespnose, setAvatarError, setAvatarLoading, setAvatarSuccesss]);

    return (
        <SafeAreaView className="bg-primary h-full">
            <View className="m-5">
                <View className="w-full flex items-center justify-center">
                    {info.avatar_url === "" ? (
                        <Image
                            source={require("../../assets/images/user-profile.jpg")}
                            style={{
                                height: 80,
                                width: 80,
                                borderRadius: 40,
                                marginBottom: 10,
                            }}
                        />
                    ) : (
                        <Image
                            source={{uri: info.avatar_url}}
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 40,
                                marginBottom: 10,
                            }}
                        />
                    )}

                    <TouchableOpacity
                        onPress={() => {
                            const options: any = {
                                selectionLimit: 1,
                                mediaType: "photo",
                                includeBase64: false,
                            };

                            ImagePicker.launchImageLibrary(options, async response => {
                                if (response.errorCode) {
                                    Alert.alert(
                                        "Error",
                                        "Image selection error: " + response.errorMessage,
                                    );
                                } else if (
                                    response.assets &&
                                    response.assets.length > 0
                                ) {
                                    const formData = new FormData();
                                    formData.append("file", {
                                        uri: response.assets[0].uri,
                                        type: response.assets[0].type,
                                        name: response.assets[0].fileName,
                                        size: response.assets[0].fileSize,
                                    });

                                    setAvatar(formData);
                                    // await fetch(
                                    //     "http://192.168.158.251:8080/api/setAvatar",
                                    //     {
                                    //         method: "post",

                                    //         body: formData,
                                    //         headers: {
                                    //             accesstoken:
                                    //                 (await AsyncStorage.getItem(
                                    //                     "accessToken",
                                    //                 )) || "",
                                    //             refreshToken:
                                    //                 (await AsyncStorage.getItem(
                                    //                     "refreshToken",
                                    //                 )) || "",
                                    //             "Content-Type": "multipart/form-data",
                                    //         },
                                    //     },
                                    // )
                                    //     .then(res => {})
                                    //     .catch(res => {});
                                }
                            });
                        }}>
                        {/* REFACTOR: UPLOADED IMAGE FIALED TO GET PARSE AT BACKEND. */}
                        <Text className="line-through text-lg bold">Change Avatar</Text>
                    </TouchableOpacity>
                </View>
                {/* Change password */}
                {!changePasswordSection ? (
                    <View className="w-90% mt-10 border border-gray-600 rounded-lg">
                        <TouchableOpacity onPress={() => setChangePasswordSection(true)}>
                            <Text className="text-2xl p-2">Change password</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View className="w-90% mt-10 border border-gray-600 rounded-lg p-2">
                        <TextInput
                            className="text-2xl border border-b-gray-700 p-0 m-2 border-t-0 border-l-0 border-r-0"
                            placeholder="Old Password"
                            onChangeText={e =>
                                setChangePasswordForm({
                                    ...changePasswordForm,
                                    oldPassword: e,
                                })
                            }
                            secureTextEntry={true}
                            placeholderTextColor="#7B7B8B"
                        />
                        <TextInput
                            className="text-2xl border border-b-gray-700 p-0 m-2 border-t-0 border-l-0 border-r-0"
                            placeholder="New password"
                            onChangeText={e =>
                                setChangePasswordForm({
                                    ...changePasswordForm,
                                    newPassword: e,
                                })
                            }
                            secureTextEntry={true}
                            placeholderTextColor="#7B7B8B"
                        />
                        <TextInput
                            className="text-2xl border border-b-gray-700 p-0 m-2 border-t-0 border-l-0 border-r-0"
                            placeholder="Confirm New Password"
                            onChangeText={e => {
                                setChangePasswordForm({
                                    ...changePasswordForm,
                                    confirmedNewPassword: e,
                                });
                            }}
                            secureTextEntry={true}
                            placeholderTextColor="#7B7B8B"
                        />

                        <CheckBox
                            onClick={() => {
                                setChangePasswordForm({
                                    ...changePasswordForm,
                                    stayLoggedIn: !changePasswordForm.stayLoggedIn,
                                });
                            }}
                            checkBoxColor="#FF9C01"
                            rightText="Stay logged in"
                            rightTextStyle={{
                                color: "white",
                                fontSize: 16,
                            }}
                            isChecked={changePasswordForm.stayLoggedIn}
                        />

                        <View className="w-90% mt-3 border border-gray-600 rounded-lg items-center justify-center bg-secondary h-16">
                            <TouchableOpacity
                                onPress={() => {
                                    changePassword(changePasswordForm);
                                }}
                                disabled={changePasswordButtonDisabled}>
                                {!ChangePasswordLoading ? (
                                    <Text
                                        className={`text-2xl p-2 text-white ${
                                            changePasswordButtonDisabled
                                                ? "line-through"
                                                : null
                                        }`}>
                                        Change password
                                    </Text>
                                ) : (
                                    <View className="h-[64px]">
                                        <BallBeat />
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Settings;
