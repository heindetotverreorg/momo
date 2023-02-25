<template>
  <h2>{{ getContent('admin.auth.title') }}</h2>
  <MeshFormWrapper
    :content="getScopedContent"
    :form="currentForm"
    :formValues="formValues"
    @submit="onSubmit"
  />
  <MeshButton
    name="auth"
    id="auth_0"
    variant="tertiary"
    :label="authMethod === FORM_NAMES.LOGIN ? getContent('admin.auth.buttons.goToRegister') : getContent('admin.auth.buttons.goToLogin')"
    @click="authMethod = authMethod === FORM_NAMES.LOGIN ? FORM_NAMES.REGISTER : FORM_NAMES.LOGIN"
  />
</template>

<script setup lang="ts">
import { formData } from '~~/builders/forms'
import { useContent } from '~~/composables/useContent'
import { FORM_NAMES } from '~~/constants/forms';
import { MeshButton, MeshFormWrapper } from 'mesh-ui-components'

  const { getContent, getScopedContent } = useContent('global.forms')

  const authMethod = ref(FORM_NAMES.LOGIN)
  const formValues = ref({}) as Record<string, any>

  const { login, register } = formData

  const currentForm = computed(() => authMethod.value === FORM_NAMES.LOGIN ? login : register)

  const onSubmit = (payload : any) => {
    formValues.value = {}
  }
</script>