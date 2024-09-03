import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({
  otherStyles,
  initialQuery,
  ...props
}: SearchInputProps) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);

  return (
    <View className="border-2 border-black-200 rounded-2xl bg-black-200  w-full h-16 px-4 flex-row  focus:border-secondary items-center space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pmedium"
        value={query}
        onChangeText={(e) => setQuery(e)}
        placeholder={"Search for a video topic"}
        placeholderTextColor={"#cdcde0"}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing Query",
              "Please input something to seach results across database"
            );
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else router.push(`/search/${query}`);
        }}
      >
        <Image className="w-5 h-5" resizeMode="contain" source={icons.search} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

type SearchInputProps = {
  initialQuery: string | string[];
  otherStyles?: string;
};
