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
    <View className="flex-row gap-3 mb-4">
      <Pressable onPress={navigateToProfile} className="active:opacity-60">
        {comment.profiles.avatar_url ? (
          <Image
            source={{ uri: comment.profiles.avatar_url }}
            className="w-10 h-10 rounded-2xl border border-zinc-800"
          />
        ) : (
          <View className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 items-center justify-center">
            <Text className="text-lg">🐲</Text>
          </View>
        )}
      </Pressable>

      <View className="flex-1 bg-zinc-950 border border-zinc-900 p-3.5 rounded-3xl rounded-tl-sm">
        <View className="flex-row items-center gap-2 mb-1.5">
          <Pressable onPress={navigateToProfile} className="active:opacity-60">
            <Text className="text-white font-black text-sm tracking-tight">{comment.profiles.username}</Text>
          </Pressable>
          <Text className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">{formatDate(comment.created_at)}</Text>
        </View>
        <Text className="text-zinc-300 text-sm leading-relaxed">{comment.content}</Text>
      </View>
    </View>
  );
}
