import {View, Text, FlatList, RefreshControl} from "react-native";
import React, {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useLazyGetCategoryQuery, useRefreshMutation} from "../../../api/user";
import {useRoute} from "@react-navigation/native";

interface CategoryType {
    id: string;
    name: string;
    maxAmount: number;
    restAmount: number;
}

const Budget = () => {
    const [refresh] = useRefreshMutation();
    const [refreshing, setRefreshing] = useState(false);
    const route = useRoute();
    const {groupId}: any = route.params;
    const onRefresh = async () => {
        setRefreshing(true);
        await refresh("");
        setRefreshing(false);
    };
    const [getCategory, {data: allCateogryBudget, error}] = useLazyGetCategoryQuery();
    useEffect(() => {
        getCategory(groupId);
    }, []);

    const cardColor: string[] = ["#ffdc73", "#b6e8de", "#b2e5ff", "#fe9dad", "#f5bace"];
    function chooseNonConsecutive(arr: string[]) {
        if (arr.length < 2) {
            return null; // Not enough elements for non-consecutive selection
        }

        const firstChoice = arr[Math.floor(Math.random() * arr.length)];

        // Create a list of valid indices for the second choice, excluding consecutive indices
        const validIndices = arr.reduce((valid, _, i) => {
            if (arr[i] !== firstChoice && Math.abs(i - arr.indexOf(firstChoice)) !== 1) {
                // @ts-ignore
                valid.push(i);
            }
            return valid;
        }, []);

        // Choose the second element randomly from the valid indices
        const secondChoice =
            arr[validIndices[Math.floor(Math.random() * validIndices.length)]];

        return [firstChoice, secondChoice];
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <View className="m-4">
                <Text className="font-pmedium text-sm text-gray-100">CategoryWise</Text>
                <Text className="text-2xl font-psemibold text-secondary-200">Budget</Text>
                <View className="h-5"></View>
            </View>
            <FlatList
                data={allCateogryBudget}
                renderItem={({item}) => {
                    const result: any = chooseNonConsecutive(cardColor);
                    const containerStyle = {
                        backgroundColor: result[Math.floor(Math.random() * 2)],
                    };
                    return (
                        <View
                            className="rounded-xl border-2 h-[90px] m-2  justify-between flex-row"
                            style={containerStyle}>
                            <View className="item-center   justify-center h-full ml-2 flex-1">
                                <Text className="text-2xl font-psemibold text-black font-bold">
                                    {item.name}
                                </Text>
                            </View>
                            <View className=" flex-1 items-center justify-center ">
                                <View className="flex-row items-center">
                                    <Text className="text-base font-psemibold text-gray-700">
                                        Budget {"  "}
                                    </Text>
                                    <Text className="text-base text-right font-pregular  flex-1 ml-2 text-black font-bold">
                                        {item.maxAmount}
                                    </Text>
                                </View>
                                <View className="flex-row">
                                    <Text className="text-base font-psemibold text-gray-700">
                                        Remaining {"  "}
                                    </Text>
                                    <Text className="text-base text-right font-pregular flex-1 ml-2 text-black font-bold">
                                        {item.restAmount}
                                    </Text>
                                </View>
                            </View>
                            <View className="w-[5px] "></View>
                        </View>
                    );
                }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    );
};

export default Budget;
