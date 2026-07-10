import { View, Text, Image, Pressable } from 'react-native';
import { KanjiLoader } from '@/components/ui/kanji-loader';

type DynamicClanMember = {
  id: string;
  username: string;
  avatar_url: string | null;
  rank: string;
  rank_jp: string;
  bio: string | null;
  loyalty: number;
  strength: number;
  intelligence: number;
};

type RecruitTabProps = {
  recruitableMembers: DynamicClanMember[];
  loading: boolean;
  onRecruit: (memberId: string) => void;
};

export function RecruitTab({ recruitableMembers, loading, onRecruit }: RecruitTabProps) {
  if (loading) {
    return <View className="items-center p-8"><KanjiLoader /></View>;
  }

  return (
    <View className="mb-8">
      <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 mb-6">
        <Text className="text-white text-lg font-black mb-1 tracking-tight">
          勧誘 (Recrutamento)
        </Text>
        <Text className="text-zinc-500 text-sm leading-5">
          Recrute novos membros para fortalecer seu clã.
        </Text>
      </View>

      {recruitableMembers.length === 0 ? (
        <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 items-center">
          <Text className="text-4xl mb-3">無</Text>
          <Text className="text-white font-bold mb-1">
            Nenhum recruta disponível
          </Text>
          <Text className="text-zinc-500 text-xs text-center">
            Verifique novamente mais tarde
          </Text>
        </View>
      ) : (
        <View className="space-y-3">
          {recruitableMembers.map((member) => (
            <View
              key={member.id}
              className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 mb-3"
            >
              <View className="flex-row justify-between items-start">
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
                        <Text className="text-zinc-400 text-[10px] font-bold">
                          {member.rank_jp}
                        </Text>
                      </View>
                      <Text className="text-zinc-500 text-xs font-bold">
                        {member.rank}
                      </Text>
                    </View>
                  </View>
                </View>
                
                <Pressable
                  onPress={() => onRecruit(member.id)}
                  className="active:opacity-60"
                >
                  <View className="bg-red-600 border border-red-500 px-4 py-3 rounded-xl mt-1">
                    <Text className="text-white text-[10px] font-black uppercase tracking-widest">RECRUTAR</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
