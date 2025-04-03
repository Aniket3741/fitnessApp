import { View, Text, ScrollView, Image, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

const TrainerProfileScreen = ({ route }) => {
  const { trainer } = route.params;

  // Mock data for trainer profile
  const trainerData = {
    name: trainer,
    title: 'Fitness Instructor',
    bio: 'Certified personal trainer with over 5 years of experience in group fitness, strength training, and nutrition coaching. Specializes in HIIT, yoga, and functional training.',
    specialties: ['HIIT', 'Yoga', 'Strength Training', 'Nutrition'],
    certifications: [
      'NASM Certified Personal Trainer',
      'Yoga Alliance RYT-200',
      'Precision Nutrition Level 1',
      'CPR/AED Certified',
    ],
    experience: '5+ years',
    classes: [
      { name: 'Yoga Flow', day: 'Monday', time: '08:00 AM' },
      { name: 'HIIT Challenge', day: 'Tuesday', time: '06:00 PM' },
      { name: 'Core Strength', day: 'Thursday', time: '07:30 AM' },
    ],
    reviews: [
      { 
        user: 'John D.', 
        rating: 5, 
        comment: 'Amazing instructor! Really pushes you to your limits while keeping it fun.',
        date: '2 weeks ago'
      },
      { 
        user: 'Sarah M.', 
        rating: 4, 
        comment: 'Great energy and very knowledgeable. Highly recommend!',
        date: '1 month ago'
      },
      { 
        user: 'Mike T.', 
        rating: 5, 
        comment: 'Best yoga instructor I\'ve had. Very attentive to form and alignment.',
        date: '2 months ago'
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://via.placeholder.com/300' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{trainerData.name}</Text>
            <Text style={styles.title}>{trainerData.title}</Text>
            
            <View style={styles.ratingContainer}>
              <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons 
                    key={star}
                    name="star" 
                    size={18} 
                    color="#FFD700" 
                  />
                ))}
              </View>
              <Text style={styles.ratingText}>4.8 (24 reviews)</Text>
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{trainerData.experience}</Text>
                <Text style={styles.statLabel}>Experience</Text>
              </View>
              
              <View style={styles.stat}>
                <Text style={styles.statValue}>{trainerData.classes.length}</Text>
                <Text style={styles.statLabel}>Classes</Text>
              </View>
              
              <View style={styles.stat}>
                <Text style={styles.statValue}>{trainerData.specialties.length}</Text>
                <Text style={styles.statLabel}>Specialties</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.bio}>{trainerData.bio}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specialties</Text>
            <View style={styles.specialtiesContainer}>
              {trainerData.specialties.map((specialty, index) => (
                <View key={index} style={styles.specialtyTag}>
                  <Text style={styles.specialtyText}>{specialty}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            <View style={styles.certificationsContainer}>
              {trainerData.certifications.map((cert, index) => (
                <View key={index} style={styles.certificationItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                  <Text style={styles.certificationText}>{cert}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Classes</Text>
            {trainerData.classes.map((classItem, index) => (
              <View key={index} style={styles.classItem}>
                <Text style={styles.className}>{classItem.name}</Text>
                <Text style={styles.classSchedule}>{classItem.day} at {classItem.time}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            {trainerData.reviews.map((review, index) => (
              <View key={index} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewUser}>{review.user}</Text>
                  <View style={styles.reviewRating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons 
                        key={star}
                        name={star <= review.rating ? "star" : "star-outline"} 
                        size={16} 
                        color="#FFD700" 
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  bio: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: '#e3f2fd',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  specialtyText: {
    color: '#1976d2',
    fontSize: 14,
  },
  certificationsContainer: {
    marginTop: 10,
  },
  certificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  certificationText: {
    marginLeft: 8,
    fontSize: 16,
  },
  classItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  className: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  classSchedule: {
    fontSize: 14,
    color: '#666',
  },
  reviewItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewUser: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    lineHeight: 20,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default TrainerProfileScreen;