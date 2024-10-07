<template>
  <span class="badge">
    <slot></slot>
  </span>
</template>

<script setup lang="ts"></script>

<style scoped>
.badge {
  width: auto;
  padding: 4px 11px;
  color: var(--white);
  border-radius: 20px;
  font-weight: 500;
  font-size: 12px;
  background-color: var(--red);
  white-space: nowrap;
}
</style>
