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
          tintColor="#000" // red-500
          colors={['#000', '#202020']} // red-500, red-700
          progressBackgroundColor="#fff"
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
