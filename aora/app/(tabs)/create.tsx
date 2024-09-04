import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "../components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { formType } from "@/types/formType";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [form, setForm] = useState<formType>({
    title: "",
    video: { name: "", uri: "" },
    thumbnail: { name: "", uri: "" },
    prompt: "",
  });

  const [uploading, setUploading] = useState(false);

  const openPicker = async (selectType: "video" | "image") => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      } else if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (!form.prompt || !form.thumbnail || !form.title || !form.video) {
      Alert.alert("Please fill in all fields");
    }
    setUploading(true);
    try {
      await createVideo({ ...form, userId: user?.$id });

      Alert.alert("Success", "Post uploaded");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: { name: "", uri: "" },
        thumbnail: { name: "", uri: "" },
        prompt: "",
      });
      setUploading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title"
          handleChangeText={(e: string) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video.uri ? (
              <Video
                source={{ uri: form.video.uri }}
                resizeMode={ResizeMode.CONTAIN}
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-40 bg-black-100 rounded-xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail.uri ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode={"cover"}
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-xl justify-center items-center border-2 border-black-200 flex-row space-x-2 ">
                <Image
                  source={icons.upload}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="Video Prompt"
          value={form.prompt}
          placeholder="Prompt used for your video"
          handleChangeText={(e: string) => setForm({ ...form, prompt: e })}
          otherStyles="mt-10"
        />

        <CustomButton
          title="Sumbit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
