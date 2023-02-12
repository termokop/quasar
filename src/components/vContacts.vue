<template>
  <div class="content">
      <p class="center">Контакти розробника:</p>
      <div :class="logoBox" class="center">
          <a href="https://www.instagram.com/hruba.yurii/"  target="_blank"><img class="contacts" src="../assets/inst.svg" alt=""></a>
          <a href="https://t.me/termokop"  target="_blank"><img class="contacts" src="../assets/tl.svg" alt=""></a>
          <a href="https://www.facebook.com/termokop"  target="_blank"><img class="contacts" src="../assets/fb.svg" alt=""></a>
      </div>
      <p>
          Пишіть мені з приводу проблем, пропозицій та ідей. Залюбки вислухаю кожного.
      </p>
  </div>
</template>

<script>

export default {
  name: 'vContacts',
}

</script>

<style scoped>
.content {
  padding-left: 20px;
}

.contacts {
  width: 33%;
}
.logoBox {
  width: 200px;
}

</style>
