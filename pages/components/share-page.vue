<template>
	<view>
		<view>
			<!-- 分享示例 -->
			<uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
				<uni-popup-share></uni-popup-share>
			</uni-popup>
		</view>
		<view>
			<button class="button" type="primary" @click="shareToggle"><text class="button-text">分享</text></button>
		</view>
	</view>
</template>

<script>
	export default {
		name:"sharePage",
		data() {
			return {
				
			}
		},
		onLoad() {
		
		},
		methods: {
			shareToggle(){
				this.$refs.share.open()
			}
		},
	}
</script>

<style>
</style>