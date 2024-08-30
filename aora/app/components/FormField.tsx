import {
  View,
  Text,
  type GestureResponderEvent,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

const FormField = ({
  title,
  value,
  handleChangeText,
  keyboardType,
  otherStyles,
  placeholder,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 border-black-200 rounded-2xl bg-black-200  w-full h-16 px-4 flex-row  focus:border-secondary items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              className="w-6 h-6"
              resizeMode="contain"
              source={showPassword ? icons.eye : icons.eyeHide}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

type FormFieldProps = {
  title: string;
  value: string;
  handleChangeText: any;
  otherStyles: string;
  keyboardType?: string;
  placeholder?: string;
};
