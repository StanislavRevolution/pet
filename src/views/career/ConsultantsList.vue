<template>
  <div>
    <h2 class="text-h4 mb-6">Карьерные консультанты</h2>
    <p class="text-body-1 mb-6">
      Наши карьерные консультанты — это профессиональные HR-специалисты и рекрутеры, которые дадут советы с точки зрения нанимателя, помогут правильно составить резюме, подготовиться к собеседованию и выстроить карьерную стратегию.
    </p>
    <v-row>
      <v-col
        v-for="consultant in consultants"
        :key="consultant.id"
        cols="12"
      >
        <v-card class="mb-4 rounded-lg consultant-card">
          <v-row no-gutters>
            <v-col cols="12" md="3" class="pa-4 consultant-avatar-container">
              <v-img :src="consultant.avatar" height="200" class="rounded-lg mb-2" cover></v-img>
              <div v-if="consultant.freeFirstSession" class="d-flex align-center text-body-2">
                <v-icon small color="success" class="mr-1">mdi-check-circle</v-icon>
                <span>Первое занятие бесплатно</span>
              </div>
            </v-col>
            <v-col cols="12" md="9" class="pa-4">
              <div class="d-flex justify-space-between align-start mb-2">
                <div>
                  <h3 class="text-h5 font-weight-bold">{{ consultant.name }}</h3>
                  <div class="text-subtitle-1 text-primary">{{ consultant.title }}</div>
                  <div class="text-caption text-grey mt-1">Опыт в HR: {{ consultant.yearsExperience }} лет</div>
                </div>
                <div class="price-tag pa-2 ml-4">
                  от {{ consultant.rateHour }} ₽
                </div>
              </div>
              <p class="my-4 text-body-2 consultant-bio">{{ consultant.bio }}</p>
              <div v-if="consultant.services && consultant.services.length">
                <span class="text-caption text-grey">Консультации по:</span>
                <div class="d-flex flex-wrap mt-1">
                  <v-chip
                    v-for="service in consultant.services"
                    :key="service"
                    class="mr-2 mb-2"
                    size="small"
                    variant="flat"
                    color="grey-lighten-3"
                  >
                    {{ service }}
                  </v-chip>
                </div>
              </div>
              <v-divider class="my-4"></v-divider>
              <div class="d-flex align-center">
                <v-btn color="primary" class="mr-2" variant="flat">Написать</v-btn>
                <v-btn variant="outlined">Подробнее</v-btn>
                <v-spacer></v-spacer>
                <v-rating
                  v-if="consultant.rating"
                  :model-value="consultant.rating"
                  color="amber"
                  density="compact"
                  half-increments
                  readonly
                  size="small"
                ></v-rating>
                 <span v-if="consultant.rating" class="ml-1 text-caption text-grey">{{ consultant.rating }}</span>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ConsultantsList",
  data() {
    return {
      // Добавьте сюда данные консультантов, если они еще не были добавлены в прошлых шагах
      consultants: [
        {
          id: 1,
          name: 'Анна Смирнова',
          title: 'HR-менеджер',
          specialization: 'HR-менеджер',
          yearsExperience: 8,
          rating: 4.8,
          rateHour: 3500,
          freeFirstSession: true,
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
          bio: 'HR-менеджер с 8-летним опытом работы в IT-компаниях. Помогу составить сильное резюме, подготовиться к собеседованию и разработать стратегию карьерного роста.',
          services: [
            'Резюме для релокации',
            'Карьерная стратегия',
            'Подготовка к собеседованию',
            'Упаковка опыта'
          ]
        },
        {
          id: 2,
          name: 'Дмитрий Петров',
          title: 'Рекрутер IT-компаний',
          specialization: 'Рекрутер',
          yearsExperience: 5,
          rating: 4.5,
          rateHour: 2500,
          freeFirstSession: true,
          avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          bio: 'Рекрутер в IT с 5-летним опытом. Знаю, на что обращают внимание работодатели при найме. Помогу подготовиться к собеседованию и избежать типичных ошибок.',
          services: [
            'Подготовка к собеседованию',
            'Ответы на каверзные вопросы',
            'Красные флаги на собеседовании',
            'Обсуждение зарплаты'
          ]
        },
         {
          id: 3,
          name: 'Елена Козлова',
          title: 'HR-директор',
          specialization: 'HR-директор',
          yearsExperience: 12,
          rating: 4.9,
          rateHour: 5000,
          freeFirstSession: false,
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          bio: 'HR-директор с опытом работы в крупных IT-компаниях. Помогу выстроить долгосрочную карьерную стратегию, подготовиться к собеседованиям на руководящие позиции.',
          services: [
            'Карьерная стратегия',
            'Упаковка опыта',
            'Обсуждение зарплаты',
            'Составление сопроводительного'
          ]
        },
        {
          id: 4,
          name: 'Олег Волков',
          title: 'Специалист по релокации',
          specialization: 'Специалист по релокации',
          yearsExperience: 6,
          rating: 4.7,
          rateHour: 4000,
          freeFirstSession: true,
          avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          bio: 'Помогаю IT-специалистам с релокацией. Знаю особенности резюме для европейского и американского рынков, помогу правильно презентовать ваш опыт.',
          services: [
            'Резюме для релокации',
            'Составление сопроводительного',
            'Подготовка к собеседованию',
            'Красные флаги на собеседовании'
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.price-tag {
  background-color: #e8f5e9; /* Светло-зеленый фон */
  color: #388e3c; /* Темно-зеленый текст */
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  display: inline-block;
  white-space: nowrap;
}
.consultant-card {
  transition: box-shadow 0.2s ease-in-out;
}
.consultant-card:hover {
   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
}
.consultant-avatar-container {
  min-width: 180px; /* Немного уменьшил для лучшего вида */
}
.consultant-bio {
  color: rgba(0, 0, 0, 0.7);
  line-height: 1.5;
}

</style>