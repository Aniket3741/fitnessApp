"use client"

import { useContext, useState } from "react"
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { UserDataContext } from "../context/UserDataContext"

const GoalsScreen = () => {
  const { goals, addGoal, updateGoalProgress } = useContext(UserDataContext)
  const [modalVisible, setModalVisible] = useState(false)
  const [updateModalVisible, setUpdateModalVisible] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [goalName, setGoalName] = useState("")
  const [goalTarget, setGoalTarget] = useState("")
  const [goalDeadline, setGoalDeadline] = useState("")
  const [goalProgress, setGoalProgress] = useState("")
  const [goalPercentComplete, setGoalPercentComplete] = useState("")

  const handleAddGoal = async () => {
    if (!goalName || !goalTarget || !goalDeadline) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    const result = await addGoal({
      name: goalName,
      target: goalTarget,
      deadline: goalDeadline,
    })

    if (result.success) {
      Alert.alert("Success", "Goal added successfully!")
      setModalVisible(false)
      // Reset form
      setGoalName("")
      setGoalTarget("")
      setGoalDeadline("")
    } else {
      Alert.alert("Error", result.error)
    }
  }

  const handleUpdateGoal = async () => {
    if (!goalProgress || !goalPercentComplete) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    const result = await updateGoalProgress(selectedGoal.id, goalProgress, Number.parseInt(goalPercentComplete))

    if (result.success) {
      Alert.alert("Success", "Goal progress updated successfully!")
      setUpdateModalVisible(false)
    } else {
      Alert.alert("Error", result.error)
    }
  }

  const openUpdateModal = (goal) => {
    setSelectedGoal(goal)
    setGoalProgress(goal.progress)
    setGoalPercentComplete(goal.percentComplete.toString())
    setUpdateModalVisible(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Fitness Goals</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add Goal</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.goalsContainer}>
        {goals.length > 0 ? (
          goals.map((goal) => (
            <View key={goal.id} style={styles.goalCard}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalName}>{goal.name}</Text>
                <View style={styles.goalActions}>
                  <TouchableOpacity style={styles.actionButton} onPress={() => openUpdateModal(goal)}>
                    <Ionicons name="create-outline" size={20} color="#4CAF50" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="trash-outline" size={20} color="#F44336" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.goalDetails}>
                <View style={styles.goalDetail}>
                  <Text style={styles.detailLabel}>Target</Text>
                  <Text style={styles.detailValue}>{goal.target}</Text>
                </View>

                <View style={styles.goalDetail}>
                  <Text style={styles.detailLabel}>Current</Text>
                  <Text style={styles.detailValue}>{goal.progress}</Text>
                </View>

                <View style={styles.goalDetail}>
                  <Text style={styles.detailLabel}>Deadline</Text>
                  <Text style={styles.detailValue}>{goal.deadline}</Text>
                </View>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      { width: `${goal.percentComplete}%` },
                      goal.percentComplete >= 100 && styles.progressBarComplete,
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{goal.percentComplete}% complete</Text>
              </View>

              {goal.percentComplete >= 100 && (
                <View style={styles.completeBadge}>
                  <Ionicons name="checkmark-circle" size={20} color="#fff" />
                  <Text style={styles.completeBadgeText}>Goal Achieved!</Text>
                </View>
              )}
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="trophy-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No goals added yet</Text>
            <Text style={styles.emptySubtext}>Tap the "Add Goal" button to create your first fitness goal</Text>
          </View>
        )}
      </ScrollView>

      {/* Add Goal Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Goal</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Goal Name</Text>
              <TextInput
                style={styles.input}
                value={goalName}
                onChangeText={setGoalName}
                placeholder="e.g., Run 5K, Lose Weight"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Target</Text>
              <TextInput
                style={styles.input}
                value={goalTarget}
                onChangeText={setGoalTarget}
                placeholder="e.g., 5 kilometers, 10 kg"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Deadline (YYYY-MM-DD)</Text>
              <TextInput
                style={styles.input}
                value={goalDeadline}
                onChangeText={setGoalDeadline}
                placeholder="e.g., 2024-12-31"
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleAddGoal}>
              <Text style={styles.submitButtonText}>Add Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Update Goal Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={updateModalVisible}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Update Goal Progress</Text>
              <TouchableOpacity onPress={() => setUpdateModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {selectedGoal && (
              <>
                <Text style={styles.selectedGoalName}>{selectedGoal.name}</Text>
                <Text style={styles.selectedGoalTarget}>Target: {selectedGoal.target}</Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Current Progress</Text>
                  <TextInput
                    style={styles.input}
                    value={goalProgress}
                    onChangeText={setGoalProgress}
                    placeholder="e.g., 3 kilometers, 5 kg"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Percent Complete</Text>
                  <TextInput
                    style={styles.input}
                    value={goalPercentComplete}
                    onChangeText={setGoalPercentComplete}
                    keyboardType="number-pad"
                    placeholder="e.g., 50"
                  />
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleUpdateGoal}>
                  <Text style={styles.submitButtonText}>Update Progress</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  goalsContainer: {
    padding: 15,
  },
  goalCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  goalName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  goalActions: {
    flexDirection: "row",
  },
  actionButton: {
    padding: 5,
    marginLeft: 10,
  },
  goalDetails: {
    flexDirection: "row",
    padding: 15,
  },
  goalDetail: {
    flex: 1,
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  progressContainer: {
    padding: 15,
    paddingTop: 0,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 5,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  progressBarComplete: {
    backgroundColor: "#8BC34A",
  },
  progressText: {
    fontSize: 12,
    color: "#666",
    textAlign: "right",
  },
  completeBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8BC34A",
    padding: 10,
  },
  completeBadgeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 12,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedGoalName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  selectedGoalTarget: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
})

export default GoalsScreen

