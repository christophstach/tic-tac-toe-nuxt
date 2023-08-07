<script setup lang="ts">
const { pending, data: scores } = await useFetch("/api/leaderboard-scores", {
  lazy: true,
});

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "winner",
    label: "Winner",
  },
  {
    key: "player1",
    label: "Player 1",
  },
  {
    key: "player2",
    label: "Player 2",
  },
  // {
  //   key: "gameState",
  //   label: "Game State",
  // },
  {
    key: "timestamp",
    label: "Timestamp",
  },
];
</script>

<template>
  <div class="overflow-x-auto w-full">
    <UCard>
      <div v-if="pending">Loading...</div>
      <UTable :loading="pending" :columns="columns" :rows="scores!" />
    </UCard>
  </div>
</template>
