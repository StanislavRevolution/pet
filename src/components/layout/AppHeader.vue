<template>
  <v-app-bar 
    app 
    color="#ffffff" 
    elevation="0" 
    class="header-container mt-4"
  >
    <v-container class="d-flex align-center px-4" style="max-width: 1440px">
      <v-app-bar-title class="font-weight-bold accent-text">Платформа для бизнес-задач</v-app-bar-title>
      
      <v-tabs 
        v-model="activeTab" 
        align-with-title 
        centered 
        color="#ff5734" 
        hide-slider 
        height="64"
      >
        <v-tab 
          v-for="(item, index) in menuItems" 
          :key="index" 
          :value="item.route" 
          :to="item.route" 
          class="mx-2 text-body-1 font-weight-medium transition-swing rounded-lg"
          style="min-width: auto"
        >
          {{ item.title }}
        </v-tab>
      </v-tabs>
      
      <div class="ml-auto">
        <v-btn icon variant="text" class="ml-2">
          <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
        <v-btn icon variant="text" class="ml-2">
          <v-icon>mdi-account-circle-outline</v-icon>
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      activeTab: this.$route.path.split("/")[1],
      menuItems: [
        {title: "Задачи", route: "/tasks"},
        {title: "Лидерборд", route: "/leaderboard"},
        {title: "Активность", route: "/activity"},
        {title: "Менторство", route: "/mentorship"},
        {title: "Карьера", route: "/career"}
      ]
    };
  },
  watch: {
    "$route"(to) {
      this.activeTab = to.path.split("/")[1];
    }
  }
};
</script>

<style scoped>
.v-tab {
  opacity: 0.8;
  transition: all 0.3s ease;
  border-radius: 16px !important;
}

.v-tab:hover, .v-tab--selected {
  opacity: 1;
  background: rgba(255, 87, 52, 0.1);
}

.header-container {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  width: 100% !important;
}

.accent-text {
  color: #ff5734;
}
</style>
