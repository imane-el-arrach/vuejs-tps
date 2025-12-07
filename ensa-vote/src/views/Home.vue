<template>
  <div>
    <Navbar />

    <div class="container mt-4">
      <h2 class="text-center mb-4">Événements ENSA Safi</h2>

      <EventCard
        v-for="ev in events"
        :key="ev.id"
        :event="ev"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import EventCard from "../components/EventCard.vue";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default {
  components: { Navbar, EventCard },
  data() {
    return { events: [] };
  },
  mounted() {
    onSnapshot(collection(db, "Events"), snap => {
      this.events = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  }
}
</script>


