export const queryKeys = {
  profiles: ["profiles"] as const,
  lessons: ["lessons"] as const,
  exercises: ["exercises"] as const,
  progress: (userId: string) => ["progress", userId] as const,
  leaderboard: ["leaderboard"] as const,
  favorites: (userId: string) => ["favorites", userId] as const,
  notifications: (userId: string) => ["notifications", userId] as const,
  exercise: (exerciseId: string) => ["exercise", exerciseId] as const,
  exercisesByGradeAndSubject: (grade: string, subject: string) =>
    ["exercises", grade, subject] as const,
};
