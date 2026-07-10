import { View, Text, ScrollView } from 'react-native';
import { Clan, GameEvent, Territory } from '@/app/lib/types';
import { FontAwesome } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type DashboardProps = {
  events: GameEvent[];
  clans: Clan[];
  territories: Territory[];
};

const EventIcon = ({ type }: { type: string }) => {
  const iconMap: { [key: string]: { kanji: string; color: string } } = {
    TERRITORY_CONQUERED: { kanji: '覇', color: 'text-red-600' },
    TERRITORY_CLAIMED: { kanji: '占', color: 'text-emerald-500' },
    TERRITORY_ABANDONED: { kanji: '捨', color: 'text-zinc-500' },
    TERRITORY_CREATED: { kanji: '創', color: 'text-blue-500' },
    default: { kanji: '事', color: 'text-zinc-500' },
  };
  const { kanji, color } = iconMap[type] || iconMap.default;
  return <Text className={`${color} text-lg font-black`}>{kanji}</Text>;
};

const EventTypeLabel = ({ type }: { type: string }) => {
  const labelMap: { [key: string]: { text: string; bgColor: string; textColor: string } } = {
    TERRITORY_CONQUERED: { text: 'Conquistado', bgColor: 'bg-red-950/50', textColor: 'text-red-500' },
    TERRITORY_CLAIMED: { text: 'Reivindicado', bgColor: 'bg-emerald-950/50', textColor: 'text-emerald-500' },
    TERRITORY_ABANDONED: { text: 'Abandonado', bgColor: 'bg-zinc-900', textColor: 'text-zinc-400' },
    TERRITORY_CREATED: { text: 'Criado', bgColor: 'bg-blue-950/50', textColor: 'text-blue-500' },
    default: { text: 'Evento', bgColor: 'bg-zinc-900', textColor: 'text-zinc-400' },
  };
  const { text, bgColor, textColor } = labelMap[type] || labelMap.default;
  
  return (
    <View className={`${bgColor} px-2 py-0.5 rounded-full border border-zinc-800/50`}>
      <Text className={`${textColor} text-[10px] font-bold uppercase tracking-wider`}>
        {text}
      </Text>
    </View>
  );
};

function StatPill({ label, value, kanji, accent = 'zinc' }: { label: string; value: string | number; kanji: string, accent?: 'zinc' | 'red' | 'emerald' }) {
  const kanjiColor = accent === 'red' ? 'text-red-600' : accent === 'emerald' ? 'text-emerald-500' : 'text-zinc-500';
  return (
    <View className="flex-1 items-center bg-zinc-950 border border-zinc-900 rounded-2xl py-3 px-2">
      <Text className={`${kanjiColor} text-xs font-bold mb-1`}>{kanji}</Text>
      <Text className="text-white font-black text-xl">{value}</Text>
      <Text className="text-zinc-600 text-[10px] mt-0.5 tracking-wider uppercase">{label}</Text>
    </View>
  );
}

export function Dashboard({ events, clans, territories }: DashboardProps) {
  const totalClans = clans.length;
  const totalTerritories = territories.length;
  const controlledTerritories = territories.filter(t => t.clan_id).length;
  const neutralTerritories = totalTerritories - controlledTerritories;
  const controlPercentage = totalTerritories > 0 
    ? Math.round((controlledTerritories / totalTerritories) * 100) 
    : 0;

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="w-full max-w-full pb-10">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-white text-2xl font-black mb-1 tracking-tight">
            Dashboard
          </Text>
          <Text className="text-zinc-500 text-sm">
            Acompanhe a situação em tempo real
          </Text>
        </View>

        {/* Stats Grid */}
        <View className="mb-6">
          <Text className="text-zinc-600 text-xs font-bold mb-3 uppercase tracking-widest">
            Estatísticas Gerais
          </Text>
          
          <View className="flex-row gap-3 mb-3">
            <StatPill kanji="組" label="Clãs Ativos" value={totalClans} accent="red" />
            <StatPill kanji="地" label="Territórios" value={totalTerritories} />
          </View>
          
          <View className="flex-row gap-3">
            <StatPill kanji="支配" label="Controlados" value={controlledTerritories} accent="emerald" />
            <StatPill kanji="中立" label="Neutros" value={neutralTerritories} />
          </View>
        </View>

        {/* Control Progress Card */}
        <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <View>
              <Text className="text-zinc-500 text-[10px] tracking-widest uppercase">Controle de Tóquio</Text>
              <Text className="text-white text-lg font-black mt-0.5">
                {controlPercentage}%
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-emerald-500 text-xs font-bold">{controlledTerritories} Ocupados</Text>
              <Text className="text-zinc-500 text-xs mt-0.5">{totalTerritories} Total</Text>
            </View>
          </View>
          {/* Progress bar */}
          <View className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
            <View
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${controlPercentage}%` }}
            />
          </View>
        </View>

        {/* Event Feed */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-zinc-600 text-xs font-bold uppercase tracking-widest">
              Últimos Acontecimentos
            </Text>
            <View className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">
              <Text className="text-zinc-400 text-[10px] font-bold">{events.length} Eventos</Text>
            </View>
          </View>
          
          {events.length > 0 ? (
            events.map((event, index) => (
              <View 
                key={event.id} 
                className={`bg-zinc-950 border border-zinc-900 rounded-2xl p-4 ${
                  index !== events.length - 1 ? 'mb-3' : ''
                }`}
              >
                {/* Event Header */}
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center flex-1 gap-3">
                    <View className="w-8 h-8 bg-zinc-900 rounded-xl items-center justify-center border border-zinc-800">
                      <EventIcon type={event.event_type} />
                    </View>
                    <EventTypeLabel type={event.event_type} />
                  </View>
                  <Text className="text-zinc-500 text-xs">
                    {formatDistanceToNow(new Date(event.created_at), { 
                      addSuffix: true, 
                      locale: ptBR 
                    })}
                  </Text>
                </View>

                {/* Event Description */}
                <Text className="text-zinc-300 text-sm leading-5">
                  {event.description}
                </Text>

                {/* Event Footer Line */}
                <View className="mt-3 pt-3 border-t border-zinc-900/50">
                  <View className="flex-row items-center">
                    <Text className="text-zinc-600 text-[10px] uppercase tracking-wider">
                      {new Date(event.created_at).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 items-center">
              <Text className="text-4xl mb-3">静</Text>
              <Text className="text-white font-bold mb-1">
                Nenhum evento recente
              </Text>
              <Text className="text-zinc-500 text-xs text-center">
                Os acontecimentos aparecerão aqui conforme ocorrem
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}