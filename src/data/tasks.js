export const tasks = [
  {
    id: 1,
    title: "Разработка API для управления пользователями",
    description: "Необходимо разработать CRUD-эндпоинты для управления пользователями в системе. Используйте Django REST Framework для реализации API. API должно позволять создавать, читать, обновлять и удалять пользователей. Также необходимо реализовать фильтрацию, пагинацию и поиск по пользователям.",
    category: "Backend",
    grade: "Junior",
    tags: ["Python", "Django", "REST API", "CRUD"]
  },
  {
    id: 2,
    title: "Создание интерактивной дашборд-панели",
    description: "Требуется разработать интерактивную дашборд-панель для визуализации данных о продажах компании. Панель должна включать графики, диаграммы и таблицы с возможностью фильтрации по различным параметрам.",
    category: "Frontend",
    grade: "Middle",
    tags: ["JavaScript", "Vue.js", "D3.js", "Data Visualization"]
  },
  {
    id: 3,
    title: "Оптимизация SQL-запросов",
    description: "Необходимо провести анализ и оптимизацию существующих SQL-запросов для повышения производительности базы данных. Выявите узкие места, добавьте индексы, перепишите неэффективные запросы.",
    category: "Database",
    grade: "Senior",
    tags: ["SQL", "PostgreSQL", "Performance Optimization"]
  },
  {
    id: 4,
    title: "Настройка CI/CD пайплайна",
    description: "Требуется настроить пайплайн непрерывной интеграции и доставки для проекта. Разработайте конфигурацию для автоматического тестирования, сборки и деплоя приложения.",
    category: "DevOps",
    grade: "Middle",
    tags: ["CI/CD", "GitLab", "Jenkins", "Docker"]
  },
  {
    id: 5,
    title: "Разработка микросервиса для обработки платежей",
    description: "Необходимо разработать микросервис для обработки платежей, интегрированный с платежными системами. Сервис должен поддерживать различные способы оплаты, обрабатывать транзакции и возвращать статусы платежей.",
    category: "Backend",
    grade: "Senior",
    tags: ["Java", "Spring Boot", "Microservices", "Payment Integration"]
  },
  {
    id: 6,
    title: "Создание мобильного приложения для фитнес-трекера",
    description: "Разработайте мобильное приложение для отслеживания физической активности. Реализуйте отслеживание шагов, калорий, сна и тренировок с возможностью установки целей и просмотра статистики.",
    category: "Mobile",
    grade: "Middle",
    tags: ["React Native", "Mobile Development", "Fitness Tracker"]
  },
  {
    id: 7,
    title: "Внедрение системы мониторинга",
    description: "Необходимо внедрить систему мониторинга для отслеживания производительности и доступности сервисов. Настройте сбор метрик, алерты и визуализацию данных.",
    category: "DevOps",
    grade: "Junior",
    tags: ["Prometheus", "Grafana", "Monitoring", "Alerting"]
  },
  {
    id: 8,
    title: "Разработка алгоритма рекомендаций",
    description: "Требуется разработать алгоритм рекомендаций для онлайн-магазина. Алгоритм должен анализировать поведение пользователей и предлагать товары на основе их предпочтений и истории покупок.",
    category: "Data Science",
    grade: "Senior",
    tags: ["Machine Learning", "Python", "Recommendations", "Data Analysis"]
  },
  {
    id: 9,
    title: "Создание плагина для IDE",
    description: "Разработайте плагин для популярной IDE, который поможет программистам автоматизировать рутинные задачи и повысить производительность разработки.",
    category: "Tooling",
    grade: "Middle",
    tags: ["IDE Extensions", "VSCode", "Developer Tools"]
  },
  {
    id: 10,
    title: "Реализация системы аутентификации",
    description: "Необходимо реализовать систему аутентификации с поддержкой OAuth2, JWT-токенов и двухфакторной аутентификации. Система должна быть безопасной и масштабируемой.",
    category: "Security",
    grade: "Senior",
    tags: ["Authentication", "OAuth2", "JWT", "2FA"]
  }
];

export const categories = [
  "All",
  "Backend",
  "Frontend",
  "Database",
  "DevOps",
  "Mobile",
  "Data Science",
  "Tooling",
  "Security"
];

export const grades = [
  "All",
  "Junior",
  "Middle",
  "Senior"
];

export const tags = [
  "Python",
  "Django",
  "REST API",
  "CRUD",
  "JavaScript",
  "Vue.js",
  "D3.js",
  "Data Visualization",
  "SQL",
  "PostgreSQL",
  "Performance Optimization",
  "CI/CD",
  "GitLab",
  "Jenkins",
  "Docker",
  "Java",
  "Spring Boot",
  "Microservices",
  "Payment Integration",
  "React Native",
  "Mobile Development",
  "Fitness Tracker",
  "Prometheus",
  "Grafana",
  "Monitoring",
  "Alerting",
  "Machine Learning",
  "Recommendations",
  "Data Analysis",
  "IDE Extensions",
  "VSCode",
  "Developer Tools",
  "Authentication",
  "OAuth2",
  "JWT",
  "2FA"
]; 