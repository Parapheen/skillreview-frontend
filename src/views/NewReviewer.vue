<template>
<n-h1 style="margin-top: 2rem; text-align: center;">Become a Reviewer</n-h1>
<n-p depth="3" style="text-align: center;">We want to create a quality community where we are confident in each Reviewer. <br/> Please, tell us about yourself.</n-p>
  <n-form
    :model="model"
    :rules="rules"
    ref="formRef"
    :label-width="160"
    :style="{
      maxWidth: '640px',
	  margin: 'auto',
	  textAlign: 'left',
    }"
  >
    <n-form-item v-if="!user.email" label="Email" path="emailValue">
      <n-input placeholder="Please enter your email" v-model:value="model.emailValue" />
    </n-form-item>
    <n-form-item label="Decription" path="descriptionValue">
      <n-input
        placeholder="Please describe your experience"
        v-model:value="model.descriptionValue"
        type="textarea"
        :autosize="{
          minRows: 3,
          maxRows: 5
        }"
      />
    </n-form-item>
    <n-form-item label="MMR" path="ratingValue">
      <n-input-number placeholder="5100" v-model:value="model.ratingValue" />
    </n-form-item>
    <div style="display: flex; justify-content: center;">
      <n-button @click="handleSubmit" type="primary"
        >Submit</n-button
      >
    </div>
  </n-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMessage } from 'naive-ui'
import { useStore } from 'vuex'
import { IUserUpdate } from '../interfaces/user'
import { updateUser } from '../api/user.api'
import amplitude from 'amplitude-js'
import { IApplication } from '../interfaces/application'
import { createApplication } from '../api/application.api'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const user = computed(() => store.getters.getUser)
const formRef = ref(null)
const message = useMessage()
const model = ref({
	emailValue: "",
	descriptionValue: null,
	ratingValue: 5100,
})

const rules = {
	emailValue: {
		required: true,
		trigger: ['blur', 'input'],
		message: 'Please fill your email'
	},
	descriptionValue: {
		required: true,
		trigger: ['blur', 'input'],
		message: 'Please describe your experience'
	},
	ratingValue: {
		type: 'number',
		required: true,
		trigger: ['blur', 'change'],
		message: 'Please input your current MMR'
	}
}
const handleSubmit = async (e: any) => {
	e.preventDefault()
	formRef.value.validate(async (errors: any) => {
		if (!errors) {
			if (model.value.emailValue) {
				let userUpdate: IUserUpdate = {
					email: model.value.emailValue
				}
				await updateUser(user.value.id, user.value.token, userUpdate)
					.then((resp) => {
						var userProperties = {
							email: resp.data.email,
						};
						amplitude.getInstance().setUserProperties(userProperties)
						resp.data.token = user.value.token
						store.commit('SET_USER', resp.data)
					})
					.catch((err) => {
						message.error(err.message)
					})
			}
			let application: IApplication = {
				description: model.value.descriptionValue!,
				rating: model.value.ratingValue!
			}
			await createApplication(application, user.value.token)
				.then(() => {
					message.success('Successfully sent application')
					router.push('/me')
				})
				.catch((err) => {
					message.error(err.message)
				})
		} else {
			console.log(errors)
			message.error('Please fill all fields')
		}
	})
}

amplitude.getInstance().logEvent('new-reviewer-page');
</script>
