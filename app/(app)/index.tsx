import { CreateProfilePrompt } from '@/app/components/home/CreateProfilePrompt';
import { HomeContent } from '@/app/components/home/HomeContent';
import { HomeHeader } from '@/app/components/home/HomeHeader';
import { PullToRevealSymbol } from '@/app/components/home/PullToRevealSymbol';
import { KanjiLoader } from '@/components/ui/kanji-loader';
import { useCallback, useRef, useState } from 'react';
import { Animated, RefreshControl, Text, View } from 'react-native';
import { useAuth } from '../context/auth-context';
import { useProfile } from '../context/profile-context';
export default function HomeScreen() {
  const { logout, isOffline } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const { profile, loading, error, refetchProfile } = useProfile();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetchProfile();
    } finally {
      setRefreshing(false);
    }
  }, [refetchProfile]);



  const scrollY = useRef(new Animated.Value(0)).current;

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <KanjiLoader />
      </View>
    );
  }

  if (error && !isOffline) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-red-500">Erro ao carregar o perfil.</Text>
      </View>
    );
  }

  if (!profile && !isOffline) {
    return <CreateProfilePrompt />;
  }

  // If we are offline, the RootLayout will handle the redirection, 
  // but we return null to avoid rendering partially loaded content
  if (isOffline) {
    return null;
  }

  const profileData = profile!;

  return (
    <>
      <View className="flex-1 bg-black">
        <PullToRevealSymbol scrollY={scrollY} />

        <Animated.ScrollView
          className="flex-1"
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: true,
          })}
          scrollEventThrottle={16}
          bounces={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#000"
              colors={['#000', '#202020']}
              progressBackgroundColor="#fff"
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <HomeHeader profile={profileData} />
          <HomeContent profile={profileData} handleLogout={handleLogout} loggingOut={loggingOut} />
        </Animated.ScrollView>
      </View>
    </>
  );
}