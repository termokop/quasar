<template>

<div class="about">
    <h1>{{ dictionaryModal.history.title['language'] }}</h1>
    <span v-html=" dictionaryModal.history.description[language]"></span>
    <vContacts :language="language" :widthLogoBox="'60px'"></vContacts>
</div>

</template>

<script>
import dictionaryModal from 'src/helpers/dictionary/modals';
import vContacts from 'src/components/vContacts.vue';

  export default {
    name: 'vAbout',
    components: {
      vContacts,
    },
    data() {
      return {
        language: 'ua',
        dictionaryModal,
      }
    }

  }
</script>
