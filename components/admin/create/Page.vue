<template>
  <p v-if="!hasHomePage">If you don't have a home page yet, you first have to make one</p>
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
          :disabled="field.disabled"
          :force-validation="forceValidation"
          :highlight-validation="field.highlightValidation"
          :label="getScopedContent('admin.createPage.form.labels', field.key)"
          :name="field.key"
          :options="getOptions(field.key)"
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
</template>
<script setup lang="ts">
import { usePages } from '~~/composables/usePages'
import { createFormsModel } from '~~/models/forms'
import { useForms } from '~~/composables/useForms'
import { useContent } from '~~/composables/useContent'
import { useUsers } from '~~/composables/useUsers'
import { usePageComponents } from '~~/composables/usePageComponents'
import { FORM_NAMES } from '~~/constants/forms';
import { createSafeId } from "~~/utils/createSafeId"
import { MeshForm, MeshButton } from 'mesh-ui-components';

  const { query } = useRoute()
  const { createPage, createPageParentMeta, fetchPages, pages } = usePages()
  const { fetchSingleUser, user } = useUsers()
  const { getContent, getScopedContent } = useContent()
  const { multiPartForm } = useForms()
  const { availablePageComponents } = usePageComponents()
  
  const formValues = ref({}) as Record<string, any>
  const response = ref()
  const hasHomePage = ref()

  await Promise.all([fetchSingleUser(), fetchPages()])

  const editMode = !!query?.id
  const { form } = multiPartForm(createFormsModel(FORM_NAMES.CREATE_PAGE, editMode))

  setPageFromQuery()
  homePageCheck()

  const getOptions = (key : string) => {
    if (key === 'menuParent') {
      return pages.value.map(page => page.title)
    }
    if (key === 'pageComponentSelect') {
      return availablePageComponents.map((component : any) => component.name)
    }
    return []
  }

  const onSubmit = async (form : Record<string, any>) => {
    const { pathArray, path } = createPageParentMeta(form.formValues.menuParent, form.formValues.slug)
    
    const page = {
      id: `${form.formValues.name}_${createSafeId()}`,
      parent: pathArray,
      path: path,
      menuOrder: 0,
      pageComponents: [],
      author: user.value?.id,
      ...form.formValues
    }
    delete page.menuParent
    response.value = await createPage(page)
  }

  function homePageCheck() {
    if (pages.value.find(page => page.name === 'home')) {
      hasHomePage.value = true
    } else {
      formValues.value.slug = 'home'
      formValues.value.name = 'home'
      form.sections.general = form.sections?.general.filter(field => field.key !== 'slug')

      const nameField = form.sections?.general.find(field => field.key === 'name')
      const menuParentField = form.sections?.general.find(field => field.key === 'menuParent')
      if (nameField && menuParentField) {
        nameField.disabled = true
        nameField.highlightValidation = false
        menuParentField.disabled = true
      }
    }
  }

  function setPageFromQuery() {
    if (query.id) {
      const page = pages.value.find(p => p.id === query.id)
      formValues.value = page
    }
  }

</script>