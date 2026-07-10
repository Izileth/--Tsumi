import React from 'react';
import { View, Image, Pressable } from 'react-native';

type PostImageGridProps = {
  images: string[];
};

export function PostImageGrid({ images }: PostImageGridProps) {
  if (!images || images.length === 0) return null;

  const count = images.length;

  return (
    <View className="mt-2 mb-1 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-800 flex-col gap-[2px]">
      {count === 1 && (
        <Image
          source={{ uri: images[0] }}
          className="w-full aspect-video bg-zinc-900"
          resizeMode="cover"
        />
      )}
      
      {count === 2 && (
        <View className="flex-row aspect-video w-full gap-[2px]">
          <Image
            source={{ uri: images[0] }}
            className="flex-1 bg-zinc-900"
            resizeMode="cover"
          />
          <Image
            source={{ uri: images[1] }}
            className="flex-1 bg-zinc-900"
            resizeMode="cover"
          />
        </View>
      )}

      {count === 3 && (
        <View className="flex-row aspect-video w-full gap-[2px]">
          <Image
            source={{ uri: images[0] }}
            className="flex-1 bg-zinc-900"
            resizeMode="cover"
          />
          <View className="flex-1 gap-[2px] flex-col">
            <Image
              source={{ uri: images[1] }}
              className="flex-1 bg-zinc-900"
              resizeMode="cover"
            />
            <Image
              source={{ uri: images[2] }}
              className="flex-1 bg-zinc-900"
              resizeMode="cover"
            />
          </View>
        </View>
      )}

      {count >= 4 && (
        <View className="flex-col aspect-[4/3] w-full gap-[2px]">
          <View className="flex-1 flex-row gap-[2px]">
            <Image
              source={{ uri: images[0] }}
              className="flex-1 bg-zinc-900"
              resizeMode="cover"
            />
            <Image
              source={{ uri: images[1] }}
              className="flex-1 bg-zinc-900"
              resizeMode="cover"
            />
          </View>
          <View className="flex-1 flex-row gap-[2px]">
            <Image
              source={{ uri: images[2] }}
              className="flex-1 bg-zinc-900"
              resizeMode="cover"
            />
            <Image
              source={{ uri: images[3] }}
              className="flex-1 bg-zinc-900"
              resizeMode="cover"
            />
          </View>
        </View>
      )}
    </View>
  );
}
