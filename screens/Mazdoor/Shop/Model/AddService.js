import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import colors from "../../../../constants/colors";
import axios from "axios";
import { useAuthStore } from "../../../../zustand/authStore";
import { hostUrl } from "../../../../services";

const AddService = ({ isFormVisible, setIsFormVisible, setReload }) => {
  const { email } = useAuthStore();
  const [newField, setNewField] = useState([
    {
      id: 1,
      serviceName: "",
      description: "",
      price: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    setNewField([
      ...newField,
      { id: newField.length + 1, serviceName: "", description: "", price: "" },
    ]);
  };

  const handleFieldChange = (id, field, value) => {
    setNewField(
      newField.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  const removeField = (id) => {
    setNewField(newField.filter((f) => f.id !== id));
  };

  const handleSubmit = async () => {
    const isValid = newField.every((field) => field.serviceName.trim() !== "");

    if (!isValid) {
      Alert.alert("Error", "Please enter all the required Information");
      return;
    }

    setLoading(true);
    const payload = newField.map((field) => ({
      emailId: email,
      price: parseFloat(field.price),
      serviceDescription: field.description,
      serviceName: field.serviceName,
    }));

    try {
      await axios.post(`${hostUrl}/mazdoor/v1/addService`, payload);
      console.log("Data submitted successfully");
      setIsFormVisible(false);
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Error submitting data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={isFormVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsFormVisible(false)}
        />
        <ScrollView style={styles.modalContent}>
          <View>
            <View style={styles.header}>
              <Text style={styles.headerText}>Enter your Services</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsFormVisible(false)}
              >
                <Entypo name="cross" size={20} color={colors.danger} />
              </TouchableOpacity>
            </View>
            <View style={styles.fieldsContainer}>
              {newField.map((field, index) => (
                <View key={field.id} style={styles.field}>
                  <View style={styles.row}>
                    <TextInput
                      placeholder="Name"
                      value={field.serviceName}
                      onChangeText={(text) =>
                        handleFieldChange(field.id, "serviceName", text)
                      }
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Price"
                      value={field.price}
                      onChangeText={(text) =>
                        handleFieldChange(field.id, "price", text)
                      }
                      style={styles.input}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.descriptionRow}>
                    <TextInput
                      placeholder="Description"
                      value={field.description}
                      onChangeText={(text) =>
                        handleFieldChange(field.id, "description", text)
                      }
                      style={[styles.input, { width: "80%" }]}
                    />
                    {newField.length > 1 && (
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removeField(field.id)}
                      >
                        <MaterialIcons
                          name="delete"
                          size={24}
                          color={colors.danger}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
              <View style={styles.addButtonContainer}>
                <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
                  <Entypo name="plus" size={20} color={colors.primary} />
                  <Text style={styles.addButtonText}>Add Service</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Submit Services</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    height: height * 0.4,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    overflow: "hidden",
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
    flexGrow: 1,
  },
  header: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
    color: "gray",
  },
  closeButton: {
    backgroundColor: colors.dangerBackground,
    padding: 5,
    borderRadius: 50,
  },
  fieldsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  field: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "48%",
  },
  removeButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descriptionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  addButton: {
    width: "50%",
    backgroundColor: colors.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 50,
    fontWeight: "600",
  },
  addButtonText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 10,
  },
  submitButton: {
    width: "100%",
    backgroundColor: colors.primary,
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 6,
    elevation: 5,
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
  },
});

export default AddService;
