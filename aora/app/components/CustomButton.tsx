import {
  View,
  Text,
  TouchableOpacity,
  type GestureResponderEvent,
} from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  isLoading,
  textStyles,
}: CustomButtonTypes) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-lg text-primary font-psemibold ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

type CustomButtonTypes = {
  title: string;
  handlePress: (event: GestureResponderEvent) => void;
  isLoading?: boolean;
  textStyles?: string;
  containerStyles?: string;
};
