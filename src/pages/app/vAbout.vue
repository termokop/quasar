<template>
  <q-card class="card">
    <q-card-section>
      <p class="center text-h6">Про проєкт</p>
    </q-card-section>
    <q-separator/>
    <q-card-section>
      <p>Україна та Сакартвело (на території колишнього ссср цю країну все ще офіційно називають Грузією) це дві держави, які мають чимось схожу історію. За останні десятиліття наші народи стали ближчими один з одним, ріднішими.</p>
      <p>Але так історично склалося, що в більшості випадків для комунікації ми використовуємо російську. І причина доволі сумна: немає (або я погано шукав) нормальних матеріалів таких як підручник, посібник з картвельської мови українською. Є словник в трьох томах, але з великою кількістю помилок в українських словах (все ж краще, ніж нічого). Та є матеріали ентузіастів, які інвестують свій час, енергію та ресурси у вирішення даної проблеми.</p>
      <p>Ті україномовні навчальні матеріали, які було знайдено, ви можете завантажити тут:</p>
      <div class="center">
        <q-btn
          type="info"
          color="primary"
          label="Завантажити"
          @click="dialog = true"
        />
      </div>
      <p>Тож, було прийнято рішення зайнятися розробкою даного проекту, систематизувавши, доповнивши та змінившии існуючий матеріал з даної тематики. Результатом роботи є даний сайт.</p>
      <p>Якщо Ви бажаєте стати частиною цього, зв'яжіться зі мною.</p>

      <div class="center">
        <q-btn
            type="info"
            color="primary"
            label="Контакти розробника"
            @click="contacts = true"
          />
      </div>
    </q-card-section>
  </q-card>

<q-dialog v-model="dialog">
      <q-card bordered class="card">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Завантажити матеріали:</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-list >

            <q-item style="width: fit-content; margin: auto;">
              <q-btn
                noCaps
                color="warning"
                href="https://ukrge.site/download/tom_1.pdf"
                target="_blank"
                label="Ґарі Чапідзе. Українсько-грузинський словник. А-Й"
              />
            </q-item>
            <q-item style="width: fit-content; margin: auto;">
              <q-btn
                noCaps
                color="warning"
                href="https://ukrge.site/download/tom_2.pdf"
                target="_blank"
                label="Ґарі Чапідзе. Українсько-грузинський словник. К-П"
              />
            </q-item>
            <q-item style="width: fit-content; margin: auto;">
              <q-btn
                noCaps
                color="warning"
                href="https://ukrge.site/download/tom_3.pdf"
                target="_blank"
                label="Ґарі Чапідзе. Українсько-грузинський словник. Р-Я"
              />
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>


    <q-dialog v-model="contacts">
      <q-card bordered class="card">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Контакти розробника</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <vContacts :language="language"></vContacts>
        </q-card-section>
      </q-card>
    </q-dialog>

</template>

<script>
import vContacts from 'src/components/vContacts.vue';

  export default {
    name: 'vAbout',
    components: {
      vContacts,
    },
    data() {
      return {
        language: 'ua',
        dialog: false,
        contacts: false
      }
    }

  }
</script>
