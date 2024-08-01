import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import colors from "../../../../constants/colors";
import { useAuthStore } from "../../../../zustand/authStore";
import { hostUrl } from "../../../../services";
import AddService from "../Model/AddService";
import EditService from "./EditService";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [serviceDetails, setServiceDetails] = useState({});
  const { email } = useAuthStore();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${hostUrl}/mazdoor/v1/getServiceProviderDetails?emailId=${email}`
        );
        const data = await response.json();
        setServices(data.services || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [reload, email]);

  const handleAddService = () => {
    setIsFormVisible(true);
  };

  const handleDeleteService = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this service?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteService(id),
        },
      ]
    );
  };

  const deleteService = async (serviceId) => {
    try {
      const response = await fetch(
        `${hostUrl}/mazdoor/v1/deleteService/${email}/${serviceId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Service deleted successfully.");
        setReload((prev) => !prev);
      } else {
        const errorData = await response.json();
        Alert.alert(
          "Error",
          errorData.message || "Failed to delete the service."
        );
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      Alert.alert(
        "Error",
        "An error occurred while deleting the service. Please try again."
      );
    }
  };

  const handleEditService = (service) => {
    setServiceDetails(service);
    setServiceId(service.id);
    setIsEditVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Your Services</Text>
        <TouchableOpacity style={styles.addService} onPress={handleAddService}>
          <AntDesign name="plus" size={20} color={colors.primary} />
          <Text style={styles.addServiceText}>Add Service</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={{ alignItems: "center" }}>
          {services.length === 0 ? (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No Data found</Text>
            </View>
          ) : (
            services.map((service) => (
              <View key={service.id} style={styles.serviceItem}>
                <View style={{ width: "80%" }}>
                  <Text style={styles.serviceName}>{service.serviceName}</Text>
                  <Text style={styles.serviceDescription}>
                    {service.serviceDescription}
                  </Text>
                  <Text style={styles.servicePrice}>₹ {service.price}/-</Text>
                </View>
                <View style={styles.serviceActions}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleDeleteService(service.id)}
                  >
                    <MaterialIcons
                      name="delete-forever"
                      size={26}
                      color={colors.danger}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleEditService(service)}
                    style={styles.iconButton}
                  >
                    <MaterialIcons
                      name="edit-note"
                      size={30}
                      color={colors.baseColor}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {isFormVisible && (
        <AddService setReload={setReload} setIsFormVisible={setIsFormVisible} />
      )}

      {isEditVisible && (
        <EditService
          isVisible={isEditVisible}
          onClose={() => setIsEditVisible(false)}
          serviceId={serviceId}
          serviceDetails={serviceDetails}
          setReload={setReload}
        />
      )}
    </View>
  );
};

const styles = {
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 18,
    color: "#505050",
  },
  addService: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#673de71a",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addServiceText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "600",
    color: colors.primary,
  },
  iconContainer: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 8,
    borderRadius: 50,
    marginRight: 10,
  },
  serviceContainer: {
    alignItems: "center",
  },
  serviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "94%",
    borderBottomWidth: 0.4,
    paddingVertical: 10,
    borderBottomColor: "gray",
  },
  serviceName: {
    fontSize: 20,
    color: "#505050",
  },
  serviceDescription: {
    fontSize: 12,
    color: "#505050",
    fontWeight: "300",
  },
  servicePrice: {
    marginTop: 10,
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
  serviceActions: {
    alignItems: "center",
    justifyContent: "center",
  },
  noDataContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  noDataText: {
    fontSize: 18,
    color: "#505050",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
};

export default Services;
