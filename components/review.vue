<template>
  <div>
    <p>
      <i class="fa-solid fa-face-grin-stars"></i>
      <span
        v-if="course.reviews && course.reviews.length > 0"
        class="rating bold ml-2"
        >{{ ratingAvg.toFixed(1) }}</span
      >
      <span v-else class="rating ml-2">Sem revisão</span>
    </p>

    <ul>
      <li
        :class="{tabs: true, activeTab: course.selectedTab === 'Notas' }"
        @click="selectTab('Notas')"
      >
        Notas
      </li>
      <li
        :class="{tabs: true, activeTab: course.selectedTab === 'Dar uma nota' }"
        @click="selectTab('Dar uma nota')"
      >
        Dar uma nota
      </li>
    </ul>

    <div v-show="course.selectedTab == 'Notas'">
      <div class="my-2">
        <div v-if="course.reviews && course.reviews.length == 0">
          <h3>Este curso ainda não tem revisões...</h3>
          <button
            class="pa-1"
            @click="selectTab('Dar uma nota')"
          >
            Dar uma nota
          </button>
        </div>

        <table v-else data-table-theme="default zebra">
          <caption>
            O que estão falando do {{ course.course.split(" - ")[0]
            || 'curso' }}
          </caption>
          <thead>
            <tr>
              <th>Data</th>
              <th>Nome</th>
              <th>Revisão</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="review in course.reviews">
              <td class="px-1">
                {{ new Date(review.date).toLocaleDateString('pt-br')
                }}
              </td>
              <td class="px-1">{{ review.name }}</td>
              <td class="px-1">{{ review.review }}</td>
              <td class="px-1">{{ review.rating.toFixed(1) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-show="course.selectedTab == 'Dar uma nota'">
      <form class="form-review" @submit.prevent="sendRewiew()">
        <p class="form-group">
          <label for="name">Name:</label>
          <input
            class="form-control"
            id="name"
            v-model="course.name"
            placeholder="Digite seu nome"
          />
        </p>

        <p class="form-group">
          <label for="review">Review:</label>
          <textarea
            class="form-control"
            id="review"
            v-model="course.review"
            rows="10"
            placeholder="O que você gostou ou não gostou?"
          ></textarea>
        </p>
        <p class="form-group">
          <label for="rating">Nota:</label>
          <select
            class="form-control"
            id="rating"
            name="rating"
            v-model.number="course.rating"
          >
            <option></option>
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>
        <ul>
          <li class="text-error" v-for="error in course.errors">
            {{ error }}
          </li>
        </ul>
        <p class="form-group center">
          <input type="submit" value="Enviar" class="btn btn-sm" />
        </p>
      </form>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    course: {
      type: Object,
    },
    ratingAvg: {
      type: Number,
      default: 0
    }
  },
  data: function() {
      return {
        visible: false,
        timer: null,
        style: {
          "vue-toast": true,
          success: true,
          hide: false,
        },
      }
  },
  methods: {
    selectTab(tab) {
      this.course.selectedTab = tab;
    },
    sendRewiew() {
      /* 
      Como utiliar recursos do HTML para não precisar do código de validação abaixo?
      Existe alguma vantagem em fazer assim?
      **/
      this.course.errors = [];
      if (!this.course.name || !this.course.name.trim()) {
        this.course.errors.push("Campo nome precisa ser preenchido");
      }
      if (!this.course.rating) {
        this.course.errors.push("Selecione uma nota");
      }

      if (this.course.errors.length > 0) {
        return;
      }

      let newReview = {
        date: new Date().toISOString(),
        name: this.course.name,
        review: this.course.review,
        rating: this.course.rating,
      };
      this.course.reviews.push(newReview);
      this.course.rating = undefined;
      this.course.name = undefined;
      this.course.review = undefined;
      this.course.selectedTab = undefined;

      // Envia evento de baixo para cima (do componente para seu criador)
      this.$emit('newreview', "Sua reivão foi enviada! Muito obrigado pela contribuição");
    },
  }
}
</script>

<style>

</style>