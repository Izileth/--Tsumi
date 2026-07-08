import { Pressable, Text, PressableProps, StyleProp, ViewStyle } from "react-native";
import { ButtonLoader } from "./button-loader";

interface CustomButtonProps extends PressableProps {
  title: string;
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle>;
}

export function CustomButton({
  title,
  isLoading,
  loadingText,
  className,
  textClassName,
  style,
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      {...props}
      disabled={isLoading}
      style={style}
      className={`justify-center items-center ${
        isLoading ? 'opacity-70' : ''
      } ${className}`}
    >
      {isLoading ? (
        <ButtonLoader text={loadingText} />
      ) : (
        <Text className={`${textClassName}`}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}