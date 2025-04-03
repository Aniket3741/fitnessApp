"use client"

import { useContext, useState } from "react"
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { AuthContext } from "../context/AuthContext"
import { UserDataContext } from "../context/UserDataContext"

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext)
  const { progress } = useContext(UserDataContext)
  const [activeTab, setActiveTab] = useState("membership")

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => logout(),
        style: "destructive",
      },
    ])
  }

  const renderMembershipTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.membershipCard}>
        <View style={styles.membershipHeader}>
          <Text style={styles.membershipType}>{user?.membershipType} Membership</Text>
          <Text style={styles.membershipExpiry}>Expires: {user?.membershipExpiry}</Text>
        </View>

        <View style={styles.membershipDetails}>
          <View style={styles.membershipDetail}>
            <Text style={styles.detailLabel}>Visits Left</Text>
            <Text style={styles.detailValue}>{user?.visitsLeft}</Text>
          </View>

          <View style={styles.membershipDetail}>
            <Text style={styles.detailLabel}>Total Visits</Text>
            <Text style={styles.detailValue}>{user?.totalVisits}</Text>
          </View>

          <View style={styles.membershipDetail}>
            <Text style={styles.detailLabel}>Member Since</Text>
            <Text style={styles.detailValue}>Jan 2024</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.upgradeButton}>
          <Text style={styles.upgradeButtonText}>Upgrade Membership</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.attendanceSection}>
        <Text style={styles.sectionTitle}>Recent Check-ins</Text>

        {progress.workoutHistory
          .slice(-5)
          .reverse()
          .map((workout, index) => (
            <View key={index} style={styles.attendanceItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <View style={styles.attendanceInfo}>
                <Text style={styles.attendanceDate}>{workout.date}</Text>
                <Text style={styles.attendanceActivity}>{workout.workout}</Text>
              </View>
              <Text style={styles.attendanceDuration}>{workout.duration} min</Text>
            </View>
          ))}
      </View>
    </View>
  )

  const renderSettingsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Account Settings</Text>

        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="person-outline" size={24} color="#4CAF50" style={styles.settingsIcon} />
          <Text style={styles.settingsLabel}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="notifications-outline" size={24} color="#4CAF50" style={styles.settingsIcon} />
          <Text style={styles.settingsLabel}>Notification Preferences</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="card-outline" size={24} color="#4CAF50" style={styles.settingsIcon} />
          <Text style={styles.settingsLabel}>Payment Methods</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="lock-closed-outline" size={24} color="#4CAF50" style={styles.settingsIcon} />
          <Text style={styles.settingsLabel}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>App Settings</Text>

        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="language-outline" size={24} color="#4CAF50" style={styles.settingsIcon} />
          <Text style={styles.settingsLabel}>Language</Text>
          <Text style={styles.settingsValue}>English</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="moon-outline" size={24} color="#4CAF50" style={styles.settingsIcon} />
          <Text style={styles.settingsLabel}>Dark Mode</Text>
          <Ionicons name="toggle-outline" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="help-circle-outline" size={24} color="#4CAF50" style={styles.settingsIcon} />
          <Text style={styles.settingsLabel}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="information-circle-outline" size={24} color="#4CAF50" style={styles.settingsIcon} />
          <Text style={styles.settingsLabel}>About</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#FF5252" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editImageButton}>
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === "membership" && styles.activeTabButton]}
            onPress={() => setActiveTab("membership")}
          >
            <Text style={[styles.tabButtonText, activeTab === "membership" && styles.activeTabButtonText]}>
              Membership
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === "settings" && styles.activeTabButton]}
            onPress={() => setActiveTab("settings")}
          >
            <Text style={[styles.tabButtonText, activeTab === "settings" && styles.activeTabButtonText]}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === "membership" ? renderMembershipTab() : renderSettingsTab()}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  profileHeader: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4CAF50",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#4CAF50",
  },
  tabButtonText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabButtonText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  tabContent: {
    padding: 15,
  },
  membershipCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  membershipHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 15,
    marginBottom: 15,
  },
  membershipType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  membershipExpiry: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  membershipDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  membershipDetail: {
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  upgradeButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 12,
    alignItems: "center",
  },
  upgradeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  attendanceSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  attendanceItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  attendanceInfo: {
    flex: 1,
    marginLeft: 10,
  },
  attendanceDate: {
    fontSize: 14,
    color: "#333",
  },
  attendanceActivity: {
    fontSize: 12,
    color: "#666",
  },
  attendanceDuration: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  settingsSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingsIcon: {
    marginRight: 15,
  },
  settingsLabel: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  settingsValue: {
    fontSize: 14,
    color: "#666",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    color: "#FF5252",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
})

export default ProfileScreen

