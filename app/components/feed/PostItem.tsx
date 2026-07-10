import React, { useState } from 'react';
import { View, Text, Image, Pressable, Alert } from 'react-native';
import { Post } from '../../lib/types';
import { useRouter } from 'expo-router';
import { Heart, MessageCircle, MoreHorizontal, Trash2, Edit2 } from 'lucide-react-native';
import { formatDate } from '../../utils/formatDate';
import { PostImageGrid } from './PostImageGrid';

type PostItemProps = {
  post: Post;
  onReact: (postId: string, reactionType: string) => void;
  onDeleteReaction: (postId: string) => void;
  onDelete: (postId: string) => void;
  onEdit: (post: Post) => void;
  currentUserId?: string;
};

export function PostItem({ post, onReact, onDeleteReaction, onDelete, onEdit, currentUserId }: PostItemProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthor = post.user_id === currentUserId;
  const userReaction = post.post_reactions.find(r => r.user_id === currentUserId);
  const likeCount = post.post_reactions.length;
  const commentCount = post.post_comments?.length || 0;

  const handleReaction = () => {
    if (userReaction) {
      onDeleteReaction(post.id);
    } else {
      onReact(post.id, 'like');
    }
  };

  const navigateToProfile = () => {
    if (post.profiles.slug) {
      router.push(`/(app)/(public)/${post.profiles.slug}`);
    }
  };

  const handleCommentPress = () => {
    router.push(`/(app)/(screens)/comments/${post.id}`);
  };

  const handleDelete = () => {
    setMenuOpen(false);
    Alert.alert(
      'Excluir postagem',
      'Esta ação é irreversível.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => onDelete(post.id) },
      ]
    );
  };

  const handleEdit = () => {
    setMenuOpen(false);
    onEdit(post);
  };

  return (
    <Pressable onPress={handleCommentPress} className="border-b border-zinc-900 bg-black active:bg-zinc-950/50">
      <View className="flex-row px-4 pt-4 pb-2">
        {/* ── Avatar Column ── */}
        <View className="mr-3 items-center">
          <Pressable onPress={navigateToProfile} className="active:opacity-60">
            {post.profiles.avatar_url ? (
              <Image
                source={{ uri: post.profiles.avatar_url }}
                className="w-10 h-10 rounded-full border border-zinc-800"
              />
            ) : (
              <View className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 items-center justify-center">
                <Text className="text-lg">🐲</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* ── Content Column ── */}
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row justify-between items-start mb-0.5 relative">
            <Pressable onPress={navigateToProfile} className="active:opacity-60 flex-row items-center flex-wrap flex-1 gap-1">
              <Text className="text-white font-black text-sm tracking-tight">{post.profiles.username}</Text>
              {post.profiles.slug && (
                <Text className="text-zinc-500 text-xs font-medium">@{post.profiles.slug}</Text>
              )}
              <Text className="text-zinc-500 text-xs mx-1">·</Text>
              <Text className="text-zinc-500 text-xs">{formatDate(post.created_at)}</Text>
            </Pressable>

            {/* Author Menu */}
            {isAuthor && (
              <View className="ml-2">
                <Pressable
                  onPress={() => setMenuOpen(v => !v)}
                  className="w-6 h-6 items-center justify-center active:bg-red-900/20 rounded-full"
                >
                  <MoreHorizontal size={16} color="#71717a" />
                </Pressable>

                {menuOpen && (
                  <View
                    className="absolute top-6 right-0 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden z-20 shadow-lg shadow-black"
                    style={{ width: 140 }}
                  >
                    <Pressable
                      onPress={handleEdit}
                      className="flex-row items-center gap-3 px-4 py-3 active:bg-zinc-800"
                    >
                      <Edit2 size={14} color="#a1a1aa" />
                      <Text className="text-zinc-300 text-xs font-bold">Editar</Text>
                    </Pressable>
                    <View className="h-px bg-zinc-800/50" />
                    <Pressable
                      onPress={handleDelete}
                      className="flex-row items-center gap-3 px-4 py-3 active:bg-zinc-800"
                    >
                      <Trash2 size={14} color="#ef4444" />
                      <Text className="text-red-500 text-xs font-bold">Excluir</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            )}
          </View>

          {/* Title */}
          <Text className="text-white font-black text-base leading-tight mb-1.5 tracking-tight">
            {post.title}
          </Text>

          {/* Description */}
          {post.description ? (
            <Text className="text-zinc-300 text-[15px] leading-relaxed mb-2">
              {post.description}
            </Text>
          ) : null}

          {/* Hashtags */}
          {post.hashtags && post.hashtags.length > 0 && (
            <View className="flex-row flex-wrap gap-1.5 mb-2">
              {post.hashtags.map((ht, i) =>
                ht.tag ? (
                  <Pressable key={i}>
                    <Text className="text-red-500 text-sm font-semibold">#{ht.tag}</Text>
                  </Pressable>
                ) : null
              )}
            </View>
          )}

          {/* Images Grid */}
          {post.images && post.images.length > 0 && (
            <PostImageGrid images={post.images} />
          )}

          {/* Actions Row */}
          <View className="flex-row items-center justify-between mt-1 mb-1 pr-12">
            {/* Comments */}
            <Pressable
              onPress={handleCommentPress}
              className="flex-row items-center gap-1.5 py-1.5 px-2 -ml-2 rounded-full active:bg-zinc-900"
            >
              <MessageCircle size={18} color="#71717a" strokeWidth={2} />
              <Text className="text-zinc-500 text-xs font-semibold">{commentCount > 0 ? commentCount : ''}</Text>
            </Pressable>

            {/* Like */}
            <Pressable
              onPress={handleReaction}
              className="flex-row items-center gap-1.5 py-1.5 px-2 rounded-full active:bg-red-950/30"
            >
              <Heart
                size={18}
                color={userReaction ? '#ef4444' : '#71717a'}
                fill={userReaction ? '#ef4444' : 'transparent'}
                strokeWidth={userReaction ? 0 : 2}
              />
              <Text
                className={`text-xs font-semibold ${userReaction ? 'text-red-500' : 'text-zinc-500'}`}
              >
                {likeCount > 0 ? likeCount : ''}
              </Text>
            </Pressable>

            {/* Placeholder for Share/View */}
            <View className="w-8" />
          </View>
        </View>
      </View>
    </Pressable>
  );
}