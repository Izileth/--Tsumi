import { View, Text, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { EnrichedTerritory } from '@/app/hooks/useExploreData';
import { useState } from 'react';

type TerritoriesListProps = {
  territories: EnrichedTerritory[];
  onTerritoryPress?: (territory: EnrichedTerritory) => void;
};

function StatPill({ label, value, kanji, accent = 'zinc' }: { label: string; value: string | number; kanji: string, accent?: 'zinc' | 'red' | 'emerald' }) {
  const kanjiColor = accent === 'red' ? 'text-red-600' : accent === 'emerald' ? 'text-emerald-500' : 'text-zinc-500';
  return (
    <View className="flex-1 min-w-[45%] items-center bg-zinc-950 border border-zinc-900 rounded-2xl py-3 px-2">
      <Text className={`${kanjiColor} text-xs font-bold mb-1`}>{kanji}</Text>
      <Text className="text-white font-black text-xl">{value}</Text>
      <Text className="text-zinc-600 text-[10px] mt-0.5 tracking-wider uppercase">{label}</Text>
    </View>
  );
}

export function TerritoriesList({ territories, onTerritoryPress }: TerritoriesListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Agrupa territórios por distrito
  const territoryGroups = territories.reduce((acc, territory) => {
    const districtName = territory.districts?.name || 'Local Desconhecido';
    if (!acc[districtName]) {
      acc[districtName] = [];
    }
    acc[districtName].push(territory);
    return acc;
  }, {} as Record<string, EnrichedTerritory[]>);

  // Calcula estatísticas
  const stats = {
    total: territories.length,
    controlled: territories.filter(t => t.clans).length,
    neutral: territories.filter(t => !t.clans).length,
    districts: Object.keys(territoryGroups).length
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View className="pb-10">
      {/* Cards de estatísticas */}
      <View className="flex-row flex-wrap gap-3 mb-6">
        <StatPill kanji="地" label="Total" value={stats.total} />
        <StatPill kanji="区" label="Distritos" value={stats.districts} />
        <StatPill kanji="支配" label="Controlados" value={stats.controlled} accent="red" />
        <StatPill kanji="中立" label="Neutros" value={stats.neutral} accent="emerald" />
      </View>

      {/* Lista de territórios agrupados por distrito */}
      <View className="space-y-4">
        {Object.entries(territoryGroups).map(([districtName, districtTerritories]) => (
          <View key={districtName} className="mb-4">
            {/* Header do distrito */}
            <View className="flex-row items-center mb-3">
              <Text className="text-red-600 text-sm font-black mr-2">区</Text>
              <Text className="text-white text-sm font-bold flex-1 tracking-wider uppercase">
                {districtName}
              </Text>
              <Text className="text-zinc-500 text-xs">
                {districtTerritories.length} {districtTerritories.length === 1 ? 'território' : 'territórios'}
              </Text>
            </View>

            {/* Territórios do distrito */}
            <View className="space-y-3 gap-3">
              {districtTerritories.map((territory) => {
                const isExpanded = expandedId === territory.id;
                const isControlled = !!territory.clans;

                return (
                  <Pressable
                    key={territory.id}
                    onPress={() => toggleExpand(territory.id)}
                    className="active:opacity-60"
                  >
                    <View className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
                      {/* Header do território */}
                      <View className="p-4 flex-row items-center justify-between">
                        <View className="flex-1 mr-3">
                          <Text className="text-white text-base font-black tracking-tight mb-1">
                            {territory.name}
                          </Text>
                          
                          {/* Status do controle */}
                          <View className="flex-row items-center gap-2">
                            <View className={`px-2 py-0.5 rounded-full border border-zinc-800 ${
                              isControlled ? 'bg-red-950/30' : 'bg-emerald-950/30'
                            }`}>
                              <Text className={`text-[10px] font-bold uppercase tracking-wider ${
                                isControlled ? 'text-red-500' : 'text-emerald-500'
                              }`}>
                                {isControlled ? territory?.clans?.name : 'Território Neutro'}
                              </Text>
                            </View>
                            {isControlled && territory?.clans?.tag && (
                              <Text className="text-zinc-500 text-xs font-bold">
                                [{territory.clans.tag}]
                              </Text>
                            )}
                          </View>
                        </View>

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
                            {/* Descrição do território */}
                            {territory.description && (
                              <View className="mb-3">
                                <Text className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest mb-1">
                                  DESCRIÇÃO
                                </Text>
                                <Text className="text-zinc-400 text-xs leading-5">
                                  {territory.description}
                                </Text>
                              </View>
                            )}

                            {/* Informações do clã controlador */}
                            {isControlled && territory.clans && (
                              <View className="mb-3 bg-black border border-zinc-900 rounded-xl p-3 flex-row items-center gap-3">
                                <View className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 items-center justify-center">
                                  <Text className="text-red-500 text-xl font-black">
                                    {territory.clans.emblem || '組'}
                                  </Text>
                                </View>
                                <View className="flex-1">
                                  <Text className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-0.5">
                                    Controlado Por
                                  </Text>
                                  <Text className="text-white font-bold">
                                    {territory.clans.name}
                                  </Text>
                                </View>
                              </View>
                            )}

                            {/* Botão de ação (se tiver callback) */}
                            {onTerritoryPress && (
                              <Pressable
                                className="active:opacity-60"
                                onPress={() => onTerritoryPress(territory)}
                              >
                                <View className={`rounded-xl py-3 items-center border ${
                                  isControlled 
                                    ? 'bg-red-600 border-red-500' 
                                    : 'bg-emerald-600 border-emerald-500'
                                }`}>
                                  <Text className="text-white font-black text-xs uppercase tracking-widest">
                                    {isControlled ? 'VER DETALHES' : 'RECLAMAR TERRITÓRIO'}
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
          </View>
        ))}
      </View>

      {territories.length === 0 && (
        <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 items-center">
          <Text className="text-4xl mb-3">無</Text>
          <Text className="text-zinc-500 text-sm mt-1 text-center">
            Nenhum território encontrado
          </Text>
        </View>
      )}
    </View>
  );
}