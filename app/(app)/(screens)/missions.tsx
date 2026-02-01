import { View, Text, Pressable, ScrollView} from "react-native";
import { useState, useCallback } from "react";
import { ScreenWrapper } from "@/components/ui/ScreenWrapper";

export default function MissionsScreen() {
  const [selectedTab, setSelectedTab] = useState("available");

  const handleRefresh = useCallback(async () => {
    // Data is static, so we just simulate a refresh for UI consistency
    return Promise.resolve();
  }, []);

  const missions = [
    {
      id: 1,
      title: "Coletar Tributo em Shibuya",
      titleJP: "渋谷の上納金",
      description: "Visite os estabelecimentos protegidos e colete os tributos mensais. Seja educado, mas firme.",
      location: "Shibuya",
      type: "collection",
      difficulty: "easy",
      reward: {
        money: 8000,
        xp: 150,
        loyalty: 5
      },
      duration: "2h",
      status: "available",
      requirements: "Nenhum",
      successRate: 95
    },
    {
      id: 2,
      title: "Interceptar Carregamento Rival",
      titleJP: "敵の荷物妨害",
      description: "Um clã rival está movendo armas pelo porto. Intercepte o carregamento sem causar mortes desnecessárias.",
      location: "Porto de Tóquio",
      type: "combat",
      difficulty: "hard",
      reward: {
        money: 25000,
        xp: 500,
        loyalty: 15,
        item: "Informações Valiosas"
      },
      duration: "6h",
      status: "available",
      requirements: "Força 75+ • 3 Membros",
      successRate: 60
    },
    {
      id: 3,
      title: "Negociar com Políticos",
      titleJP: "政治家との交渉",
      description: "Reúna-se com autoridades locais para garantir proteção às nossas operações. Use persuasão, não violência.",
      location: "Roppongi",
      type: "diplomatic",
      difficulty: "medium",
      reward: {
        money: 15000,
        xp: 300,
        loyalty: 10,
        reputation: 200
      },
      duration: "4h",
      status: "available",
      requirements: "Carisma 70+",
      successRate: 75
    },
    {
      id: 4,
      title: "Expandir Território em Akihabara",
      titleJP: "秋葉原の縄張り拡大",
      description: "Estabeleça presença em novos blocos. Demonstre força mas evite confronto direto se possível.",
      location: "Akihabara",
      type: "territory",
      difficulty: "medium",
      reward: {
        money: 18000,
        xp: 400,
        loyalty: 12,
        territory: "Novo distrito"
      },
      duration: "5h",
      status: "available",
      requirements: "Reputação 5000+",
      successRate: 70
    },
    {
      id: 5,
      title: "Proteger Estabelecimento VIP",
      titleJP: "VIP施設警護",
      description: "Um empresário importante solicitou proteção durante evento. Mantenha vigilância total.",
      location: "Ginza",
      type: "protection",
      difficulty: "easy",
      reward: {
        money: 12000,
        xp: 250,
        loyalty: 8
      },
      duration: "3h",
      status: "in_progress",
      requirements: "Percepção 60+",
      successRate: 85,
      timeRemaining: "1h 23min"
    },
    {
      id: 6,
      title: "Investigar Traidor Interno",
      titleJP: "内部裏切り者調査",
      description: "Há rumores de um traidor na organização. Investigue discretamente e reporte suas descobertas.",
      location: "Shinjuku",
      type: "investigation",
      difficulty: "hard",
      reward: {
        money: 20000,
        xp: 600,
        loyalty: 20,
        reputation: 300
      },
      duration: "8h",
      status: "available",
      requirements: "Inteligência 80+ • Furtividade 70+",
      successRate: 55
    },
    {
      id: 7,
      title: "Resgatar Membro Capturado",
      titleJP: "捕獲された仲間救出",
      description: "Um irmão foi capturado por um clã rival. Organize uma operação de resgate rápida e silenciosa.",
      location: "Ikebukuro",
      type: "rescue",
      difficulty: "hard",
      reward: {
        money: 30000,
        xp: 700,
        loyalty: 25,
        item: "Gratidão Eterna"
      },
      duration: "7h",
      status: "completed",
      requirements: "Combate 85+ • 5 Membros",
      successRate: 50,
      completedDate: "2 dias atrás"
    },
    {
      id: 8,
      title: "Entregar Mensagem Secreta",
      titleJP: "秘密メッセージ配達",
      description: "Entregue documentos confidenciais para um aliado em local seguro. Não seja seguido.",
      location: "Ueno",
      type: "delivery",
      difficulty: "easy",
      reward: {
        money: 6000,
        xp: 100,
        loyalty: 4
      },
      duration: "1h",
      status: "completed",
      requirements: "Nenhum",
      successRate: 90,
      completedDate: "1 dia atrás"
    }
  ];

  const getDifficultyStyle = (difficulty: string) => {
    switch(difficulty) {
      case "hard": return { 
        bg: "bg-red-950/20 border-red-900/50", 
        text: "text-red-500", 
        badge: "bg-red-950/30",
        label: "DIFÍCIL"
      };
      case "medium": return { 
        bg: "bg-yellow-950/20 border-yellow-900/50", 
        text: "text-yellow-500", 
        badge: "bg-yellow-950/30",
        label: "MÉDIO"
      };
      default: return { 
        bg: "bg-green-950/20 border-green-900/50", 
        text: "text-green-500", 
        badge: "bg-green-950/30",
        label: "FÁCIL"
      };
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "combat": return "⚔️";
      case "collection": return "💰";
      case "diplomatic": return "🤝";
      case "territory": return "🗺️";
      case "protection": return "🛡️";
      case "investigation": return "🔍";
      case "rescue": return "🚨";
      case "delivery": return "📦";
      default: return "⚡";
    }
  };

  const availableMissions = missions.filter(m => m.status === "available");
  const inProgressMissions = missions.filter(m => m.status === "in_progress");
  const completedMissions = missions.filter(m => m.status === "completed");

  const currentMissions = selectedTab === "available" ? availableMissions 
    : selectedTab === "in_progress" ? inProgressMissions 
    : completedMissions;

  return (
    <ScreenWrapper onRefresh={handleRefresh}>
      {/* HEADER */}
      <View className="relative h-56 overflow-hidden bg-gradient-to-b from-red-950 via-red-900 to-black">
        <View className="absolute inset-0 opacity-5">
          <Text className="text-white text-9xl text-center mt-16">任</Text>
        </View>

        <View className="flex-1 justify-center items-center px-6 pt-14">
          <Text className="text-4xl font-black text-white tracking-wider text-center mb-2">
            任務一覧
          </Text>
          <Text className="text-xl font-bold text-red-500 tracking-widest mb-3">
            NINMU ICHIRAN
          </Text>
          <View className="h-px w-28 bg-red-600 mb-2" />
          <Text className="text-neutral-400 text-xs tracking-[0.3em] uppercase">
            Mission Board
          </Text>
        </View>

        <View className="absolute left-0 top-32 w-1 h-20 bg-red-600" />
        <View className="absolute right-0 top-32 w-1 h-20 bg-red-600" />
      </View>

      {/* CONTEÚDO */}
      <View className="px-6 pt-6">
        
        {/* Stats Rápidas */}
        <View className="flex-row gap-3 mb-6">
          <View className="flex-1 bg-zinc-950 border border-neutral-800 rounded-lg p-4">
            <Text className="text-neutral-500 text-xs uppercase tracking-wider mb-1">
              Disponíveis
            </Text>
            <Text className="text-white text-2xl font-bold">{availableMissions.length}</Text>
          </View>

          <View className="flex-1 bg-zinc-950 border border-yellow-800 rounded-lg p-4">
            <Text className="text-neutral-500 text-xs uppercase tracking-wider mb-1">
              Em Andamento
            </Text>
            <Text className="text-yellow-500 text-2xl font-bold">{inProgressMissions.length}</Text>
          </View>

          <View className="flex-1 bg-zinc-950 border border-green-800 rounded-lg p-4">
            <Text className="text-neutral-500 text-xs uppercase tracking-wider mb-1">
              Concluídas
            </Text>
            <Text className="text-green-500 text-2xl font-bold">{completedMissions.length}</Text>
          </View>
        </View>

        {/* Aviso */}
        <View className="bg-red-950/20 border-l-4 border-red-600 p-4 rounded-r-lg mb-6">
          <Text className="text-red-400 text-xs font-bold mb-1">📜 CÓDIGO DE HONRA</Text>
          <Text className="text-neutral-400 text-xs leading-5">
            Cada missão reflete a honra da família. Complete com excelência para 
            aumentar sua lealdade e reputação no submundo.
          </Text>
        </View>

        {/* Tabs */}
        <View className="mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setSelectedTab("available")}
                className="active:opacity-70"
              >
                <View className={`px-5 py-3 rounded-lg border ${
                  selectedTab === "available" 
                    ? 'bg-red-600 border-red-500' 
                    : 'bg-zinc-950 border-neutral-800'
                }`}>
                  <Text className={`text-sm font-semibold ${
                    selectedTab === "available" ? 'text-white' : 'text-neutral-400'
                  }`}>
                    🎯 Disponíveis ({availableMissions.length})
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => setSelectedTab("in_progress")}
                className="active:opacity-70"
              >
                <View className={`px-5 py-3 rounded-lg border ${
                  selectedTab === "in_progress" 
                    ? 'bg-red-600 border-red-500' 
                    : 'bg-zinc-950 border-neutral-800'
                }`}>
                  <Text className={`text-sm font-semibold ${
                    selectedTab === "in_progress" ? 'text-white' : 'text-neutral-400'
                  }`}>
                    ⏳ Em Andamento ({inProgressMissions.length})
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => setSelectedTab("completed")}
                className="active:opacity-70"
              >
                <View className={`px-5 py-3 rounded-lg border ${
                  selectedTab === "completed" 
                    ? 'bg-red-600 border-red-500' 
                    : 'bg-zinc-950 border-neutral-800'
                }`}>
                  <Text className={`text-sm font-semibold ${
                    selectedTab === "completed" ? 'text-white' : 'text-neutral-400'
                  }`}>
                    ✅ Concluídas ({completedMissions.length})
                  </Text>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </View>

        {/* Lista de Missões */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <Text className="text-red-500 text-base font-bold">
              {selectedTab === "available" ? "利用可能" : 
               selectedTab === "in_progress" ? "進行中" : "完了"}
            </Text>
            <View className="flex-1 h-px bg-neutral-800 ml-3" />
          </View>

          {currentMissions.length === 0 ? (
            <View className="bg-zinc-950 border border-neutral-800 rounded-lg p-8 items-center">
              <Text className="text-5xl mb-3">
                {selectedTab === "available" ? "📭" : 
                 selectedTab === "in_progress" ? "⏸️" : "🎉"}
              </Text>
              <Text className="text-neutral-400 text-sm text-center">
                {selectedTab === "available" ? "Nenhuma missão disponível no momento" : 
                 selectedTab === "in_progress" ? "Nenhuma missão em andamento" : 
                 "Nenhuma missão concluída ainda"}
              </Text>
            </View>
          ) : (
            currentMissions.map((mission) => {
              const diffStyle = getDifficultyStyle(mission.difficulty);
              
              return (
                <View
                  key={mission.id}
                  className={`mb-4 rounded-lg border p-4 ${diffStyle.bg}`}
                >
                  {/* Header */}
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-row items-start gap-3 flex-1">
                      <Text className="text-3xl">{getTypeIcon(mission.type)}</Text>
                      <View className="flex-1">
                        <Text className="text-white text-base font-bold mb-0.5">
                          {mission.title}
                        </Text>
                        <Text className="text-neutral-500 text-xs mb-2">
                          {mission.titleJP}
                        </Text>
                        <Text className="text-neutral-400 text-xs">
                          📍 {mission.location}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Badges */}
                  <View className="flex-row items-center gap-2 mb-3">
                    <View className={`${diffStyle.badge} px-2 py-1 rounded`}>
                      <Text className={`text-xs font-semibold ${diffStyle.text}`}>
                        {diffStyle.label}
                      </Text>
                    </View>
                    {mission.status === "in_progress" && (
                      <View className="bg-yellow-950/30 px-2 py-1 rounded">
                        <Text className="text-yellow-500 text-xs font-semibold">
                          ⏱️ {mission.timeRemaining}
                        </Text>
                      </View>
                    )}
                    {mission.status === "completed" && (
                      <View className="bg-green-950/30 px-2 py-1 rounded">
                        <Text className="text-green-500 text-xs font-semibold">
                          ✓ {mission.completedDate}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Descrição */}
                  <Text className="text-neutral-400 text-sm leading-5 mb-3">
                    {mission.description}
                  </Text>

                  {/* Informações */}
                  <View className="bg-black/30 rounded-lg p-3 mb-3">
                    <View className="flex-row justify-between mb-2">
                      <Text className="text-neutral-600 text-xs">Duração:</Text>
                      <Text className="text-neutral-400 text-xs font-semibold">
                        ⏱️ {mission.duration}
                      </Text>
                    </View>
                    <View className="flex-row justify-between mb-2">
                      <Text className="text-neutral-600 text-xs">Requisitos:</Text>
                      <Text className="text-neutral-400 text-xs font-semibold">
                        {mission.requirements}
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-neutral-600 text-xs">Taxa de Sucesso:</Text>
                      <Text className={`text-xs font-semibold ${
                        mission.successRate >= 80 ? 'text-green-400' : 
                        mission.successRate >= 60 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {mission.successRate}%
                      </Text>
                    </View>
                  </View>

                  {/* Recompensas */}
                  <View className="bg-green-950/20 border border-green-900/50 rounded-lg p-3 mb-3">
                    <Text className="text-green-400 text-xs font-bold mb-2">
                      💎 RECOMPENSAS
                    </Text>
                    <View className="flex-row flex-wrap gap-2">
                      <View className="bg-black/30 px-2 py-1 rounded">
                        <Text className="text-green-400 text-xs font-semibold">
                          ¥{mission.reward.money.toLocaleString()}
                        </Text>
                      </View>
                      <View className="bg-black/30 px-2 py-1 rounded">
                        <Text className="text-blue-400 text-xs font-semibold">
                          +{mission.reward.xp} XP
                        </Text>
                      </View>
                      <View className="bg-black/30 px-2 py-1 rounded">
                        <Text className="text-red-400 text-xs font-semibold">
                          +{mission.reward.loyalty} Lealdade
                        </Text>
                      </View>
                      {mission.reward.reputation && (
                        <View className="bg-black/30 px-2 py-1 rounded">
                          <Text className="text-yellow-400 text-xs font-semibold">
                            +{mission.reward.reputation} Rep
                          </Text>
                        </View>
                      )}
                      {mission.reward.item && (
                        <View className="bg-black/30 px-2 py-1 rounded">
                          <Text className="text-purple-400 text-xs font-semibold">
                            {mission.reward.item}
                          </Text>
                        </View>
                      )}
                      {mission.reward.territory && (
                        <View className="bg-black/30 px-2 py-1 rounded">
                          <Text className="text-orange-400 text-xs font-semibold">
                            {mission.reward.territory}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Botão de Ação */}
                  {mission.status === "available" && (
                    <Pressable className="active:opacity-70">
                      <View className="bg-red-600 rounded-lg py-3 items-center">
                        <Text className="text-white font-bold text-sm">
                          ACEITAR MISSÃO
                        </Text>
                      </View>
                    </Pressable>
                  )}

                  {mission.status === "in_progress" && (
                    <Pressable className="active:opacity-70">
                      <View className="bg-yellow-600 rounded-lg py-3 items-center">
                        <Text className="text-white font-bold text-sm">
                          VER PROGRESSO
                        </Text>
                      </View>
                    </Pressable>
                  )}

                  {mission.status === "completed" && (
                    <View className="bg-neutral-900 border border-neutral-800 rounded-lg py-3 items-center">
                      <Text className="text-neutral-600 font-bold text-sm">
                        ✓ MISSÃO CONCLUÍDA
                      </Text>
                    </View>
                  )}
                </View>
              );
            })
          )}
        </View>

        {/* Footer */}
        <View className="items-center py-8 mb-6">
          <View className="flex-row items-center gap-3 mb-3">
            <View className="w-12 h-px bg-neutral-800" />
            <Text className="text-neutral-700 text-xl">⚡</Text>
            <View className="w-12 h-px bg-neutral-800" />
          </View>
          <Text className="text-neutral-700 text-xs tracking-[0.25em]">
            HONOR THROUGH ACTION
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}