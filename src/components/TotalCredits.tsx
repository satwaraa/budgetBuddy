import {View, Text} from "react-native";
import React, {useEffect, useState} from "react";
import {useLazyGetUserQuery} from "../api/user";

const TotalCredits = ({styles, groupId}: any) => {
    const containerStyle = {
        backgroundColor: "#b6e8de",
    };
    const [getUser, {data: userInformation, error}] = useLazyGetUserQuery();
    const [totalAmount, setTotalAmount] = useState<number>(0);
    useEffect(() => {
        getUser(groupId);
    }, []);

    useEffect(() => {
        if (userInformation) {
            let ta = 0;
            userInformation.forEach((element: any) => {
                ta += element.maxAmount;
            });
            setTotalAmount(ta);
        }
    }, [userInformation]);
    return (
        <View className={`${styles} items-center justify-center`} style={containerStyle}>
            <Text className="font-pbold text-3xl ">{totalAmount}+</Text>
            <Text className="font-psemibold text-xl "> credits this month</Text>
        </View>
    );
};

export default TotalCredits;
