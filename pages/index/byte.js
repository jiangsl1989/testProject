//字符串转字节序列
export function stringToByte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        } else {
            bytes.push(c & 0xFF);
        }
    }
    return bytes;
 
}

/**
 * int 转 byte
 * @param i 
 */
function intToByte(i) {
	var b = i & 0xFF;
	var c = 0;
	if (b >= 128) {
		c = b % 128;
		c = -1 * (128 - c);
	} else {
		c = b;
	}
	return c;
}


	function hexString2ByteArray(hexString){
		if (hexString == null || hexString == "") {
			return null;
		}
		hexString = hexString.toUpperCase();
		var length = hexString.length / 2;
		var d = [];
		for (var i = 0; i < length; i++) {
			var pos = i * 2;
			d[i] = intToByte(charToByte(hexString[pos]) << 4 | charToByte(hexString[pos + 1]));
		}
		return d;
	}


	function charToByte(c) {
        return "0123456789ABCDEF".indexOf(c);
    }

	function checkValue(hexLineStr) {
		var buf = hexString2ByteArray(hexLineStr);
		var temp = 0;
		for (var i = 0; i < buf.length; i++) {
			temp += buf[i];
			console.log("temp",temp)
		}
		if (temp % 0xFF == 0) {
			return true;
		}
		return false;
	}
	
	
	//十进制转16进制
	function numToHex(num,system){
		 // 十进制转其它进制，仅支持到十六进制
		 var shiliu=[
		 	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
		 	, 'A', 'B', 'C', 'D', 'E', 'F', 'G'],sl_arr=[];
		 do{
			 var fl_sl=Math.floor(num/system);
			 var yu_sl=num%system;
			 
			 sl_arr.unshift(shiliu[yu_sl]);		//往数组开头添加一条数据
			 num=fl_sl;
		 }while(num>0)
		 if(sl_arr.length==1){
			 return '0'+sl_arr.join('');
		 }
		 return sl_arr.join('');				//拼接数组成字符串
	}

function byteToString(arr) {
	
	var str = '';
	for(var i = 0; i < arr.length; i++) {
		if(arr[i]<0){
			str = str + numToHex(256+arr[i],16)
		}else{
			str = str + numToHex(arr[i],16)
		}
	}
	return str;
}


function sendRs232Data(mcmd,scmd,va1,va2){
	var SendRS232=[];
	var dataStr="";
	SendRS232[0] = intToByte(170);
	SendRS232[1] = intToByte(mcmd);
	SendRS232[2] = intToByte(~SendRS232[1]);
	SendRS232[3] = intToByte(scmd);
	SendRS232[4] = intToByte(va1);
	SendRS232[5] = intToByte(va2);
	SendRS232[6] = intToByte(SendRS232[0] + SendRS232[1] + SendRS232[2] + SendRS232[3] + SendRS232[4] + SendRS232[5]);
	SendRS232[7] = intToByte(~SendRS232[6]);
	console.log("SendRS232",SendRS232)
	dataStr = byteToString(SendRS232);
	return dataStr;
}


function sendRs232Data1(mcmd,scmd,va1,va2){
	var SendRS232=[];
	var dataStr="";
	SendRS232[0] = numToHex(170,16);
	SendRS232[1] = numToHex(mcmd,16);
	SendRS232[2] = numToHex(255-mcmd,16);
	SendRS232[3] = numToHex(scmd,16);
	SendRS232[4] = numToHex(va1,16);
	SendRS232[5] = numToHex(va2,16);
	SendRS232[6] = numToHex((parseInt(SendRS232[0],16)+
							parseInt(SendRS232[1],16)+
							parseInt(SendRS232[2],16)+
							parseInt(SendRS232[3],16)+
							parseInt(SendRS232[4],16)+
							parseInt(SendRS232[5],16))%256,16);
	SendRS232[7] = numToHex(255-parseInt(SendRS232[6],16),16);
	for(var i=0;i<SendRS232.length;i++){
		dataStr = dataStr + SendRS232[i];
	}
	return dataStr;
}


function spaceHex(str){
        var array= str.split("");
        if(str.length<=2) return str;
        var buffer ="";
        for(var i=0;i<array.length;i++){
            var start =i+1;
            if(start%2==0){
                buffer = buffer +array[i]+" ";
            }else{
                buffer = buffer +array[i]
            }
        }
        return buffer;
    }


function highLowHex(str){
        if(str.trim().length<=2) return str;

        var list = str.split(" ");
        list.reverse();

        var stringBuffer = "";

        for(var i=0;i<list.length;i++){
            stringBuffer = stringBuffer + list[i];
        }
        return stringBuffer;
    }

module.exports = {
	stringToByte:stringToByte,
	intToByte:intToByte,
	hexString2ByteArray:hexString2ByteArray,
	checkValue:checkValue,
	numToHex:numToHex,
	byteToString:byteToString,
	sendRs232Data:sendRs232Data,
	sendRs232Data1:sendRs232Data1,
	spaceHex:spaceHex,
	highLowHex:highLowHex
}