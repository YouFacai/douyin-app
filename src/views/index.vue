<template>
	<div class="viewport">
		<!-- 顶部导航栏 -->
		<topbar></topbar>
		<!-- 中间的路由切换视口 -->
		<router-view></router-view>
		<!-- 底部 -->
		<bottombar></bottombar>
	</div>
</template>

<script>
	import topbar from '../components/topbar/index.vue' 
	import bottombar from '../components/bottombar/index.vue'
	export default {
		components:{
			topbar,
			bottombar
		}
	}
</script>

<style scoped="scoped">
	/* 整个视频的大盒子 */
	.viewport {
		position: relative;
		z-index: 11;
		top: 0;
		transition: 0.4s;
	}
</style>
