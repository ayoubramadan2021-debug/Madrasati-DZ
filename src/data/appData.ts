const appData = {
  appName: "مدرستي DZ",
  description: "منصة تعليمية ذكية لتلاميذ الابتدائي في الجزائر",

  grades: [
    { id: 1, name: "السنة الأولى", color: "#8b5cf6" },
    { id: 2, name: "السنة الثانية", color: "#3b82f6" },
    { id: 3, name: "السنة الثالثة", color: "#10b981" },
    { id: 4, name: "السنة الرابعة", color: "#f97316" },
    { id: 5, name: "السنة الخامسة", color: "#ef4444" },
  ],

  subjects: [
    {
      slug: "math",
      name: "الرياضيات",
      icon: "🔢",
      color: "#8b5cf6",

      lessons: [
        {
          id: 1,
          title: "الأعداد من 0 إلى 9",
          desc: "يتعلم التلميذ قراءة وكتابة وتمييز الأعداد من 0 إلى 9.",
        },
        {
          id: 2,
          title: "الجمع البسيط",
          desc: "يتعلم التلميذ جمع أعداد صغيرة بطريقة سهلة.",
        },
        {
          id: 3,
          title: "الطرح البسيط",
          desc: "يتعلم التلميذ معنى الطرح واستعماله في أمثلة بسيطة.",
        },
      ],

      exercises: [
        {
          id: 1,
          title: "تمرين الأعداد من 0 إلى 9",
          questions: [
            {
              question: "ما هو العدد الذي يأتي بعد 3؟",
              options: ["2", "3", "4", "5"],
              correctAnswer: "4",
            },
            {
              question: "ما هو العدد الذي يأتي قبل 7؟",
              options: ["5", "6", "7", "8"],
              correctAnswer: "6",
            },
            {
              question: "اختر العدد 9",
              options: ["6", "7", "8", "9"],
              correctAnswer: "9",
            },
          ],
        },
        {
          id: 2,
          title: "تمرين الجمع البسيط",
          questions: [
            {
              question: "كم يساوي 2 + 2؟",
              options: ["3", "4", "5", "6"],
              correctAnswer: "4",
            },
            {
              question: "كم يساوي 1 + 3؟",
              options: ["2", "3", "4", "5"],
              correctAnswer: "4",
            },
            {
              question: "كم يساوي 5 + 1؟",
              options: ["5", "6", "7", "8"],
              correctAnswer: "6",
            },
          ],
        },
        {
          id: 3,
          title: "تمرين الطرح البسيط",
          questions: [
            {
              question: "كم يساوي 5 - 2؟",
              options: ["1", "2", "3", "4"],
              correctAnswer: "3",
            },
            {
              question: "كم يساوي 4 - 1؟",
              options: ["2", "3", "4", "5"],
              correctAnswer: "3",
            },
            {
              question: "كم يساوي 3 - 3؟",
              options: ["0", "1", "2", "3"],
              correctAnswer: "0",
            },
          ],
        },
      ],

      quizzes: [{ id: 1, title: "اختبار قصير في الأعداد" }],
    },

    { slug: "arabic", name: "اللغة العربية", icon: "📚", color: "#3b82f6", lessons: [], exercises: [], quizzes: [] },
    { slug: "french", name: "اللغة الفرنسية", icon: "🇫🇷", color: "#db2777", lessons: [], exercises: [], quizzes: [] },
    { slug: "islamic", name: "التربية الإسلامية", icon: "☪️", color: "#10b981", lessons: [], exercises: [], quizzes: [] },
    { slug: "civic", name: "التربية المدنية", icon: "🏛️", color: "#f97316", lessons: [], exercises: [], quizzes: [] },
    { slug: "science", name: "التربية العلمية", icon: "🔬", color: "#0891b2", lessons: [], exercises: [], quizzes: [] },
  ],

  sections: [
    { slug: "lessons", title: "الدروس", icon: "📖", desc: "شروحات مبسطة حسب المستوى الدراسي.", color: "#8b5cf6", dataKey: "lessons" },
    { slug: "exercises", title: "التمارين", icon: "✍️", desc: "تمارين تفاعلية مع تصحيح فوري.", color: "#10b981", dataKey: "exercises" },
    { slug: "quizzes", title: "الاختبارات", icon: "📝", desc: "اختبارات قصيرة لقياس فهم التلميذ.", color: "#f59e0b", dataKey: "quizzes" },
    { slug: "progress", title: "النقاط والتقدم", icon: "⭐", desc: "متابعة مستوى التلميذ وتحفيزه.", color: "#3b82f6", dataKey: "progress" },
  ],
};

export default appData;
