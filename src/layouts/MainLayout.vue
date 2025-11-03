<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Quasar App </q-toolbar-title>

        <q-toolbar-title>
          Quasar App
          (Authenticated: {{ $authService.isRenewingRef.value ? 'renewing..' : $authService.isAuthenticatedRef }})
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <BottomNavigation />
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import BottomNavigation from 'components/BottomNavigation.vue';
</script>
