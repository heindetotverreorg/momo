<template>
  <MeshForm
    :content="getContent"
    :name="form.meta.name"
    :formValues="formValues"
    @update:formValues="formValues = $event"
    @submit="onSubmit"
  >
    <template #fields="{ forceValidation, formValues, getSecondValdiationValue, onValidate, validationMessages }">
      <section
        v-for="section of form.meta.sections"
        :key="section"
      >
        <h2>{{ section }}</h2>
        <component
          v-for="field of form.sections[section]"
          :key="field.key"
          :id="`${field.key}_${field.id}`"
          :is="field.component"
          :force-validation="forceValidation"
          :highlight-validation="field.highlightValidation"
          :label="getScopedContent('admin.createPage.form.labels', field.key)"
          :name="field.key"
          :options="getPagesTitles(field.key)"
          :required="field.required"
          :second-validation-value="getSecondValdiationValue(field.secondValidationValue)"
          :type="field.type"
          :validators="field.validators"
          v-model="formValues[field.key]"
          @validate="onValidate(field.key, $event)"
        >
          <template #label>{{ getScopedContent('admin.createPage.form.labels', field.key) }}</template>
          <template #error-message>
            <p v-for="{ key } of validationMessages(field.key)">{{ getScopedContent('global.forms.validators', key) }}</p>
          </template>
        </component>
      </section>
    </template>
    <template #buttons="{ canSubmit, updateFormState }">
      <MeshButton
        v-for="button of form.buttons"
        class="m-t-1"
        :id="`${button.key}_${button.id}`"
        :is="button.component"
        :disabled="!canSubmit"
        :label="getScopedContent('admin.createPage.form.labels', button.key)"
        :name="button.key"
        :type="button.type"
        :variant="button.variant"
        @disabledClick="updateFormState({ validateStrict: true })"
      />
    </template>
  </MeshForm>
  <p>{{ response }}</p>
  <button @click="first()">add first page</button>
  <button @click="second()">add second page</button>
  <button @click="third()">add third page</button>
</template>
<script setup lang="ts">
import { usePages } from '~~/composables/usePages'
import { createFormsModel } from '~~/models/forms'
import { useForms } from '~~/composables/useForms'
import { useContent } from '~~/composables/useContent'
import { useUsers } from '~~/composables/useUsers'
import { FORM_NAMES } from '~~/constants/forms';
import { createSafeId } from "~~/utils/createSafeId"
import { MeshForm, MeshButton } from 'mesh-ui-components';

  definePageMeta({
    layout: 'admin',
    middleware: ['auth']
  });

  const { query } = useRoute()
  const { createPage, createPageParentMeta, fetchPages, pages } = usePages()
  const { fetchSingleUser, user } = useUsers()
  const { getContent, getScopedContent } = useContent()
  const { multiPartForm } = useForms()

  const formValues = ref({}) as Record<string, any>
  const response = ref()

  await Promise.all([fetchSingleUser(), fetchPages()])
  setPageFromQuery()

  const editMode = !!query?.id
  const { form } = multiPartForm(createFormsModel(FORM_NAMES.CREATE_PAGE, editMode))

  const getPagesTitles = (key : string) => {
    if (key === 'menuParent') {
      return pages.value.map(page => page.title)
    }
  }

  const first = () => {
    const form = {
      formValues: {
        slug: 'first',
        name: 'first',
        menuParent: '',
        parent: [],
        title: 'first level',
        description: 'firstingding',
        keywords: 'first level test',
      }
    }
    onSubmit(form)
  }

  const second = () => {
    const form = {
      formValues: {
        slug: 'second',
        name: 'second',
        menuParent: 'first',
        parent: ['first'],
        title: 'second level',
        description: 'secondingding',
        keywords: 'second level test',
      }
    }
    onSubmit(form)
  }

  const third = () => {
    const form = {
      formValues: {
        slug: 'third',
        name: 'third',
        menuParent: 'second',
        parent: ['first', 'second'],
        title: 'third level',
        description: 'thirdingding',
        keywords: 'third level test',
      }
    }
    onSubmit(form)
  }

  const onSubmit = async (form : Record<string, any>) => {
    const { pathArray, path } = createPageParentMeta(form.formValues.menuParent, form.formValues.slug)

    console.log(pathArray, path)

    const page = {
      id: `${form.formValues.name}_${createSafeId()}`,
      parent: parent,
      menuOrder: 0,
      contentComponents: [],
      author: user.value?.id,
      ...form.formValues
    }
    delete page.menuParent
    response.value = await createPage(page)
  }

  function setPageFromQuery() {
    if (query.id) {
      const page = pages.value.find(p => p.id === query.id)
      formValues.value = page
    }
  }

</script>