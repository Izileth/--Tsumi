import { View, Text, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { KanjiLoader } from '@/components/ui/kanji-loader';
import { Territory } from '@/app/lib/types';
import { useState } from 'react';

type TerritoriesTabProps = {
  territories: Territory[];
  loading: boolean;
  isOwner: boolean;
  onAdd: () => void;
  onEdit: (territory: Territory) => void;
};

export function TerritoriesTab({ territories, loading, isOwner, onAdd, onEdit }: TerritoriesTabProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (loading) {
    return (
      <View className="items-center p-8">
        <KanjiLoader />
      </View>
    );
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Calcula estatísticas dos territórios
  const stats = {
    total: territories.length,
  };

  return (
    <View className="mb-8 max-w-full">
      {/* Informação contextual */}
      <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 mb-6">
        <Text className="text-white text-lg font-black mb-1 tracking-tight">
          縄張り (Territórios)
        </Text>
        <Text className="text-zinc-500 text-sm leading-5">
          Territórios sob controle do clã geram recursos e prestígio. 
          Expanda estrategicamente para dominar o mapa.
        </Text>
      </View>

      {/* Cards de estatísticas */}
      {territories.length > 0 && (
        <View className="flex-row flex-wrap gap-2 mb-6">
          <View className="flex-1 min-w-[45%] bg-zinc-950 border border-zinc-900 rounded-2xl p-4 items-center">
            <Text className="text-red-600 text-xs font-bold mb-1">地</Text>
            <Text className="text-white text-xl font-black">{stats.total}</Text>
            <Text className="text-zinc-600 text-[10px] uppercase tracking-wider mt-0.5">Controlados</Text>
          </View>
        </View>
      )}

      {/* Lista de territórios */}
      {territories.length === 0 ? (
        <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 items-center mb-4">
          <Text className="text-4xl mb-3">無</Text>
          <Text className="text-white font-bold mb-1">
            Nenhum território conquistado
          </Text>
          <Text className="text-zinc-500 text-xs text-center">
            {isOwner ? 'Use o botão abaixo para expandir' : 'Aguarde o líder expandir o domínio'}
          </Text>
        </View>
      ) : (
        <View className="space-y-3">
          {territories.map((territory) => {
            const isExpanded = expandedId === territory.id;

            return (
              <Pressable
                key={territory.id}
                onPress={() => toggleExpand(territory.id)}
                className="active:opacity-60 mb-3"
              >
                <View className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
                  {/* Header compacto */}
                  <View className="p-4 flex-row items-center justify-between">
                    <View className="flex-1 mr-3">
                      <View className="flex-row items-center">
                        <Text className="text-white text-base font-black tracking-tight">
                          {territory.name}
                        </Text>
                      </View>
                    </View>

                    {/* Ícone de expand */}
                    <View className="w-8 h-8 rounded-full bg-zinc-900 items-center justify-center border border-zinc-800">
                      <FontAwesome 
                        name={isExpanded ? "chevron-up" : "chevron-down"} 
                        size={12} 
                        color="#71717a" 
                      />
                    </View>
                  </View>

                  {/* Conteúdo expandido */}
                  {isExpanded && (
                    <View className="px-4 pb-4 border-t border-zinc-900/50 mt-1 pt-3">
                      <View className="space-y-3">
                        {/* Descrição */}
                        {territory.description && (
                          <View className="mb-3">
                            <Text className="text-zinc-600 text-[10px] font-bold tracking-widest uppercase mb-1">
                              DESCRIÇÃO
                            </Text>
                            <Text className="text-zinc-400 text-xs leading-5">
                              {territory.description}
                            </Text>
                          </View>
                        )}

                        {/* Botão de gerenciar (apenas para owner) */}
                        {isOwner && (
                          <Pressable
                            className="active:opacity-60 mt-1"
                            onPress={() => onEdit(territory)}
                          >
                            <View className="bg-red-600 rounded-xl py-3 items-center flex-row justify-center border border-red-500">
                              <Text className="text-white font-black text-xs uppercase tracking-widest">
                                GERENCIAR TERRITÓRIO
                              </Text>
                            </View>
                          </Pressable>
                        )}
                      </View>
                    </View>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      )}

      {/* Botão de expansão */}
      {isOwner && (
        <Pressable className="active:opacity-60 mt-2" onPress={onAdd}>
          <View className="bg-zinc-950 border border-zinc-900 rounded-2xl py-4 items-center flex-row justify-center">
            <Text className="text-zinc-400 font-black text-xs uppercase tracking-widest">
              + EXPANDIR DOMÍNIO
            </Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}