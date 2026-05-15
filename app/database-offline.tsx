import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

export default function DatabaseOffline() {
  const router = useRouter();

  const handleRetry = () => {
    // Just reload the app to trigger a fresh health check
    router.replace("/");
  };

  return (
    <View className="flex-1 bg-black justify-center items-center p-6">
      <StatusBar style="light" />
      
      <Animated.View 
        entering={FadeIn.duration(800)}
        className="items-center"
      >
        <View className="w-24 h-24 bg-red-950/30 rounded-full justify-center items-center mb-6 border border-red-900/50">
          <Ionicons name="cloud-offline-outline" size={48} color="#dc2626" />
        </View>

        <Animated.View entering={FadeInDown.delay(200).duration(800)}>
          <Text className="text-white text-3xl font-bold tracking-tight text-center mb-2">
            Conexão Perdida
          </Text>
          <Text className="text-neutral-400 text-base text-center mb-8 px-4">
            Não conseguimos nos conectar ao nosso submundo. Por favor, verifique sua conexão com a internet ou tente novamente mais tarde.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(800)} className="w-full">
          <TouchableOpacity
            onPress={handleRetry}
            activeOpacity={0.8}
            className="bg-red-600 h-14 rounded-xl flex-row justify-center items-center shadow-lg shadow-red-900/40"
          >
            <Ionicons name="refresh" size={20} color="white" className="mr-2" />
            <Text className="text-white font-bold text-lg ml-2">Tentar Novamente</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => router.replace("/(app)/(auth)/login")}
            className="mt-4 h-12 justify-center items-center"
          >
            <Text className="text-neutral-500 font-medium">Voltar para o Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      <View className="absolute bottom-10 items-center">
        <Text className="text-neutral-600 text-xs tracking-[0.2em] uppercase">
          Tsumi Infrastructure Status: Error 503
        </Text>
      </View>
    </View>
  );
}
