<template>
  <div>
    <MeshFormWrapper
      :content="getScopedContent"
      :form="formData[FORM_NAMES.CREATE_PAGE]"
      :formValues="formValues"
      @submit="onSubmit($event)"
    />
  </div>
  <p>{{ response }}</p>
</template>
<script setup lang="ts">
import { usePages } from '~~/composables/usePages'
import { formData } from '~~/builders/forms'
import { useContent } from '~~/composables/useContent'
import { useUsers } from '~~/composables/useUsers'
import { MeshFormWrapper } from 'mesh-ui-components'
import { FORM_NAMES } from '~~/constants/forms';
import { createSafeId } from "~~/utils/createSafeId"

  definePageMeta({
    layout: 'admin',
    middleware: ['auth']
  });

  const { query } = useRoute()
  const { createPage, fetchPages, pages } = usePages()
  const { fetchSingleUser, user } = useUsers()
  const { getScopedContent } = useContent('global.forms')

  const formValues = ref({}) as Record<string, any>
  const response = ref()

  await Promise.all([fetchSingleUser, fetchPages])
  setPageFromQuery()

  const onSubmit = async (form : Record<string, any>) => {
    const page = {
      id: `${form.formValues.name}_${createSafeId()}`,
      parent: [],
      menuOrder: 0,
      title: form.formValues.name,
      description: 'description',
      keywords: 'keywords',
      contentComponents: [],
      author: user.value?.id,
      ...form.formValues
    }
    response.value = await createPage(page)
  }

  function setPageFromQuery() {
    if (query) {
      const page = pages.value.find(p => p.id === query.id)
      formValues.value = page
    }
  }


</script>