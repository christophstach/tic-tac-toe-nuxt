<script setup lang="ts">
const player1 = ref("");
const player2 = ref("");
const started = ref(false);

function handleStartGameClick() {
  started.value = true;
}
</script>

<template>
  <div class="grid grid-cols-3 mt-10 container mx-auto">
    <div>
      <UInput
        v-model="player1"
        placeholder="Enter first player's name"
        required
        :disabled="started"
      />
    </div>
    <div>
      <div v-if="player1 && player2">
        <ttt-board v-if="started" :player1="player1" :player2="player2" />
        <div v-else class="flex items-center justify-center">
          <UButton @click="handleStartGameClick()">Start Game</UButton>
        </div>
      </div>

      <h2 v-else class="p-5 text-xl font-bold leading-tight text-center">
        Please enter the two player names first!
      </h2>
    </div>
    <div>
      <UInput
        v-model="player2"
        placeholder="Enter seconds player's name"
        required
        :disabled="started"
      />
    </div>
  </div>
</template>
