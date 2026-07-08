import { Animated, Easing, Text, View } from "react-native";
import { useEffect, useRef } from "react";

interface ButtonLoaderProps {
  text?: string;
}

export const ButtonLoader = ({ text = "Processando..." }: ButtonLoaderProps) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    // Rotation animation
    const rotateAnim = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // Pulse animation for the central Kanji
    const pulseAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );

    rotateAnim.start();
    pulseAnim.start();

    return () => {
      rotateAnim.stop();
      pulseAnim.stop();
    };
  }, [rotation, pulse]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="flex-row items-center justify-center h-full">
      <View className="items-center justify-center w-8 h-8 mr-2">
        {/* Spinning Outer Red Ring */}
        <Animated.View
          style={{
            transform: [{ rotate: rotateInterpolate }],
            borderColor: "rgba(220, 38, 38, 0.15)",
            borderWidth: 2,
            borderTopColor: "#dc2626", // Red 600
            borderRadius: 9999,
            width: 22,
            height: 22,
            position: "absolute",
          }}
        />
        {/* Pulsing Central Kanji '罪' */}
        <Animated.Text
          style={{ opacity: pulse }}
          className="text-[11px] font-bold text-red-500 font-serif"
        >
          罪
        </Animated.Text>
      </View>
      <Text className="text-white text-sm font-bold tracking-widest uppercase">
        {text}
      </Text>
    </View>
  );
};
