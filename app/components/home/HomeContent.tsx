import { View, Text, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Profile } from '@/app/lib/types';
import { LogOut, ChevronRight } from 'lucide-react-native';

type HomeContentProps = {
  profile: Profile;
  handleLogout: () => void;
  loggingOut: boolean;
};

// --- Rank progression data ---
const RANKS = [
  { jp: '若衆', en: 'Wakashu' },
  { jp: '兄弟', en: 'Kyodai' },
  { jp: '幹部', en: 'Kanbu' },
  { jp: '若頭', en: 'Wakagashira' },
  { jp: '組長', en: 'Oyabun' },
];

function getRankIndex(rankEn: string) {
  const idx = RANKS.findIndex(r => r.en === rankEn);
  return idx >= 0 ? idx : 0;
}

// --- Quick Action Card ---
function ActionCard({
  label,
  kanji,
  sub,
  onPress,
}: {
  label: string;
  kanji: string;
  sub: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 bg-zinc-950 border border-zinc-900 rounded-2xl p-4 active:opacity-60"
    >
      <Text className="text-red-600 text-2xl font-black mb-1">{kanji}</Text>
      <Text className="text-white text-sm font-bold">{label}</Text>
      <Text className="text-zinc-600 text-xs mt-0.5">{sub}</Text>
    </Pressable>
  );
}

// --- Stat Pill ---
function StatPill({ label, value, kanji }: { label: string; value: string | number; kanji: string }) {
  return (
    <View className="flex-1 items-center bg-zinc-950 border border-zinc-900 rounded-2xl py-3 px-2">
      <Text className="text-red-600 text-xs font-bold mb-1">{kanji}</Text>
      <Text className="text-white font-black text-base">{value}</Text>
      <Text className="text-zinc-600 text-[10px] mt-0.5 tracking-wider uppercase">{label}</Text>
    </View>
  );
}

export function HomeContent({ profile, handleLogout, loggingOut }: HomeContentProps) {
  const rankIdx = getRankIndex(profile.rank || 'Wakashu');
  const nextRank = RANKS[rankIdx + 1];
  const progress = Math.min(100, (profile.level || 0) % 100);

  return (
    <View className="flex-1 bg-black px-5 pt-5 pb-28">

      {/* ── User Identity Block ── */}
      <View className="flex-row items-center gap-4 mb-6">
        {profile.avatar_url ? (
          <Image
            source={{ uri: profile.avatar_url }}
            className="w-16 h-16 rounded-2xl border border-zinc-800"
          />
        ) : (
          <View className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 items-center justify-center">
            <Text className="text-3xl">🐲</Text>
          </View>
        )}

        <View className="flex-1">
          <Text className="text-white text-xl font-black tracking-tight">{profile.username}</Text>
          {profile.username_jp ? (
            <Text className="text-red-500 text-sm font-semibold">{profile.username_jp}</Text>
          ) : null}
          <View className="flex-row items-center gap-2 mt-1">
            <Text className="text-zinc-500 text-xs">{profile.rank || 'Wakashu'}</Text>
            {profile.clans?.name ? (
              <>
                <View className="w-1 h-1 rounded-full bg-zinc-700" />
                <Text className="text-zinc-500 text-xs" numberOfLines={1}>{profile.clans.name}</Text>
              </>
            ) : null}
          </View>
        </View>

        <Pressable
          onPress={() => router.push('/profile' as any)}
          className="active:opacity-60"
        >
          <ChevronRight size={18} color="#52525b" />
        </Pressable>
      </View>

      {/* ── Rank Progress Card ── */}
      <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 mb-4">
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-zinc-500 text-xs tracking-widest uppercase">Rank Atual</Text>
            <Text className="text-white text-lg font-black mt-0.5">
              {profile.rank_jp || '若衆'}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-zinc-600 text-xs">Lv. {profile.level || 1}</Text>
            {nextRank && (
              <Text className="text-zinc-500 text-xs mt-0.5">→ {nextRank.jp}</Text>
            )}
          </View>
        </View>

        {/* Progress bar */}
        <View className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
          <View
            className="h-full bg-red-600 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </View>
        <Text className="text-zinc-700 text-xs mt-1.5">{progress}% para o próximo rank</Text>
      </View>

      {/* ── Stats Row ── */}
      <View className="flex-row gap-3 mb-4">
        <StatPill kanji="忠" label="Lealdade" value={profile.level || 0} />
        <StatPill kanji="組" label="Clã" value={profile.clans?.name ? profile.clans.emblem || '組' : '—'} />
        <StatPill kanji="力" label="Poder" value={profile.clans?.power || 0} />
      </View>

      {/* ── Quick Actions ── */}
      <View className="flex-row gap-3 mb-3">
        <ActionCard
          kanji="探索"
          label="Explorar"
          sub="Territórios"
          onPress={() => router.push('/explore' as any)}
        />
        <ActionCard
          kanji="組"
          label="Clã"
          sub="Gerenciar"
          onPress={() => router.push('/clan' as any)}
        />
      </View>
      <View className="flex-row gap-3 mb-6">
        <ActionCard
          kanji="情報"
          label="Feed"
          sub="Novidades"
          onPress={() => router.push('/feed' as any)}
        />
        <ActionCard
          kanji="作戦"
          label="Missões"
          sub="Em breve"
          onPress={() => { }}
        />
      </View>

      {/* ── Divider ── */}
      <View className="h-px bg-zinc-900 mb-6" />

      {/* ── Logout ── 
      
      <View className="items-center">
        <Pressable
          onPress={handleLogout}
          disabled={loggingOut}
          className="flex-row items-center gap-3 py-3 active:opacity-50"
        >
          <LogOut size={16} color="#52525b" />
          <Text className="text-zinc-600 text-sm">
            {loggingOut ? 'Saindo...' : 'Sair da conta'}
          </Text>
        </Pressable>

      </View>
      
      */}

      {/* ── Footer ── */}
      <View className="items-center pt-4">
        <Text className="text-zinc-800 text-xs tracking-[0.3em]">罪 · TSUMI · 2025</Text>
      </View>
    </View>
  );
}
