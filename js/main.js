
var app = new Vue({
  el: "#app",
  data: {
    shoppingList: [],
    studyingList: [],
    courses: [
      {
        id: 1,
        course: "D-Já Vue - Uma jornada pela Web",
        image: "./images/dejavu_matrix.jpg",
        description: "Como construir aplicações web com agilidade e qualidade.",
        duration: 42,
        active: true,
        price: 100,
        message: "👉 50% Desconto! Últimos dias",
        style: {
          priceColor: "#ffc31c",
        },
        showReview: false,
        reviews: [],
        rating: null,
      },
      {
        id: 2,
        course: "Git - Via terminal para aprender da forma correta!",
        image: "./images/logo-git-430-215-v3.jpg",
        description:
          "Entendendo Git através dos primeiros comandos via linha de comando.",
        duration: 21,
        active: false,
        price: 900,
        message: "👈 Melhor curso do mercado",
        showReview: false,
        reviews: [],
      },
      {
        id: 3,
        course: "Linux - Entendendo a tela preta!",
        image: "./images/logo-linux960x430.jpg",
        description:
          "Entendendo Git através dos primeiros comandos via linha de comando.",
        duration: 21,
        active: true,
        price: 0,
        showReview: false,
        reviews: [],
      },
    ],
    theme: {
      priceColorDefault: "#56ad80",
    },
  },
  methods: {
    addCourse(course) {
      /**
       * Adiciona curso na lista de compras se o valor for > 0
       * caso contrário, adiciona na lista de estudos
       */
      let targetList = this.shoppingList;
      if (course.price == 0) {
        targetList = this.studyingList;
      }
      targetList.push(course);
    },
    toggleReview(index) {
      this.courses[index].showReview = !this.courses[index].showReview;
    },
    sendRewiew(courseIndex) {
      if (!this.courses[courseIndex].rating) {
        alert("Selecione um nota antes de enviar!");
        return;
      }
      let newReview = {
        date: new Date().toISOString(),
        rating: this.courses[courseIndex].rating,
      };
      this.courses[courseIndex].reviews.push(newReview);
      this.courses[courseIndex].rating = undefined;
      this.courses[courseIndex].showReview = false;
    },
    calcRating(courseIndex) {
      let reviews = this.courses[courseIndex].reviews;
      let total = 0;
      if (!reviews || reviews.length == 0) {
        return 0;
      }
      for (let index in reviews) {
        total += reviews[index].rating;
      }
      return (total / reviews.length).toFixed(1);
    },
  },
  computed: {
    studentNote() {
      let message = "Selecione um ou mais cursos e bora estudar!";
      if (this.studyingList.length > 0 && this.studyingList.length <= 10) {
        message = "Muito bem, você já pode iniciar seu estudo!";
      } else {
        message =
          "Ops! Não seria melhor focar os estudos em apenas algumas tecnologias?";
      }
      return message;
    },
  },
});
