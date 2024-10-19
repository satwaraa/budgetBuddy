import {View, Text} from "react-native";
import React, {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";

import CreateTransaction from "../../../components/CreateTransaction";
import AddCategory from "../../../components/AddCategory";
import {FlatList} from "react-native";
import {useRoute} from "@react-navigation/native";

const Create = () => {
    const route = useRoute();
    const {groupId}: any = route.params;

    return (
        <SafeAreaView className="bg-primary h-full p-2">
            <FlatList
                data={[1]}
                renderItem={() => (
                    <View className=" m-2">
                        <CreateTransaction groupId={groupId} />
                        <View className="mt-2"></View>
                        <AddCategory groupId={groupId} />
                    </View>
                )}
                ListHeaderComponent={() => (
                    <View>
                        <Text className="font-pmedium text-sm text-gray-100">Update</Text>
                        <Text className="text-2xl font-psemibold text-secondary-200">
                            BudgetBuddy
                        </Text>
                        <View className="h-5"></View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default Create;
