<template>
  <HeaderTop />
  <MainLayout />
  <ErrorModal :msg="errorMsg" v-if="isErrorFromServer"/>
</template>

<script>
import { mapGetters } from 'vuex';
import ErrorModal from './components/ErrorModal.vue';
import HeaderTop from "./components/Header.vue";
import MainLayout from "./components/MainLayout.vue";

export default {
  name: "App",
  data() {
    return {
      errorMsg: "We having some trouble fetching data, please try later"
    };
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
