import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";

const API_URL = "http://192.168.1.9:3000"; // Your local server IP

const UserDashboard = ({ navigation, route }) => {
  const { user } = route.params;
  const [folders, setFolders] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const fRes = await fetch(`${API_URL}/folders/${user.department}`);
      const sRes = await fetch(`${API_URL}/user-submissions/${user.username}`);
      const fData = await fRes.json();
      const sData = await sRes.json();
      if (fData.success) setFolders(fData.folders);
      if (sData.success) setSubmissions(sData.submissions);
    };
    fetchData();
  }, []);

  const isSubmitted = (id) => submissions.some((s) => s.folderId === id);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Student Portal</Text>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.dept}>{user.department}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TextInput
          style={globalStyles.input}
          placeholder="Filter by folder name..."
          onChangeText={setFilter}
        />
        <FlatList
          data={folders.filter((f) =>
            f.name.toLowerCase().includes(filter.toLowerCase())
          )}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const done = isSubmitted(item._id);
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate("FolderUpload", {
                    folder: item,
                    user,
                    done,
                  })
                }
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>📁 {item.name}</Text>
                  <Text style={styles.cardDate}>
                    Due: {new Date(item.deadline).toLocaleDateString()}
                  </Text>
                </View>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: done ? "#28a745" : "#ffc107" },
                  ]}
                >
                  <Text style={styles.statusText}>
                    {done ? "Submitted" : "Not Yet"}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "white",
    elevation: 2,
  },
  welcome: { fontSize: 12, color: "gray" },
  name: { fontSize: 18, fontWeight: "bold" },
  dept: { fontSize: 11, color: "#007bff", fontWeight: "bold" },
  logout: { color: "red", fontWeight: "bold" },
  content: { flex: 1, padding: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardDate: { fontSize: 12, color: "gray" },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 },
  statusText: { color: "white", fontSize: 10, fontWeight: "bold" },
});

export default UserDashboard;
