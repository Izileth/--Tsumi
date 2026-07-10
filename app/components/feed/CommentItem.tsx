import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { PostComment } from '../../lib/types';
import { formatDate } from '../../utils/formatDate';
import { useRouter } from 'expo-router';

type CommentItemProps = {
  comment: PostComment;
};

export function CommentItem({ comment }: CommentItemProps) {
  const router = useRouter();

  const navigateToProfile = () => {
    if (comment.profiles.slug) {
      router.push(`/(app)/(public)/${comment.profiles.slug}`);
    }
  };

  return (
    <Pressable className="border-b border-zinc-900 bg-black active:bg-zinc-950/50">
      <View className="flex-row px-4 pt-4 pb-3">
        {/* ── Avatar Column ── */}
        <View className="mr-3 items-center">
          <Pressable onPress={navigateToProfile} className="active:opacity-60">
            {comment.profiles.avatar_url ? (
              <Image
                source={{ uri: comment.profiles.avatar_url }}
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
          <View className="flex-row items-center flex-wrap gap-1 mb-1 relative">
            <Pressable onPress={navigateToProfile} className="active:opacity-60 flex-row items-center flex-wrap gap-1">
              <Text className="text-white font-black text-sm tracking-tight">{comment.profiles.username}</Text>
              {comment.profiles.slug && (
                <Text className="text-zinc-500 text-xs font-medium">@{comment.profiles.slug}</Text>
              )}
            </Pressable>
            <Text className="text-zinc-500 text-xs mx-1">·</Text>
            <Text className="text-zinc-500 text-xs">{formatDate(comment.created_at)}</Text>
          </View>

          {/* Body */}
          <Text className="text-zinc-300 text-[15px] leading-relaxed">
            {comment.content}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
