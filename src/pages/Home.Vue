<template>
	<div class="home">
		<h2>Home page</h2>
		<mp-modal 
			v-model="show"
			title="测试modal">
			<p>modal 内容</p>
		</mp-modal>
	</div>
</template>

<script>
import { MpModal } from 'mp-vue-tools';

export default {
	components: {
		[MpModal.name]: MpModal
	},
	data() {
		return {
			show: true
		};
	}
};
</script>