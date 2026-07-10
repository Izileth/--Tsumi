import { View, Text, Image } from 'react-native';
import { Clan } from '@/app/lib/types';

type ClansListProps = {
  clans: Clan[];
};

export function ClansList({ clans }: ClansListProps) {
  return (
    <View className="pb-10">
      <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 mb-6">
        <Text className="text-white text-lg font-black mb-1">
          Famílias de Tóquio
        </Text>
        <Text className="text-zinc-500 text-sm leading-5">
          As famílias que disputam o poder. Cada uma com sua própria história,
          força e reputação.
        </Text>
      </View>
      
      <View className="space-y-3 gap-3">
        {clans.map(clan => (
          <View key={clan.id} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 flex-row items-center gap-4">
            {clan.avatar_url ? (
              <Image source={{ uri: clan.avatar_url }} className="w-14 h-14 rounded-xl border border-zinc-800" />
            ) : (
              <View className="w-14 h-14 rounded-xl bg-zinc-900 items-center justify-center border border-zinc-800">
                <Text className="text-red-500 text-2xl font-black">{clan.emblem || '氏'}</Text>
              </View>
            )}
            
            <View className="flex-1">
              <Text className="text-white font-black text-lg tracking-tight mb-0.5">{clan.name}</Text>
              <View className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full self-start mb-2">
                <Text className="text-zinc-400 text-[10px] font-bold">[{clan.tag}]</Text>
              </View>
              
              <View className="flex-row gap-4 mt-1">
                <View className="flex-row items-center gap-1.5">
                  <Text className="text-red-600 text-[10px] font-bold">力</Text>
                  <Text className="text-zinc-400 text-xs font-bold">{clan.power || 0}</Text>
                </View>
                <View className="flex-row items-center gap-1.5">
                  <Text className="text-emerald-500 text-[10px] font-bold">名声</Text>
                  <Text className="text-zinc-400 text-xs font-bold">{clan.reputation || 0}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
