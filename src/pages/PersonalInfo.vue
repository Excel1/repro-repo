<template>
  <q-page padding>
    <div class="q-pa-md">
      <h5>Personal info</h5>

      <q-list>
        <q-item clickable v-ripple @click="openEditor('language')">
          <q-item-section>
            <q-item-label>Sprache</q-item-label>
            <q-item-label caption>{{ languageLabel() || $t('not_set') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="openEditor('email')">
          <q-item-section>
            <q-item-label>Email</q-item-label>
            <q-item-label caption>{{ email || $t('not_set') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="openEditor('firstName')">
          <q-item-section>
            <q-item-label>First name</q-item-label>
            <q-item-label caption>{{ firstName || $t('not_set') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="openEditor('lastName')">
          <q-item-section>
            <q-item-label>Last name</q-item-label>
            <q-item-label caption>{{ lastName || $t('not_set') }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- Bottom edit dialog -->
    <q-dialog v-model="showEditor" transition-show="slide-up" transition-hide="slide-down">
      <q-card class="bottom-modal-card">
        <q-card-section class="modal-header">
          <div>
            <div class="text-h6">Eintrag bearbeiten</div>
            <div class="text-subtitle2 q-mt-sm">{{ labelFor(selectedField) }}</div>
          </div>
          <q-btn flat icon="close" aria-label="Schließen" class="modal-close" @click="closeEditor" />
        </q-card-section>

        <q-card-section>
          <q-select
            v-if="selectedField === 'language'"
            v-model="tempValue"
            :options="languageOptions"
            label="Sprache"
            emit-value
            map-options
          />

          <q-input v-if="selectedField === 'email'" v-model="tempValue" label="Email" type="email" />
          <q-input v-if="selectedField === 'firstName'" v-model="tempValue" label="First name" />
          <q-input v-if="selectedField === 'lastName'" v-model="tempValue" label="Last name" />
        </q-card-section>

        <q-card-actions class="q-pa-sm">
          <q-btn unelevated label="Speichern" color="primary" @click="save" class="save-full" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from 'stores/user.store';

const { locale } = useI18n();

// store language as code (en/de)
const language = ref<string>('de');
const email = ref<string>('');
const firstName = ref<string>('');
const lastName = ref<string>('');

const showEditor = ref(false);
const selectedField = ref<string | null>(null);
const tempValue = ref<string>('');

const languageOptions = [
  { label: 'Deutsch', value: 'de' },
  { label: 'English', value: 'en' },
];

onMounted(() => {
  // set initial i18n locale to the component's language
  if (locale && language.value) locale.value = language.value;
});

watch(language, (val) => {
  if (locale && val) locale.value = val;
});

function openEditor(field: string) {
  selectedField.value = field;
  switch (field) {
    case 'language': tempValue.value = language.value; break;
    case 'email': tempValue.value = email.value; break;
    case 'firstName': tempValue.value = firstName.value; break;
    case 'lastName': tempValue.value = lastName.value; break;
    default: tempValue.value = '';
  }
  showEditor.value = true;
}

function closeEditor() {
  showEditor.value = false;
  selectedField.value = null;
  tempValue.value = '';
}

function save() {
  if (!selectedField.value) return;
  switch (selectedField.value) {
    case 'language':
      language.value = tempValue.value;
      // i18n locale is synced via watch
      break;
    case 'email': email.value = tempValue.value; break;
    case 'firstName': firstName.value = tempValue.value; break;
    case 'lastName': lastName.value = tempValue.value; break;
  }
  closeEditor();
}

function labelFor(field: string | null) {
  if (!field) return '';
  if (field === 'language') return 'Sprache';
  if (field === 'email') return 'Email';
  if (field === 'firstName') return 'First name';
  if (field === 'lastName') return 'Last name';
  return '';
}

function languageLabel() {
  if (!language.value) return '';
  if (language.value === 'de') return 'Deutsch';
  if (language.value === 'en') return 'English';
  return language.value;
}

onMounted(() => {
  const userStore = useUserStore();

  userStore
    .fetchUserData()
    .then(() => {
      email.value = userStore.getEmail;
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
});

/*
ToDo: REWORK

Usage of Dialogs are not component based. Look at SharePay how to use Dialogs and i18n properly.
Also use the store to get and set user data.

 */
</script>

<style scoped>
.bottom-modal-card {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: none;
  border-radius: 0;
  margin: 0;
  z-index: 2000; /* ensure it overlays footer/navbar */
}

.modal-close {
  position: absolute;
  top: 8px;
  right: 8px;
}

.modal-header {
  position: relative;
  padding-top: 28px; /* make room for the close button */
}

.save-full {
  width: 100%;
}
</style>
