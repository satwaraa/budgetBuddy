import {View, Text} from "react-native";
import React, {useEffect, useState} from "react";
import {useLazyGetUserQuery} from "../api/user";

const MonthPercent = ({styles, groupId}: any) => {
    const containerStyle = {
        backgroundColor: "#f5bace",
    };
    const [getUser, {data: userInformation, error}] = useLazyGetUserQuery();
    const [percentage, setPercentage] = useState<number>(0);
    useEffect(() => {
        getUser(groupId);
    }, []);

    useEffect(() => {
        if (userInformation) {
            let totalCredits = 0;
            let restCredits = 0;

            userInformation.forEach((element: any) => {
                totalCredits += element.maxAmount;
                restCredits += element.restAmount;
            });
            const percen = Math.floor((restCredits / totalCredits) * 100);
            setPercentage(percen);
        }
    }, [userInformation]);
    return (
        <View className={`${styles} items-center justify-center`} style={containerStyle}>
            <Text className="text-4xl font-pbold ">{percentage}%</Text>
            <Text className="text-xl font-psemibold"> of Monthly budget left</Text>
        </View>
    );
};

export default MonthPercent;
