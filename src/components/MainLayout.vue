<template>
  <main class="hello">
    <div class="container">
      <component :is="getPanel" />
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import HomePage from "./views/Home.vue";
import FavoritesPage from "./views/Favorites.vue";

export default {
  components: { FavoritesPage, HomePage },
  name: "MainLayout",
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters(['getPanel'])
  },
};
</script>

<style lang="scss">
main {
  padding: 50px 0 40px;
}
</style>
