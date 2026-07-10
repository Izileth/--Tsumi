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
    <View className="mb-4 bg-zinc-950 border border-zinc-900 rounded-3xl mx-4 overflow-hidden">
      {/* ── Author row ── */}
      <View className="flex-row items-center px-4 pt-4 pb-3">
        <Pressable onPress={navigateToProfile} className="active:opacity-60">
          {post.profiles.avatar_url ? (
            <Image
              source={{ uri: post.profiles.avatar_url }}
              className="w-10 h-10 rounded-xl border border-zinc-800"
            />
          ) : (
            <View className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 items-center justify-center">
              <Text className="text-lg">🐲</Text>
            </View>
          )}
        </Pressable>

        <View className="flex-1 ml-3">
          <Pressable onPress={navigateToProfile} className="active:opacity-60 flex-row items-center gap-1.5">
            <Text className="text-white font-black text-sm tracking-tight">{post.profiles.username}</Text>
            {post.profiles.slug && (
              <View className="bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                 <Text className="text-zinc-400 text-[10px] font-bold">t/{post.profiles.slug}</Text>
              </View>
            )}
          </Pressable>
          <Text className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">{formatDate(post.created_at)}</Text>
        </View>

        {/* Author menu */}
        {isAuthor && (
          <View>
            <Pressable
              onPress={() => setMenuOpen(v => !v)}
              className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 items-center justify-center active:opacity-60"
            >
              <MoreHorizontal size={14} color="#a1a1aa" />
            </Pressable>

            {menuOpen && (
              <View
                className="absolute top-10 right-0 bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden z-20 shadow-lg shadow-black"
                style={{ width: 140 }}
              >
                <Pressable
                  onPress={handleEdit}
                  className="flex-row items-center gap-3 px-4 py-3.5 active:bg-zinc-900"
                >
                  <Edit2 size={14} color="#a1a1aa" />
                  <Text className="text-zinc-300 text-xs font-bold">Editar</Text>
                </Pressable>
                <View className="h-px bg-zinc-800/50" />
                <Pressable
                  onPress={handleDelete}
                  className="flex-row items-center gap-3 px-4 py-3.5 active:bg-zinc-900"
                >
                  <Trash2 size={14} color="#ef4444" />
                  <Text className="text-red-500 text-xs font-bold">Excluir</Text>
                </Pressable>
              </View>
            )}
          </View>
        )}
      </View>

      {/* ── Content ── */}
      <View className="px-4 pb-3">
        {/* Title */}
        <Text className="text-white font-black text-lg leading-snug mb-2 tracking-tight">
          {post.title}
        </Text>

        {/* Description */}
        {post.description ? (
          <Text className="text-zinc-400 text-sm leading-relaxed mb-1">
            {post.description}
          </Text>
        ) : null}

        {/* Hashtags */}
        {post.hashtags && post.hashtags.length > 0 && (
          <View className="flex-row flex-wrap gap-1.5 mt-2 mb-3">
            {post.hashtags.map((ht, i) =>
              ht.tag ? (
                <View key={i} className="bg-red-950/30 border border-red-900/50 rounded-full px-2.5 py-1">
                  <Text className="text-red-500 text-[10px] font-black uppercase tracking-widest">#{ht.tag}</Text>
                </View>
              ) : null
            )}
          </View>
        )}

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <View className="mt-2 -mx-4 rounded-b-3xl overflow-hidden">
            <PostImageCarousel images={post.images} />
          </View>
        )}
      </View>

      {/* ── Actions row ── */}
      <View className="flex-row items-center px-4 pb-4 pt-1 gap-6">
        {/* Like */}
        <Pressable
          onPress={handleReaction}
          className="flex-row items-center gap-2 active:opacity-60"
        >
          <Heart
            size={20}
            color={userReaction ? '#ef4444' : '#71717a'}
            fill={userReaction ? '#ef4444' : 'transparent'}
            strokeWidth={userReaction ? 0 : 2}
          />
          <Text
            className={`text-sm font-black ${userReaction ? 'text-red-500' : 'text-zinc-500'}`}
          >
            {likeCount}
          </Text>
        </Pressable>

        {/* Comments */}
        <Pressable
          onPress={handleCommentPress}
          className="flex-row items-center gap-2 active:opacity-60"
        >
          <MessageCircle size={20} color="#71717a" strokeWidth={2} />
          <Text className="text-zinc-500 text-sm font-black">{commentCount}</Text>
        </Pressable>
      </View>
    </View>
  );
}