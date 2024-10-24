import {View, Text, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";

import {
    useLazyGetCategoryQuery,
    useLazyGetUserQuery,
    useSetTransactionMutation,
} from "../api/user";
import FormField from "./FormField";
import CustomButton from "./CustomButton";
import {Dropdown} from "react-native-element-dropdown";
import {useNavigation} from "@react-navigation/native";

interface Transaction {
    description: string;
    amount: string;
    transactionOwner: string;
    categoryId: string;
    groupId: string;
}
interface CategoryType {
    id: string;
    maxAmount: number;
    name: string;
    restAmount: number;
}
const CreateTransaction = ({groupId}: {groupId: string}) => {
    const [form, setForm] = useState<Transaction>({
        description: "",
        amount: "",
        transactionOwner: "",
        categoryId: "",
        groupId: groupId,
    });
    const [
        addTransaction,
        {
            data: transactindata,
            error: TransactionError,
            isSuccess: TransactionSuccess,
            isLoading,
        },
    ] = useSetTransactionMutation();
    const [allOwners, setAllOwners] = useState<
        {_index: number; value: string; label: string}[]
    >([]);
    const [allCategory, setAllCategory] = useState<
        {_index: number; value: string; label: string}[]
    >([]);
    let selectedCategory;
    let selectedTransactionOwner;
    const containerStyle = {
        backgroundColor: "#ffdc73",
    };
    const [getCategory, {data: categories}] = useLazyGetCategoryQuery();
    const [getUser, {data: users}] = useLazyGetUserQuery();
    useEffect(() => {
        getCategory(groupId);
        getUser(groupId);
    }, [groupId]);
    const navigation = useNavigation();

    useEffect(() => {
        if (categories) {
            let temp: any = [];
            categories.forEach((element: CategoryType) => {
                temp.push({value: element.id, label: element.name});
            });

            setAllCategory(temp);
        }
        if (users) {
            let temp: any = [];
            users.forEach((element: any) => {
                temp.push({value: element.userId, label: element.user.name});
            });

            setAllOwners(temp);
        }
    }, [categories, users]);

    const submit_form = async () => {
        if (
            form.description != "" &&
            form.categoryId != "" &&
            form.transactionOwner != "" &&
            form.amount != ""
        ) {
            addTransaction(form);
        }
    };
    useEffect(() => {
        if (TransactionSuccess) {
            setForm({
                description: "",
                amount: "",
                transactionOwner: "",
                categoryId: "",
                groupId: groupId,
            });
            selectedCategory = "";
            selectedTransactionOwner = "";

            navigation.navigate("Dashboard", {groupId});
        }
    }, [TransactionError, TransactionSuccess]);

    return (
        <View className="relative space-y-2 h-auto rounded-lg p-4" style={containerStyle}>
            <Text className="text-lg  font-pmedium text-black-200 ">
                Create Transaction.
            </Text>

            <View>
                <FormField
                    title="Description"
                    value={form.description}
                    handleChangeText={(e: any) => setForm({...form, description: e})}
                    placeholder="Description"
                />
            </View>
            <View>
                <FormField
                    title="Amount"
                    value={form.amount}
                    handleChangeText={(e: any) => setForm({...form, amount: e})}
                    placeholder="Amount"
                />
            </View>

            <View>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    containerStyle={styles.dropdownContainer}
                    itemTextStyle={styles.itemTextStyle}
                    data={allCategory}
                    value={selectedCategory}
                    labelField="label"
                    valueField="value"
                    onChange={(item: {_index: number; label: string; value: string}) => {
                        selectedCategory = item.label;
                        setForm({...form, categoryId: item.value});
                    }}
                    placeholder="Select Category"
                />

                <View className="h-2" />
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    containerStyle={styles.dropdownContainer}
                    itemTextStyle={styles.itemTextStyle}
                    data={allOwners}
                    value={selectedTransactionOwner}
                    labelField="label"
                    valueField="value"
                    onChange={(item: {_index: number; label: string; value: string}) => {
                        selectedTransactionOwner = item.label;
                        setForm({...form, transactionOwner: item.value});
                    }}
                    placeholder="Transaction by"
                />
            </View>
            <View>
                <CustomButton
                    title="Create"
                    handlePress={submit_form}
                    isLoading={isLoading}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    label: {
        fontSize: 18,
        color: "#fff",
        marginBottom: 8,
    },
    dropdown: {
        height: 50,
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "#fff",
    },
    placeholderStyle: {
        fontSize: 16,
        color: "#bbb",
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "#555",
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: "#fff",
    },
    itemTextStyle: {
        fontSize: 16,
        color: "#555",
    },
    dropdownContainer: {
        backgroundColor: "#fff",
        borderColor: "#555",
    },
});
export default CreateTransaction;
