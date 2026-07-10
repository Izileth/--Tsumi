import { Pressable, Text, View } from 'react-native';
import type { Profile } from '@/app/lib/types';
import { formatDate } from '@/app/utils/formatDate';
import { ProfileSocialLinks } from './ProfileSocialLinks';
import { FontAwesome } from '@expo/vector-icons';

type ProfileInfoProps = {
  profile: Profile;
  isOwner: boolean;
  onClanPress: () => void;
  onEditJapaneseNamePress: () => void;
  onEditClanEmblemPress: () => void;
};

const formatJapaneseName = (name: string | string[] | null | undefined): string => {
  if (Array.isArray(name)) {
    return name.join('');
  }
  if (typeof name === 'string') {
    if (name.startsWith('[') && name.endsWith(']')) {
      try {
        const parsed = JSON.parse(name.replace(/'/g, '"'));
        if (Array.isArray(parsed)) {
          return parsed.join('');
        }
      } catch (error) {
        console.error('Error parsing Japanese name:', error);
      }
    }
    return name;
  }
  return '...';
};

export function ProfileInfo({
  profile,
  isOwner,
  onClanPress,
  onEditJapaneseNamePress,
  onEditClanEmblemPress,
}: ProfileInfoProps) {
  return (
    <View className="px-4 pt-6 pb-4">
      {/* Level Card */}
      <View className="bg-gradient-to-br from-red-950/20 to-zinc-950 border border-red-900/30 rounded-2xl p-5 mb-4">
        <Text className="text-zinc-600 font-bold text-[10px] tracking-widest uppercase mb-2">LEVEL & EXPERIÊNCIA</Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-baseline gap-2">
            <Text className="text-red-500 text-4xl font-black">{profile.level || 1}</Text>
            <Text className="text-red-700 text-xl font-bold">
              {profile.level_name_jp || '無'}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-zinc-400 text-sm font-bold">{profile.level_name || 'Iniciante'}</Text>
            <Text className="text-zinc-500 text-[10px] uppercase tracking-wider mt-0.5">{profile.experience || 0} XP</Text>
          </View>
        </View>
      </View>

      {/* Bio Card */}
      {profile.bio && (
        <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 mb-4">
          <Text className="text-zinc-600 font-bold text-[10px] tracking-widest uppercase mb-2">BIO</Text>
          <Text className="text-zinc-300 leading-5 text-sm">{profile.bio}</Text>
        </View>
      )}

      {/* Username JP Card */}
      <Pressable
        onPress={onEditJapaneseNamePress}
        className="active:opacity-60 mb-4">
        <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 flex-row items-center justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-zinc-600 font-bold text-[10px] tracking-widest uppercase mb-1">名前 (NOME JAPONÊS)</Text>
            <Text className="text-white text-2xl font-black tracking-widest mt-1">
              {formatJapaneseName(profile.username_jp)}
            </Text>
          </View>
          {isOwner && (
            <View className="w-10 h-10 rounded-full bg-zinc-900 items-center justify-center border border-zinc-800">
              <FontAwesome name="pencil" size={14} color="#71717a" />
            </View>
          )}
        </View>
      </Pressable>

      {/* Clan Section */}
      <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 mb-4 flex-row items-center">
        {/* Emblem Edit Button */}
        <Pressable
          onPress={onEditClanEmblemPress}
          disabled={!isOwner || !profile.clan_id}
          className={`w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-800 items-center justify-center mr-4 relative ${(!isOwner || !profile.clan_id) ? '' : 'active:opacity-60'}`}
        >
          <Text className="text-red-500 text-3xl font-black">
            {profile.clan_id ? (profile.clans?.emblem || '氏') : '無'}
          </Text>
          {isOwner && profile.clan_id && (
            <View className="absolute -top-1 -right-1 bg-red-600 w-5 h-5 rounded-full items-center justify-center border border-zinc-950">
              <FontAwesome name="pencil" size={10} color="white" />
            </View>
          )}
        </Pressable>

        {/* Clan Link */}
        <Pressable onPress={onClanPress} className="flex-1 active:opacity-60 justify-center">
          <Text className="text-zinc-600 font-bold text-[10px] tracking-widest uppercase mb-1">CLAN / 氏族</Text>
          <Text className="text-white text-lg font-black tracking-tight" numberOfLines={1}>
            {profile.clans?.name || 'Sem Clan'}
          </Text>
          <View className="flex-row items-center mt-1">
             <Text className="text-zinc-500 text-xs font-bold mr-1">Acessar base</Text>
             <FontAwesome name="chevron-right" size={8} color="#71717a" />
          </View>
        </Pressable>
      </View>

      <ProfileSocialLinks
        profile={profile}
        isOwner={isOwner}
      />

      {/* Member Since Card */}
      <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 mb-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-zinc-600 font-bold text-[10px] tracking-widest uppercase mb-1">MEMBRO DESDE</Text>
            <Text className="text-white text-lg font-black tracking-tight">
              {formatDate(profile?.joined_date || '2025')}
            </Text>
          </View>
          <View className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl items-center justify-center">
            <Text className="text-red-500 text-2xl font-black">龍</Text>
          </View>
        </View>
      </View>

      {/* Decorative Divider */}
      <View className="flex-row items-center justify-center my-6">
        <View className="flex-1 h-px bg-zinc-900" />
        <Text className="text-zinc-700 text-xl mx-4 font-black">龍</Text>
        <View className="flex-1 h-px bg-zinc-900" />
      </View>
    </View>
  );
}
