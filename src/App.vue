<template>
  <HeaderTop />
  <MainLayout />
  <ErrorModal v-if="isErrorFromServer"/>
</template>

<script>
import { mapGetters } from 'vuex';
import ErrorModal from './components/ErrorModal.vue';
import HeaderTop from "./components/Header.vue";
import MainLayout from "./components/MainLayout.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    MainLayout,
    HeaderTop,
    ErrorModal,
  },
  computed: {
    ...mapGetters(['isErrorFromServer'])
  }
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";

</style>
