import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";
import { Alert } from "react-native";

export const useAppwrite = (fn: any) => {
  const [data, setData] = useState<Models.Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();
      setData(response);
    } catch (error: any) {
      Alert.alert("Error fetching videos", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data , refetch};
};
