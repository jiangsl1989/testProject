<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		
		<view>
			<button type="primary" plain="true" @click="onclick">点击</button>
		</view>
		
		<view>
			<textarea class="textarea" placeholder="请输入内容" :maxlength="maxlength" v-model="txt"></textarea>
		</view>
	</view>
</template>

<script>
	import CRC32 from '@/pages/index/crc32.js'
	import byte from '@/pages/index/byte.js'
	
	export default {
		data() {
			return {
				title: 'Hello',
				value1: '',
				maxlength:-1,
				txt:""
			}
		},
		onLoad() {

		},
		methods: {
			onclick(){
				var hex = "0123456789ABCD";
				var bytes = byte.stringToByte(hex[13]);
				console.log('String >> byte',bytes)
				
				var v = byte.intToByte(4);
				console.log('int >> byte',v)
				var x = ("0123456789ABCDEF".indexOf(hex[13]) << 4 | "0123456789ABCDEF".indexOf(hex[13]));
				console.log("x",x)
				
				var y = byte.intToByte(x)
				console.log("y",y)
				
				var hexString = '10F7000086076507430723070207E206C206A2062B';
				var b = byte.hexString2ByteArray(hexString);
				console.log("b",b)
				
				var c = parseInt(hexString.substring(0,2),16)
				console.log("c",c)
				
				var bool = byte.checkValue(hexString);
				console.log("bool",bool)
				
				
				var bs = [1,2,3,4,5,6]
				var ts = byte.hexString2ByteArray(hexString);
				// bs.splice(1,ts.length,ts)
				Array.prototype.splice.apply(bs, [1, ts.length].concat(ts.slice(1,ts.length)));
				console.log("bs",bs)
				
				var bytes = [-86,19,-20,7,1,-15,-94,93]
				var v = byte.sendRs232Data1(5,1,0x5f,0x5f)
				var v1 = byte.sendRs232Data(5,1,0x5f,0x5f)
				console.log("v",v)
				console.log("v1",v1)
				
				
				var date = new Date();
				var year = date.getFullYear(); //年
				var month = date.getMonth() + 1; //月
				var day = date.getDate(); //日
				var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //时
				var minute = date.getMinutes() < 10 ? date.getMinutes() : date.getMinutes(); //分
				var second = date.getSeconds() < 10 ? date.getSeconds() : date.getSeconds(); //秒
				
				var value1 = byte.sendRs232Data(21,hour-1,minute+1,second+1);
				var value2 = byte.sendRs232Data(20,year-2000,month,day);
				var value = byte.sendRs232Data(5,1,0x5f,0x5f)
				
				console.log("value1",value1)
				console.log("value2",value2)
				console.log("value",value)
				
				var bs1=[4];
				var bs2=[1,2,3,4,5,6]
				var hex_232 = CRC32.crc32(bs1);
				console.log("crc",hex_232)
				
				//字符转转属猪对象
				var str1 = byte.spaceHex(hex_232);
				console.log("str1",str1)
				var str2 = byte.highLowHex(str1);
				console.log("str2",str2)

				console.log("crc1",byte.intToByte(0x5a));
				console.log("crc2",byte.intToByte(0xa5));
				console.log("crc3",byte.intToByte(0+4));
				
				
				var tmp1 = [1,2,3,4,5,6]
				var totalBuff1 = [7,8,9,10,11,12,13,14,15]
				
				var b1 = totalBuff1.slice(2,6)
				var b2 = tmp1.slice(1,3)
				var b3 = b2.concat(b1)
				
				console.log("b1",b1);
				console.log("b2",b2);
				console.log("b3",b3);
				
				console.log("进一法",Math.ceil(6/5));
				
				console.log("txt",this.txt.split(":"))
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.textarea{
		border: solid 1px #8f8f94;
	}
</style>
