const kDate = new Date();
const kmonth = kDate.getMonth() + 1;
const kdate = "" + kDate.getFullYear() + kmonth;
const pwd = "NfaNteCh" + kdate;
var baseurl = ''
const headStr = 'U2FsdGVkX1' // aes密文前缀
const copyText = (text) => {
	// 中转
	const copyText = document.getElementById("copytext")
	copyText.innerHTML = text
	// 复制
	const range = document.createRange();
	range.selectNode(copyText);
	const selection = window.getSelection();
	if (selection.rangeCount > 0) selection.removeAllRanges();
	selection.addRange(range);
	document.execCommand('Copy');
	// 还原
	selection.removeAllRanges()
	copyText.innerHTML = ''
}
const Encrypt = () => {
	const rawInput = document.getElementById("rawinput")
	const aesInput = document.getElementById("aesinput")
	const word = rawInput.value;
	const aesvalue = CryptoJS.AES.encrypt(word, pwd).toString();
	aesInput.value = aesvalue.slice(10);

	if (document.getElementById("copycheck").checked) {
		copyText(baseurl + aesvalue.slice(10))
	}
}
const Decrypt = () => {
	const rawInput = document.getElementById("rawinput")
	const aesInput = document.getElementById("aesinput")
	const word = headStr + aesInput.value;
	const res = CryptoJS.AES.decrypt(word, pwd).toString(CryptoJS.enc.Utf8);
	rawInput.value = res
	
	if (document.getElementById("copycheck").checked) {
		copyText(res)
	}
}
function load() {
	baseurl = 'https://' + location.host + '?a=' // 设定生成链接的地址
	document.getElementById("btn1").addEventListener('click', Encrypt);
	document.getElementById("btn2").addEventListener('click', Decrypt);
	const match = location.search.match(/a=([^&]*)/) // 匹配参数a，即密文
	if (match && match[1] !== '') {
		document.getElementById("aesinput").value = match[1];
		document.getElementById("btn2").click();
	}
}


