const kDate = new Date();
const kmonth = kDate.getMonth() + 1;
const kdate = "" + kDate.getFullYear() + kmonth;
const pwd = "NfaNteCh" + kdate;
var baseurl = ''
const headStr = 'U2FsdGVkX1' // aes密文前缀
const Encrypt = () => {
	let rawInput = document.getElementById("rawinput")
	let aesInput = document.getElementById("aesinput")
	const word = rawInput.value;
	const aesvalue = CryptoJS.AES.encrypt(word, pwd).toString();
	aesInput.value = baseurl + aesvalue.slice(10);
	if (document.getElementById("copycheck").checked) {
		copyOutput(aesInput)
	}
	aesInput.value = aesvalue.slice(10);
}
const Decrypt = () => {
	let rawInput = document.getElementById("rawinput")
	let aesInput = document.getElementById("aesinput")
	const word = headStr + aesInput.value;
	rawInput.value = CryptoJS.AES.decrypt(word, pwd).toString(CryptoJS.enc.Utf8);
	if (document.getElementById("copycheck").checked) {
		copyOutput(rawInput)
	}
}
const copyOutput = (ele) => {
	if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
		//for ios
		const range = document.createRange();
		range.selectNode(ele);
		window.getSelection().addRange(range);
		document.execCommand("Copy");
		window.getSelection().removeAllRanges();
	} else {
		//for other
		ele.select();
		document.execCommand("Copy");
	}
}
function load() {
	baseurl = 'https://' + location.host + '?a=' // 设定生成链接的地址
	document.getElementById("btn1").addEventListener('click', Encrypt);
	document.getElementById("btn2").addEventListener('click', Decrypt);
	const match = location.search.match(/a=([^&]*)/) // 匹配参数a，即密文
	console.log(location)
	if (match && match[1] !== '') {
		document.getElementById("aesinput").value = match[1];
		document.getElementById("btn2").click();
	}
}


