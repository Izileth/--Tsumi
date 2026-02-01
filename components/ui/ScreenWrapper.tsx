import React, { useCallback, useState } from 'react';
import { ScrollView, RefreshControl, ScrollViewProps, StyleSheet } from 'react-native';

interface ScreenWrapperProps extends ScrollViewProps {
  onRefresh: () => Promise<any>;
  children: React.ReactNode;
}

export function ScreenWrapper({ children, onRefresh, ...props }: ScreenWrapperProps) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      {...props}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor="#ef4444" // red-500
          colors={['#ef4444', '#b91c1c']} // red-500, red-700
          progressBackgroundColor="#1a1a1a"
        />
      }
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  contentContainer: {
    flexGrow: 1,
  },
});
