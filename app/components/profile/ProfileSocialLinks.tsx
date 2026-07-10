import { Pressable, Text, View, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type SocialLinksProps = {
    profile: {
        website_url?: string | null;
        github_handle?: string | null;
        twitter_handle?: string | null;
    };
    isOwner?: boolean;
    onEdit?: () => void;
};

export function ProfileSocialLinks({ profile, isOwner, onEdit }: SocialLinksProps) {
    const socialLinks = [
        {
            url: profile.website_url,
            label: 'Website',
            icon: 'globe',
            color: '#d4d4d8', // zinc-300
        },
        {
            url: profile.github_handle,
            label: 'GitHub',
            icon: 'github',
            color: '#d4d4d8',
        },
        {
            url: profile.twitter_handle,
            label: 'Twitter',
            icon: 'twitter',
            color: '#d4d4d8',
        },
    ].filter(link => link.url); // Remove links vazios

    // Se não tem nenhum link, não mostra nada (nem título)
    if (socialLinks.length === 0) {
        return null;
    }

    const handleLinkPress = async (url: string) => {
        try {
            const canOpen = await Linking.canOpenURL(url);
            if (canOpen) {
                await Linking.openURL(url);
            }
        } catch (error) {
            console.error('Error opening link:', error);
        }
    };

    return (
        <View className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 mb-4">
            <View className="flex-row items-center justify-between mb-4">
                <Text className="text-zinc-600 font-bold text-[10px] tracking-widest uppercase">REDES SOCIAIS</Text>
                {isOwner && onEdit && (
                    <Pressable onPress={onEdit} className="active:opacity-60 p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                        <FontAwesome name="pencil" size={10} color="#a1a1aa" />
                    </Pressable>
                )}
            </View>
            <View className="flex-row w-full flex-wrap gap-2">
                {socialLinks.map((link, index) => (
                    <Pressable
                        key={index}
                        onPress={() => handleLinkPress(link.url!)}
                        className="active:opacity-60 active:scale-95"
                    >
                        <View className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 flex-row items-center min-w-[140px]">
                            <View className="w-8 h-8 rounded-full bg-zinc-950 items-center justify-center border border-zinc-800 mr-3">
                                <FontAwesome name={link.icon as any} size={14} color={link.color} />
                            </View>
                            <View className="flex-1">
                                <Text className="text-zinc-500 text-[10px] font-bold mb-0.5 tracking-wider">
                                    {link.label.toUpperCase()}
                                </Text>
                                <View className="flex-row items-center">
                                    <Text className="text-white text-xs font-black tracking-tight">
                                        Visitar
                                    </Text>
                                    <FontAwesome name="external-link" size={8} color="#71717a" style={{ marginLeft: 6 }} />
                                </View>
                            </View>
                        </View>
                    </Pressable>
                ))}
            </View>
        </View>
    );
}