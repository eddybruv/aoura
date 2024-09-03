import { View, Text } from "react-native";
import React from "react";

const InfoBox = ({
  title,
  containerStyles,
  subtitle,
  titleStyles,
}: InfoBoxProps) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white font-psemibold text-center ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-gray-100 text-center text-sm font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;

interface InfoBoxProps {
  title: string | number;
  containerStyles?: string;
  titleStyles?: string;
  subtitle?: string;
}
