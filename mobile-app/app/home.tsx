import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#fff", fontSize: 20 }}>Home Screen</Text>

      <TouchableOpacity
        style={{ backgroundColor: "#22c55e", padding: 15, borderRadius: 8, marginTop: 20 }}
        onPress={() => router.push("/bookings")}
      >
        <Text style={{ color: "#000" }}>Go to Bookings</Text>
      </TouchableOpacity>
    </View>
  );
}
