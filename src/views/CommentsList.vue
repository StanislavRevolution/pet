<template>
  <main-layout>
    <v-card>
      <v-card-title class="d-flex align-center">
        <div>Комментарии к задаче</div>
        <v-spacer></v-spacer>
        <v-btn 
          color="primary" 
          variant="tonal" 
          :to="`/tasks/${id}`"
        >
          Вернуться к задаче
        </v-btn>
      </v-card-title>
      
      <v-card-text>
        <!-- Форма добавления комментария -->
        <v-card class="mb-6">
          <v-card-text>
            <div v-if="replyTo" class="pb-4">
              <v-alert
                density="compact"
                type="info"
                variant="tonal"
                closable
                @click:close="cancelReply"
              >
                Ответ на комментарий пользователя {{ replyTo.user.name }}
              </v-alert>
            </div>
            
            <v-textarea
              v-model="newCommentText"
              label="Ваш комментарий"
              auto-grow
              variant="outlined"
              rows="3"
            ></v-textarea>
            
            <div class="d-flex justify-end">
              <v-btn
                v-if="replyTo"
                variant="text"
                class="mr-2"
                @click="cancelReply"
              >
                Отменить ответ
              </v-btn>
              <v-btn
                color="primary"
                @click="addComment"
                :disabled="!newCommentText.trim()"
              >
                Отправить
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
        
        <!-- Список комментариев -->
        <div v-if="comments.length === 0" class="text-center pa-4">
          <p>Пока нет комментариев. Будьте первым!</p>
        </div>
        
        <div v-else>
          <!-- Отображаем только комментарии верхнего уровня -->
          <comment-item
            v-for="comment in topLevelComments"
            :key="comment.id"
            :comment="comment"
            :replies="getCommentReplies(comment.id)"
            @reply="setReplyTo"
          ></comment-item>
        </div>
      </v-card-text>
    </v-card>
  </main-layout>
</template>

<script>
import MainLayout from '../components/layout/MainLayout.vue';
import CommentItem from '../components/comments/CommentItem.vue';
import { getCommentsForTask, addComment } from '../data/comments';

export default {
  name: 'CommentsList',
  components: {
    MainLayout,
    CommentItem
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      comments: [],
      newCommentText: '',
      replyTo: null,
      currentUser: {
        id: 1, // Предполагаем, что текущий пользователь - это первый пользователь
        name: 'Михаил Петров',
        avatar: 'https://i.pravatar.cc/40?u=1'
      }
    };
  },
  computed: {
    // Комментарии верхнего уровня (без родителя)
    topLevelComments() {
      return this.comments.filter(comment => comment.parentId === null);
    }
  },
  created() {
    this.fetchComments();
  },
  methods: {
    fetchComments() {
      // Получаем комментарии для данной задачи
      this.comments = getCommentsForTask(parseInt(this.id));
    },
    getCommentReplies(commentId) {
      // Получаем ответы на конкретный комментарий
      return this.comments.filter(comment => comment.parentId === commentId);
    },
    setReplyTo(comment) {
      // Устанавливаем комментарий, на который отвечаем
      this.replyTo = comment;
    },
    cancelReply() {
      // Отменяем ответ
      this.replyTo = null;
    },
    addComment() {
      if (!this.newCommentText.trim()) return;
      
      // Добавляем новый комментарий
      const parentId = this.replyTo ? this.replyTo.id : null;
      const newComment = addComment(
        parseInt(this.id),
        parentId,
        this.currentUser,
        this.newCommentText
      );
      
      // Добавляем комментарий в локальный массив
      this.comments.push(newComment);
      
      // Сбрасываем форму
      this.newCommentText = '';
      this.replyTo = null;
    }
  }
};
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style> 