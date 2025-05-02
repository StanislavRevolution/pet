export const solutions = {
  1: {
    description: `
      # Решение задачи "Разработка API для управления пользователями"
      
      Для реализации CRUD-эндпоинтов с использованием Django REST Framework необходимо следовать следующим шагам:
      
      1. Создание моделей пользователей
      2. Создание сериализаторов
      3. Создание представлений (ViewSets)
      4. Настройка URL-маршрутов
      5. Реализация фильтрации и пагинации
      
      ## Основной код решения:
      
      \`\`\`python
      # models.py
      from django.db import models
      
      class User(models.Model):
          username = models.CharField(max_length=100, unique=True)
          email = models.EmailField(unique=True)
          first_name = models.CharField(max_length=100)
          last_name = models.CharField(max_length=100)
          is_active = models.BooleanField(default=True)
          created_at = models.DateTimeField(auto_now_add=True)
          updated_at = models.DateTimeField(auto_now=True)
          
          def __str__(self):
              return self.username
      
      # serializers.py
      from rest_framework import serializers
      from .models import User
      
      class UserSerializer(serializers.ModelSerializer):
          class Meta:
              model = User
              fields = '__all__'
              
      # views.py
      from rest_framework import viewsets, filters
      from django_filters.rest_framework import DjangoFilterBackend
      from .models import User
      from .serializers import UserSerializer
      
      class UserViewSet(viewsets.ModelViewSet):
          queryset = User.objects.all()
          serializer_class = UserSerializer
          filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
          filterset_fields = ['is_active']
          search_fields = ['username', 'email', 'first_name', 'last_name']
          ordering_fields = ['created_at', 'username']
          
      # urls.py
      from django.urls import path, include
      from rest_framework.routers import DefaultRouter
      from .views import UserViewSet
      
      router = DefaultRouter()
      router.register(r'users', UserViewSet)
      
      urlpatterns = [
          path('api/', include(router.urls)),
      ]
      \`\`\`
      
      ## Реализация пагинации
      
      В файле settings.py:
      
      \`\`\`python
      REST_FRAMEWORK = {
          'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
          'PAGE_SIZE': 10,
          'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
      }
      \`\`\`
    `,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  2: {
    description: `
      # Решение задачи "Создание интерактивной дашборд-панели"
      
      Для создания интерактивной дашборд-панели с использованием Vue.js и D3.js необходимо:
      
      1. Создать компоненты для отображения различных типов графиков и таблиц
      2. Реализовать фильтрацию данных
      3. Настроить обновление данных в реальном времени
      
      ## Пример основного кода решения:
      
      \`\`\`javascript
      // Dashboard.vue
      <template>
        <div class="dashboard">
          <div class="filters">
            <date-range-picker v-model="dateRange" @change="updateData" />
            <category-filter v-model="categories" @change="updateData" />
          </div>
          <div class="charts-container">
            <sales-chart :data="filteredData.sales" />
            <revenue-chart :data="filteredData.revenue" />
            <products-pie-chart :data="filteredData.products" />
          </div>
          <data-table :data="filteredData.table" />
        </div>
      </template>
      
      <script>
      import DateRangePicker from './components/DateRangePicker.vue';
      import CategoryFilter from './components/CategoryFilter.vue';
      import SalesChart from './components/SalesChart.vue';
      import RevenueChart from './components/RevenueChart.vue';
      import ProductsPieChart from './components/ProductsPieChart.vue';
      import DataTable from './components/DataTable.vue';
      import { fetchDashboardData } from '@/api/dashboard';
      
      export default {
        components: {
          DateRangePicker,
          CategoryFilter,
          SalesChart,
          RevenueChart,
          ProductsPieChart,
          DataTable
        },
        data() {
          return {
            dateRange: {
              start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
              end: new Date()
            },
            categories: [],
            rawData: {},
            filteredData: {
              sales: [],
              revenue: [],
              products: [],
              table: []
            }
          };
        },
        mounted() {
          this.fetchData();
        },
        methods: {
          async fetchData() {
            try {
              this.rawData = await fetchDashboardData();
              this.updateData();
            } catch (error) {
              console.error('Error fetching dashboard data:', error);
            }
          },
          updateData() {
            // Filter data based on selected date range and categories
            this.filteredData = this.filterData(this.rawData);
          },
          filterData(data) {
            // Implementation of data filtering logic
            // ...
            return filteredData;
          }
        }
      };
      </script>
      \`\`\`
    `,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  3: {
    description: `
      # Решение задачи "Оптимизация SQL-запросов"
      
      Для оптимизации SQL-запросов необходимо:
      
      1. Анализировать выполнение запросов с помощью EXPLAIN
      2. Создавать индексы для ускорения поиска
      3. Переписывать неэффективные запросы
      4. Оптимизировать сложные JOIN операции
      
      ## Пример оптимизации:
      
      ### Исходный запрос:
      
      \`\`\`sql
      SELECT o.id, o.order_date, c.name, c.email, 
             p.name, oi.quantity, p.price
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      WHERE o.order_date > '2022-01-01'
      ORDER BY o.order_date DESC;
      \`\`\`
      
      ### Анализ проблем:
      
      1. Отсутствие индексов на ключевых полях
      2. Избыточная выборка данных
      3. Неоптимальный порядок JOIN операций
      
      ### Оптимизированный запрос:
      
      \`\`\`sql
      -- Добавление необходимых индексов
      CREATE INDEX idx_orders_date ON orders(order_date);
      CREATE INDEX idx_order_items_order_id ON order_items(order_id);
      
      -- Оптимизированный запрос
      SELECT o.id, o.order_date, c.name, c.email, 
             p.name, oi.quantity, p.price
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      JOIN customers c ON o.customer_id = c.id
      WHERE o.order_date > '2022-01-01'
      ORDER BY o.order_date DESC
      LIMIT 1000;
      \`\`\`
      
      ### Другие оптимизации:
      
      1. Использование подзапросов вместо JOIN, когда это более эффективно
      2. Применение материализованных представлений для часто используемых запросов
      3. Разбиение таблиц (партиционирование) для больших объемов данных
      4. Использование подходящих типов данных для колонок
    `,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
};

// Создаем шаблонные решения для остальных задач
for (let i = 4; i <= 10; i++) {
  solutions[i] = {
    description: `# Решение задачи №${i}
    
    Подробное описание решения задачи будет доступно позже.
    
    ## Основные шаги решения:
    
    1. Анализ требований
    2. Проектирование архитектуры
    3. Реализация основного функционала
    4. Тестирование и отладка
    5. Оптимизация и рефакторинг
    `,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  };
} 