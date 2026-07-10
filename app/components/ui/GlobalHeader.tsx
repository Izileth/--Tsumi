import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, usePathname } from 'expo-router';
import { useProfile } from '@/app/context/profile-context';
import { useAuth } from '@/app/context/auth-context';
import { Feather } from '@expo/vector-icons';

// Routes where this global header should appear
const VISIBLE_ROUTES = ['/', '/explore', '/clan', '/feed', '/profile'];

export default function GlobalHeader() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const { profile } = useProfile();
  const { loading } = useAuth();

  // Only show on main tab screens and after auth is ready
  if (loading || !VISIBLE_ROUTES.includes(pathname) || !profile) return null;

  return (
    <View
      style={{ paddingTop: Math.max(insets.top, 16) }}
      className="flex-row items-center justify-between px-5 pb-3 bg-black border-b border-zinc-900/80"
    >
      {/* Left: Avatar & Level (like Twitter/X / Bybit) */}
      <View className="flex-1 items-start">
        <Pressable
          onPress={() => router.push('/(app)/(screens)/profile')}
          className="relative active:opacity-70"
        >
          {profile.avatar_url ? (
            <Image
              source={{ uri: profile.avatar_url }}
              className="w-10 h-10 rounded-full border-[1.5px] border-zinc-800"
            />
          ) : (
            <View className="w-10 h-10 rounded-full bg-zinc-900 border-[1.5px] border-zinc-800 items-center justify-center">
              <Text className="text-lg">🐲</Text>
            </View>
          )}
          {/* Level badge */}
          <View className="absolute -bottom-1 -right-1 bg-red-600 rounded-full min-w-[16px] h-4 items-center justify-center border border-neutral-950 px-1">
            <Text className="text-white" style={{ fontSize: 9, fontWeight: '900' }}>
              {profile.level || 1}
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Center: App Logo (like Instagram / X) */}
      <View className="flex-1 items-center">
        <Pressable
          onPress={() => router.replace('/')}
          className="flex-row items-center justify-center gap-1.5 active:opacity-70"
        >
          <View className="w-8 h-8 rounded-lg bg-red-600 items-center justify-center transform rotate-3 shadow-sm shadow-red-600/50">
            <Text className="text-white text-sm font-black">罪</Text>
          </View>
          <Text className="text-white text-lg font-black tracking-widest uppercase mt-1">
            tsumi
          </Text>
        </Pressable>
      </View>

      {/* Right: Rank Pill & Actions (like Bybit) */}
      <View className="flex-1 flex-row items-center justify-end gap-3">
        <View className="bg-zinc-900 border border-zinc-800/80 rounded-full px-2.5 py-1 flex-row items-center gap-1.5">
          <View className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-sm shadow-red-500" />
          <Text className="text-red-400 text-[10px] font-bold tracking-widest uppercase">
            {profile.rank_jp || '若衆'}
          </Text>
        </View>

        <Pressable className="active:opacity-70 relative p-1">
          <Feather name="bell" size={22} color="#f4f4f5" />
          {/* Unread indicator dot */}
          <View className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-neutral-950" />
        </Pressable>
      </View>
    </View>
  );
}