import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors, globalStyles } from "../styles/globalStyles";

const API_URL = "http://192.168.1.9:3000"; // Your local server IP

const SemiAdminDashboard = ({ navigation, route }) => {
  const { user } = route.params;
  const [folders, setFolders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [folderName, setFolderName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const res = await fetch(`${API_URL}/folders/${user.department}`);
      const data = await res.json();
      if (data.success) setFolders(data.folders);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!folderName.trim())
      return Alert.alert("Required", "Please enter a folder name");
    try {
      const res = await fetch(`${API_URL}/create-folder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: folderName,
          description,
          deadline: deadline.toISOString(),
          createdBy: user.username,
          department: user.department,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFolders([data.folder, ...folders]);
        setIsModalVisible(false); // Pop-up closes on success
        setFolderName("");
      }
    } catch (e) {
      Alert.alert("Error", "Save failed");
    }
  };

  const handleDelete = (id) => {
    Alert.alert("Delete", "Delete folder?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          await fetch(`${API_URL}/delete-folder/${user.department}/${id}`, {
            method: "DELETE",
          });
          setFolders(folders.filter((f) => f._id !== id));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Welcome back,</Text>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.dept}>{user.department}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.createBtnText}>+ Create a folder</Text>
        </TouchableOpacity>

        <FlatList
          data={folders}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("SubmissionDetails", { folder: item })
              }
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>📁 {item.name}</Text>
                <Text style={styles.cardDate}>
                  Deadline: {new Date(item.deadline).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.editBtn}>
                  <Text style={styles.btnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.delBtn}
                  onPress={() => handleDelete(item._id)}
                >
                  <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>New Folder</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Folder Name"
              onChangeText={setFolderName}
            />
            <TextInput
              style={[globalStyles.input, { height: 60 }]}
              placeholder="Description"
              multiline
              onChangeText={setDescription}
            />

            <TouchableOpacity
              style={globalStyles.input}
              onPress={() => setShowPicker(true)}
            >
              <Text>📅 Deadline: {deadline.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={deadline}
                mode="date"
                onChange={(e, date) => {
                  setShowPicker(false);
                  if (date) setDeadline(date);
                }}
              />
            )}

            <View style={styles.modalRow}>
              <TouchableOpacity
                style={styles.cancel}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.save} onPress={handleSave}>
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  logout: { color: "red", fontWeight: "bold", marginTop: 10 },
  content: { flex: 1, padding: 20 },
  createBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  createBtnText: { color: "white", fontWeight: "bold" },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardDate: { fontSize: 12, color: "red" },
  cardActions: { flexDirection: "row" },
  editBtn: {
    backgroundColor: "#28a745",
    padding: 8,
    borderRadius: 5,
    marginRight: 5,
  },
  delBtn: { backgroundColor: "#dc3545", padding: 8, borderRadius: 5 },
  btnText: { color: "white", fontWeight: "bold", fontSize: 12 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  cancel: {
    flex: 0.45,
    backgroundColor: "gray",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  save: {
    flex: 0.45,
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default SemiAdminDashboard;
