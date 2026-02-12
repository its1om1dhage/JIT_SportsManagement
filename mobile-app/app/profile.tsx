import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    const res = await axios.get(
      "http://192.168.31.8:5000/api/auth/profile",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setProfile(res.data);
  };

  const saveProfile = async () => {
    const token = await AsyncStorage.getItem("accessToken");

    await axios.put(
      "http://192.168.31.8:5000/api/auth/profile",
      profile,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setEditing(false);
    alert("Profile updated");
  };

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading profile...</Text>
      </View>
    );
  }

  const Field = ({ label, keyName }: any) => (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      {editing ? (
        <TextInput
          style={styles.input}
          value={profile[keyName]?.toString()}
          onChangeText={(text) =>
            setProfile({ ...profile, [keyName]: text })
          }
        />
      ) : (
        <Text style={styles.value}>
          {profile[keyName] || "-"}
        </Text>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <Field label="Full Name" keyName="full_name" />
      <Field label="Contact" keyName="contact" />
      <Field label="Age" keyName="age" />
      <Field label="Blood Group" keyName="blood_group" />
      <Field label="Gender" keyName="gender" />
      <Field label="Address" keyName="address" />
      <Field label="Medical Info" keyName="medical_info" />

      {editing ? (
        <TouchableOpacity style={styles.button} onPress={saveProfile}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setEditing(true)}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20
  },
  title: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold"
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  label: {
    color: "#94a3b8",
    fontSize: 12
  },
  value: {
    color: "#fff",
    fontSize: 16,
    marginTop: 3
  },
  input: {
    backgroundColor: "#0f172a",
    color: "#fff",
    padding: 8,
    marginTop: 5,
    borderRadius: 6
  },
  button: {
    backgroundColor: "#22c55e",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold"
  },
  loading: {
    color: "#fff",
    textAlign: "center",
    marginTop: 50
  }
});
