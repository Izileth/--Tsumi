import { View, Text, Image } from 'react-native';
import { KanjiLoader } from '@/components/ui/kanji-loader';
import { Link } from 'expo-router';

type DynamicClanMember = {
  id: string;
  username: string;
  slug: string;
  avatar_url: string | null;
  rank: string;
  rank_jp: string;
  bio: string | null;
  loyalty: number;
  strength: number;
  intelligence: number;
};

type MembersTabProps = {
  members: DynamicClanMember[];
  loading: boolean;
};

export function MembersTab({ members, loading }: MembersTabProps) {
  if (loading) {
    return <View className="items-center p-8"><KanjiLoader /></View>;
  }

  return (
    <View className="mb-8">
      <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 mb-6">
        <Text className="text-white text-lg font-black mb-1 tracking-tight">
          構成員 (Membros)
        </Text>
        <Text className="text-zinc-500 text-sm leading-5">
          Efetivo atual do clã. Suas habilidades e lealdade determinam a força da família.
        </Text>
      </View>

      <View className="space-y-3">
        {members.map((member) => (
          <Link key={member.id} href={`/${member.slug}`} asChild>
            <View
              className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 mb-3 active:opacity-60"
            >
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row items-center gap-3 flex-1">
                  {member.avatar_url ? (
                    <View className="w-14 h-14 rounded-xl overflow-hidden border border-zinc-800">
                      <Image source={{ uri: member.avatar_url }} className="w-14 h-14" />
                    </View>
                  ) : (
                    <View className="w-14 h-14 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800">
                      <Text className="text-zinc-600 text-2xl font-black">{member.username.charAt(0).toUpperCase()}</Text>
                    </View>
                  )}
                  <View className="flex-1">
                    <Text className="text-white text-lg font-black tracking-tight mb-0.5">
                      {member.username}
                    </Text>
                    <View className="flex-row items-center gap-2">
                      <View className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">
                        <Text className="text-red-500 text-[10px] font-bold">
                          {member.rank_jp}
                        </Text>
                      </View>
                      <Text className="text-zinc-500 text-xs font-bold">
                        {member.rank}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className={`px-2 py-0.5 rounded-full border border-emerald-900 bg-emerald-950/30`}>
                  <Text className={`text-[10px] font-bold uppercase tracking-wider text-emerald-500`}>
                    ATIVO
                  </Text>
                </View>
              </View>

              <View className="mb-4 bg-black border border-zinc-900/50 rounded-xl p-3">
                <Text className="text-zinc-600 text-[10px] font-bold tracking-widest uppercase mb-1">
                  ESPECIALIDADE
                </Text>
                <Text className="text-zinc-400 text-xs leading-4">
                  {member.bio || "Desconhecida"}
                </Text>
              </View>

              <View className="gap-3">
                <View>
                  <View className="flex-row justify-between items-center mb-1.5">
                    <Text className="text-red-600 text-[10px] font-bold uppercase tracking-widest">Lealdade</Text>
                    <Text className="text-white text-xs font-black">{member.loyalty}%</Text>
                  </View>
                  <View className="bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                    <View className="bg-red-600 h-full rounded-full" style={{ width: `${Math.min(100, member.loyalty)}%` }} />
                  </View>
                </View>

                <View className="flex-row gap-4">
                  <View className="flex-1">
                    <View className="flex-row justify-between items-center mb-1.5">
                      <Text className="text-orange-500 text-[10px] font-bold uppercase tracking-widest">Força</Text>
                      <Text className="text-white text-xs font-black">{member.strength}</Text>
                    </View>
                    <View className="bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                      <View className="bg-orange-500 h-full rounded-full" style={{ width: `${Math.min(100, member.strength)}%` }} />
                    </View>
                  </View>

                  <View className="flex-1">
                    <View className="flex-row justify-between items-center mb-1.5">
                      <Text className="text-blue-500 text-[10px] font-bold uppercase tracking-widest">Intel.</Text>
                      <Text className="text-white text-xs font-black">{member.intelligence}</Text>
                    </View>
                    <View className="bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                      <View className="bg-blue-500 h-full rounded-full" style={{ width: `${Math.min(100, member.intelligence)}%` }} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Link>
        ))}
      </View>
    </View>
  );
}
