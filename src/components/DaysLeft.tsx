import {View, Text} from "react-native";
import React, {useEffect, useState} from "react";
import {useLazyGetUserQuery} from "../api/user";

const DaysLeft = ({styles, groupId}: any) => {
    const containerStyle = {
        backgroundColor: "#b2e5ff",
    };

    function daysLeftInMonth() {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const daysLeft = lastDayOfMonth - today.getDate();

        return daysLeft;
    }

    const daysRemaining = daysLeftInMonth();

    const [getUser, {data: userInformation, error}] = useLazyGetUserQuery();
    const [moneyLeft, setMoneyLeft] = useState<number>(0);
    useEffect(() => {
        getUser(groupId);
    }, []);

    useEffect(() => {
        if (userInformation) {
            let restAmount = 0;
            userInformation.forEach((element: any) => {
                restAmount += element.restAmount;
            });
            setMoneyLeft(restAmount);
        }
    }, [userInformation]);

    return (
        <View
            className={`${styles} items-center justify-center  `}
            style={containerStyle}>
            <Text className="font-bold text-4xl  ">Rs.{moneyLeft}</Text>
            <Text className="font-psemibold text-xl "> Left for</Text>
            <Text className="font-bold text-4xl">{daysRemaining} Days.</Text>
        </View>
    );
};

export default DaysLeft;
