<template>
  <h1 v-if="!tasks.length" class="text-white center">Задач пока нет</h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ countActive }}</h3>
    <div class="card" v-for="task in tasks" :key="task.id">
      <h2 class="card-title">
        {{ task.name }}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{ task.deadline }}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="showTask(task.id)">Посмотреть</button>
    </div>
  </template>
</template>

<script>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'
import AppStatus from '../components/AppStatus'

export default {
  components: {AppStatus},
  setup() {
    const tasks = ref([])
    const router = useRouter()
    let countActive = ref(null)

    async function loadTasks() {
      const {data} = await axios.get('https://mini-freelance-exchange-746e0-default-rtdb.firebaseio.com/tasks.json')

      if (data) {
        tasks.value = Object.keys(data).map(key => {
          return {
            id: key,
            ...data[key]
          }
        })

        countActive.value = tasks.value.filter(task => task.status === 'active').length
      }
    }

    function showTask(id) {
      router.push('/task/' + id)
    }

    loadTasks()

    return {
      tasks,
      router,
      showTask,
      countActive
    }
  }
}
</script>
