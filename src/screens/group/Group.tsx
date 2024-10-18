import {View, Text, TouchableOpacity, FlatList, RefreshControl} from "react-native";
import React, {useEffect, useState} from "react";

import {SafeAreaView} from "react-native-safe-area-context";
import {
    useLazyGetGroupsQuery,
    useLogoutMutation,
    useRefreshMutation,
} from "../../api/user";

import CustomButton from "../../components/CustomButton";
import chooseNonConsecutive from "../../constants/radomColor";
import SplashScreen from "react-native-splash-screen";

interface GroupInfo {
    group: {
        name: string;
        id: string;
    };
}

const Group = ({navigation}: any) => {
    const [refresh] = useRefreshMutation();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refresh("");
        setRefreshing(false);
    };

    const [logout, {data: logOutData, error: logOutError, isSuccess: logOutSuccess}] =
        useLogoutMutation();
    let [
        getGroups,
        {
            data: groupData,
            isLoading: groupLoding,
            isError: groupError,
            isSuccess: groupSuccess,
        },
    ] = useLazyGetGroupsQuery();

    useEffect(() => {
        getGroups("");
        if (!groupData) {
            groupData = [];
        }
    }, []);
    useEffect(() => {
        if (groupData) {
            SplashScreen.hide();
        }
    }, [groupData]);

    const result = chooseNonConsecutive() || [];
    const containerStyle = {
        backgroundColor: result[Math.floor(Math.random() * 2)],
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            {groupData?.length > 0 ? (
                <View>
                    <Text className="text-white font-psemibold text-4xl pl-2">
                        {" "}
                        Groups
                    </Text>
                </View>
            ) : (
                <View className="pl-2">
                    <Text className="text-white font-psemibold text-4xl">
                        You are not in
                    </Text>
                    <Text className="text-white font-psemibold text-4xl">
                        {"\t\t"} Any Group :(
                    </Text>
                </View>
            )}
            <FlatList
                data={groupData}
                renderItem={({item}: {item: GroupInfo}) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                // TODO:  fix navigation
                                // router.push(`/group/${item.group.id}`);
                            }}>
                            <View
                                className="h-20 w-[95%] rounded-lg  m-2 border  p-2 flex justify-center"
                                style={containerStyle}>
                                <Text className="font-psemibold text-3xl">
                                    {item.group.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                ListFooterComponent={() => (
                    <View className="flext w-full items-center justify-center">
                        <CustomButton
                            title="Create Group"
                            handlePress={() => {
                                // TODO: fix navigation
                                navigation.navigate("CreateGroup");

                                // router.push("/group/createGroup");
                            }}
                            containerStyles="w-[90%] mt-7"
                        />
                    </View>
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    );
};

export default Group;
