import React, {useEffect} from "react";
import {View, Animated} from "react-native";
import {styled} from "nativewind";

const Ball = styled(View);

const BallBeat = () => {
    const ball1 = new Animated.Value(0);
    const ball2 = new Animated.Value(0);
    const ball3 = new Animated.Value(0);

    useEffect(() => {
        const bounce = (ball: any) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(ball, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(ball, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        };

        bounce(ball1);
        setTimeout(() => bounce(ball2), 150);
        setTimeout(() => bounce(ball3), 300);

        return () => {
            ball1.stopAnimation();
            ball2.stopAnimation();
            ball3.stopAnimation();
        };
    }, []);

    const getStyle = (ball: any) => ({
        transform: [
            {
                scale: ball.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.5],
                }),
            },
        ],
    });

    return (
        <View className="flex-row justify-center items-center space-x-2 h-full">
            <Animated.View
                style={getStyle(ball1)}
                className="w-2 h-2 bg-white rounded-full"
            />
            <Animated.View
                style={getStyle(ball2)}
                className="w-2 h-2 bg-white rounded-full"
            />
            <Animated.View
                style={getStyle(ball3)}
                className="w-2 h-2 bg-white rounded-full"
            />
        </View>
    );
};

export default BallBeat;
