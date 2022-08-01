<template>
  <form class="card">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model.trim="name">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model.trim="deadline">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model.trim="description"></textarea>
    </div>

    <button class="btn primary" @click.prevent="createTask" :disabled="disabled">Создать</button>
  </form>
</template>


<script>
import {ref, computed} from 'vue'
import axios from "axios";
import {useRouter} from "vue-router";

export default {
  setup() {
    const router = useRouter()
    const name = ref('')
    const deadline = ref('')
    const description = ref('')

    const disabled = computed(() => {
      return !(name.value && deadline.value && description.value)
    })

    async function createTask() {
      const id = new Date().getTime()
      const status = new Date(deadline.value).getTime() > id ? 'active' : 'cancelled'

      await axios.post('https://mini-freelance-exchange-746e0-default-rtdb.firebaseio.com/tasks.json', {
        id,
        name: name.value,
        deadline: deadline.value.split('-').reverse().join('.'),
        description: description.value,
        status
      })

      router.push('/')
    }

    return {
      name, deadline, description,
      createTask,
      disabled
    }
  }


}
</script>
