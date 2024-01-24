<template>
  <div>
    <a v-if="isAuthLinkVisible" @click="toggleAuthState">{{ authLinkText }}</a>
    <a v-else @click="logout">Logout</a>

    <form id="auth-form" v-if="isLoginFormVisible || isRegisterFormVisible" @submit.prevent="submitForm">
      <label for="username">Username:</label>
      <input
        id="username"
        name="auth-username"
        type="text"
        v-model="username"
        required
      />

      <label for="password">Password:</label>
      <input
        id="password"
        name="auth-password"
        type="password"
        v-model="password"
        required
      />

      <button class="btn-auth" type="submit">{{ authButtonLabel }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps(['isLoggedIn']);
const emit = defineEmits(['login', 'register', 'logout']);

const isLoginFormVisible = ref(true);
const isRegisterFormVisible = ref(false);
const isAuthLinkVisible = ref(!props.isLoggedIn);
const username = ref('');
const password = ref('');

const authLinkText = computed(() => (isLoginFormVisible.value ? 'Go to register' : 'Go to login'));
const authButtonLabel = computed(() => (isLoginFormVisible.value ? 'Login' : 'Register'));

const toggleAuthState = () => {
  if (isLoginFormVisible.value) {
    isLoginFormVisible.value = false;
    isRegisterFormVisible.value = true;
  } else {
    isLoginFormVisible.value = true;
    isRegisterFormVisible.value = false;
  }
};

const submitForm = () => {
  if (isLoginFormVisible.value) {
    emit('login', { username: username.value, password: password.value });
  } else {
    emit('register', { username: username.value, password: password.value });
  }

  username.value = '';
  password.value = '';
};

const logout = () => {
  isAuthLinkVisible.value = true;
  isLoginFormVisible.value = true;
  isRegisterFormVisible.value = false;
  emit('logout');
};

watch(() => props.isLoggedIn, (newLoginStatus) => {
  if (newLoginStatus) {
    isLoginFormVisible.value = false;
    isRegisterFormVisible.value = false;
    isAuthLinkVisible.value = false;
  }
});
</script>
