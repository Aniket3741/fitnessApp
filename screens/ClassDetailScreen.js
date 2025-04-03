"use client"

import { useContext, useState, useEffect } from "react"
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { UserDataContext } from "../context/UserDataContext"

const ClassDetailScreen = ({ route, navigation }) => {
  const { classId } = route.params
  const { classes, bookClass, cancelClass } = useContext(UserDataContext)
  const [classData, setClassData] = useState(null)

  useEffect(() => {
    const foundClass = classes.find((c) => c.id === classId)
    if (foundClass) {
      setClassData(foundClass)
    } else {
      Alert.alert("Error", "Class not found")
      navigation.goBack()
    }
  }, [classId, classes, navigation])

  const handleBookClass = async () => {
    const result = await bookClass(classId)
    if (result.success) {
      Alert.alert("Success", "Class booked successfully!")
    } else {
      Alert.alert("Error", result.error)
    }
  }

  const handleCancelClass = async () => {
    Alert.alert("Cancel Class", "Are you sure you want to cancel this class?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          const result = await cancelClass(classId)
          if (result.success) {
            Alert.alert("Success", "Class canceled successfully!")
          } else {
            Alert.alert("Error", result.error)
          }
        },
      },
    ])
  }

  if (!classData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: "https://via.placeholder.com/400x200" }} style={styles.headerImage} />
          <View style={styles.overlay}>
            <Text style={styles.className}>{classData.name}</Text>
            <Text style={styles.classTime}>
              {classData.day}, {classData.time} • {classData.duration} min
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="person" size={20} color="#4CAF50" />
              <Text style={styles.infoText}>
                {classData.enrolled}/{classData.capacity} spots
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="time" size={20} color="#4CAF50" />
              <Text style={styles.infoText}>{classData.duration} minutes</Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="fitness" size={20} color="#4CAF50" />
              <Text style={styles.infoText}>Intermediate</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{classData.description}</Text>
          </View>

          <TouchableOpacity
            style={styles.instructorCard}
            onPress={() =>
              navigation.navigate("TrainerProfile", {
                trainer: classData.instructor,
              })
            }
          >
            <Image source={{ uri: "https://via.placeholder.com/100" }} style={styles.instructorImage} />
            <View style={styles.instructorInfo}>
              <Text style={styles.instructorName}>{classData.instructor}</Text>
              <Text style={styles.instructorTitle}>Fitness Instructor</Text>
              <Text style={styles.viewProfile}>View Profile</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What to Bring</Text>
            <View style={styles.itemList}>
              <View style={styles.listItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.listItemText}>Water bottle</Text>
              </View>
              <View style={styles.listItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.listItemText}>Towel</Text>
              </View>
              <View style={styles.listItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.listItemText}>Comfortable workout clothes</Text>
              </View>
              <View style={styles.listItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.listItemText}>Athletic shoes</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.locationInfo}>
              <Ionicons name="location" size={20} color="#4CAF50" />
              <Text style={styles.locationText}>Studio 3, Main Building</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {classData.isBooked ? (
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelClass}>
            <Text style={styles.cancelButtonText}>Cancel Booking</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.bookButton, classData.enrolled >= classData.capacity && styles.disabledButton]}
            onPress={handleBookClass}
            disabled={classData.enrolled >= classData.capacity}
          >
            <Text style={styles.bookButtonText}>
              {classData.enrolled >= classData.capacity ? "Class Full" : "Book Class"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 15,
  },
  className: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  classTime: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
  },
  content: {
    padding: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#333",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  instructorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  instructorImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  instructorInfo: {
    marginLeft: 15,
  },
  instructorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  instructorTitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  viewProfile: {
    fontSize: 14,
    color: "#4CAF50",
    marginTop: 5,
  },
  itemList: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  listItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
  },
  locationText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  bookButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
})

export default ClassDetailScreen

