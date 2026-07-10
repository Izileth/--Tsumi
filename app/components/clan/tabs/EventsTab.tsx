import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { KanjiLoader } from '@/components/ui/kanji-loader';
import { ClanEvent } from '@/app/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type EventsTabProps = {
  events: ClanEvent[];
  loading: boolean;
};

const EventIcon = ({ type }: { type: string }) => {
  const iconMap: { [key: string]: { kanji: string; color: string } } = {
    new_member: { kanji: '新', color: 'text-emerald-500' },
    mission_created: { kanji: '命', color: 'text-emerald-500' },
    mission_completed: { kanji: '了', color: 'text-blue-500' },
    territory_annexed: { kanji: '占', color: 'text-emerald-500' },
    territory_updated: { kanji: '改', color: 'text-orange-500' },
    territory_detached: { kanji: '捨', color: 'text-red-500' },
    default: { kanji: '事', color: 'text-zinc-500' },
  };
  const { kanji, color } = iconMap[type] || iconMap.default;
  return <Text className={`${color} text-lg font-black`}>{kanji}</Text>;
};

const EventTypeLabel = ({ type }: { type: string }) => {
  const labelMap: { [key: string]: { text: string; bgColor: string; textColor: string } } = {
    new_member: { text: 'Novo Membro', bgColor: 'bg-emerald-950/50', textColor: 'text-emerald-500' },
    mission_created: { text: 'Missão Criada', bgColor: 'bg-emerald-950/50', textColor: 'text-emerald-500' },
    mission_completed: { text: 'Completada', bgColor: 'bg-blue-950/50', textColor: 'text-blue-500' },
    territory_annexed: {
      text: 'Território Anexado',
      bgColor: 'bg-emerald-950/50',
      textColor: 'text-emerald-500',
    },
    territory_updated: {
      text: 'Território Alterado',
      bgColor: 'bg-orange-950/50',
      textColor: 'text-orange-500',
    },
    territory_detached: {
      text: 'Território Perdido',
      bgColor: 'bg-red-950/50',
      textColor: 'text-red-500',
    },
    default: { text: 'Evento', bgColor: 'bg-zinc-900', textColor: 'text-zinc-400' },
  };
  const { text, bgColor, textColor } = labelMap[type] || labelMap.default;

  return (
    <View className={`${bgColor} px-2 py-0.5 rounded-full border border-zinc-800/50 self-start`}>
      <Text className={`${textColor} text-[10px] font-bold uppercase tracking-wider`}>{text}</Text>
    </View>
  );
};

const EventCategory = ({ type }: { type: string }) => {
  const categoryMap: { [key: string]: string } = {
    new_member: 'Membros',
    mission_created: 'Missões',
    mission_completed: 'Missões',
    territory_annexed: 'Territórios',
    territory_updated: 'Territórios',
    territory_detached: 'Territórios',
    default: 'Geral',
  };
  return (
    <Text className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">
      {categoryMap[type] || categoryMap.default}
    </Text>
  );
};

export function EventsTab({ events, loading }: EventsTabProps) {
  if (loading) {
    return (
      <View className="items-center p-8">
        <KanjiLoader />
      </View>
    );
  }

  // Group events by date
  const groupedEvents = events.reduce((acc, event) => {
    const date = new Date(event.created_at);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    let dateKey: string;
    if (date.toDateString() === today.toDateString()) {
      dateKey = 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      dateKey = 'Ontem';
    } else {
      dateKey = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
    }
    
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, ClanEvent[]>);

  return (
    <ScrollView className="flex-1 mb-8">
      {/* Header */}
      <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 mb-6">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-white text-lg font-black tracking-tight">
            イベント (Eventos)
          </Text>
          <View className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">
            <Text className="text-zinc-400 text-[10px] font-bold">{events.length} Eventos</Text>
          </View>
        </View>
        <Text className="text-zinc-500 text-sm leading-5">
          Acompanhe acontecimentos recentes e marcos importantes do clã.
        </Text>
      </View>

      {/* Events List */}
      {events.length === 0 ? (
        <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 items-center">
          <Text className="text-4xl mb-3">静</Text>
          <Text className="text-white font-bold mb-1">
            Nenhum evento ainda
          </Text>
          <Text className="text-zinc-500 text-xs text-center">
            Os acontecimentos do clã aparecerão aqui
          </Text>
        </View>
      ) : (
        <View>
          {Object.entries(groupedEvents).map(([dateKey, dateEvents]) => (
            <View key={dateKey} className="mb-6">
              {/* Date Separator */}
              <View className="flex-row items-center mb-4">
                <Text className="text-zinc-600 text-xs font-bold uppercase tracking-widest mr-3">
                  {dateKey}
                </Text>
                <View className="flex-1 h-px bg-zinc-900" />
              </View>

              {/* Events for this date */}
              <View className="space-y-3">
                {dateEvents.map((event) => (
                  <View
                    key={event.id}
                    className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 mb-3"
                  >
                    {/* Event Header */}
                    <View className="flex-row items-center justify-between mb-3">
                      <View className="flex-row items-center flex-1 gap-3">
                        <View className="w-10 h-10 bg-zinc-900 rounded-xl items-center justify-center border border-zinc-800">
                          <EventIcon type={event.event_type} />
                        </View>
                        <View className="flex-1">
                          <EventTypeLabel type={event.event_type} />
                          <EventCategory type={event.event_type} />
                        </View>
                      </View>
                      
                      <Text className="text-zinc-500 text-xs font-bold">
                        {formatDistanceToNow(new Date(event.created_at), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </Text>
                    </View>

                    {/* Event Description */}
                    <Text className="text-zinc-300 text-sm leading-5 mb-3">
                      {event.description}
                    </Text>

                    {/* Event Footer */}
                    <View className="pt-3 border-t border-zinc-900/50">
                      <Text className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                        {new Date(event.created_at).toLocaleString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}