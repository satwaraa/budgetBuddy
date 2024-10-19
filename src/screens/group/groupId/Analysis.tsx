import {View, Text, FlatList, Image, RefreshControl} from "react-native";
import React, {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useLazyGetUserQuery, useRefreshMutation} from "../../../api/user";
import {icons} from "../../../constants";
// import {useGlobalSearchParams} from "expo-router";

interface userInfo {
    id: string;
    maxAmount: string;
    restAmount: string;
    user: {
        name: string;
    };
}
const Analysis = () => {
    const [refresh] = useRefreshMutation();
    const [refreshing, setRefreshing] = useState(false);
    // const glob = useGlobalSearchParams();
    const onRefresh = async () => {
        setRefreshing(true);
        await refresh("");
        setRefreshing(false);
    };
    const [getUser, {data: users}] = useLazyGetUserQuery();
    const [allUsers, setAllUsers] = useState<any>();
    const containerStyle = {
        backgroundColor: "#ffdc73",
    };
    // useEffect(() => {
    //     getUser(glob.groupId);
    // }, [glob.groupId]);

    useEffect(() => {
        if (users) {
            const data = users.map((element: userInfo) => {
                const stringAmount = element.maxAmount.toString();
                const remainingAmount = element.restAmount.toString();
                return (
                    <View
                        key={element.id}
                        className="h-[80px] w-[95%] rounded-lg  mt-4 items-center  justify-between flex-row"
                        style={containerStyle}>
                        <View className=" w-[20vw] ">
                            <Image
                                source={icons.profile}
                                resizeMode="contain"
                                className="ml-2"
                            />
                        </View>
                        <View className=" w-[30%] ">
                            <Text className="text-base font-psemibold">
                                {element.user.name}
                            </Text>
                        </View>
                        <View className=" flex-1 ">
                            <View className="flex-row items-center">
                                <Text className="text-base font-psemibold ">
                                    Budget {"  "}
                                </Text>
                                <Text className="text-base text-right font-pregular  flex-1 ml-2">
                                    {stringAmount}
                                </Text>
                            </View>
                            <View className="flex-row">
                                <Text className="text-base font-psemibold">
                                    Remaining {"  "}
                                </Text>
                                <Text className="text-base text-right font-pregular flex-1 ml-2">
                                    {remainingAmount}
                                </Text>
                            </View>
                        </View>
                        <View className="w-[5px]"></View>
                    </View>
                );
            });
            setAllUsers(data);
        }
    }, [users]);
    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={[1]}
                renderItem={() => (
                    <View className=" m-2 items-center justify-center">{allUsers}</View>
                )}
                ListHeaderComponent={() => (
                    <View>
                        <Text className="font-pmedium text-2xl  text-gray-100 m-4">
                            Profiles
                        </Text>
                        <View className="h-5"></View>
                    </View>
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    );
};

export default Analysis;
