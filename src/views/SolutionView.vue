<template>
  <main-layout>
    <v-card v-if="solution">
      <v-card-title class="d-flex align-center">
        <div>Официальное решение</div>
        <v-spacer></v-spacer>
        <v-btn 
          color="primary" 
          variant="tonal" 
          :to="`/tasks/${taskId}`"
        >
          Вернуться к задаче
        </v-btn>
      </v-card-title>
      
      <v-card-text>
        <!-- Рендеринг markdown контента -->
        <div class="solution-content markdown-body" v-html="renderedContent"></div>
        
        <!-- Видео решение (если есть) -->
        <div v-if="solution.videoUrl" class="mt-6">
          <h3 class="mb-4">Видео-объяснение решения</h3>
          <div class="video-container">
            <iframe 
              width="100%" 
              height="400" 
              :src="solution.videoUrl" 
              title="Видео-решение" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </v-card-text>
    </v-card>
    
    <div v-else class="text-center pa-6">
      <v-progress-circular 
        v-if="loading" 
        indeterminate 
        color="primary"
        size="64"
      ></v-progress-circular>
      <v-card v-else>
        <v-card-text>
          <p>Решение для этой задачи еще не опубликовано.</p>
          <v-btn 
            color="primary" 
            class="mt-4" 
            :to="`/tasks/${taskId}`"
          >
            Вернуться к задаче
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '../components/layout/MainLayout.vue';
import { solutions } from '../data/solutions';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default {
  name: 'SolutionView',
  components: {
    MainLayout
  },
  props: {
    taskId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      solution: null,
      loading: true,
      renderedContent: ''
    };
  },
  created() {
    this.fetchSolution();
  },
  methods: {
    fetchSolution() {
      // Имитация загрузки данных
      setTimeout(() => {
        // Получаем решение из локальных данных
        this.solution = solutions[parseInt(this.taskId)];
        
        // Если есть описание, рендерим его как markdown
        if (this.solution && this.solution.description) {
          this.renderedContent = DOMPurify.sanitize(
            marked.parse(this.solution.description)
          );
        }
        
        this.loading = false;
      }, 500);
    }
  }
};
</script>

<style>
/* Стили для markdown-контента */
.markdown-body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  word-wrap: break-word;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-body h1 {
  font-size: 2em;
}

.markdown-body h2 {
  font-size: 1.5em;
}

.markdown-body h3 {
  font-size: 1.25em;
}

.markdown-body code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
}

.markdown-body pre {
  margin-top: 0;
  margin-bottom: 16px;
  word-wrap: normal;
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
}

.markdown-body pre code {
  padding: 0;
  margin: 0;
  font-size: 100%;
  background-color: transparent;
  border: 0;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style> 