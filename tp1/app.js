const { createApp } = Vue;

createApp({
  data() {
    return {
     title: "Cliquez moi!",
     count: 0 ,
     texte:"" ,
     showMessage : false ,
     couleur:"",
     afficher:false

    };
  },
  methods:{
     changeTitle(){
        this.title="Cliqué"
     }, 
     verifierEspace(){
        this.showMessage=this.texte.includes(" ")
     }
     
  }
}).mount("#app");

