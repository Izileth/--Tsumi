import React, { forwardRef, useImperativeHandle, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  Modal,
  Animated,
  PanResponder,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DEFAULT_SNAP_POINT = SCREEN_HEIGHT * 0.9; // 85% of screen height

type AppBottomSheetProps = {
  title?: string;
  titleJP?: string;
  children: React.ReactNode;
  snapPoints?: (string | number)[]; // Not used in custom implementation, but kept for compatibility
  onDismiss?: () => void;
};

export const AppBottomSheet = forwardRef<any, AppBottomSheetProps>(
  ({ title, titleJP, children, onDismiss }, ref) => {
    const insets = useSafeAreaInsets();
    const [isVisible, setIsVisible] = useState(false);
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const currentHeight = useRef(DEFAULT_SNAP_POINT);

    const animateOpen = useCallback(() => {
      setIsVisible(true);
      Animated.spring(translateY, {
        toValue: SCREEN_HEIGHT - DEFAULT_SNAP_POINT,
        damping: 15,
        stiffness: 100,
        useNativeDriver: true,
      }).start();
    }, [translateY]);

    const animateClose = useCallback(() => {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
        if (onDismiss) onDismiss();
      });
    }, [translateY, onDismiss]);

    useImperativeHandle(ref, () => ({
      present: animateOpen,
      dismiss: animateClose,
    }));

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => {
          // Allow drag only if moving vertically sufficiently
          return Math.abs(gestureState.dy) > 5;
        },
        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dy > 0) { // Only drag down
            translateY.setValue(SCREEN_HEIGHT - currentHeight.current + gestureState.dy);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dy > 50 || gestureState.vy > 0.5) { // Dragged down enough or swiped down fast
            animateClose();
          } else {
            // Snap back to open position
            Animated.spring(translateY, {
              toValue: SCREEN_HEIGHT - currentHeight.current,
              damping: 15,
              stiffness: 100,
              useNativeDriver: true,
            }).start();
          }
        },
      })
    ).current;

    if (!isVisible) return null;

    return (
      <Modal 
        transparent 
        visible={isVisible} 
        onRequestClose={animateClose}
        animationType="none"
        hardwareAccelerated
      >
        <Pressable 
          className="flex-1 bg-black/80" 
          onPress={animateClose}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Fechar painel inferior"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <Animated.View
              style={{
                transform: [{ translateY }],
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: DEFAULT_SNAP_POINT + insets.bottom,
                backgroundColor: '#09090b', // zinc-950
                borderTopColor: '#18181b', // zinc-900
                borderTopWidth: 1,
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 10,
              }}
              // Do NOT put panHandlers here, otherwise it blocks ScrollView on Android/iOS
            >
              {/* Header acts as the drag handle */}
              <View 
                {...panResponder.panHandlers} 
                accessible={true}
                accessibilityRole="adjustable"
                accessibilityLabel="Arraste para baixo para fechar"
              >
                {/* Handle Indicator */}
                <View className="w-full items-center py-4">
                  <View className="w-12 h-1.5 bg-zinc-800 rounded-full" />
                </View>

                {/* Header Title */}
                {(title || titleJP) && (
                  <View className="border-b border-zinc-900 px-6 pb-6">
                    {titleJP && (
                      <Text 
                        className="text-red-500 text-3xl font-black tracking-widest text-center mb-1 mt-2"
                        accessible={true}
                        accessibilityRole="header"
                      >
                        {titleJP}
                      </Text>
                    )}
                    {title && (
                      <Text 
                        className="text-white text-xs font-bold text-center uppercase tracking-widest mt-1"
                        accessible={true}
                        accessibilityRole="header"
                      >
                        {title}
                      </Text>
                    )}
                    <View className="flex-row justify-center items-center gap-3 mt-4" accessible={false} importantForAccessibility="no">
                      <View className="flex-1 h-px bg-zinc-900" />
                      <Text className="text-zinc-700 font-black text-sm">龍</Text>
                      <View className="flex-1 h-px bg-zinc-900" />
                    </View>
                  </View>
                )}
              </View>

              {/* Content */}
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 24, paddingTop: 16 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                {/* Wrapped in Pressable to prevent touches from bubbling to the overlay */}
                <Pressable accessible={false} style={{ flex: 1 }}>
                  {children}
                </Pressable>
              </ScrollView>
            </Animated.View>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    );
  }
);

AppBottomSheet.displayName = 'AppBottomSheet';