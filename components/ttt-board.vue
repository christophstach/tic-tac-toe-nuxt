<script setup lang="ts">
const props = defineProps({
  player1: {
    type: String,
    default: "X",
  },
  player2: {
    type: String,
    default: "O",
  },
});

const winner = ref(0);
const currentPlayer = ref(1);
const saved = ref(false);
const leaderboardModalOpen = ref(false);

const state = ref([
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
]);

function getPlayer(player: Number) {
  if (player === 1) {
    return props.player1;
  } else if (player === 2) {
    return props.player2;
  } else {
    return "";
  }
}

function handleShowLeaderboardClick() {
  leaderboardModalOpen.value = true;
}

function handleNewGameClick() {
  winner.value = 0;
  currentPlayer.value = 1;
  saved.value = false;
  state.value[0][0] = 0;
  state.value[0][1] = 0;
  state.value[0][2] = 0;
  state.value[1][0] = 0;
  state.value[1][1] = 0;
  state.value[1][2] = 0;
  state.value[2][0] = 0;
  state.value[2][1] = 0;
  state.value[2][2] = 0;
}

async function handleSaveToLeaderboardClick() {
  if (!saved.value) {
    const payload = {
      winner: winner.value,
      player1: props.player1,
      player2: props.player2,
      gameState: state.value,
    };

    saved.value = true;

    await useFetch("/api/leaderboard-scores", {
      method: "POST",
      body: payload,
    });
  }
}

function handleCellClick(row: number, col: number) {
  if (state.value[row][col] === 0) {
    state.value[row][col] = currentPlayer.value;
  }

  if (currentPlayer.value === 1) {
    currentPlayer.value = 2;
  } else {
    currentPlayer.value = 1;
  }

  if (hasWon(1)) {
    winner.value = 1;
  }

  if (hasWon(2)) {
    winner.value = 2;
  }
}

function hasWon(player: number) {
  // # Check row 1
  let rowWin = false;
  let colWin = false;
  let diagonal1Win = false;
  let diagonal2Win = false;

  for (let index = 0; index < 3; index++) {
    // Check for 3 in a row
    if (
      state.value[index][0] === player &&
      state.value[index][1] === player &&
      state.value[index][2] === player
    ) {
      rowWin = true;
    }

    // Check for 3 in a col
    if (
      state.value[0][index] === player &&
      state.value[1][index] === player &&
      state.value[2][index] === player
    ) {
      colWin = true;
    }
  }

  diagonal1Win =
    state.value[0][0] === player &&
    state.value[1][1] === player &&
    state.value[2][2] === player;

  diagonal2Win =
    state.value[0][2] === player &&
    state.value[1][1] === player &&
    state.value[2][0] === player;

  return rowWin || colWin || diagonal1Win || diagonal2Win;
}
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div class="p-5 text-xl font-bold leading-tight">
      <div v-if="winner === 0">
        Current Player: {{ getPlayer(currentPlayer) }}
      </div>
      <div v-else>Player {{ getPlayer(winner) }} won the game!</div>
    </div>
    <div class="grid grid-cols-3 grid-rows-3 w-96 h-96 gap-2 mx-auto">
      <UButton
        color="white"
        class="flex justify-center items-center"
        :disabled="state[0][0] !== 0 || winner !== 0"
        @click="handleCellClick(0, 0)"
      >
        {{ getPlayer(state[0][0]) }}
      </UButton>
      <UButton
        color="white"
        class="flex justify-center items-center"
        :disabled="state[0][1] !== 0 || winner !== 0"
        @click="handleCellClick(0, 1)"
      >
        {{ getPlayer(state[0][1]) }}
      </UButton>
      <UButton
        color="white"
        class="flex justify-center items-center"
        :disabled="state[0][2] !== 0 || winner !== 0"
        @click="handleCellClick(0, 2)"
      >
        {{ getPlayer(state[0][2]) }}
      </UButton>

      <UButton
        color="white"
        class="flex justify-center items-center"
        :disabled="state[1][0] !== 0 || winner !== 0"
        @click="handleCellClick(1, 0)"
      >
        {{ getPlayer(state[1][0]) }}
      </UButton>
      <UButton
        color="white"
        class="flex justify-center items-center"
        :disabled="state[1][1] !== 0 || winner !== 0"
        @click="handleCellClick(1, 1)"
      >
        {{ getPlayer(state[1][1]) }}
      </UButton>
      <UButton
        color="white"
        class="flex justify-center items-center"
        :disabled="state[1][2] !== 0 || winner !== 0"
        @click="handleCellClick(1, 2)"
      >
        {{ getPlayer(state[1][2]) }}
      </UButton>

      <UButton
        color="white"
        class="flex justify-center items-center"
        :disabled="state[2][0] !== 0 || winner !== 0"
        @click="handleCellClick(2, 0)"
      >
        {{ getPlayer(state[2][0]) }}
      </UButton>
      <UButton
        color="white"
        class="flex justify-center items-center"
        :disabled="state[2][1] !== 0 || winner !== 0"
        @click="handleCellClick(2, 1)"
      >
        {{ getPlayer(state[2][1]) }}
      </UButton>
      <UButton
        color="white"
        class="flex justify-center items-center"
        :disabled="state[2][2] !== 0 || winner !== 0"
        @click="handleCellClick(2, 2)"
      >
        {{ getPlayer(state[2][2]) }}
      </UButton>
    </div>

    <div class="flex gap-2 pt-5">
      <UButton @click="handleNewGameClick()">Start new game</UButton>
      <UButton @click="handleShowLeaderboardClick()">Show leaderboard</UButton>
      <UButton
        v-if="winner !== 0"
        :disabled="saved"
        @click="handleSaveToLeaderboardClick()"
        >Save to leader-board</UButton
      >
    </div>

    <UModal v-model="leaderboardModalOpen">
      <ttt-leaderboard />
    </UModal>
  </div>
</template>
