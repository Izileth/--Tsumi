import { useState, useEffect, forwardRef, useRef, useCallback, memo } from 'react';
import { Alert, Text, View, TextInput, Pressable, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AppBottomSheet } from '@/components/ui/bottom-sheet';
import { CustomButton } from '@/components/ui/custom-button';
import { EditJapaneseNameSheet } from './EditJapaneseNameSheet';
import { useProfile } from '@/app/context/profile-context';
import { useAuth } from '@/app/context/auth-context';
import type { Profile } from '@/app/lib/types';
import Toast from 'react-native-toast-message';
import { Image as ImageIcon } from 'lucide-react-native';

type EditProfileSheetProps = {};

const formatJapaneseName = (name: string | string[] | null | undefined): string => {
  if (Array.isArray(name)) return name.join('');
  if (typeof name === 'string') {
    if (name.startsWith('[') && name.endsWith(']')) {
      try {
        const parsed = JSON.parse(name.replace(/'/g, '"'));
        if (Array.isArray(parsed)) return parsed.join('');
      } catch (error) { console.error('Error parsing Japanese name:', error); }
    }
    return name;
  }
  return '';
};

export const EditProfileSheet = memo(forwardRef<any, EditProfileSheetProps>((props, ref) => {
  const { profile, updateProfile, uploadProfileAsset } = useProfile();
  const { user } = useAuth();

  const [editUsername, setEditUsername] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editWebsite, setEditWebsite] = useState('');
  const [editWebsiteWithoutProtocol, setEditWebsiteWithoutProtocol] = useState(''); 
  const [editGithubUsername, setEditGithubUsername] = useState('');
  const [editGithubWithoutProtocol, setEditGithubWithoutProtocol] = useState('');
  const [editTwitterUsername, setEditTwitterUsername] = useState('');
  const [editTwitterWithoutProtocol, setEditTwitterWithoutProtocol] = useState('');
  const [editAvatarUrl, setEditAvatarUrl] = useState<string | null>(null);
  const [editBannerUrl, setEditBannerUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [editJapaneseName, setEditJapaneseName] = useState('');

  const japaneseNameSheetRef = useRef<any>(null);

  useEffect(() => {
    if (profile) {
      setEditUsername(profile.username || '');
      setEditBio(profile.bio || '');
      setEditSlug(profile.slug || '');
      setEditWebsite(profile.website_url || '');
      setEditWebsiteWithoutProtocol(profile.website || '');
      // Extract username from full URL
      setEditGithubUsername(profile.github_handle ? profile.github_handle.split('/').pop() ?? '' : '');
      setEditGithubWithoutProtocol(profile.github ? profile.github.split('/').pop() ?? '' : '');
      setEditTwitterUsername(profile.twitter_handle ? profile.twitter_handle.split('/').pop() ?? '' : '');
      setEditTwitterWithoutProtocol(profile.twitter ? profile.twitter.split('/').pop() ?? '' : '');
      setEditAvatarUrl(profile.avatar_url || null);
      setEditBannerUrl(profile.banner_url || null);
      setEditJapaneseName(profile.username_jp || '');
    }
  }, [profile]);

  const handlePresentJapaneseNameModal = useCallback(() => {
    japaneseNameSheetRef.current?.present(editJapaneseName);
  }, [editJapaneseName]);

  const handleSaveJapaneseName = (newName: string) => {
    setEditJapaneseName(newName);
  };

  const handlePickImage = async (type: 'avatar' | 'banner') => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'É necessário permitir o acesso à galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: type === 'avatar' ? [1, 1] : [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const localUri = result.assets[0].uri;
      if (type === 'avatar') {
        setEditAvatarUrl(localUri);
      } else {
        setEditBannerUrl(localUri);
      }
    }
  };

  const slugify = (text: string) => {
    return text.toString().toLowerCase().trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  };

  const handleSlugChange = (text: string) => {
    setEditSlug(slugify(text));
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      let finalAvatarUrl = editAvatarUrl;
      if (editAvatarUrl && editAvatarUrl.startsWith('file://')) {
        const file = { uri: editAvatarUrl, type: 'image/jpeg', name: 'avatar.jpg' };
        finalAvatarUrl = await uploadProfileAsset(file, 'avatar');
      }

      let finalBannerUrl = editBannerUrl;
      if (editBannerUrl && editBannerUrl.startsWith('file://')) {
        const file = { uri: editBannerUrl, type: 'image/jpeg', name: 'banner.jpg' };
        finalBannerUrl = await uploadProfileAsset(file, 'banner');
      }

      // Construct full URLs from usernames before saving
      const finalGithubUrl = editGithubUsername ? `https://github.com/${editGithubUsername.replace('@', '')}` : null;
      const finalTwitterUrl = editTwitterUsername ? `https://x.com/${editTwitterUsername.replace('@', '')}` : null;

      const updates: Partial<Profile> = {
        id: user.id,
        username: editUsername,
        bio: editBio,
        slug: editSlug,
        website: editWebsiteWithoutProtocol || null,
        website_url: editWebsite || null,
        github_handle: finalGithubUrl || null,
        github: editGithubWithoutProtocol || null,
        twitter_handle: finalTwitterUrl || null,
        twitter: editTwitterWithoutProtocol || null,
        avatar_url: finalAvatarUrl,
        banner_url: finalBannerUrl,
        updated_at: new Date().toISOString(),
        username_jp: editJapaneseName,
      };

      await updateProfile(updates);
      Toast.show({
        type: 'success',
        text1: 'Perfil atualizado com sucesso!'
      })
      if (typeof (ref as any)?.current?.dismiss === 'function') {
        (ref as any).current.dismiss();
      }
    } catch (e: any) {
      Alert.alert('Erro ao salvar', e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AppBottomSheet
        ref={ref}
        title="Edição de Perfil"
        titleJP="プロファイル編集"
      >
        <View className="gap-6 mt-4 mb-18">
          
          {/* Sessão de Imagens */}
          <View>
            <Text 
              className="text-white font-black text-lg mb-4 tracking-tight"
              accessibilityRole="header"
            >
              Imagens e Aparência
            </Text>
            
            <View className="flex-row justify-around mb-2">
              <Pressable 
                onPress={() => handlePickImage('avatar')} 
                className="items-center active:opacity-60"
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Alterar Imagem de Avatar"
              >
                <View className="relative mb-3">
                  <Image source={{ uri: editAvatarUrl || undefined }} className="w-24 h-24 rounded-3xl bg-zinc-950 border border-zinc-800" />
                  <View className="absolute -bottom-2 -right-2 w-8 h-8 bg-zinc-900 border border-zinc-700 rounded-full items-center justify-center">
                    <ImageIcon size={14} color="#a1a1aa" />
                  </View>
                </View>
                <Text className="text-zinc-400 font-bold text-xs uppercase tracking-widest">Avatar</Text>
              </Pressable>

              <Pressable 
                onPress={() => handlePickImage('banner')} 
                className="items-center active:opacity-60"
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Alterar Imagem de Banner"
              >
                <View className="relative mb-3">
                  <Image source={{ uri: editBannerUrl || undefined }} className="w-40 h-24 rounded-2xl bg-zinc-950 border border-zinc-800" />
                  <View className="absolute -bottom-2 -right-2 w-8 h-8 bg-zinc-900 border border-zinc-700 rounded-full items-center justify-center">
                    <ImageIcon size={14} color="#a1a1aa" />
                  </View>
                </View>
                <Text className="text-zinc-400 font-bold text-xs uppercase tracking-widest">Banner</Text>
              </Pressable>
            </View>
          </View>

          <View className="h-px bg-zinc-900 my-2" />

          {/* Informações Públicas */}
          <View className="gap-5">
            <Text 
              className="text-white font-black text-lg mb-1 tracking-tight"
              accessibilityRole="header"
            >
              Informações Públicas
            </Text>
            
            <View>
              <View className="flex-row items-center mb-2">
                <View className="w-1 h-4 bg-red-600 mr-2" />
                <Text className="text-neutral-400 text-xs font-bold tracking-widest uppercase">Nome de Usuário</Text>
              </View>
              <View className="bg-black border-l-2 border-red-900/30 rounded-xl overflow-hidden">
                <TextInput 
                  className="px-4 py-3.5 text-white font-bold" 
                  value={editUsername} 
                  onChangeText={setEditUsername} 
                  accessible={true}
                  accessibilityLabel="Campo de entrada para o nome de usuário"
                />
              </View>
            </View>

            <View>
              <View className="flex-row items-center mb-2">
                <View className="w-1 h-4 bg-red-600 mr-2" />
                <Text className="text-neutral-400 text-xs font-bold tracking-widest uppercase">Nome Japonês</Text>
              </View>
              <Pressable 
                onPress={handlePresentJapaneseNameModal} 
                className="bg-black border-l-2 border-red-900/30 rounded-xl px-4 py-3 min-h-[50px] justify-center active:opacity-60"
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Botão para editar seu nome japonês"
              >
                <Text className="text-white text-xl font-black tracking-widest">
                  {formatJapaneseName(editJapaneseName) || "NOME JAPONÊS VAZIO"}
                </Text>
              </Pressable>
            </View>

            <View>
              <View className="flex-row items-center mb-2">
                <View className="w-1 h-4 bg-red-600 mr-2" />
                <Text className="text-neutral-400 text-xs font-bold tracking-widest uppercase">Biografia</Text>
              </View>
              <View className="bg-black border-l-2 border-red-900/30 rounded-xl overflow-hidden">
                <TextInput 
                  className="px-4 py-3.5 text-white h-24" 
                  value={editBio} 
                  onChangeText={setEditBio} 
                  multiline 
                  textAlignVertical="top"
                  accessible={true}
                  accessibilityLabel="Campo de entrada para a sua biografia"
                />
              </View>
            </View>
            
            <View>
              <View className="flex-row items-center mb-2">
                <View className="w-1 h-4 bg-red-600 mr-2" />
                <Text className="text-neutral-400 text-xs font-bold tracking-widest uppercase">Slug (URL)</Text>
              </View>
              <View className="bg-black border-l-2 border-red-900/30 rounded-xl overflow-hidden">
                <TextInput 
                  className="px-4 py-3.5 text-white" 
                  value={editSlug} 
                  onChangeText={handleSlugChange} 
                  autoCapitalize="none" 
                  accessible={true}
                  accessibilityLabel="Campo de entrada para o slug da URL do perfil"
                />
              </View>
              <Text className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest mt-2 ml-1">Letras minúsculas e hífens. Ex: meu-perfil</Text>
            </View>
          </View>

          <View className="h-px bg-zinc-900 my-2" />

          {/* Links Sociais */}
          <View className="gap-5">
            <Text 
              className="text-white font-black text-lg mb-1 tracking-tight"
              accessibilityRole="header"
            >
              Links Sociais
            </Text>
            
            <View>
              <View className="flex-row items-center mb-2">
                <View className="w-1 h-4 bg-red-600 mr-2" />
                <Text className="text-neutral-400 text-xs font-bold tracking-widest uppercase">Website</Text>
              </View>
              <View className="bg-black border-l-2 border-red-900/30 rounded-xl overflow-hidden">
                <TextInput 
                  className="px-4 py-3.5 text-white" 
                  value={editWebsite} 
                  onChangeText={setEditWebsite} 
                  placeholder="https://seu-site.com" 
                  placeholderTextColor="#52525b" 
                  autoCapitalize="none" 
                  keyboardType="url" 
                  accessible={true}
                  accessibilityLabel="Campo de entrada para o link do seu website"
                />
              </View>
            </View>

            <View>
              <View className="flex-row items-center mb-2">
                <View className="w-1 h-4 bg-red-600 mr-2" />
                <Text className="text-neutral-400 text-xs font-bold tracking-widest uppercase">GitHub</Text>
              </View>
              <View className="bg-black border-l-2 border-red-900/30 rounded-xl overflow-hidden">
                <TextInput 
                  className="px-4 py-3.5 text-white" 
                  value={editGithubUsername} 
                  onChangeText={setEditGithubUsername} 
                  placeholder="seu-usuario" 
                  placeholderTextColor="#52525b" 
                  autoCapitalize="none" 
                  accessible={true}
                  accessibilityLabel="Campo de entrada para o nome de usuário do GitHub"
                />
              </View>
            </View>

            <View>
              <View className="flex-row items-center mb-2">
                <View className="w-1 h-4 bg-red-600 mr-2" />
                <Text className="text-neutral-400 text-xs font-bold tracking-widest uppercase">Twitter / X</Text>
              </View>
              <View className="bg-black border-l-2 border-red-900/30 rounded-xl overflow-hidden">
                <TextInput 
                  className="px-4 py-3.5 text-white" 
                  value={editTwitterUsername} 
                  onChangeText={setEditTwitterUsername} 
                  placeholder="seu-usuario" 
                  placeholderTextColor="#52525b" 
                  autoCapitalize="none" 
                  accessible={true}
                  accessibilityLabel="Campo de entrada para o nome de usuário do Twitter"
                />
              </View>
            </View>
          </View>

          <CustomButton
            title="SALVAR ALTERAÇÕES"
            onPress={handleSave}
            isLoading={saving}
            className="w-full bg-red-600 border border-red-500 py-3.5 rounded-xl mb-12 mt-4"
            textClassName="text-sm text-white font-black tracking-widest"
          />
        </View>
      </AppBottomSheet>
      <EditJapaneseNameSheet
        ref={japaneseNameSheetRef}
        initialName={editJapaneseName}
        onSave={handleSaveJapaneseName}
      />
    </>
  );
}));

EditProfileSheet.displayName = 'EditProfileSheet';