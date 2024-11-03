import {View, Text, FlatList, RefreshControl} from "react-native";
import React, {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useLazyGetTransactionQuery, useRefreshMutation} from "../../../api/user";
import DaysLeft from "../../../components/DaysLeft";
import MonthPercent from "../../../components/MonthPercent";
import TotalCredits from "../../../components/TotalCredits";
import {useRoute} from "@react-navigation/native";

const DashBoard = () => {
    const route = useRoute();
    const {groupId}: any = route.params;

    const [
        getTransaction,
        {data: transactions, error: transactionError, isSuccess: transactionSuccess},
    ] = useLazyGetTransactionQuery();
    useEffect(() => {
        getTransaction(groupId);
    }, [groupId]);

    const [refresh] = useRefreshMutation();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refresh("");
        setRefreshing(false);
    };
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

    const renderItem = ({item}: any) => {
        const date = new Date(item.date);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();

        const result: any = chooseNonConsecutive(cardColor);
        const containerStyle = {
            backgroundColor: result[Math.floor(Math.random() * 2)],
        };
        return (
            <View
                className="h-20 w-[95%] rounded-lg  m-2 border  p-2"
                style={containerStyle}>
                <View className="flex-row  item-center justify-between">
                    <View className="flex-row items-center">
                        <Text className=" font-pmedium uppercase text-lg text-black">
                            {item.description}
                        </Text>
                        <Text className="pl-1 font-pmedium text-gray-600 ">
                            {item.amount}Rs.
                        </Text>
                    </View>
                    <View className="pl-1 mt-[3px] font-pmedium text-gray-600">
                        <Text className="text-gray-600">
                            {formattedDate} {formattedTime}
                        </Text>
                    </View>
                </View>
                <View className="flex-row justify-between ">
                    <View className="flex-row items-center">
                        <Text className="font-pmedium text-black  ">
                            {item.category.name}-Remaining:
                        </Text>
                        <Text className="text-gray-600">
                            {" "}
                            Rs.{item.category.restAmount}
                        </Text>
                    </View>
                    <View className="flex-row">
                        <Text className="font-pmedium text-gray-600">Paid by:-</Text>
                        <Text className="font-pextrabold font-bold uppercase text-black">
                            {" "}
                            {item.user.name}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView className="bg-primary h-full p-1">
            <FlatList
                data={transactions}
                renderItem={renderItem}
                ListHeaderComponent={() => (
                    <View>
                        <FlatList
                            data={[1]}
                            renderItem={() => (
                                <View className="flex items-stretch justify-center  min-w-[98vw]">
                                    <DaysLeft
                                        styles="h-[15vh] w-[90vw] bg-yellow-50  rounded-lg m-auto"
                                        groupId={groupId}
                                    />
                                    {/* <MonthPercent
                                        styles="h-[30vh] w-[60vw] bg-yellow-50  rounded-lg m-2"
                                        groupId={groupId}
                                    />
                                    <TotalCredits
                                        styles="h-[30vh] w-[60vw] bg-yellow-50  rounded-lg m-2"
                                        groupId={groupId}
                                    /> */}
                                </View>
                            )}
                            horizontal
                        />
                        <Text className="m-2 font-pbold text-gray-50 text-xl ">
                            Transactions
                        </Text>
                    </View>
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    );
};

export default DashBoard;
