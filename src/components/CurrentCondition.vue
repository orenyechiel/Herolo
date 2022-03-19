<template>
  <div class="current-condition">
    <h3 class="current-city">{{ cityName }}</h3>
    <span class="city-temperature">
      {{ value }}
      {{ unit }}
    </span>
  </div>
</template>

<script>
export default {
  name: "CurrentCondition",
  props: ["cityName","value", "unit"],
};
</script>

<style lang="scss" scoped>

  .current-city {
    font-size: 20px;
  }
  .city-temperature {
    font-size: 20px;
  }
</style>