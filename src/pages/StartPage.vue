/**
 * PAGE_ID: USER_REGISTER
 * DOMAIN: User
 * PURPOSE: Đăng ký người dùng offline
 * COMPONENTS:
 * - TextInput
 * - DatePicker
 * SERVICES:
 * - user.service.ts
 * OFFLINE:
 * - Lưu IndexedDB
 */

<template>
  <div class="start-page">
    <h1>Welcome to Start Page</h1>
    <p>This is the start page of the application.</p>
  </div>
</template>

<script setup lang="ts">
// Start page component
</script>

<style>
.start-page {
  padding: 2rem;
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 1rem;
}

p {
  color: #666;
  font-size: 1.1rem;
}
</style>
