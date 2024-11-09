import {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {
    useAddFriendMutation,
    useLazyGetFriendsQuery,
    useSerachUserMutation,
} from "../../api/user";
import {FlatList, Text, View, Alert, TextInput, Image} from "react-native";
import BallBeat from "../../components/BallBeat";

interface FriendsProps {
    friend: {
        email: String;
        name: String;
        id: String;
        avatar_url: string;
    };
}

const Friends = () => {
    const [userInfo, setUserInfo] = useState("");
    const [
        searchUser,
        {
            data: userFetched,
            error: userFetchhError,
            isLoading: userFetchLoading,
            isSuccess: userFetchedSuccess,
        },
    ] = useSerachUserMutation();
    const [addFriend, {data, error, isSuccess, isLoading}] = useAddFriendMutation();
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
            Alert.alert("User not found");
        }
        if (isSuccess) {
            Alert.alert("Friend Added");
            setUserInfo("");
        }
    }, [data, error, isSuccess]);

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            //  && isValidEmail(userEmail
            if (userInfo !== "") {
                searchUser(userInfo);
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [userInfo]);

    // useEffect(() => {
    //     setUserInfo("");
    // }, [data, error, isLoading, isSuccess]);

    useEffect(() => {
        // console.log(userFetched, userFetchhError, userFetchLoading, userFetchedSuccess);
        setUserInfo("");
    }, [userFetched, userFetchhError, userFetchLoading, userFetchedSuccess]);

    return (
        <SafeAreaView className="bg-primary h-full">
            <View className="w-full h-10 flex-row items-center justify-evenly mt-5 ">
                <View className="w-full h-[55px] px-4 bg-white rounded-2xl   focus:border-secondary flex flex-row items-center">
                    <TextInput
                        className="flex-1 text-black font-psemibold text-base"
                        value={userInfo}
                        placeholder={"Email or UserName"}
                        placeholderTextColor="#7B7B8B"
                        onChangeText={(e: any) => setUserInfo(e)}
                    />
                </View>
            </View>

            {userFetchLoading ? (
                <View className="w-full h-2 flex items-center justify-center mt-9">
                    <BallBeat />
                </View>
            ) : null}
            {userFetched ? (
                <View className="mt-5 font-bold">
                    <Text className="text-xl text-white font-bold">User Found</Text>
                    <View className="w-[95%] bg-gray-400 flex  rounded-xl flex-row m-auto justify-left items-center mt-2 border border-b-gray-500 border-t-0 border-l-0 border-r-0 p-2">
                        <Image
                            source={{uri: userFetched.user.avatar_url}}
                            style={{
                                height: 80,
                                width: 80,
                                borderRadius: 40,
                            }}
                        />
                        <Text className=" text-black font-pmedium text-2xl pl-2 font-bold">
                            {userFetched.user.name}
                        </Text>
                    </View>
                </View>
            ) : null}

            {friends.length > 0 ? (
                <View className="mt-4 ml-1 mb-2">
                    <Text className="text-xl text-white font-bold">All Friends</Text>
                </View>
            ) : null}
            <FlatList
                data={friends}
                renderItem={({item}: {item: FriendsProps}) => (
                    <View>
                        <View className="w-[95%] bg-gray-400 flex  rounded-xl flex-row m-auto justify-left items-center mt-2 border border-b-gray-500 border-t-0 border-l-0 border-r-0 p-2">
                            <Image
                                source={{uri: item.friend.avatar_url}}
                                style={{
                                    height: 80,
                                    width: 80,
                                    borderRadius: 40,
                                }}
                            />
                            <Text className=" text-black font-pmedium text-2xl pl-2 font-bold">
                                {item.friend.name}
                            </Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default Friends;
