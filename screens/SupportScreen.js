"use client"

import { useState } from "react"
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, FlatList, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

const SupportScreen = () => {
  const [activeTab, setActiveTab] = useState("chat")
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([
    {
      id: "1",
      sender: "system",
      text: "Welcome to FitTrack Pro support! How can we help you today?",
      timestamp: new Date().toISOString(),
    },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: message,
      timestamp: new Date().toISOString(),
    }

    setChatMessages((prevMessages) => [...prevMessages, userMessage])
    setMessage("")

    // Simulate response after a short delay
    setTimeout(() => {
      const responseMessage = {
        id: (Date.now() + 1).toString(),
        sender: "system",
        text: "Thank you for your message. A staff member will respond shortly. In the meantime, you can check our FAQ section for quick answers.",
        timestamp: new Date().toISOString(),
      }
      setChatMessages((prevMessages) => [...prevMessages, responseMessage])
    }, 1000)
  }

  const handleReportIssue = (type) => {
    Alert.alert("Report Submitted", `Thank you for reporting this ${type} issue. Our staff will address it promptly.`, [
      { text: "OK" },
    ])
  }

  const renderChatTab = () => (
    <View style={styles.tabContent}>
      <FlatList
        data={chatMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === "user" ? styles.userMessage : styles.systemMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>
              {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.chatList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  )

  const renderFaqTab = () => (
    <View style={styles.tabContent}>
      <ScrollView>
        <View style={styles.faqItem}>
          <TouchableOpacity style={styles.faqQuestion}>
            <Text style={styles.questionText}>How do I book a class?</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
          <View style={styles.faqAnswer}>
            <Text style={styles.answerText}>
              To book a class, go to the Classes tab, select the day you want, and tap the "Book" button next to the
              class you wish to attend. You'll receive a confirmation notification once your booking is complete.
            </Text>
          </View>
        </View>

        <View style={styles.faqItem}>
          <TouchableOpacity style={styles.faqQuestion}>
            <Text style={styles.questionText}>How do I track my workouts?</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
          <View style={styles.faqAnswer}>
            <Text style={styles.answerText}>
              To track a workout, go to the Workout tab, select a workout from your list, and tap the "Log" button.
              Enter the duration and calories burned, then tap "Log Workout" to save your progress.
            </Text>
          </View>
        </View>

        <View style={styles.faqItem}>
          <TouchableOpacity style={styles.faqQuestion}>
            <Text style={styles.questionText}>How do I create a custom meal plan?</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
          <View style={styles.faqAnswer}>
            <Text style={styles.answerText}>
              To create a custom meal plan, go to the Nutrition tab, select "Meal Plans", and tap "+ Create New". You
              can then add meals, specify foods, and set calorie and macronutrient targets for your plan.
            </Text>
          </View>
        </View>

        <View style={styles.faqItem}>
          <TouchableOpacity style={styles.faqQuestion}>
            <Text style={styles.questionText}>How do I update my membership?</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
          <View style={styles.faqAnswer}>
            <Text style={styles.answerText}>
              To update your membership, go to the Profile tab, select the "Membership" tab, and tap "Upgrade
              Membership". You'll be able to view available plans and make changes to your current subscription.
            </Text>
          </View>
        </View>

        <View style={styles.faqItem}>
          <TouchableOpacity style={styles.faqQuestion}>
            <Text style={styles.questionText}>How do I set fitness goals?</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
          <View style={styles.faqAnswer}>
            <Text style={styles.answerText}>
              To set fitness goals, go to the Goals tab and tap the "Add Goal" button. Enter a name, target, and
              deadline for your goal. You can track your progress and update it as you work towards achieving your
              goals.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )

  const renderReportTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.reportTitle}>Report an Issue</Text>
      <Text style={styles.reportSubtitle}>Help us improve by reporting any issues you encounter</Text>

      <TouchableOpacity style={styles.reportItem} onPress={() => handleReportIssue("equipment")}>
        <View style={styles.reportIcon}>
          <Ionicons name="fitness" size={24} color="#4CAF50" />
        </View>
        <View style={styles.reportInfo}>
          <Text style={styles.reportItemTitle}>Equipment Issue</Text>
          <Text style={styles.reportItemDescription}>Report broken or malfunctioning gym equipment</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.reportItem} onPress={() => handleReportIssue("cleanliness")}>
        <View style={styles.reportIcon}>
          <Ionicons name="water" size={24} color="#4CAF50" />
        </View>
        <View style={styles.reportInfo}>
          <Text style={styles.reportItemTitle}>Cleanliness Issue</Text>
          <Text style={styles.reportItemDescription}>Report hygiene or cleanliness concerns</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.reportItem} onPress={() => handleReportIssue("app")}>
        <View style={styles.reportIcon}>
          <Ionicons name="phone-portrait" size={24} color="#4CAF50" />
        </View>
        <View style={styles.reportInfo}>
          <Text style={styles.reportItemTitle}>App Issue</Text>
          <Text style={styles.reportItemDescription}>Report bugs or problems with the app</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.reportItem} onPress={() => handleReportIssue("staff")}>
        <View style={styles.reportIcon}>
          <Ionicons name="people" size={24} color="#4CAF50" />
        </View>
        <View style={styles.reportInfo}>
          <Text style={styles.reportItemTitle}>Staff Feedback</Text>
          <Text style={styles.reportItemDescription}>Provide feedback about staff or trainers</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.reportItem} onPress={() => handleReportIssue("other")}>
        <View style={styles.reportIcon}>
          <Ionicons name="alert-circle" size={24} color="#4CAF50" />
        </View>
        <View style={styles.reportInfo}>
          <Text style={styles.reportItemTitle}>Other Issue</Text>
          <Text style={styles.reportItemDescription}>Report any other concerns or issues</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "chat" && styles.activeTabButton]}
          onPress={() => setActiveTab("chat")}
        >
          <Text style={[styles.tabButtonText, activeTab === "chat" && styles.activeTabButtonText]}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === "faq" && styles.activeTabButton]}
          onPress={() => setActiveTab("faq")}
        >
          <Text style={[styles.tabButtonText, activeTab === "faq" && styles.activeTabButtonText]}>FAQ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === "report" && styles.activeTabButton]}
          onPress={() => setActiveTab("report")}
        >
          <Text style={[styles.tabButtonText, activeTab === "report" && styles.activeTabButtonText]}>Report</Text>
        </TouchableOpacity>
      </View>

      {activeTab === "chat" && renderChatTab()}
      {activeTab === "faq" && renderFaqTab()}
      {activeTab === "report" && renderReportTab()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
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
    flex: 1,
    padding: 15,
  },
  chatList: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  messageContainer: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#4CAF50",
  },
  systemMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  messageTime: {
    fontSize: 12,
    color: "#666",
    alignSelf: "flex-end",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  faqItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  faqQuestion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  faqAnswer: {
    padding: 15,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  answerText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  reportSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  reportItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f8f0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  reportInfo: {
    flex: 1,
  },
  reportItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  reportItemDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
})

export default SupportScreen

