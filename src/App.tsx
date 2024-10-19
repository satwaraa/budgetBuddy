import {View, Text, Button, Image} from "react-native";
import React from "react";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./screens/Home.tsx";
import {Provider} from "react-redux";
import {store} from "./api/store.ts";
import Login from "./screens/Login.tsx";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Group from "./screens/group/Group.tsx";
import CreateGroup from "./screens/group/CreateGroup.tsx";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Analysis from "./screens/group/groupId/Analysis.tsx";
import Budget from "./screens/group/groupId/Budget.tsx";
import Create from "./screens/group/groupId/Create.tsx";
import DashBoard from "./screens/group/groupId/DashBoard.tsx";
import {RootStackParamList} from "./index";
import Friends from "./screens/group/Friends.tsx";
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "./constants/icons.js";

const Drawer = createDrawerNavigator();

function GroupCollection() {
    return (
        <View style={{flex: 1}}>
            <Drawer.Navigator
                initialRouteName="Group"
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: "#161622",
                    },
                    drawerActiveBackgroundColor: "#161622",
                    drawerActiveTintColor: "#FF9C01",
                    drawerInactiveTintColor: "#fff",
                    drawerLabelStyle: {
                        fontSize: 20,
                        gap: 0,
                        padding: 0,
                        margin: 0,
                    },
                }}>
                <Drawer.Screen
                    name="Group"
                    component={Group}
                    options={{
                        title: "Home",
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: "#161622",
                            shadowOpacity: 0,
                            borderBottomWidth: 0,
                            elevation: 0,
                        },
                        headerTintColor: "#fff",
                    }}
                />
                <Drawer.Screen
                    name="CreateGroup"
                    component={CreateGroup}
                    options={{
                        title: "Create Group",
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: "#161622",
                            shadowOpacity: 0,
                            borderBottomWidth: 0,
                            elevation: 0,
                        },
                        headerTintColor: "#fff",
                    }}
                />
                <Drawer.Screen
                    name="Friends"
                    component={Friends}
                    options={{
                        title: "Friends",
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: "#161622",
                            shadowOpacity: 0,
                            borderBottomWidth: 0,
                            elevation: 0,
                        },
                        headerTintColor: "#fff",
                    }}
                />
            </Drawer.Navigator>
        </View>
    );
}

const Tab = createBottomTabNavigator();
const TabIcon = ({icon, color, name, focused}: any) => {
    return (
        <View className="flex items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-5 h-5"
            />
            <Text
                className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
                style={{color: color}}>
                {name}
            </Text>
        </View>
    );
};

function GroupTabs({route}: any) {
    const {groupId} = route.params;

    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                tabBarActiveTintColor: "#FFA001",
                tabBarInactiveTintColor: "#CDCDE0",
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#161622",
                    borderTopWidth: 1,
                    borderTopColor: "#232533",
                    height: 84,
                },
            }}>
            <Tab.Screen
                name="Dashboard"
                component={DashBoard}
                initialParams={{groupId}}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon
                            icon={icons.home}
                            color={color}
                            name="dashBoard"
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Budget"
                component={Budget}
                initialParams={{groupId}}
                options={{
                    title: "budget",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon
                            icon={icons.walletBuyer}
                            color={color}
                            name="budget"
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Create"
                component={Create}
                initialParams={{groupId}}
                options={{
                    title: "Create Transaction",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon
                            icon={icons.plus}
                            color={color}
                            name="create"
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Analysis"
                component={Analysis}
                initialParams={{groupId}}
                options={{
                    title: "analysis",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon
                            icon={icons.search}
                            color={color}
                            name="analysis"
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
const App = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="GroupCollection"
                        component={GroupCollection}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="GroupTabs"
                        component={GroupTabs}
                        options={{headerShown: false}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
