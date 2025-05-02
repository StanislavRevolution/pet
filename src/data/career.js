// Данные вакансий
export const vacancies = [
  {
    id: 1,
    company: "TechCorp",
    title: "Senior Python Developer",
    requirements: ["Python", "Django", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    grade: "Senior",
    location: "Москва",
    salaryRange: "от 250 000 ₽",
    description: "Требуется опытный Python-разработчик для создания и поддержки высоконагруженных бэкенд-сервисов. Работа в команде над развитием продукта, использующего микросервисную архитектуру.",
    responsibilities: [
      "Разработка новых и поддержка существующих сервисов",
      "Проектирование архитектуры",
      "Оптимизация производительности",
      "Работа в agile-команде"
    ],
    postedAt: "2023-08-15T10:00:00Z"
  },
  {
    id: 2,
    company: "WebSolutions",
    title: "Middle Frontend Developer",
    requirements: ["JavaScript", "Vue.js", "Vuex", "HTML", "CSS", "Jest"],
    grade: "Middle",
    location: "Санкт-Петербург",
    salaryRange: "от 180 000 ₽",
    description: "Ищем талантливого фронтенд-разработчика для создания современных пользовательских интерфейсов на Vue.js. Вы будете частью команды, работающей над крупным B2B-продуктом.",
    responsibilities: [
      "Разработка и поддержка клиентской части приложения",
      "Работа с API и асинхронными запросами",
      "Написание тестов",
      "Внедрение новых функциональных возможностей"
    ],
    postedAt: "2023-08-17T14:30:00Z"
  },
  {
    id: 3,
    company: "DataInsight",
    title: "Data Scientist",
    requirements: ["Python", "Machine Learning", "SQL", "Pandas", "NumPy", "Scikit-Learn", "PyTorch"],
    grade: "Senior",
    location: "Москва",
    salaryRange: "от 300 000 ₽",
    description: "Требуется специалист в области машинного обучения для разработки и внедрения моделей в продакшн. Вы будете работать над решением бизнес-задач с помощью методов машинного обучения и анализа данных.",
    responsibilities: [
      "Разработка и обучение ML-моделей",
      "Анализ и подготовка данных",
      "Интеграция моделей в рабочие процессы",
      "Оценка эффективности моделей"
    ],
    postedAt: "2023-08-18T09:45:00Z"
  },
  {
    id: 4,
    company: "CloudSystems",
    title: "DevOps Engineer",
    requirements: ["Docker", "Kubernetes", "CI/CD", "AWS", "Terraform", "Linux", "Bash", "Jenkins"],
    grade: "Middle",
    location: "Удаленно",
    salaryRange: "от 200 000 ₽",
    description: "Ищем DevOps-инженера для автоматизации процессов разработки и деплоя. Вы будете отвечать за создание и поддержку надежной инфраструктуры для наших продуктов.",
    responsibilities: [
      "Настройка и поддержка CI/CD пайплайнов",
      "Управление контейнеризацией и оркестрацией",
      "Мониторинг и оптимизация инфраструктуры",
      "Автоматизация рутинных задач"
    ],
    postedAt: "2023-08-20T16:15:00Z"
  },
  {
    id: 5,
    company: "SecureTech",
    title: "Information Security Specialist",
    requirements: ["Cybersecurity", "Network Security", "OWASP", "Penetration Testing", "Risk Assessment"],
    grade: "Senior",
    location: "Москва",
    salaryRange: "от 270 000 ₽",
    description: "Требуется специалист по информационной безопасности для защиты наших систем и данных от внешних угроз. Вы будете проводить аудит безопасности и внедрять меры по повышению защищенности.",
    responsibilities: [
      "Проведение аудита безопасности",
      "Разработка и внедрение политик безопасности",
      "Мониторинг и реагирование на инциденты",
      "Обучение сотрудников практикам безопасности"
    ],
    postedAt: "2023-08-22T11:00:00Z"
  },
  {
    id: 6,
    company: "MobileTech",
    title: "iOS Developer",
    requirements: ["Swift", "iOS SDK", "Core Data", "RESTful API", "GitFlow"],
    grade: "Middle",
    location: "Санкт-Петербург",
    salaryRange: "от 190 000 ₽",
    description: "Ищем разработчика для создания нативных iOS-приложений. Вы будете работать в команде опытных разработчиков над интересными проектами в области финтеха.",
    responsibilities: [
      "Разработка и поддержка iOS-приложений",
      "Интеграция с бэкендом",
      "Оптимизация производительности",
      "Участие в проектировании UI/UX"
    ],
    postedAt: "2023-08-25T13:20:00Z"
  },
  {
    id: 7,
    company: "InnovateX",
    title: "Product Manager",
    requirements: ["Product Development", "Agile", "Market Analysis", "User Research", "Prioritization"],
    grade: "Senior",
    location: "Москва",
    salaryRange: "от 280 000 ₽",
    description: "Требуется продуктовый менеджер для развития наших флагманских продуктов. Вы будете отвечать за продуктовую стратегию, работу с метриками и постановку задач команде разработки.",
    responsibilities: [
      "Формирование продуктовой стратегии",
      "Определение приоритетов развития",
      "Анализ пользовательских потребностей",
      "Работа с командой разработки"
    ],
    postedAt: "2023-08-27T10:45:00Z"
  },
  {
    id: 8,
    company: "DatabasePro",
    title: "Database Administrator",
    requirements: ["PostgreSQL", "MySQL", "Database Optimization", "Backup & Recovery", "High Availability"],
    grade: "Middle",
    location: "Удаленно",
    salaryRange: "от 170 000 ₽",
    description: "Ищем администратора баз данных для обеспечения надежной и эффективной работы наших баз данных. Вы будете отвечать за настройку, мониторинг и оптимизацию баз данных.",
    responsibilities: [
      "Настройка и управление СУБД",
      "Оптимизация запросов и производительности",
      "Разработка стратегий резервного копирования",
      "Мониторинг и решение проблем"
    ],
    postedAt: "2023-08-28T15:30:00Z"
  }
];

// Данные рекомендаций (сопоставление вакансий с профилем пользователя)
export const recommendations = [
  {
    userId: 1,
    vacancyId: 1,
    matchingScore: 95,
    matchedSkills: ["Python", "Django", "PostgreSQL"],
    mismatchedSkills: ["Redis", "FastAPI", "Docker"]
  },
  {
    userId: 1,
    vacancyId: 3,
    matchingScore: 85,
    matchedSkills: ["Python", "Machine Learning", "SQL"],
    mismatchedSkills: ["PyTorch", "Pandas", "NumPy"]
  },
  {
    userId: 1,
    vacancyId: 4,
    matchingScore: 65,
    matchedSkills: ["Docker", "CI/CD", "Linux"],
    mismatchedSkills: ["Kubernetes", "AWS", "Terraform", "Jenkins", "Bash"]
  },
  {
    userId: 1,
    vacancyId: 8,
    matchingScore: 75,
    matchedSkills: ["PostgreSQL", "MySQL", "Database Optimization"],
    mismatchedSkills: ["Backup & Recovery", "High Availability"]
  }
];

// Профиль пользователя
export const userProfile = {
  userId: 1,
  name: "Михаил Петров",
  avatar: "https://i.pravatar.cc/40?u=1",
  skills: ["Python", "Django", "PostgreSQL", "Docker", "CI/CD", "Linux", "MySQL", "Machine Learning", "SQL", "Database Optimization"],
  grade: "Middle",
  experience: 4,
  location: "Москва",
  about: "Python-разработчик с опытом создания веб-приложений и backend-сервисов. Интересуюсь машинным обучением и анализом данных."
};

// Функция получения вакансий с фильтрацией
export function getVacancies(filters = {}) {
  let filteredVacancies = [...vacancies];
  
  if (filters.grade && filters.grade !== "All") {
    filteredVacancies = filteredVacancies.filter(vacancy => vacancy.grade === filters.grade);
  }
  
  if (filters.skills && filters.skills.length > 0) {
    filteredVacancies = filteredVacancies.filter(vacancy => 
      filters.skills.some(skill => vacancy.requirements.includes(skill))
    );
  }
  
  if (filters.location) {
    filteredVacancies = filteredVacancies.filter(vacancy => 
      vacancy.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  
  return filteredVacancies;
}

// Функция для получения рекомендаций для пользователя
export function getUserRecommendations(userId) {
  return recommendations
    .filter(rec => rec.userId === userId)
    .sort((a, b) => b.matchingScore - a.matchingScore);
}

// Функция для обновления профиля (имитация)
export function updateUserProfile(updatedProfile) {
  Object.assign(userProfile, updatedProfile);
  return userProfile;
} 