import { View, Animated, Text } from "react-native";
import { useEffect, useRef } from "react";

const KANJIS = ['無', '道', '心'];

export const KanjiLoader = () => {
  const animatedValues = useRef(
    KANJIS.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = animatedValues.map((animValue, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 220),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 810,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 810,
            useNativeDriver: true,
          }),
        ])
      )
    );

    Animated.parallel(animations).start();
    return () => animations.forEach((a) => a.stop());
  }, [animatedValues]);

  return (
    <View className="items-center py-8 gap-4">
      <View className="flex-row items-center">
        {KANJIS.map((kanji, index) => {
          const opacity = animatedValues[index].interpolate({
            inputRange: [0, 0.45, 1],
            outputRange: [0.12, 0.92, 0.12],
          });

          const scale = animatedValues[index].interpolate({
            inputRange: [0, 0.45, 1],
            outputRange: [0.85, 1.08, 0.85],
          });

          const translateY = animatedValues[index].interpolate({
            inputRange: [0, 0.45, 1],
            outputRange: [4, -2, 4],
          });

          return (
            <View key={index} className="flex-row items-center">
              <Animated.Text
                style={{ opacity, transform: [{ scale }, { translateY }] }}
                className="text-4xl font-bold text-white font-serif"
              >
                {kanji}
              </Animated.Text>

              {index < KANJIS.length - 1 && (
                <View className="w-px h-8 bg-white/20 mx-3.5 rounded-sm" />
              )}
            </View>
          );
        })}
      </View>

      <KanjiProgressBar />

      <Text className="text-[10px] tracking-[3px] uppercase text-white/35 font-medium">
        carregando
      </Text>
    </View>
  );
};

const KanjiProgressBar = () => {
  const translateX = useRef(new Animated.Value(-60)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 180,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.delay(200),
      ])
    ).start();
  }, [translateX]);

  return (
    <View className="w-[120px] h-0.5 bg-white/10 rounded-sm overflow-hidden">
      <Animated.View
        style={{ transform: [{ translateX }] }}
        className="w-12 h-full bg-red-500 rounded-sm"
      />
    </View>
  );
};