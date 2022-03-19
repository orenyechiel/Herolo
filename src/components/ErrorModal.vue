<template>
  <div
    class="modal-fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <h5>We having some trouble fetching date, please try later</h5>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss">
.modal-fade {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1055;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
    background: rgba(0,0,0,.6);
    .modal-content {
        padding: 20px 14px 30px;
    }
}
</style>
