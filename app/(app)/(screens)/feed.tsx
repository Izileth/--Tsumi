import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { usePosts } from '../../hooks/use-posts';
import { PostItem } from '../../components/feed/PostItem';
import { useAuth } from '../../context/auth-context';
import { Plus, FileText, RefreshCw } from 'lucide-react-native';
import { CreatePostSheet } from '../../components/feed/CreatePostSheet';
import { Post } from '@/app/lib/types';

export default function FeedScreen() {
  const { user } = useAuth();
  const { posts, loading, error, fetchPosts, addReaction, deleteReaction, createPost, deletePost, updatePost } = usePosts();
  const createPostSheetRef = useRef<any>(null);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = async (data: { title: string; description: string; content: any; imageUris?: string[]; videoUris?: string[]; tags?: string[] }) => {
    await createPost(data);
  };

  const handleUpdatePost = async (postId: string, data: Partial<Post>) => {
    await updatePost(postId, data);
  };

  const handleEditPost = (post: Post) => {
    createPostSheetRef.current?.present(post);
  };

  /* ── Loading ── */
  if (loading && posts.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#ef4444" />
        <Text className="text-zinc-600 text-sm mt-3 tracking-widest">フィード</Text>
      </View>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-black px-8">
        <Text className="text-zinc-600 text-4xl mb-4">罪</Text>
        <Text className="text-white font-bold text-base mb-1 text-center">Falha ao carregar</Text>
        <Text className="text-zinc-600 text-sm text-center mb-6">{error}</Text>
        <Pressable
          onPress={() => fetchPosts()}
          className="flex-row items-center gap-2 border border-zinc-800 rounded-full px-5 py-2.5 active:opacity-60"
        >
          <RefreshCw size={14} color="#71717a" />
          <Text className="text-zinc-400 text-sm">Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  /* ── Main ── */
  return (
    <View className="flex-1 bg-black">
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostItem
            post={item}
            onReact={addReaction}
            onDeleteReaction={deleteReaction}
            currentUserId={user?.id}
            onDelete={deletePost}
            onEdit={handleEditPost}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}

        /* ── Section header ── */
        ListHeaderComponent={
          <View className="px-4 pt-5 pb-4 flex-row items-center justify-between border-b border-zinc-900">
            <View>
              <Text className="text-white text-xl font-black tracking-tight">Feed</Text>
              <Text className="text-red-600 text-xs tracking-widest mt-0.5">フィード</Text>
            </View>
            <Pressable
              onPress={() => createPostSheetRef.current?.present()}
              className="flex-row items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-full px-4 py-2 active:opacity-60"
            >
              <Plus size={14} color="#ef4444" />
              <Text className="text-red-500 text-xs font-bold">Postar</Text>
            </Pressable>
          </View>
        }

        /* ── Empty state ── */
        ListEmptyComponent={
          !loading ? (
            <View className="flex-1 items-center justify-center py-24 px-8">
              <Text className="text-zinc-800 text-5xl mb-4">情報</Text>
              <Text className="text-zinc-400 font-bold text-base mb-1">Nenhuma postagem</Text>
              <Text className="text-zinc-600 text-sm text-center mb-6">
                Seja o primeiro a compartilhar algo.
              </Text>
              <Pressable
                onPress={() => createPostSheetRef.current?.present()}
                className="flex-row items-center gap-2 bg-red-600 rounded-full px-6 py-2.5 active:opacity-70"
              >
                <Plus size={16} color="#fff" />
                <Text className="text-white font-bold text-sm">Criar postagem</Text>
              </Pressable>
            </View>
          ) : null
        }

        onRefresh={fetchPosts}
        refreshing={loading}
      />

      {/* ── FAB ── */}
      <Pressable
        onPress={() => createPostSheetRef.current?.present()}
        style={styles.fab}
        className="absolute bottom-24 right-5 w-14 h-14 bg-red-600 rounded-full items-center justify-center active:opacity-70"
      >
        <Plus size={24} color="#fff" strokeWidth={2.5} />
      </Pressable>

      <CreatePostSheet
        ref={createPostSheetRef}
        onSubmit={handleCreatePost}
        onUpdate={handleUpdatePost}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  fab: {
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
});