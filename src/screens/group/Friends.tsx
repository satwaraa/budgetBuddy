import {useEffect, useState} from "react";

import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import {useAddFriendMutation, useLazyGetFriendsQuery} from "../../api/user";
import {FlatList, Text, View} from "react-native";

interface FriendsProps {
    friend: {
        email: String;
        name: String;
        id: String;
    };
}

const Friends = () => {
    const [userEmail, setUserEmail] = useState("");

    const [addFriend, {data, error, isSuccess}] = useAddFriendMutation();
    const [friends, setFreinds] = useState([]);
    const [
        getFriends,
        {data: friendsData, error: friendsError, isSuccess: friendsSuccess},
    ] = useLazyGetFriendsQuery<any>();

    useEffect(() => {
        getFriends("");
    }, []);

    useEffect(() => {
        if (friendsData) {
            setFreinds(friendsData);
        }
    }, [friendsData, friendsError, friends]);

    useEffect(() => {
        if (error) {
            alert("User not found");
        }
        if (isSuccess) {
            alert("Friend Added");
            setUserEmail("");
        }
    }, [data, error, isSuccess]);

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={friends}
                renderItem={({item}: {item: FriendsProps}) => (
                    <View>
                        <View className="pl-5 flex flex-row w-full justify-between">
                            <Text className="text-base text-gray-100 font-pmedium">
                                {item.friend.name}
                            </Text>
                            <Text className="text-base text-gray-100 font-pmedium">
                                {item.friend.email}
                            </Text>
                        </View>
                    </View>
                )}
                ListFooterComponent={() => (
                    <View className="w-full flex items-center justify-center mt-5">
                        <FormField
                            title="Email"
                            value={userEmail}
                            onChangeText={setUserEmail}
                            placeholder="Email"
                        />
                        <CustomButton
                            title="Add Friend"
                            handlePress={() => {
                                addFriend({addFriend: userEmail});
                            }}
                            containerStyles="w-[90%] mt-7"
                        />
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default Friends;
