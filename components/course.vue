<template>

  <div class="course">
    <div class="course-image">
      <img :src="course.image" alt="" />
    </div>
    <div class="course-info">
      <h2 class="title mb-2">
          {{ course.course }}
          <span class="badge light" v-if="!course.active"
          >Em breve</span
          >
      </h2>
      <p class="description mb-2">{{ course.description }}</p>

      <!-- REVIEW -->
      <review
          :course="course"
          :rating-avg="calcRating()"
          @newreview="onNewReview"></review>
      <!-- REVIEW - FIM -->

      <div class="course-actions pa-1">
        <!-- Desafio: Como fazer o valor 'FREE' também pegar a cor customizada?-->

        <p v-if="course.price == 0" class="badge keep-left bold">
        FREE
        </p>
        <p
        v-else
        class="badge keep-left bold"
        :style="{ 'background-color': course.style && course.style.priceColor ? course.style.priceColor : theme.priceColorDefault }"
        >
        R$ {{ course.price }}
        </p>

        <span v-if="course.message" class="keep-left bold"
        >{{ course.message }}</span>

        <span>{{ course.duration }} horas</span>
        <button
        :class="{btn: true, 'btn-primary': course.active}"
        :disabled="!course.active"
        @click="addCourse"
        >
        {{ course.price > 0 ? 'Comprar Curso' : 'Iniciar Curso'}}
        </button>
      </div>

    </div>
  </div>

</template>

<script>
module.exports = {
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      theme: {
        priceColorDefault: "#56ad80",
      },
    }
  },
  methods: {
    addCourse() {
      /**
       * Apenas repassa o curso clicado
       */
      this.$emit('addcourse', this.course);
    },
    calcRating() {
      /**
       * Com base em todas reviews, retorna a média da nota
       * Este método estava calculando a nota e retornando uma
       * string formatada, agora retorna o NÚMERO (média de verdade)
       */
      let reviews = this.course.reviews;
      let total = 0;
      if (!reviews || reviews.length == 0) {
        return 0;
      }
      for (let index in reviews) {
        total += reviews[index].rating;
      }
      return (total / reviews.length);
    },
    onNewReview(mensagem) {
      this.$emit('newreview', mensagem);
    }
  },
  components: {
    'review': httpVueLoader('./review.vue'),
  }
}
</script>
