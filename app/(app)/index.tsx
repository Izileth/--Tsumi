import { CreateProfilePrompt } from '@/app/components/home/CreateProfilePrompt';
import { HomeContent } from '@/app/components/home/HomeContent';
import { KanjiLoader } from '@/components/ui/kanji-loader';
import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
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

  if (isOffline) {
    return null;
  }

  const profileData = profile!;

  return (
    <View className="flex-1 bg-black">

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#ef4444"
            colors={['#ef4444']}
            progressBackgroundColor="#000"
          />
        }
      >
        <HomeContent
          profile={profileData}
          handleLogout={handleLogout}
          loggingOut={loggingOut}
        />
      </ScrollView>
    </View>
  );
}