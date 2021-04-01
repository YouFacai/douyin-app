<template>
	<div class="biglistbox" v-if="isdrawing" @mousewheel="scrollTop($event)" @touchstart='touchStart($event)'
		@touchend='touchEnd($event)'>
		<div class="smallviewport" v-for="(data,index) in videomsg" @touchstart='touchLove(index,$event)'>
			<!-- 视频窗口 -->
			<div class="videobox" >
				<div class="stopImg" @touchstart = 'playorstop(index,$event)'>
					<img class="stopImg_img" src="../../assets/imgs/0009.png" alt="">
				</div>
				<video id="KK" class="videobox_video" :src="data.videoUrl"></video>
				<!-- 侧边栏内容 -->
				<div class="navbar">
					<!-- 头像 -->
					<li class="navbar_head">
						<img :src="data.avatar" alt="">
						<img class="attention" src="../../assets/imgs/0003.png" alt="">
					</li>
					<li class="navbar_likes">
						<img src="../../assets/imgs/0004.png" class="navbar_likes_img" alt="">
						<p style="color: white;font-size: 12px;">
							{{data.hotindex>10000?((data.hotindex)/10000).toFixed(1)+'万':data.hotindex}}</p>
					</li>
					<li class="navbar_discuss">
						<img src="../../assets/imgs/0005.png" alt="">
						<p style="color: white;font-size: 12px;">
							{{data.duration>10000?((data.duration)/10000).toFixed(1)+'万':data.duration}}</p>
					</li>
					<li class="navbar_share">
						<img src="../../assets/imgs/0006.png" alt="">
						<p style="color: white;font-size: 12px;">{{Math.floor(Math.random()*1000+100)}}</p>
					</li>
				</div>

				<!-- 短视频信息 -->
				<div class="vedioMsg">
					<div class="vedioMsg_content">
						<!-- 标题 -->
						<div class="vedioMsg_content_title">@{{data.author}}</div>
						<!-- 内容 -->
						<div class="vedioMsg_content_text">
							{{data.title}}
						</div>
						<!-- 抖音原生 -->
						<marquee class="Marquee">⭐️抖音原声 - {{data.signature}}</marquee>
					</div>
					<div class="vedioMsg_rotate">
						<div class="moveBox">
							<img style="top: 10px;left: 10px; position: relative; width: 30px;height: 30px;"
								:src="data.coverurl" alt="">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				videomsg: [],
				videolist: [
					'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0d00f440000c021djtt0tb5mu4v2fng&ratio=720p&line=0',
					'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0200ffc0000c0lsp9ut4tscg9jqs2eg&ratio=720p&line=0',
					'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0300fbf0000c0sch45i6hofv6j15fs0&ratio=720p&line=0',
					'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0d00f890000c06j00p4qr04sjl380fg&ratio=720p&line=0',
					'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0300fe50000c0idh8rrejtat6fess4g&ratio=720p&line=0',
					'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0d00f090000c060acje9mt09saaaes0&ratio=720p&line=0',
					'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0d00f060000c08djfhsmsdhbsp6uhig&ratio=720p&line=0',
					'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0200f5a0000c0kaaesnrbfoncsqinp0&ratio=720p&line=0',
					'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0d00fa60000c05c1i0llg9ph94i11t0&ratio=720p&line=0',
					'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0300fe60000c0pn5o377un1nsiv95m0&ratio=720p&line=0',
					'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0300fa90000c0ija9m33rrlk3b2eh1g&ratio=720p&line=0',
					'https://www.iesdouyin.com/share/video/6928953754343574787/?region=&mid=6928953805157468935&u_code=0&titleType=title&did=0&iid=0',
					'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0d00f590000c0r7ajh9bjomdhtinvf0&ratio=720p&line=0',
					'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0300fe90000c0b6fia80iri2lud0e8g&ratio=720p&line=0',
					'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0300f890000c08mn3n4g34c5hfqqe80&ratio=720p&line=0',
					'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0300f7d0000c07c1n7psj5e1b47a4m0&ratio=720p&line=0',
					'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0300f680000bvs3abjtt0gkig65gd2g&ratio=720p&line=0',
					'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0200f140000bvu5karv9d0hi6gjlj60&ratio=720p&line=0'
				],
				// 是否渲染页面
				isdrawing: false,
				// 当前点击高度
				currentstartTop: 0,
				// 当前松开高度
				currentloosenTop: 0,
				// 当前页面
				currentPage: 0,
				// 获得全部的video
				videoAuto: null,
				// 是否在旋转
				isrotate: false,
				// 旋转的磁盘
				moveBox: null,
				// 旋转ID
				rotateID: '',
				// 旋转角度
				rotateDeg: 0,
				// 是否显示 三角形
				isshow: false,
				// 第一次默认开始
				once: 1,
				clicktime: {
					start: 0,
					end: 0
				},
				// 点击次数
				clickcount: 1,
				currentOpacity : 0,
			}
		},

		mounted() {
			// 请求视频数据
			this.axios.get('http://api.tianapi.com/txapi/dyvideohot/index?key=f60b75061360d24febd9faaace22f344 ').then(
				res => {
					this.videomsg = res.data.newslist;
					// 数据整合
					this.$nextTick(() => {
						this.videomsg.forEach((item, i) => {
							item.videoUrl = this.videolist[i]
						})
						this.isdrawing = true;
					})
				});
		},

		updated() {
			if (this.once) {
				this.videoAuto = Array.from(document.getElementsByClassName('videobox_video'));
				this.moveBox = document.getElementsByClassName('moveBox');
				this.videoAuto[0].play();
				this.once = 0;
				// 有数据渲染上去就开始旋转
				clearInterval(this.rotateID)
				this.rotate(0);
			}
		},

		methods: {
			// 按下
			touchStart(event) {
				event.preventDefault();
				event.stopPropagation();
				// 距离页面top的距离
				this.currentstartTop = event.touches[0].pageY;
				let imglike = document.getElementsByClassName('navbar_likes_img')[0]
				if (imglike == event.target) {
					if (imglike.src.indexOf('0004') != -1) {
						//	还没有点赞 就进行更换
						imglike.src = '/img/0010.947aac4f.png'
					} else {
						imglike.src = '/img/0004.66f0c236.png'
					}
				}
			},

			// 松手
			touchEnd(event) {
				event.stopPropagation();
				event.preventDefault();
				// 距离页面top的距离
				this.currentloosenTop = event.changedTouches[0].pageY
				// 获得屏幕高度进行判断
				let viewportTop = document.getElementsByClassName('smallviewport')[0];
				let pageTop = parseInt(window.getComputedStyle(viewportTop).height);
				let move = this.currentloosenTop - this.currentstartTop;
				let viewport = document.getElementsByClassName('viewport')[0];
				if (move + pageTop < 430) {
					// 向下切换
					this.videoAuto[this.currentPage].pause();
					this.currentPage++;
					viewport.style.top = -this.currentPage * pageTop - 22 + 'px'
					this.videoAuto[this.currentPage].play();
					// 清除旋转
					clearInterval(this.rotateID);
					this.rotateDeg = 0;
					this.rotate(this.currentPage)
					if (this.isshow) {
						this.isshow = !this.isshow
					}
				}
				if (move + pageTop > 630 && this.currentPage != 0) {
					// 向上切换
					this.videoAuto[this.currentPage].pause();
					this.currentPage--;
					viewport.style.top = -this.currentPage * pageTop - 22 + 'px';
					this.videoAuto[this.currentPage].play();
					clearInterval(this.rotateID);
					this.rotateDeg = 0;
					this.rotate(this.currentPage)
					// 如果有三角形 暂停就移除
					if (this.isshow) {
						this.isshow = !this.isshow
					}
				}

				// 如果是0移动就是暂停 和 播放 之间的切换
			},

			// 取消默认滚轮事件
			scrollTop(event) {
				event.preventDefault()
			},

			// 旋转
			rotate(index) {
				this.rotateID = setInterval(() => {
					this.moveBox[index].style.transform = `rotate(${this.rotateDeg++}deg)`
				}, 20)
			},

			// 创建爱心
			createLove(event,index){
				let img = document.createElement('img');
				let biglistbox = document.getElementsByClassName('biglistbox')[0];
				// 高度
				let viewportTop = document.getElementsByClassName('smallviewport')[0];
				let pageTop = parseInt(window.getComputedStyle(viewportTop).height);
				img.src = '/img/0010.947aac4f.png';
				biglistbox.appendChild(img);
				img.style.position = 'absolute';
				img.style.width = 60 + 'px';
				img.style.height = 60 + 'px';
				img.style.top = Math.floor(event.changedTouches[0].clientY) + pageTop * index - 70 + 'px' ;
				img.style.left = Math.floor(event.changedTouches[0].clientX) - 30 + 'px' ;
				img.style.transform = `rotateZ(${Math.random()*30 -15 }deg)`
				img.style.zIndex = 13;
				// 确定位子
				let timerimg = setInterval(()=>{
					img.style.top = parseInt(img.style.top)-2 + 'px';
					img.style.opacity = getComputedStyle(img).opacity - 0.04;
					setTimeout(()=>{
						clearInterval(timerimg);
						img.remove();
					},1000)
				},50)
			},
			
			playorstop(index,event){
				if (this.currentOpacity) {
					this.videoAuto[this.currentPage].play();
					document.getElementsByClassName('stopImg_img')[index].style.opacity =0; 
					this.currentOpacity = 0;
				} else {
					this.videoAuto[this.currentPage].pause();
					document.getElementsByClassName('stopImg_img')[index].style.opacity =1;
					this.currentOpacity = 1;
				}
			},
			
			touchLove(index,event){
				// 判断是否是双击
				let imglike = document.getElementsByClassName('navbar_likes_img')[index]
				if (this.clickcount == 1) {
					this.clicktime.start = new Date();
					this.clickcount++;
				} else {
					this.clicktime.end = new Date();
					if (Math.abs(this.clicktime.end - this.clicktime.start) < 300) {
						this.createLove(event,index);
						this.clickcount = 1;
						if (imglike.src.indexOf('0004') != -1) {
							// 还没有点赞 就进行更换
							imglike.src = '/img/0010.947aac4f.png'
						}
					} else {
						this.clicktime.start = new Date();
					}
				}
			}
		},

		watch: {
			isshow(oldval, newval) {
				if (!newval) {
					clearInterval(this.rotateID)
				} else {
					this.rotate(this.currentPage)
				}
			}
		},


	}
</script>

<style scoped="scoped">
	/* 视频内容盒子 */
	.biglistbox {
		margin-top: 40px;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.smallviewport {
		position: relative;
		width: 100%;
		height: calc(100vh - 90px);
		color: #000000;
		z-index: 10;
	}

	/* 视频窗口内容 */
	.videobox {
		position: relative;
		top: 4%;
		width: 100%;
		height: 99%;
		color: white;
	}

	/* 视窗中的视频大小 */
	.videobox video {
		object-fit: fill;
		position: absolute;
		width: 100%;
		height: 100%;
	}

	/* 侧边栏 */
	.navbar {
		width: 50px;
		height: 340px;
		position: absolute;
		right: 10px;
		bottom: 10px;
	}

	.navbar li {
		list-style: none;
		width: 100%;
		height: 50px;
	}

	/* 头像 */
	.navbar_head {
		width: 100%;
		height: 50px;
		border-radius: 50%;
		margin-bottom: 15px;
		justify-content: center;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	/* 头像下的img */
	.navbar_head img {
		width: 100%;
		height: 50px;
		border-radius: 50%;
	}

	.navbar_head .attention {
		width: 18px;
		height: 18px;
		position: relative;
		top: -10px;
	}

	.navbar_likes,
	.navbar_discuss,
	.navbar_share {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20px;
		flex-direction: column;
	}


	/* 点赞数 */
	.navbar_likes img,
	.navbar_discuss img,
	.navbar_share img {
		width: 70%;
		height: 35px;
	}

	/* 短视频信息 */
	.vedioMsg {
		position: absolute;
		bottom: 0;
		width: 100%;
		max-height: 100px;
		display: flex;
		margin-bottom: 20px;
		padding: 0 10px;
	}

	/* 左边的文本信息 */
	.vedioMsg_content {
		flex: 5;
	}

	/* 左边的文本信息标题 */
	.vedioMsg_content_title {
		font-weight: 600;
		padding-bottom: 5px;
	}

	.vedioMsg_content_text {
		font-size: 14px;
		letter-spacing: 1px;
		padding-bottom: 10px;
	}

	/* 右边的旋转 */
	.vedioMsg_rotate {
		flex: 2;
	}

	/* 跑马灯 */
	.Marquee {
		width: 60%;
	}

	/* 旋转logo */
	.vedioMsg_rotate img {
		width: 30%;
		height: 30%;
		border-radius: 50%;
	}

	.moveBox {
		background-image: url(../../assets/imgs/0008.png);
		width: 50px;
		height: 50px;
		background-size: 100%;
	}

	/* 旋转轴承 */
	.moveBox {
		position: absolute;
		right: 10px;
		bottom: 10px;
	}

	/* 暂停图标 */
	.stopImg {
		width: 100px;
		height: 100px;
		position: absolute;
		top: 0;
		z-index: 11;
		top: 40%;
		left: 50%;
		margin-left: -50px;
		opacity: 0.6;
	}

	.stopImg img {
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	
	
	@keyframes moveLove{
		0%{
			opacity: 1;
		}
		100%{
			opacity: 0;
		}
	}
	
	
</style>
