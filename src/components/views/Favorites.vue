<template>
  <div class="favorites">
    <div class="container">
      <div class="forecast d-md-flex justify-content-center flex-wrap">
        <div class="card" v-for="item in getFavorites" :key="item.id">
          <div class="card-body text-center">
            <a
              @click.prevent="
                fetchNewLocation(item.id);
                fetchCurrentCondition(item.id);
                changeCurrentConditionCity(item.city);
                changePanel('HomePage');
              "
              class="link-info"
              >{{ item.city }} - {{ item.temp }}{{ item.unit }}</a
            >
            <p class="card-text text-center">
              {{ item.status }}
            </p>
          </div>

          <button
            type="button"
            class="btn btn-danger"
            @click="removeFavorite(item.id)"
          >
            Remove from Favorites
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "FavoritesPage",
  computed: {
    ...mapGetters(["getFavorites"]),
  },
  methods: {
    ...mapMutations([
      "changeCurrentConditionCity",
      "changePanel",
      "removeFavorite",
    ]),
    ...mapActions(["fetchNewLocation", "fetchCurrentCondition"]),
  },
};
</script>

<style lang="scss" scoped>
.forecast {
  gap: 20px 26px;
}
.card {
  cursor: pointer;
  box-shadow: 0 3px 7px 0 rgba(19, 23, 111, 0.12);
  transition: box-shadow 0.3s ease;
  &:hover,
  &:focus {
    box-shadow: 0 5px 53px 0 rgba(19, 23, 111, 0.15);
  }
  .card-text {
    font-size: 18px;
  }
}
</style>