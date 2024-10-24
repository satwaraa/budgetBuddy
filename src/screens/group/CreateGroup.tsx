import {View, Text, TouchableOpacity, Image, TextInput} from "react-native";
import {useState, useEffect} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import {FlatList} from "react-native";
import {useCreateGroupMutation, useLazyGetFriendsQuery} from "../../api/user";
import {icons} from "../../constants";
import CustomButton from "../../components/CustomButton";

interface Friend {
    email: String;
    name: String;
    id: String;
    maxAmount: Number;
    restAmount: Number;
}
interface FriendsProps {
    friend: Friend;
}

const CreateGroup = ({navigation}: any) => {
    const [groupName, setGroupName] = useState("");
    const [selectedFriends, setSelectedFriends] = useState<Friend[] | []>([]);
    const [userBudget, setUserBudget] = useState<number>(0);
    const [allFreinds, {data: userFreinds, error, isSuccess}] = useLazyGetFriendsQuery();

    const [availableMembers, setAvailableMembers] = useState<Friend[] | []>([]);
    const [
        createGroup,
        {data: groupData, error: groupError, isSuccess: groupSuccess, isLoading},
    ] = useCreateGroupMutation();

    useEffect(() => {
        allFreinds("");
    }, []);

    useEffect(() => {
        if (groupSuccess) {
            setUserBudget(0);
            setSelectedFriends([]);
            // router.push("/group");
            navigation.navigate("Group");
        }
    }, [groupData, groupError, groupSuccess]);

    useEffect(() => {
        if (userFreinds) {
            const data = userFreinds.map((friend: FriendsProps) => {
                return friend.friend;
            });
            setAvailableMembers(data);
        }
    }, [userFreinds]);

    return (
        <SafeAreaView className="bg-primary min-h-full ">
            <FlatList
                data={[1]}
                renderItem={() => (
                    <View>
                        <View className="w-[98%] pl-5">
                            <Text className="text-base text-gray-100 font-pmedium">
                                Group Name
                            </Text>
                            <FormField
                                title="Name"
                                value={groupName}
                                onChangeText={setGroupName}
                            />
                        </View>

                        <View className="pt-4">
                            <Text className="text-base text-gray-100 font-pmedium pl-5">
                                Selected Members
                            </Text>
                            <View
                                className="
                                        w-[98%] h-10 p-2 m-1  overflow-hidden border border-white rounded-full flex  flex-row items-center justify-center mt-2 ml-2 ">
                                <Text className="text-white uppercase font-pbold ml-1">
                                    You{"\t\t\t\t"}
                                </Text>

                                <TextInput
                                    className="flex-1 text-white font-psemibold  ml-10 text-base h-10 w-10"
                                    value={+userBudget > 0 ? userBudget.toString() : ""}
                                    placeholder={"Enter Budget ₹"}
                                    placeholderTextColor="#7B7B8B"
                                    onChangeText={e => {
                                        setUserBudget(Number(e));
                                    }}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        <FlatList
                            data={selectedFriends}
                            keyExtractor={(item: any) => item.id}
                            renderItem={({item: Friend}) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedFriends(
                                            selectedFriends.filter(
                                                selectedFriend =>
                                                    selectedFriend.id !== Friend.id,
                                            ),
                                        );
                                        setAvailableMembers([
                                            ...availableMembers,
                                            Friend,
                                        ]);
                                    }}>
                                    <View
                                        className="
                                        w-[98%] h-10 p-2 m-1  overflow-hidden border border-white rounded-full flex  flex-row items-center justify-center mt-2 ml-2 ">
                                        <Text className="text-white uppercase font-pbold ml-1">
                                            {Friend.name}
                                        </Text>

                                        <TextInput
                                            className="flex-1 text-white font-psemibold  ml-10 text-base"
                                            value={
                                                +Friend.maxAmount > 0
                                                    ? Friend.maxAmount.toString()
                                                    : ""
                                            }
                                            placeholder={"Enter Budget ₹"}
                                            placeholderTextColor="#7B7B8B"
                                            onChangeText={e => {
                                                setSelectedFriends(
                                                    selectedFriends.map(
                                                        selectedFriend => {
                                                            if (
                                                                selectedFriend.id ===
                                                                Friend.id
                                                            ) {
                                                                return {
                                                                    ...selectedFriend,
                                                                    maxAmount: Number(e),
                                                                    restAmount: Number(e),
                                                                };
                                                            }
                                                            return selectedFriend;
                                                        },
                                                    ),
                                                );
                                            }}
                                            keyboardType="numeric"
                                        />
                                        <Image
                                            source={icons.cross}
                                            resizeMode="contain"
                                            className="border-2 border-white h-8 w-8 font-bold mb-[1px]"
                                        />
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                        {availableMembers.length > 0 ? (
                            <View className="h-[1px]  bg-gray-500 w-full mt-4 mb-4" />
                        ) : null}
                        {availableMembers.length > 0 ? (
                            <View className="w-[98%] pl-5">
                                <Text className="text-base text-gray-100 font-pmedium">
                                    Add Members
                                </Text>
                            </View>
                        ) : null}
                        <FlatList
                            data={availableMembers}
                            horizontal
                            className="pl-2"
                            renderItem={({item}: {item: Friend}) => (
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setAvailableMembers(
                                                availableMembers.filter(
                                                    availableMember =>
                                                        availableMember.id !== item.id,
                                                ),
                                            );
                                            setSelectedFriends([
                                                ...selectedFriends,
                                                item,
                                            ]);
                                        }}>
                                        <View
                                            className="
                                        w-auto h-10 p-2 m-1  overflow-hidden border border-white rounded-full flex  flex-row items-center justify-center ml-2">
                                            <Text className="text-white uppercase font-pbold">
                                                {item.name}
                                            </Text>
                                            <Image
                                                source={icons.addFriend}
                                                resizeMode="contain"
                                                className="border-2 border-white h-8 w-8 font-bold mb-[1px]"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                )}
                ListFooterComponent={() => (
                    <View className="flex w-full items-center justify-center mt-3">
                        <CustomButton
                            title="Create Group"
                            containerStyles="w-[97%]"
                            isLoading={isLoading}
                            handlePress={() => {
                                const filteredInformation = selectedFriends.map(
                                    (item: Friend) => {
                                        return {
                                            id: item.id,
                                            maxAmount: item.maxAmount,
                                            restAmount: item.restAmount,
                                        };
                                    },
                                );

                                const data = {
                                    createGroup: {
                                        members: filteredInformation,
                                        name: groupName,
                                        adminBudget: userBudget,
                                    },
                                };

                                createGroup(data);
                            }}
                        />
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default CreateGroup;
