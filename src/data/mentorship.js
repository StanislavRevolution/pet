// Данные менторов
export const mentors = [
  {
    userId: 11,
    name: "Сергей Андреев",
    avatar: "https://i.pravatar.cc/200?u=11",
    rateHour: 2500,
    skills: ["Python", "Django", "FastAPI", "PostgreSQL"],
    averageRating: 4.9,
    bio: "Senior Python Developer с опытом более 10 лет. Специализируюсь на разработке высоконагруженных backend сервисов и API.",
    yearsExperience: 10,
    grade: "Senior"
  },
  {
    userId: 12,
    name: "Мария Захарова",
    avatar: "https://i.pravatar.cc/200?u=12",
    rateHour: 3000,
    skills: ["JavaScript", "Vue.js", "React", "Node.js", "Frontend Architecture"],
    averageRating: 4.8,
    bio: "Tech Lead в IT-компании с опытом 8 лет. Помогу разобраться с современным фронтендом и архитектурой веб-приложений.",
    yearsExperience: 8,
    grade: "Senior"
  },
  {
    userId: 13,
    name: "Артем Соловьев",
    avatar: "https://i.pravatar.cc/200?u=13",
    rateHour: 2800,
    skills: ["DevOps", "CI/CD", "Docker", "Kubernetes", "AWS", "Infrastructure"],
    averageRating: 4.7,
    bio: "DevOps-инженер с опытом 6 лет. Специализируюсь на автоматизации процессов разработки и построении надежной инфраструктуры.",
    yearsExperience: 6,
    grade: "Middle"
  },
  {
    userId: 14,
    name: "Елена Громова",
    avatar: "https://i.pravatar.cc/200?u=14",
    rateHour: 3200,
    skills: ["Data Science", "Machine Learning", "Python", "Data Analysis", "AI"],
    averageRating: 4.9,
    bio: "Data Scientist с PhD в области Computer Science. 7 лет опыта в машинном обучении и анализе данных.",
    yearsExperience: 7,
    grade: "Senior"
  },
  {
    userId: 15,
    name: "Александр Белов",
    avatar: "https://i.pravatar.cc/200?u=15",
    rateHour: 2700,
    skills: ["Java", "Spring", "Microservices", "System Architecture"],
    averageRating: 4.6,
    bio: "Java-архитектор с опытом более 12 лет. Специалист по высоконагруженным системам и микросервисной архитектуре.",
    yearsExperience: 12,
    grade: "Senior"
  }
];

// Данные слотов для сессий
export const mentorSlots = [
  {
    id: 1,
    mentorId: 11,
    startTime: "2023-09-01T10:00:00Z",
    endTime: "2023-09-01T11:00:00Z",
    isBooked: false
  },
  {
    id: 2,
    mentorId: 11,
    startTime: "2023-09-01T14:00:00Z",
    endTime: "2023-09-01T15:00:00Z",
    isBooked: true
  },
  {
    id: 3,
    mentorId: 12,
    startTime: "2023-09-02T12:00:00Z",
    endTime: "2023-09-02T13:00:00Z",
    isBooked: false
  },
  {
    id: 4,
    mentorId: 12,
    startTime: "2023-09-03T15:00:00Z",
    endTime: "2023-09-03T16:00:00Z",
    isBooked: false
  },
  {
    id: 5,
    mentorId: 13,
    startTime: "2023-09-02T18:00:00Z",
    endTime: "2023-09-02T19:00:00Z",
    isBooked: true
  },
  {
    id: 6,
    mentorId: 14,
    startTime: "2023-09-04T11:00:00Z",
    endTime: "2023-09-04T12:00:00Z",
    isBooked: false
  },
  {
    id: 7,
    mentorId: 15,
    startTime: "2023-09-05T16:00:00Z",
    endTime: "2023-09-05T17:00:00Z",
    isBooked: false
  }
];

// Данные прошедших сессий
export const mentorSessions = [
  {
    id: 1,
    userId: 1,
    mentorId: 11,
    startTime: "2023-08-20T14:00:00Z",
    endTime: "2023-08-20T15:00:00Z",
    status: "completed",
    topic: "Оптимизация Django ORM запросов"
  },
  {
    id: 2,
    userId: 2,
    mentorId: 12,
    startTime: "2023-08-22T12:00:00Z",
    endTime: "2023-08-22T13:00:00Z",
    status: "completed",
    topic: "Архитектура Vue.js приложений"
  },
  {
    id: 3,
    userId: 3,
    mentorId: 13,
    startTime: "2023-08-25T18:00:00Z",
    endTime: "2023-08-25T19:00:00Z",
    status: "completed",
    topic: "Настройка CI/CD пайплайна для проекта"
  },
  {
    id: 4,
    userId: 4,
    mentorId: 14,
    startTime: "2023-08-28T11:00:00Z",
    endTime: "2023-08-28T12:00:00Z",
    status: "cancelled",
    topic: "Основы машинного обучения"
  },
  {
    id: 5,
    userId: 5,
    mentorId: 15,
    startTime: "2023-08-29T16:00:00Z",
    endTime: "2023-08-29T17:00:00Z",
    status: "completed",
    topic: "Микросервисная архитектура на Spring Boot"
  }
];

// Данные отзывов о менторах
export const mentorReviews = [
  {
    id: 1,
    mentorId: 11,
    userId: 1,
    rating: 5,
    text: "Отличная сессия! Сергей очень подробно объяснил, как оптимизировать запросы к базе данных в Django и помог решить проблему с производительностью в нашем проекте.",
    createdAt: "2023-08-20T16:00:00Z"
  },
  {
    id: 2,
    mentorId: 12,
    userId: 2,
    rating: 5,
    text: "Мария - прекрасный ментор! За час сессии я получила много ценных советов по архитектуре моего Vue.js приложения и рефакторингу существующего кода.",
    createdAt: "2023-08-22T14:30:00Z"
  },
  {
    id: 3,
    mentorId: 13,
    userId: 3,
    rating: 4,
    text: "Артем помог мне настроить CI/CD пайплайн для проекта. Очень полезная сессия с практическими примерами.",
    createdAt: "2023-08-25T20:00:00Z"
  },
  {
    id: 4,
    mentorId: 15,
    userId: 5,
    rating: 5,
    text: "Александр - эксперт в своей области. Подробно объяснил принципы построения микросервисной архитектуры и помог с декомпозицией нашего монолитного приложения.",
    createdAt: "2023-08-29T18:30:00Z"
  }
];

// Функция для поиска ментора по идентификатору
export function getMentorById(mentorId) {
  return mentors.find(mentor => mentor.userId === mentorId);
}

// Функция для получения слотов конкретного ментора
export function getMentorSlots(mentorId) {
  return mentorSlots.filter(slot => slot.mentorId === mentorId);
}

// Функция для бронирования слота (имитация)
export function bookSlot(slotId, userId) {
  const slotIndex = mentorSlots.findIndex(slot => slot.id === slotId);
  
  if (slotIndex !== -1 && !mentorSlots[slotIndex].isBooked) {
    mentorSlots[slotIndex].isBooked = true;
    
    // Создаем новую сессию
    const newSession = {
      id: mentorSessions.length + 1,
      userId: userId,
      mentorId: mentorSlots[slotIndex].mentorId,
      startTime: mentorSlots[slotIndex].startTime,
      endTime: mentorSlots[slotIndex].endTime,
      status: "scheduled",
      topic: "Новая сессия"
    };
    
    mentorSessions.push(newSession);
    return true;
  }
  
  return false;
}

// Функция для добавления отзыва о менторе (имитация)
export function addMentorReview(mentorId, userId, rating, text) {
  const newReview = {
    id: mentorReviews.length + 1,
    mentorId: mentorId,
    userId: userId,
    rating: rating,
    text: text,
    createdAt: new Date().toISOString()
  };
  
  mentorReviews.push(newReview);
  
  // Пересчитываем средний рейтинг ментора
  const mentorIndex = mentors.findIndex(mentor => mentor.userId === mentorId);
  if (mentorIndex !== -1) {
    const mentorAllReviews = mentorReviews.filter(review => review.mentorId === mentorId);
    const totalRating = mentorAllReviews.reduce((sum, review) => sum + review.rating, 0);
    mentors[mentorIndex].averageRating = (totalRating / mentorAllReviews.length).toFixed(1);
  }
  
  return newReview;
} 