<script setup lang="ts">
import {ref} from 'vue';

const currentTab = ref('personal_info')
</script>

<template>
  <q-tabs
    v-model="currentTab"
    dense
    no-caps
    breakpoint="999999999"
    align='center'
    indicator-color='secondary'
    active-color='secondary'
  >
    <q-route-tab name="personal_info" icon="person" label="Persönliche Daten" :to='{name: "personal_info"}' style='max-width: 33%' />
    <q-route-tab name="account_security" icon="timeline" label="Aktivitäten" :to='{name: "account_security"}' style='max-width: 33%'/>
    <q-route-tab name="applications" icon="settings" label="Einstellungen" :to='{name: "applications"}' style='max-width: 33%'/>
  </q-tabs>
</template>

<style scoped>

</style>
