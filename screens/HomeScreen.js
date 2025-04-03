"use client"

import { useContext } from "react"
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { AuthContext } from "../context/AuthContext"
import { UserDataContext } from "../context/UserDataContext"

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext)
  const { workouts, classes, goals, progress, nutrition, loading } = useContext(UserDataContext)

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    )
  }

  // Get upcoming classes (next 3)
  const upcomingClasses = classes.slice(0, 3)

  // Get recent workouts (last 2)
  const recentWorkouts = progress.workoutHistory.slice(-2).reverse()

  // Get goals in progress
  const inProgressGoals = goals.filter((goal) => goal.percentComplete < 100).slice(0, 2)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name}</Text>
            <Text style={styles.membershipInfo}>
              {user?.membershipType} Membership • {user?.visitsLeft} visits left
            </Text>
          </View>
          <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("Profile")}>
            <Image source={{ uri: "https://via.placeholder.com/100" }} style={styles.profileImage} />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Classes")}>
            <Ionicons name="calendar" size={24} color="#4CAF50" />
            <Text style={styles.actionText}>Book Class</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Workout")}>
            <Ionicons name="fitness" size={24} color="#4CAF50" />
            <Text style={styles.actionText}>Start Workout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Progress")}>
            <Ionicons name="trending-up" size={24} color="#4CAF50" />
            <Text style={styles.actionText}>Track Progress</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Summary</Text>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <Ionicons name="water" size={24} color="#2196F3" />
              <Text style={styles.summaryValue}>{nutrition.waterIntake} / 8</Text>
              <Text style={styles.summaryLabel}>Water (cups)</Text>
            </View>

            <View style={styles.summaryItem}>
              <Ionicons name="flame" size={24} color="#FF5722" />
              <Text style={styles.summaryValue}>
                {recentWorkouts.length > 0 ? recentWorkouts[0].caloriesBurned || 0 : 0}
              </Text>
              <Text style={styles.summaryLabel}>Calories</Text>
            </View>

            <View style={styles.summaryItem}>
              <Ionicons name="time" size={24} color="#9C27B0" />
              <Text style={styles.summaryValue}>{recentWorkouts.length > 0 ? recentWorkouts[0].duration || 0 : 0}</Text>
              <Text style={styles.summaryLabel}>Minutes</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Classes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Classes</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Classes")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {upcomingClasses.length > 0 ? (
            upcomingClasses.map((classItem) => (
              <TouchableOpacity
                key={classItem.id}
                style={styles.classCard}
                onPress={() => navigation.navigate("ClassDetail", { classId: classItem.id })}
              >
                <View style={styles.classInfo}>
                  <Text style={styles.classTime}>
                    {classItem.day}, {classItem.time}
                  </Text>
                  <Text style={styles.className}>{classItem.name}</Text>
                  <Text style={styles.classInstructor}>with {classItem.instructor}</Text>
                </View>
                <View style={styles.classCapacity}>
                  <Text style={styles.capacityText}>
                    {classItem.enrolled}/{classItem.capacity}
                  </Text>
                  <Text style={styles.capacityLabel}>Spots</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>No upcoming classes</Text>
          )}
        </View>

        {/* Recent Workouts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Workouts</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Workout")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {recentWorkouts.length > 0 ? (
            recentWorkouts.map((workout, index) => (
              <View key={index} style={styles.workoutCard}>
                <Ionicons name="fitness-outline" size={24} color="#4CAF50" style={styles.workoutIcon} />
                <View style={styles.workoutInfo}>
                  <Text style={styles.workoutName}>{workout.workout}</Text>
                  <Text style={styles.workoutDate}>{workout.date}</Text>
                </View>
                <View style={styles.workoutStats}>
                  <Text style={styles.workoutDuration}>{workout.duration} min</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No recent workouts</Text>
          )}
        </View>

        {/* Goals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Goals In Progress</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Goals")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {inProgressGoals.length > 0 ? (
            inProgressGoals.map((goal) => (
              <TouchableOpacity key={goal.id} style={styles.goalCard} onPress={() => navigation.navigate("Goals")}>
                <View style={styles.goalInfo}>
                  <Text style={styles.goalName}>{goal.name}</Text>
                  <Text style={styles.goalTarget}>
                    Target: {goal.target} • Due: {goal.deadline}
                  </Text>
                  <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: `${goal.percentComplete}%` }]} />
                  </View>
                  <Text style={styles.progressText}>
                    {goal.progress} ({goal.percentComplete}% complete)
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>No goals in progress</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  membershipInfo: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  actionText: {
    marginTop: 5,
    fontSize: 12,
    color: "#333",
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    color: "#4CAF50",
    fontSize: 14,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    color: "#333",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  classCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  classInfo: {
    flex: 1,
  },
  classTime: {
    fontSize: 12,
    color: "#666",
  },
  className: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 2,
  },
  classInstructor: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  classCapacity: {
    alignItems: "center",
  },
  capacityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  capacityLabel: {
    fontSize: 12,
    color: "#666",
  },
  workoutCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  workoutIcon: {
    marginRight: 15,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  workoutDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  workoutStats: {
    alignItems: "flex-end",
  },
  workoutDuration: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  goalCard: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  goalInfo: {
    flex: 1,
  },
  goalName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  goalTarget: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  progressText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    padding: 15,
  },
})

export default HomeScreen

