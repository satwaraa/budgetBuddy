import { View, Text, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import React, { useEffect, useState } from "react";

import {
    useLazyGetCategoryQuery,
    useLazyGetUserQuery,
    useSetTransactionMutation,
} from "@/api/user";
import FormField from "./FormField";
import CustomButton from "./CustomButton";
import { Href, router } from "expo-router";

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
const CreateTransaction = ({ groupId }: { groupId: any }) => {
    const [form, setForm] = useState<Transaction>({
        description: "",
        amount: "",
        transactionOwner: "",
        categoryId: "",
        groupId: groupId,
    });
    const [
        addTransaction,
        { data: transactindata, error: TransactionError, isSuccess: TransactionSuccess },
    ] = useSetTransactionMutation();
    const [allOwners, setAllOwners] = useState<any>();
    const [allCategory, setAllCategory] = useState<any>();
    const containerStyle = {
        backgroundColor: "#ffdc73",
    };
    const [getCategory, { data: categories }] = useLazyGetCategoryQuery();
    const [getUser, { data: users }] = useLazyGetUserQuery();
    useEffect(() => {
        getCategory(groupId);
        getUser(groupId);
    }, []);

    useEffect(() => {
        if (categories) {
            let temp: any = [];
            categories.forEach((element: CategoryType) => {
                temp.push({ key: element.id, value: element.name });
            });
            setAllCategory(temp);
        }
        if (users) {
            let temp: any = [];
            users.forEach((element: any) => {
                temp.push({ key: element.userId, value: element.user.name });
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
            router.push(
                `/group/${groupId}/dashBoard` as Href<"/group/${string}/dashBoard">,
            );
        }
    }, [TransactionError, TransactionSuccess]);

    return (
        <View className="relative space-y-2 h-auto rounded-lg p-4" style={containerStyle}>
            <Text className="text-lg  font-pmedium ">Create Transaction.</Text>

            <View>
                <FormField
                    title="Description"
                    value={form.description}
                    handleChangeText={(e: any) => setForm({ ...form, description: e })}
                    placeholder="Description"
                />
            </View>
            <View>
                <FormField
                    title="Amount"
                    value={form.amount}
                    handleChangeText={(e: any) => setForm({ ...form, amount: e })}
                    placeholder="Amount"
                />
            </View>

            <View>
                <SelectList
                    data={allCategory}
                    placeholder="Select Category"
                    fontFamily="Poppins-SemiBold"
                    setSelected={(val: any) => setForm({ ...form, categoryId: val })}
                    boxStyles={styles.selectBox}
                    dropdownStyles={styles.dropdown}
                    dropdownItemStyles={styles.option}
                    search={false}
                />

                <View className="h-4" />
                <SelectList
                    data={allOwners}
                    placeholder="Spender"
                    fontFamily="Poppins-SemiBold"
                    setSelected={(val: any) =>
                        setForm({ ...form, transactionOwner: val })
                    }
                    boxStyles={styles.selectBox}
                    dropdownStyles={styles.dropdown}
                    dropdownItemStyles={styles.option}
                    search={false}
                />
            </View>
            <View>
                <CustomButton title="Create" handlePress={submit_form} />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        elevation: 30,
    },
    selectBox: {
        borderWidth: 0,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,

        backgroundColor: "#fff",
    },
    dropdown: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 10,
        maxHeight: 150,
        position: "absolute",
        left: 0,
        right: 0,
        top: 35,
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    selectedOption: {
        backgroundColor: "#f0f0f0",
    },
});

export default CreateTransaction;
