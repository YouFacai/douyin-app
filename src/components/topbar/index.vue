<template>
	<div class="topbar">
		<router-link style="display: flex;align-items: center;justify-content: center; flex: 1;" to="tv" tag="li"
			active-class="foce">
			<img style="width: 27px;height: 25px;" src="../../assets/imgs/0001.png" alt="">
		</router-link>
		<div class="centerbar">
			<div class="centerbar_li" @click="movefoce($event)">
				<router-link to="city" tag="li" active-class="foce">同城</router-link>
				<router-link to="attention" tag="li" active-class="foce">关注</router-link>
				<router-link to="recommend" tag="li" active-class="foce">推荐</router-link>
			</div>
			<div class="track">
				<li class="track_foce" ref = 'track_foce'></li>
			</div>
		</div>
		<router-link style="display: flex;justify-content: center;align-items: center; flex: 1;" to="search" tag="li">
			<img style="width: 25px;height: 21px;" src="../../assets/imgs/0002.png" alt="">
		</router-link>
	</div>
</template>

<script>
	
	export default {
		components:{
			
		},
		
		mounted() {
			
		},
		
		methods:{
			movefoce(event){
				this.$refs['track_foce'].style.left = event.target.offsetLeft + 3 + 'px'
			}
		}
	}
</script>

<style scoped="scoped">
	.topbar {
		width: 100%;
		height: 60px;
		background-color: #010101;
		z-index: 11;
		position: fixed;
		display: flex;
		height: 40px;
		color: #999999;
		top: 0;
	}

	.centerbar {
		position: relative;
		height: 100%;
		width: 70%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		flex: 4;
	}

	.centerbar_li {
		display: flex;
		justify-content: space-around;
		width: 100%;
		height: 94%;
		position: relative;
	}

	.topbar li {
		list-style: none;
		text-align: center;
		line-height: 40px;
		font-size: 18px;
		font-weight: 600;
	}

	/* 获得焦点 */
	.foce {
		color: white;
		transition: 0.3s;
	}

	/* 同城关注推荐的分割线 */
	.track {
		width: 100%;
		height: 5px;
	}

	/* 指针焦点 */
	.track_foce {
		width: 28px;
		height: 3px;
		background-color: white;
		transition: 0.6s;
		position: relative;
		left: 185px;
	}
</style>
