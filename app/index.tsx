import { useRouter, useFocusEffect } from "expo-router";

import Landing from "@/components/landing";

export default function App() {
  const router = useRouter();

    useFocusEffect(() => {
        setTimeout(() => {
            router.replace("/home");
        }, 3000)
    })
  return (
    <Landing />
  );
}