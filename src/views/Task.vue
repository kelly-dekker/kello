<template>
  <div class="task-view bg-grey-lighter">
    <div class="flex flex-col flex-grow items-start justify-between px-5">
      <div class="flex items-center">
        <svg class="w-5 h-5" fill="none" stroke="#9CA3AF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
        <input
          class="p-2 w-full mr-2 flex-grow text-xl font-bold outline-none bg-transparent"
          type="text"
          :value="task.name"
          @change="updateTaskProperty($event, 'name')"
          @keyup.enter="updateTaskProperty($event, 'name')"
        />
      </div>
      <div class="flex">
        <span class="w-5 inline-block"></span>
        <p class="text-grey text-xs ml-2">In kolom <strong>{{ columnName.name }}</strong></p>
      </div>

      <div class="flex">
        <span class="w-5 inline-block"></span>
        <div class="px-1">
          <p class="font-bold mt-10">Beschrijving</p>
          <textarea
            class="relative bg-transparent mt-2 h-32 border-none outline-none w-full"
            placeholder="Voeg een beschrijving toe"
            :value="task.description"
            @change="updateTaskProperty($event, 'description')"
            @keyup.enter="updateTaskProperty($event, 'description')"
          />
        </div>
      </div>
      <div class="flex w-full pt-5">
        <span class="w-5 inline-block"></span>
        <button
                class="text-xs flex items-center text-grey outline-none  hover:text-red focus:outline-none"
                @click="deleteTask(task.id)"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          Verwijderen
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getTask',
      'getColumnName'
    ]),
    task () {
      return this.getTask(this.$route.params.id)
    },
    columnName () {
      console.log(this.getColumnName(this.$route.params.id))
      return this.getColumnName(this.$route.params.id)
    }
  },
  methods: {
    updateTaskProperty (e, key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: e.target.value
      })
    },
    deleteTask (taskIndex) {
      this.$swal
        .fire({
          title: 'Je staat op het punt om deze taak te verwijderen. Weet je het zeker?',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          cancelButtonText: 'Annuleren',
          confirmButtonColor: 'green',
          confirmButtonText: 'Ja, verwijderen!'
        })
        .then(result => {
          if (result.isConfirmed) {
            this.$store.commit('DELETE_TASK', {
              taskIndex: taskIndex
            })
            // redirect to board since task is deleted
            this.$router.push({ name: 'board' })
          }
        })
    }
  }
}
</script>

<style>
.task-view {
  @apply relative flex flex-row pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
