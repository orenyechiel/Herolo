<template>
  <header>
    <div class="container">
      <div class="inner-wrap">
        <span>Weather Task</span>

        <div class="btns-wrap d-flex">
          <button class="btn btn-secondary btn-lg" @click="changePanel('HomePage')">Home</button>
          <button class="btn btn-warning btn-lg" @click="changePanel('FavoritesPage')">Favoriets</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "HeaderTop",
  methods: {
    ...mapMutations(["changePanel"]),
  },
};
</script>

<style scoped lang="scss">
header {
  padding: 20px 0;
  background: rgba(0, 0, 0, 0.6);
  .inner-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btns-wrap {
      gap: 14px;
    }
    span {
      color: whitesmoke;
      font-size: 24px;
    }
  }
}
</style>