import React from 'react';
import { View, ViewProps } from 'react-native';

interface ThemedViewProps extends ViewProps {
  style?: ViewProps['style'];
  children?: React.ReactNode;
}

export const ThemedView: React.FC<ThemedViewProps> = ({ style, children, ...props }) => {
  return (
    <View style={[{ backgroundColor: '#000' }, style]} {...props}>
      {children}
    </View>
  );
};
