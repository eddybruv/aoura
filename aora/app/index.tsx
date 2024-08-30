import { View, Image, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import CustomButton from "./components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import CustomStatusBar from "./components/CustomStatusBar";
import { useGlobalContext } from "@/context/GlobalProvider";

const App = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href={"/home"} />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full  items-center justify-center h-full px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[84px]"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-4xl text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-center mt-7 text-gray-100 text-sm font-pregular">
            Where Creativity Meets Innovation: Embark on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyles="w-full mt-7"
            title="Continue with Email"
          />
        </View>
      </ScrollView>
      <CustomStatusBar />
    </SafeAreaView>
  );
};
export default App;
