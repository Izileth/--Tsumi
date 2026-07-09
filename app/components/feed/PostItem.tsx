import React, { useState } from 'react';
import { View, Text, Image, Pressable, Alert } from 'react-native';
import { Post } from '../../lib/types';
import { useRouter } from 'expo-router';
import { Heart, MessageCircle, MoreHorizontal, Trash2, Edit2 } from 'lucide-react-native';
import { formatDate } from '../../utils/formatDate';
import { PostImageCarousel } from './PostImageCarousel';

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
    <View className="mb-px bg-black border-b border-zinc-900">

      {/* ── Author row ── */}
      <View className="flex-row items-center px-4 pt-4 pb-3">
        <Pressable onPress={navigateToProfile} className="active:opacity-60">
          {post.profiles.avatar_url ? (
            <Image
              source={{ uri: post.profiles.avatar_url }}
              className="w-9 h-9 rounded-full border border-zinc-800"
            />
          ) : (
            <View className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 items-center justify-center">
              <Text className="text-base">🐲</Text>
            </View>
          )}
        </Pressable>

        <View className="flex-1 ml-3">
          <Pressable onPress={navigateToProfile} className="active:opacity-60">
            <Text className="text-white font-bold text-sm">{post.profiles.username}</Text>
          </Pressable>
          <Text className="text-zinc-600 text-xs mt-0.5">{formatDate(post.created_at)}</Text>
        </View>

        {/* Author menu */}
        {isAuthor && (
          <View>
            <Pressable
              onPress={() => setMenuOpen(v => !v)}
              className="w-8 h-8 items-center justify-center active:opacity-50"
            >
              <MoreHorizontal size={18} color="#52525b" />
            </Pressable>

            {menuOpen && (
              <View
                className="absolute top-9 right-0 bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden z-20"
                style={{ width: 130 }}
              >
                <Pressable
                  onPress={handleEdit}
                  className="flex-row items-center gap-2.5 px-4 py-3 active:bg-zinc-900"
                >
                  <Edit2 size={14} color="#a1a1aa" />
                  <Text className="text-zinc-300 text-sm">Editar</Text>
                </Pressable>
                <View className="h-px bg-zinc-800" />
                <Pressable
                  onPress={handleDelete}
                  className="flex-row items-center gap-2.5 px-4 py-3 active:bg-zinc-900"
                >
                  <Trash2 size={14} color="#ef4444" />
                  <Text className="text-red-500 text-sm">Excluir</Text>
                </Pressable>
              </View>
            )}
          </View>
        )}
      </View>

      {/* ── Content ── */}
      <View className="px-4 pb-3">
        {/* Title */}
        <Text className="text-white font-bold text-base leading-snug mb-1">
          {post.title}
        </Text>

        {/* Description */}
        {post.description ? (
          <Text className="text-zinc-400 text-sm leading-relaxed">
            {post.description}
          </Text>
        ) : null}

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <View className="mt-3">
            <PostImageCarousel images={post.images} />
          </View>
        )}

        {/* Hashtags */}
        {post.hashtags && post.hashtags.length > 0 && (
          <View className="flex-row flex-wrap gap-1.5 mt-3">
            {post.hashtags.map((ht, i) =>
              ht.tag ? (
                <View key={i} className="bg-zinc-900 rounded-md px-2 py-0.5">
                  <Text className="text-red-500 text-xs font-semibold">#{ht.tag}</Text>
                </View>
              ) : null
            )}
          </View>
        )}
      </View>

      {/* ── Actions row ── */}
      <View className="flex-row items-center px-4 pb-4 gap-5">
        {/* Like */}
        <Pressable
          onPress={handleReaction}
          className="flex-row items-center gap-1.5 active:opacity-60"
        >
          <Heart
            size={18}
            color={userReaction ? '#ef4444' : '#52525b'}
            fill={userReaction ? '#ef4444' : 'transparent'}
            strokeWidth={2}
          />
          <Text
            className={`text-sm font-semibold ${userReaction ? 'text-red-500' : 'text-zinc-600'}`}
          >
            {likeCount}
          </Text>
        </Pressable>

        {/* Comments */}
        <Pressable
          onPress={handleCommentPress}
          className="flex-row items-center gap-1.5 active:opacity-60"
        >
          <MessageCircle size={18} color="#52525b" strokeWidth={2} />
          <Text className="text-zinc-600 text-sm font-semibold">{commentCount}</Text>
        </Pressable>
      </View>
    </View>
  );
}