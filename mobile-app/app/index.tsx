import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#fff", fontSize: 24, marginBottom: 20 }}>
        Login Screen
      </Text>

      <TouchableOpacity
        style={{ backgroundColor: "#22c55e", padding: 15, borderRadius: 8 }}
        onPress={() => router.push("/tabs")}
      >
        <Text style={{ color: "#000" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
