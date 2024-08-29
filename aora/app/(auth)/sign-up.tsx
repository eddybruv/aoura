import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    if (!form.email || !form.password || !form.username) {
      Alert.alert("Error", "Please fill in all the fields");
    }
    setSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center px-4 my-6 min-h-[85vh]">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign up to Aora
          </Text>
          <FormField
            value={form.username}
            title={"Username"}
            handleChangeText={(e: string) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            value={form.email}
            title={"Email"}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            value={form.password}
            title={"Password"}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={submitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href={"/sign-in"}
              className="text-lg text-secondary font-psemibold"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
