import { View, Text, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { KanjiLoader } from '@/components/ui/kanji-loader';
import { Mission } from '@/app/lib/types';

type MissionsTabProps = {
  missions: Mission[];
  loading: boolean;
  isOwner: boolean;
  onAdd: () => void;
  onEdit: (mission: Mission) => void;
  onComplete: (missionId: string) => void;
};

// Badge de Nível
const LevelBadge = ({ level }: { level?: string | number }) => {
  if (!level) return null;

  const getLevelConfig = () => {
    const numericLevel = Number(level);
    if (numericLevel >= 10) {
      return { label: `Nível ${numericLevel}`, color: 'text-red-500', bg: 'bg-red-950/50 border-red-900/50', icon: 'exclamation-circle' };
    }
    if (numericLevel >= 5) {
      return { label: `Nível ${numericLevel}`, color: 'text-orange-500', bg: 'bg-orange-950/50 border-orange-900/50', icon: 'circle' };
    }
    if (numericLevel >= 2) {
      return { label: `Nível ${numericLevel}`, color: 'text-yellow-500', bg: 'bg-yellow-950/50 border-yellow-900/50', icon: 'circle' };
    }
    return { label: `Nível ${numericLevel}`, color: 'text-emerald-500', bg: 'bg-emerald-950/50 border-emerald-900/50', icon: 'circle' };
  };

  const config = getLevelConfig();

  return (
    <View className={`${config.bg} border px-2 py-0.5 rounded-full flex-row items-center`}>
      <FontAwesome name={config.icon as any} size={8} color={config.color.replace('text-', '#')} />
      <Text className={`${config.color} text-[10px] font-bold uppercase tracking-wider ml-1.5`}>
        {config.label}
      </Text>
    </View>
  );
};

export function MissionsTab({ missions, loading, isOwner, onAdd, onEdit, onComplete }: MissionsTabProps) {
  if (loading) {
    return (
      <View className="items-center p-8">
        <KanjiLoader />
      </View>
    );
  }

  return (
    <View className="mb-8 max-w-full">
      <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 mb-6">
        <Text className="text-white text-lg font-black mb-1 tracking-tight">
          任務 (Missões)
        </Text>
        <Text className="text-zinc-500 text-sm leading-5">
          Missões fortalecem o controle territorial e geram recursos. Escolha seus
          membros sabiamente baseado na dificuldade da operação.
        </Text>
      </View>

      {missions.length === 0 ? (
        <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 items-center">
          <Text className="text-4xl mb-3">静</Text>
          <Text className="text-white font-bold mb-1">
            Nenhuma missão disponível
          </Text>
          <Text className="text-zinc-500 text-xs text-center">
            Aguarde por novas ordens
          </Text>
        </View>
      ) : (
        <View className="space-y-3">
          {missions.map((mission) => (
            <View
              key={mission.id}
              className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 mb-3"
            >
              {/* Header da missão */}
              <View className="mb-3">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-white text-base font-black tracking-tight flex-1 mr-2">
                    {mission.name}
                  </Text>
                  <LevelBadge level={mission.level} />
                </View>

                {mission.description && (
                  <Text className="text-zinc-400 text-sm leading-5 mb-3">
                    {mission.description}
                  </Text>
                )}
              </View>

              {/* Seção de recompensas */}
              <View className="mb-4 bg-black border border-zinc-900/50 rounded-xl p-3">
                <Text className="text-zinc-600 text-[10px] font-bold tracking-widest uppercase mb-1">
                  RECOMPENSAS
                </Text>
                <View className="flex-row items-center gap-3">
                  <View className="flex-row items-center gap-1.5">
                    <Text className="text-yellow-500 text-[10px] font-bold uppercase">Moedas</Text>
                    <Text className="text-white text-xs font-bold">{mission.reward.money}</Text>
                  </View>
                  <View className="w-px h-3 bg-zinc-800" />
                  <View className="flex-row items-center gap-1.5">
                    <Text className="text-emerald-500 text-[10px] font-bold uppercase">Reputação</Text>
                    <Text className="text-white text-xs font-bold">{mission.reward.reputation}</Text>
                  </View>
                </View>
              </View>

              {/* Botão de completar missão */}
              <Pressable className="active:opacity-60 mb-2" onPress={() => onComplete(mission.id)}>
                <View className="bg-emerald-600 rounded-xl py-3 items-center flex-row justify-center border border-emerald-500">
                  <Text className="text-white font-black text-xs uppercase tracking-widest">
                    COMPLETAR MISSÃO
                  </Text>
                </View>
              </Pressable>

              {/* Botão de gerenciamento */}
              {isOwner && (
                <Pressable className="active:opacity-60" onPress={() => onEdit(mission)}>
                  <View className="bg-zinc-900 rounded-xl py-3 items-center flex-row justify-center border border-zinc-800">
                    <Text className="text-white font-black text-xs uppercase tracking-widest">
                      GERENCIAR MISSÃO
                    </Text>
                  </View>
                </Pressable>
              )}
            </View>
          ))}
        </View>
      )}

      {isOwner && (
        <Pressable className="active:opacity-60 mt-2" onPress={onAdd}>
          <View className="bg-zinc-950 border border-zinc-900 rounded-2xl py-4 items-center flex-row justify-center">
            <Text className="text-red-500 font-black text-xs uppercase tracking-widest">
              + CRIAR NOVA MISSÃO
            </Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}
