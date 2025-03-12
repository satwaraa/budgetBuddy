import DeviceInfo from "react-native-device-info";

export const getVisitorId = async () => {
    try {
        const visitorId = await DeviceInfo.getAndroidIdSync();
        return visitorId;
    } catch (err) {
        return null;
    }
};
