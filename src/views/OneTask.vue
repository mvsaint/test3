<template>
  <div class="card" v-if="taskData">
    <h2>{{ taskData.name }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="taskData.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ taskData.deadline }}</p>
    <p><strong>Описание</strong>: {{ taskData.description }}</p>
    <div>
      <button class="btn" @click="changeStatus('pending')">Взять в работу</button>
      <button class="btn primary" @click="changeStatus('done')">Завершить</button>
      <button class="btn danger" @click="changeStatus('cancelled')">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ route.params.id }}</strong> нет.
  </h3>
</template>

<script>
import {useRoute} from 'vue-router'
import {ref} from 'vue'
import AppStatus from '../components/AppStatus'
import axios from 'axios'

export default {
  components: {AppStatus},
  setup() {
    const route = useRoute()
    const taskData = ref({})

    let taskNameInBase = ''

    async function loadTask(id) {
      const {data} = await axios.get(`https://mini-freelance-exchange-746e0-default-rtdb.firebaseio.com/tasks.json`)

      taskData.value = Object.values(data).find(task => task.id === +id)

      taskNameInBase = Object.entries(data).find(task => task[1].id === +id)[0]
    }

    async function changeStatus(newStatus) {
      taskData.value.status = newStatus
      await axios.put(`https://mini-freelance-exchange-746e0-default-rtdb.firebaseio.com/tasks/${taskNameInBase}.json`, taskData.value)
    }

    loadTask(route.params.id)

    return {
      taskData,
      route,
      changeStatus
    }
  }
}
</script>

<style scoped>

</style>
