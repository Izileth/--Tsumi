import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePostDetails } from '@/app/hooks/use-post-details';
import { CommentItem } from '@/app/components/feed/CommentItem';
import { Send, MessageSquare, ArrowLeft, RefreshCw } from 'lucide-react-native';

export default function CommentsScreen() {
  const router = useRouter();
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const { post, loading, error, fetchPost, addComment } = usePostDetails(postId);
  
  const [commentText, setCommentText] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    setIsSending(true);
    await addComment(commentText);
    setIsSending(false);
    setCommentText('');
  };

  if (loading || !post) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <View className="items-center gap-4">
          <View className="w-20 h-20 bg-zinc-950 border border-zinc-900 rounded-3xl items-center justify-center">
            <ActivityIndicator size="large" color="#ef4444" />
          </View>
          <Text className="text-zinc-500 font-bold text-xs uppercase tracking-widest">Carregando comentários...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-black p-6">
        <View className="items-center">
          <View className="w-20 h-20 bg-red-950/20 border border-red-900/30 rounded-3xl items-center justify-center mb-6">
            <Text className="text-red-600 text-3xl">⚠</Text>
          </View>
          
          <Text className="text-red-500 text-center text-xl font-black tracking-tight mb-2">Erro ao carregar</Text>
          <Text className="text-zinc-500 text-center text-sm font-bold mb-6">{error}</Text>
          
          <Pressable 
            onPress={() => fetchPost()}
            className="bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-2xl flex-row items-center gap-3 active:opacity-60"
          >
            <RefreshCw size={16} color="#d4d4d8" />
            <Text className="text-zinc-300 font-black text-sm">TENTAR NOVAMENTE</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View className="flex-1 bg-black">
        {/* Header */}
        <View className="bg-zinc-950 border-b border-zinc-900">
          <View className="flex-row items-center px-4 py-4 pt-6">
            <Pressable 
              onPress={() => router.back()} 
              className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl items-center justify-center mr-4 active:opacity-60"
            >
              <ArrowLeft size={18} color="#a1a1aa" />
            </Pressable>
            
            <View className="flex-1">
              <Text className="text-xl font-black text-white tracking-tight">Comentários</Text>
              <Text className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
                DE <Text className="text-red-500">@{post.profiles.username}</Text>
              </Text>
            </View>

            {/* Contador de comentários */}
            <View className="bg-red-950/30 border border-red-900/50 rounded-xl px-3 py-1.5">
              <Text className="text-red-500 font-black text-[10px] uppercase tracking-widest">
                {post.post_comments?.length || 0} REPS
              </Text>
            </View>
          </View>
        </View>

        {/* Lista de Comentários */}
        <FlatList
          data={post.post_comments}
          renderItem={({ item }) => <CommentItem comment={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 24 }}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center py-24">
              <View className="w-20 h-20 bg-zinc-950 border border-zinc-900 rounded-3xl items-center justify-center mb-6">
                <MessageSquare size={32} color="#52525b" />
              </View>
              <Text className="text-white text-lg font-black tracking-tight mb-1">Nenhum comentário ainda</Text>
              <Text className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Seja o primeiro a comentar</Text>
              <Text className="text-red-500/50 text-[10px] font-black uppercase tracking-widest mt-4">最初のコメントを残す</Text>
            </View>
          }
          onRefresh={fetchPost}
          refreshing={loading}
        />

        {/* Input de Comentário */}
        <View className="border-t border-zinc-900 bg-zinc-950 px-4 py-3 pb-8">
          <View className="flex-row items-center gap-3">
            {/* Input */}
            <View className="flex-1 bg-black border border-zinc-800 rounded-2xl overflow-hidden min-h-[48px] justify-center">
              <TextInput
                value={commentText}
                onChangeText={setCommentText}
                placeholder="Adicionar um comentário..."
                placeholderTextColor="#52525b"
                className="px-4 py-3 text-white font-bold text-sm"
                multiline
                maxLength={500}
              />
            </View>

            {/* Botão Enviar */}
            <Pressable 
              onPress={handleAddComment} 
              disabled={isSending || !commentText.trim()}
              className={`w-12 h-12 rounded-2xl items-center justify-center border ${
                isSending || !commentText.trim() 
                  ? 'bg-zinc-900 border-zinc-800' 
                  : 'bg-red-600 border-red-500'
              }`}
            >
              <Send 
                size={18} 
                color={isSending || !commentText.trim() ? '#71717a' : '#ffffff'} 
              />
            </Pressable>
          </View>

          {/* Contador de caracteres */}
          {commentText.length > 0 && (
            <View className="flex-row justify-end mt-2 px-2">
              <Text className={`text-[10px] font-bold uppercase tracking-widest ${
                commentText.length > 450 
                  ? 'text-red-500' 
                  : 'text-zinc-600'
              }`}>
                {commentText.length}/500
              </Text>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}