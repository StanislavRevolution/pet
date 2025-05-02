<template>
  <v-card class="mb-4">
    <v-card-text>
      <div class="d-flex align-center">
        <v-avatar size="40" class="mr-3">
          <v-img :src="comment.user.avatar" alt="User Avatar"></v-img>
        </v-avatar>
        <div>
          <div class="font-weight-bold">{{ comment.user.name }}</div>
          <div class="text-caption">{{ formatDate(comment.createdAt) }}</div>
        </div>
      </div>
      
      <div class="mt-3">{{ comment.text }}</div>
      
      <div class="d-flex justify-end mt-2">
        <v-btn 
          size="small" 
          variant="text" 
          color="primary"
          @click="reply"
        >
          Ответить
        </v-btn>
      </div>
    </v-card-text>
    
    <!-- Ответы на комментарий -->
    <div v-if="replies && replies.length > 0" class="pl-6">
      <v-card
        v-for="replyComment in replies"
        :key="replyComment.id"
        class="mb-3 ml-6"
        variant="outlined"
      >
        <v-card-text>
          <div class="d-flex align-center">
            <v-avatar size="32" class="mr-3">
              <v-img :src="replyComment.user.avatar" alt="User Avatar"></v-img>
            </v-avatar>
            <div>
              <div class="font-weight-bold">{{ replyComment.user.name }}</div>
              <div class="text-caption">{{ formatDate(replyComment.createdAt) }}</div>
            </div>
          </div>
          
          <div class="mt-2">{{ replyComment.text }}</div>
          
          <div class="d-flex justify-end mt-1">
            <v-btn 
              size="x-small" 
              variant="text" 
              color="primary"
              @click="replyToReply(replyComment)"
            >
              Ответить
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    },
    replies: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    },
    reply() {
      this.$emit('reply', this.comment);
    },
    replyToReply(replyComment) {
      this.$emit('reply', replyComment);
    }
  }
};
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style> 