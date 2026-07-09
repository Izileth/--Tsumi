import { View, Text, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, usePathname } from 'expo-router';
import { useProfile } from '@/app/context/profile-context';
import { useAuth } from '@/app/context/auth-context';

// Routes where this header should appear
const VISIBLE_ROUTES = ['/', '/explore', '/clan', '/feed', '/profile'];

export function HomeHeader() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const { profile } = useProfile();
  const { loading } = useAuth();

  // Only show on main tab screens and after auth is ready
  if (loading || !VISIBLE_ROUTES.includes(pathname) || !profile) return null;

  return (
    <View
      style={{ paddingTop: insets.top + 8 }}
      className="flex-row items-center justify-between px-5 pb-4 bg-black border-b border-zinc-900"
    >
      {/* Logo / App name */}
      <Pressable
        onPress={() => router.replace('/')}
        className="flex-row items-center gap-2 active:opacity-60"
      >
        <View className="w-7 h-7 rounded-full bg-red-600 items-center justify-center">
          <Text className="text-white text-xs font-black">罪</Text>
        </View>
        <Text className="text-white text-base font-bold tracking-wider">tsumi</Text>
      </Pressable>

      {/* Rank badge (center) */}
      <View className="bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 flex-row items-center gap-2">
        <View className="w-1.5 h-1.5 rounded-full bg-red-500" />
        <Text className="text-red-400 text-xs font-bold tracking-widest">
          {profile.rank_jp || '若衆'}
        </Text>
      </View>

      {/* Avatar → navigates to profile */}
      <Pressable
        onPress={() => router.push('/profile' as any)}
        className="relative active:opacity-60"
      >
        {profile.avatar_url ? (
          <Image
            source={{ uri: profile.avatar_url }}
            className="w-9 h-9 rounded-full border-2 border-zinc-800"
          />
        ) : (
          <View className="w-9 h-9 rounded-full bg-zinc-900 border-2 border-zinc-800 items-center justify-center">
            <Text className="text-lg">🐲</Text>
          </View>
        )}
        {/* Level badge */}
        <View className="absolute -bottom-1 -right-1 bg-red-600 rounded-full w-4 h-4 items-center justify-center border border-black">
          <Text className="text-white" style={{ fontSize: 8, fontWeight: '900' }}>
            {profile.level || 1}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
