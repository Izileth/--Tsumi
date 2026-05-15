import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeIn,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
import Svg, { Defs, Pattern, Path, Rect, Circle } from "react-native-svg";

const GridBackground = () => (
  <View className="absolute inset-0 opacity-[0.07]">
    <Svg width="100%" height="100%">
      <Defs>
        <Pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <Path d="M 20 0 L 0 0 0 20" fill="none" stroke="#dc2626" strokeWidth={0.4} />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#grid)" />
      <Circle cx="50%" cy="50%" r="200" fill="none" stroke="#dc2626" strokeWidth={0.5} opacity={0.3} />
      <Circle cx="50%" cy="50%" r="140" fill="none" stroke="#dc2626" strokeWidth={0.3} opacity={0.2} />
    </Svg>
  </View>
);

const RuneRing = () => {
  const outerRotation = useSharedValue(0);
  const innerRotation = useSharedValue(0);

  useEffect(() => {
    outerRotation.value = withRepeat(
      withTiming(360, { duration: 12000, easing: Easing.linear }),
      -1
    );
    innerRotation.value = withRepeat(
      withTiming(-360, { duration: 8000, easing: Easing.linear }),
      -1
    );
  }, []);

  const outerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${outerRotation.value}deg` }],
  }));
  const innerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${innerRotation.value}deg` }],
  }));

  return (
    <Animated.View
      style={outerStyle}
      className="w-24 h-24 rounded-full border border-red-950 items-center justify-center"
    >
      <View className="absolute -top-1 w-1.5 h-1.5 bg-red-600 rounded-full self-center" />
      <View className="absolute -bottom-1 w-1.5 h-1.5 bg-red-600 rounded-full self-center" />
      <Animated.View
        style={innerStyle}
        className="w-[72px] h-[72px] rounded-full border border-red-900 items-center justify-center"
      >
        <Text className="text-red-600 text-3xl">⛒</Text>
      </Animated.View>
    </Animated.View>
  );
};

const KanjiAccent = () => {
  const opacity = useSharedValue(0.12);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.25, { duration: 2400 }),
        withTiming(0.08, { duration: 2400 })
      ),
      -1
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View style={animStyle} className="flex-row gap-3 mb-5">
      {['断', '絶', '無'].map((k) => (
        <Text key={k} className="font-serif text-xs text-red-600">{k}</Text>
      ))}
    </Animated.View>
  );
};

const ErrorCode = () => {
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1200 }),
        withTiming(0.4, { duration: 1200 })
      ),
      -1
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.Text
      style={animStyle}
      className="font-mono text-[9px] text-red-950 tracking-[0.18em] mb-5"
    >
      INFRA ERROR · 503 · TSUMI
    </Animated.Text>
  );
};

export default function DatabaseOffline() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#080808] justify-center items-center px-7">
      <StatusBar style="light" />
      <GridBackground />

      <Animated.View
        entering={FadeIn.duration(1000)}
        className="w-full items-center"
      >
        <RuneRing />

        <View className="h-5" />

        <KanjiAccent />
        <ErrorCode />

        <Animated.View
          entering={FadeInDown.delay(200).duration(800)}
          className="items-center mb-8"
        >
          <Text className="font-serif text-white text-[26px] font-bold tracking-tight text-center leading-tight mb-2">
            Conexão{"\n"}Interrompida
          </Text>
          <Text className="text-neutral-600 text-[11px] text-center leading-relaxed px-2">
            O submundo está temporariamente inacessível.{"\n"}
            Verifique sua conexão ou aguarde.
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(350).duration(800)}
          className="w-full items-center"
        >
          <View className="flex-row items-center w-full mb-5">
            <View className="flex-1 h-px bg-neutral-900" />
            <View className="w-1.5 h-1.5 rounded-full bg-red-700 opacity-60 mx-2.5" />
            <View className="flex-1 h-px bg-neutral-900" />
          </View>

          <TouchableOpacity
            onPress={() => router.replace("/")}
            activeOpacity={0.75}
            className="w-full h-12 bg-red-600 rounded-xl flex-row items-center justify-center gap-2 mb-2.5"
          >
            <Text className="text-white text-[13px] font-bold tracking-wide">
              Tentar Novamente
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace("/(app)/(auth)/login")}
            activeOpacity={0.6}
            className="h-10 justify-center items-center"
          >
            <Text className="text-neutral-700 text-[11px]">← Voltar para o Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      <View className="absolute bottom-8 items-center">
        <Text className="font-mono text-[8px] text-neutral-800 tracking-[0.2em] uppercase">
          Tsumi Infrastructure Status: Error 503
        </Text>
      </View>
    </View>
  );
}