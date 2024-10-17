import { View, Text, StyleSheet } from "react-native";

import React, { useEffect, useState } from "react";

import FormField from "./FormField";
import CustomButton from "./CustomButton";

import { Href, router } from "expo-router";
import { useSetCategoryMutation } from "@/api/user";

interface CategoryType {
    groupId: string;
    name: string;
    maxAmount: string;
}
const AddCategory = ({ groupId }: { groupId: any }) => {
    const [form, setForm] = useState<CategoryType>({
        groupId: groupId,
        name: "",
        maxAmount: "",
    });

    const containerStyle = {
        backgroundColor: "#b2e5ff",
    };
    const [
        setCategory,
        { data: setCategoryData, error: setCategoryError, isSuccess: setCategorySuccess },
    ] = useSetCategoryMutation();

    const submit_form = async () => {
        if (form.name != "" && form.maxAmount != "") {
            setCategory(form);
        }
    };
    useEffect(() => {
        if (setCategorySuccess) {
            setForm({
                groupId: groupId,
                name: "",
                maxAmount: "",
            });

            router.push(`/group/${groupId}/budget` as Href<"/group/${string}/budget">);
        }
    }, [setCategorySuccess, setCategoryError]);

    return (
        <View className="space-y-2 h-auto rounded-lg p-4" style={containerStyle}>
            <Text className="text-lg  font-pmedium ">Create Category.</Text>
            <View>
                <FormField
                    title="Name"
                    value={form.name}
                    handleChangeText={(e: any) => setForm({ ...form, name: e })}
                    placeholder="Name"
                />
            </View>
            <View>
                <FormField
                    title="Max Amount"
                    value={form.maxAmount}
                    handleChangeText={(e: any) => setForm({ ...form, maxAmount: e })}
                    placeholder="Max Amount"
                />
            </View>

            <View>
                <CustomButton title="Create" handlePress={submit_form} />
            </View>
        </View>
    );
};

export default AddCategory;
