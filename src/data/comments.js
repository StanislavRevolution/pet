export const comments = {
  1: [
    {
      id: 1,
      taskId: 1,
      parentId: null,
      user: {
        id: 1,
        name: "Михаил Петров",
        avatar: "https://i.pravatar.cc/40?u=1"
      },
      text: "Интересная задача! Я бы рекомендовал также добавить валидацию данных при создании пользователя.",
      createdAt: "2023-08-10T12:45:30Z"
    },
    {
      id: 2,
      taskId: 1,
      parentId: 1,
      user: {
        id: 2,
        name: "Анна Сидорова",
        avatar: "https://i.pravatar.cc/40?u=2"
      },
      text: "Согласна, и еще хорошо бы добавить документацию API с использованием Swagger или drf-yasg.",
      createdAt: "2023-08-10T13:12:45Z"
    },
    {
      id: 3,
      taskId: 1,
      parentId: 1,
      user: {
        id: 3,
        name: "Алексей Козлов",
        avatar: "https://i.pravatar.cc/40?u=3"
      },
      text: "Также стоит рассмотреть использование кастомной модели пользователя вместо стандартной Django User.",
      createdAt: "2023-08-10T14:30:00Z"
    },
    {
      id: 4,
      taskId: 1,
      parentId: null,
      user: {
        id: 4,
        name: "Екатерина Новикова",
        avatar: "https://i.pravatar.cc/40?u=4"
      },
      text: "Как вы думаете, стоит ли реализовывать сортировку по нескольким полям одновременно?",
      createdAt: "2023-08-11T09:15:20Z"
    },
    {
      id: 5,
      taskId: 1,
      parentId: 4,
      user: {
        id: 1,
        name: "Михаил Петров",
        avatar: "https://i.pravatar.cc/40?u=1"
      },
      text: "Думаю, это будет полезно для более сложных запросов. Django REST Framework поддерживает такую возможность 'out of the box'.",
      createdAt: "2023-08-11T10:05:12Z"
    }
  ],
  2: [
    {
      id: 6,
      taskId: 2,
      parentId: null,
      user: {
        id: 5,
        name: "Дмитрий Волков",
        avatar: "https://i.pravatar.cc/40?u=5"
      },
      text: "Какую библиотеку для графиков лучше использовать с Vue.js? D3.js или есть более простые варианты?",
      createdAt: "2023-08-12T15:20:00Z"
    },
    {
      id: 7,
      taskId: 2,
      parentId: 6,
      user: {
        id: 2,
        name: "Анна Сидорова",
        avatar: "https://i.pravatar.cc/40?u=2"
      },
      text: "Я бы рекомендовала Chart.js или Vue-chart.js для простых случаев. D3.js отлично подходит, если нужны сложные кастомные визуализации.",
      createdAt: "2023-08-12T15:45:30Z"
    },
    {
      id: 8,
      taskId: 2,
      parentId: 6,
      user: {
        id: 6,
        name: "Павел Морозов",
        avatar: "https://i.pravatar.cc/40?u=6"
      },
      text: "ApexCharts тоже неплохой вариант, у него хорошая документация и много готовых примеров для Vue.",
      createdAt: "2023-08-12T16:10:15Z"
    },
    {
      id: 9,
      taskId: 2,
      parentId: null,
      user: {
        id: 7,
        name: "Ольга Смирнова",
        avatar: "https://i.pravatar.cc/40?u=7"
      },
      text: "А как лучше организовать обновление данных в реальном времени? WebSockets или периодический polling?",
      createdAt: "2023-08-13T10:30:45Z"
    },
    {
      id: 10,
      taskId: 2,
      parentId: 9,
      user: {
        id: 5,
        name: "Дмитрий Волков",
        avatar: "https://i.pravatar.cc/40?u=5"
      },
      text: "Зависит от требований. Для данных, которые обновляются часто, лучше WebSockets. Для редких обновлений может хватить polling.",
      createdAt: "2023-08-13T11:05:20Z"
    }
  ],
  3: [
    {
      id: 11,
      taskId: 3,
      parentId: null,
      user: {
        id: 8,
        name: "Игорь Соколов",
        avatar: "https://i.pravatar.cc/40?u=8"
      },
      text: "Оптимизация SQL-запросов - это искусство. Важно начать с анализа explain plan для выявления узких мест.",
      createdAt: "2023-08-14T14:25:10Z"
    },
    {
      id: 12,
      taskId: 3,
      parentId: 11,
      user: {
        id: 9,
        name: "Наталья Кузнецова",
        avatar: "https://i.pravatar.cc/40?u=9"
      },
      text: "Индексы очень важны, но не стоит создавать их слишком много, иначе операции вставки и обновления могут замедлиться.",
      createdAt: "2023-08-14T15:10:30Z"
    }
  ]
};

// Создаем пустые массивы комментариев для задач, у которых еще нет комментариев
for (let i = 4; i <= 10; i++) {
  comments[i] = [];
}

// Функция для получения всех комментариев для задачи
export function getCommentsForTask(taskId) {
  return comments[taskId] || [];
}

// Функция для добавления нового комментария (имитация)
export function addComment(taskId, parentId, user, text) {
  const newComment = {
    id: Math.max(0, ...Object.values(comments).flat().map(c => c.id)) + 1,
    taskId,
    parentId,
    user,
    text,
    createdAt: new Date().toISOString()
  };
  
  if (!comments[taskId]) {
    comments[taskId] = [];
  }
  
  comments[taskId].push(newComment);
  return newComment;
} 