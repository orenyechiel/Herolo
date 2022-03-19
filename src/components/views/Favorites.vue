<template>
  <div class="favorites">
    <div class="container">
      <div class="forecast d-flex">
        
        <div v-for="item in amount" :key="item" class="card" style="width: 18rem">
          <img class="card-img-top" alt="..." />
          <div class="card-body">
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FavoritesPage",
  data() {
    return {
      amount: 7,
    };
  },
};
</script>

<style lang="scss">

</style>