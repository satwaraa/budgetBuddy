import {ActivityIndicator, Text, TouchableOpacity} from "react-native";
import LoaderKit from "react-native-loader-kit";
import BallBeat from "./BallBeat";
const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
}: any) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            className={`bg-secondary rounded-xl min-h-[55px] flex flex-row justify-center items-center ${containerStyles} ${
                isLoading ? "opacity-50" : ""
            }`}
            style={{opacity: isLoading ? 0.85 : 1}}
            disabled={isLoading}>
            {!isLoading ? (
                <Text className={`text-white font-psemibold text-lg  ${textStyles}`}>
                    {title}
                </Text>
            ) : (
                <BallBeat />
            )}
        </TouchableOpacity>
    );
};

export default CustomButton;
