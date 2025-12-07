<template>
  <div class="card shadow-sm mb-3">
    <img :src="event.img" class="card-img-top" style="height: 200px; object-fit: cover;">
    <div class="card-body">
      <h5 class="card-title">{{ event.title }}</h5>
      <p class="card-text">{{ event.description }}</p>

      <p class="text-muted">📅 {{ event.date }}</p>

      <p>
        👍 {{ event.yesVotes }} &nbsp;&nbsp;
        👎 {{ event.noVotes }}
      </p>

      <div class="d-flex gap-3">
        <button class="btn btn-success w-50" @click="vote('yes')">Yes</button>
        <button class="btn btn-danger w-50" @click="vote('no')">No</button>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../firebase";
import { collection, query, where, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";

export default {
  props: ["event"],
  methods: {
    async vote(type) {
      const userId = auth.currentUser.uid;

      const votesRef = collection(db, "Votes");
      const q = query(votesRef,
        where("eventId", "==", this.event.id),
        where("userId", "==", userId)
      );

      const existing = await getDocs(q);
      if (!existing.empty) return alert("Vous avez déjà voté !");

      await addDoc(votesRef, {
        eventId: this.event.id,
        userId,
        vote: type,
        createdAt: new Date()
      });

      const eventRef = doc(db, "Events", this.event.id);
      await updateDoc(eventRef, {
        yesVotes: type === "yes" ? this.event.yesVotes + 1 : this.event.yesVotes,
        noVotes: type === "no" ? this.event.noVotes + 1 : this.event.noVotes
      });
    }
  }
}
</script>


