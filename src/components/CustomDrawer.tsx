import React from "react";
import {View, Text, ImageBackground, Image, TouchableOpacity} from "react-native";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";

import Ionicons from "react-native-vector-icons/Ionicons";

const CustomDrawer = (props: any) => {
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView
                style={{backgroundColor: "#020c1b"}}
                {...props}
                contentContainerStyle={{backgroundColor: "#020c1b"}}>
                <ImageBackground
                    source={require("../assets/images/menu-bg.png")}
                    style={{padding: 20}}>
                    <View className="flex  justify-evenly items-center">
                        <Image
                            source={require("../assets/images/user-profile.jpg")}
                            style={{
                                height: 80,
                                width: 80,
                                borderRadius: 40,
                                marginBottom: 10,
                            }}
                        />
                        <Text
                            className=" font-bold text-xl"
                            style={{
                                color: "#fff",
                                // fontSize: 18,
                                fontFamily: "Roboto-Medium",
                                marginBottom: 5,
                            }}>
                            John Doe
                        </Text>
                    </View>
                </ImageBackground>
                <View style={{flex: 1, backgroundColor: "#020c1b", paddingTop: 10}}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View
                style={{
                    padding: 20,
                    borderTopWidth: 1,
                    backgroundColor: "#020c1b",
                    borderTopColor: "#ccc",
                }}>
                <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Ionicons name="share-social" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                fontFamily: "Roboto-Medium",
                                marginLeft: 5,
                            }}>
                            Tell a Friend
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Ionicons name="exit" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                fontFamily: "Roboto-Medium",
                                marginLeft: 5,
                            }}>
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawer;
