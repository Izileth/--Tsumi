import { Pressable, Text, PressableProps, StyleProp, ViewStyle, View } from "react-native";
import { ButtonLoader } from "./button-loader";

interface CustomButtonProps extends PressableProps {
  title: string;
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle>;
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export function CustomButton({
  title,
  isLoading,
  loadingText,
  className = "",
  textClassName = "",
  style,
  variant = 'primary',
  size = 'default',
  ...props
}: CustomButtonProps) {
  let variantClasses = "";
  let textVariantClasses = "";
  
  switch (variant) {
    case 'primary':
      variantClasses = "bg-red-600 active:bg-red-700 border border-red-500/50";
      textVariantClasses = "text-white font-bold tracking-widest";
      break;
    case 'secondary':
      variantClasses = "bg-neutral-900 active:bg-neutral-800 border border-neutral-800";
      textVariantClasses = "text-white font-semibold tracking-wider";
      break;
    case 'outline':
      variantClasses = "bg-transparent active:bg-neutral-900/50 border border-red-600/50";
      textVariantClasses = "text-red-500 font-semibold tracking-wider";
      break;
    case 'destructive':
      variantClasses = "bg-red-950/40 active:bg-red-900/40 border border-red-900/50";
      textVariantClasses = "text-red-500 font-bold tracking-widest";
      break;
    case 'ghost':
      variantClasses = "bg-transparent active:bg-white/5";
      textVariantClasses = "text-neutral-400 font-medium";
      break;
  }

  let sizeClasses = "";
  let textSizeClasses = "";

  switch (size) {
    case 'default':
      sizeClasses = "h-14 px-6 rounded-xl";
      textSizeClasses = "text-base";
      break;
    case 'sm':
      sizeClasses = "h-10 px-4 rounded-lg";
      textSizeClasses = "text-sm";
      break;
    case 'lg':
      sizeClasses = "h-16 px-8 rounded-2xl";
      textSizeClasses = "text-lg";
      break;
  }

  return (
    <Pressable
      {...props}
      disabled={isLoading || props.disabled}
      style={style}
      className={`flex-row justify-center items-center overflow-hidden ${variantClasses} ${sizeClasses} ${
        isLoading || props.disabled ? 'opacity-50' : ''
      } ${className}`}
    >
      {isLoading ? (
        <ButtonLoader text={loadingText} />
      ) : (
        <Text className={`${textVariantClasses} ${textSizeClasses} ${textClassName}`}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}