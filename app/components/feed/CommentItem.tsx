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
    <View className="flex-row gap-3 px-4 py-3 border-b border-zinc-900">
      <Pressable onPress={navigateToProfile} className="active:opacity-60">
        {comment.profiles.avatar_url ? (
          <Image
            source={{ uri: comment.profiles.avatar_url }}
            className="w-8 h-8 rounded-full border border-zinc-800"
          />
        ) : (
          <View className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 items-center justify-center">
            <Text className="text-sm">🐲</Text>
          </View>
        )}
      </Pressable>

      <View className="flex-1">
        <View className="flex-row items-center gap-2 mb-1">
          <Pressable onPress={navigateToProfile} className="active:opacity-60">
            <Text className="text-white font-bold text-sm">{comment.profiles.username}</Text>
          </Pressable>
          <Text className="text-zinc-700 text-xs">{formatDate(comment.created_at)}</Text>
        </View>
        <Text className="text-zinc-400 text-sm leading-relaxed">{comment.content}</Text>
      </View>
    </View>
  );
}
