import React from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { router, usePathname } from 'expo-router';
import { Home, Compass, Shield, MessageSquare, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/app/context/auth-context';

export function FloatingNavBar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const { loading } = useAuth();

  // Normalized routes for main tabs visibility
  const visibleRoutes = ['/', '/explore', '/clan', '/feed', '/profile'];
  const isVisible = visibleRoutes.includes(pathname);

  // Do not render during splash/auth loading, or on detail/modal screens
  if (loading || !isVisible) return null;

  // Handle bottom safe area inset (e.g. for modern iPhone home indicator)
  const bottomInset = Platform.OS === 'ios' ? Math.max(16, insets.bottom) : 16;

  const navigateTo = (path: string) => {
    if (pathname === path) return; // Do nothing if already on this tab

    if (path === '/') {
      router.replace('/');
    } else {
      router.replace(path as any);
    }
  };

  const renderTab = (path: string, IconComponent: any) => {
    const isActive = pathname === path;
    const activeColor = '#ef4444'; // Vibrant red
    const inactiveColor = '#71717a'; // Zinc-500

    return (
      <Pressable 
        onPress={() => navigateTo(path)}
        className="items-center justify-center w-12 h-12 rounded-full relative"
      >
        <IconComponent 
          size={22} 
          color={isActive ? activeColor : inactiveColor} 
          strokeWidth={isActive ? 2.2 : 2} 
        />
        {isActive && (
          <View className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-red-600" />
        )}
      </Pressable>
    );
  };

  return (
    <View 
      style={[
        styles.container, 
        { bottom: bottomInset }
      ]}
      className="flex-row items-center justify-around bg-neutral-950/90 border border-zinc-800/80 rounded-full py-4 px-6 mx-5 absolute left-0 right-0 h-16 z-50"
    >
      {renderTab('/', Home)}
      {renderTab('/explore', Compass)}
      {renderTab('/clan', Shield)}
      {renderTab('/feed', MessageSquare)}
      {renderTab('/profile', User)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Premium dark/red shadow to match Yakuza/Tsumi theme
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 12,
  },
});
