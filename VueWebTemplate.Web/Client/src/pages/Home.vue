<template>
	<div>
		<h1>VueWebTemplate</h1>
	</div>
</template>

<script>
	import bus from '../bus';

	export default {
		data() {
			return {
				msg: '数据绑定示例',
				list: []
			};
		},
		created() {
			bus.pageNav = '首页';
		},
		methods: {
			
		}
	};
</script>
