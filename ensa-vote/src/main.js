
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { onUserStateChanged } from './firebase'

let app = null;

onUserStateChanged((user) => {
  if (!app) {
    app = createApp(App).use(router).mount('#app');
  }

  
  if (!user && router.currentRoute.value.path !== "/" &&
      router.currentRoute.value.path !== "/login" &&
      router.currentRoute.value.path !== "/register") {
    router.push("/");
  }
});

