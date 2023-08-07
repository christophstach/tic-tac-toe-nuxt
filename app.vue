<script setup lang="ts">
const player1 = ref("X");
const player2 = ref("O");
</script>

<template>
  <div class="grid grid-cols-3 mt-10 container mx-auto">
    <div>
      <UInput
        v-model="player1"
        placeholder="Enter first player's name"
        required
      />
    </div>
    <div>
      <ttt-board :player1="player1" :player2="player2" />
    </div>
    <div>
      <UInput
        v-model="player2"
        placeholder="Enter seconds player's name"
        required
      />
    </div>
  </div>
</template>
