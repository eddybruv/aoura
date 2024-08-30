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

const SearchInput = ({
  value,
  handleChangeText,
  keyboardType,
  otherStyles,
  placeholder,
  ...props
}: SearchInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="border-2 border-black-200 rounded-2xl bg-black-200  w-full h-16 px-4 flex-row  focus:border-secondary items-center space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pmedium"
        value={value}
        onChangeText={handleChangeText}
        placeholder={"Search for a video topic"}
        placeholderTextColor={"#7b7b8b"}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Image
          className="w-5 h-5"
          resizeMode="contain"
          source={icons.search}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

type SearchInputProps = {
  value: string;
  handleChangeText: any;
  otherStyles: string;
  keyboardType?: string;
  placeholder?: string;
};
