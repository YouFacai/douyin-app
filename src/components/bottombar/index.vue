<template>
	<div class="bottombar">
		<li style="color: white;">首页</li>
		<li>朋友</li>
		<li>
			<img class="addimg" src="../../assets/imgs/0007.png" alt="">
		</li>
		<li>消息</li>
		<li>我</li>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	.bottombar {
		color: #999999;
		width: 100%;
		height: 50px;
		z-index: 11;
		background-color: #010101;
		position: fixed;
		bottom: 0px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: white;
	}
	
	.bottombar li {
		list-style: none;
		color: #999999;
		font-weight: 600;
	}
	
	.addimg {
		width: 40px;
		height: 30px;
	}
</style>
