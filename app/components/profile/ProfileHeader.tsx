import { FontAwesome } from '@expo/vector-icons';
import { Image, Linking, Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { Profile } from '@/app/lib/types';

type ProfileHeaderProps = {
  profile: Profile;
};

const SocialLinks = ({ profile }: ProfileHeaderProps) => (
  <View className="flex-row justify-center items-center gap-5 my-5">
    {profile.website && (
      <Pressable onPress={() => Linking.openURL(profile.website!)} className="w-10 h-10 rounded-full bg-zinc-950/80 border border-zinc-800 items-center justify-center active:opacity-60">
        <FontAwesome name="globe" size={16} color="#d4d4d8" />
      </Pressable>
    )}
    {profile.github && (
      <Pressable onPress={() => Linking.openURL(profile.github!)} className="w-10 h-10 rounded-full bg-zinc-950/80 border border-zinc-800 items-center justify-center active:opacity-60">
        <FontAwesome name="github" size={18} color="#d4d4d8" />
      </Pressable>
    )}
    {profile.twitter && (
      <Pressable onPress={() => Linking.openURL(profile.twitter!)} className="w-10 h-10 rounded-full bg-zinc-950/80 border border-zinc-800 items-center justify-center active:opacity-60">
        <FontAwesome name="twitter" size={16} color="#d4d4d8" />
      </Pressable>
    )}
  </View>
);

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <View className="relative h-96">
      {profile.banner_url ? (
        <Image source={{ uri: profile.banner_url }} className="absolute inset-0 w-full h-full" />
      ) : (
        <View className="absolute inset-0 bg-gradient-to-b from-red-950/40 via-zinc-950 to-zinc-950" />
      )}

      {/* Degradê escurecendo a imagem para combinar com o bg-zinc-950 da tela */}
      <LinearGradient
        colors={['transparent', 'rgba(9,9,11,0.5)', 'rgba(9,9,11,0.9)', '#09090b']}
        locations={[0, 0.4, 0.8, 1]}
        className="absolute inset-0"
      />

      <View className="flex-1 justify-center z-10 items-center px-6 pt-16">
        <View className="w-28 h-28 rounded-3xl items-center justify-center mb-5 border border-zinc-800 bg-zinc-950 shadow-lg shadow-black overflow-hidden">
          {profile.avatar_url ? (
            <Image source={{ uri: profile.avatar_url }} className="w-full h-full" />
          ) : (
            <Text className="text-5xl">🐲</Text>
          )}
        </View>

        <Text className="text-3xl font-black text-white tracking-tight text-center mb-1">
          {profile.slug ? `t/${profile.slug}` : 'N/A'}
        </Text>
        <Text className="text-sm font-bold text-zinc-500 mb-3">{profile.username}</Text>
        
        <View className="bg-red-950/30 border border-red-900/50 px-3 py-1 rounded-full">
          <Text className="text-red-500 text-[10px] font-black uppercase tracking-widest">{profile.rank_jp || '...'} • {profile.rank || '...'}</Text>
        </View>
        
        <SocialLinks profile={profile} />
      </View>

      <View className="absolute bottom-0 inset-0 bg-zinc-950/10 pointer-events-none" />
      <View className="absolute left-0 top-40 w-1 h-32 bg-red-600 rounded-r-full opacity-80" />
      <View className="absolute right-0 top-40 w-1 h-32 bg-red-600 rounded-l-full opacity-80" />
    </View>
  );
}