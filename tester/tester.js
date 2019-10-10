const chalk = require('chalk');
const request = require('request');
const io = require('socket.io-client');
const crypto =  require('crypto')

console.log(chalk.blue('Tester'));

const ExampleMeta = {
	"enc": {
		"encrypted": "9e6a3defa61aafd4bd9117a9dc9f5028029959489eaa40625278ca62269a75c0d9307ab00efe251f46ec07c6982e6a4d8f3602ba41b99f834f837a47855c7a3c2c0a5ee02770e53732ceae68ba2f18a78a21d6c28b3d5ddbd3cd7e07080d7ce1aba7f5c782ef6bace42aa82d342536d9f539fd063b1a4dbb3598004de9ecb1e46913accd21488b99e4f319988c43a4c4bf71a33d31be8f8dbacac010833c0ef6aece13fa288376d334e37314e269e341d3f62c2a926d76fa11c49270e8ad144abe1efff1683f39b846880e2c2853bd23cf1252d6ef4edde1af4596bc38dc8b765c65aa3e5a2ff63a8b049ebd59736dc5b647a6a2da17d6606d6516ac56d1f966e97a85ed98d8dfd6e0e2904a2e8af7feb47b3c3f77361e93a636365d8089d62c75bb17cabd95e5bae0273675540792c366486e850fee096a19f265d2cc2744f5057e005be370793465e3e2aa74a3218a7e809dde055a4710826ab947452465910e2588b770fb2d2e588eca4c2cf183beb41dccb6b7249af47ab731c38dfadacc327e6722b046df66d7ae5e64699a4a1a0df9b2c6ec909bec9e594dd7cbf86b06a2308c2d79409055d7774ba399993fa2722b8ec3f5647fc625cab1b12f54dcd537c639128a60d69e7855d901a8ac905fe2775f72057dc6fc31443d99c499c424fb3fc1e017fdb535053e423a089358e26b19a3a281d50e74b39cd4e4a9e2ec121c672e9e6f06df",
		"auth": Buffer.from([237, 120, 10, 203, 67, 131, 146, 251, 216, 199, 1, 239, 91, 226, 155, 42])
	},
	"ivMeta": Buffer.from([5, 113, 249, 81, 29, 233, 74, 221, 46, 75, 211, 42, 86, 154, 136, 162, 177, 154, 162, 200, 115, 188, 186, 230, 221, 135, 125, 147, 169, 112, 71, 180, 88, 202, 250, 124, 138, 139, 121, 190, 51, 48, 58, 35, 166, 203, 164, 131, 125, 92, 217, 193, 35, 149, 187, 49, 39, 38, 237, 92, 104, 43, 95, 219, 47, 173, 32, 188, 189, 164, 18, 127, 127, 35, 147, 44, 59, 205, 148, 47, 83, 108, 131, 122, 62, 160, 68, 171, 104, 41, 94, 27, 222, 250, 98, 140, 44, 71, 46, 136, 87, 23, 116, 89, 6, 109, 135, 195, 113, 14, 234, 40, 63, 95, 210, 210, 233, 77, 73, 133, 75, 188, 65, 190, 248, 191, 57, 110]),
	"keyAuth": Buffer.from([125, 142, 154, 220, 226, 87, 69, 196, 63, 99, 206, 244, 220, 64, 133, 216, 243, 190, 70, 47, 233, 8, 186, 25, 209, 178, 115, 76, 121, 31, 100, 141, 182, 26, 110, 128, 115, 118, 210, 73, 146, 112, 226, 151, 209, 26, 20, 200, 109, 49, 210, 35, 67, 115, 148, 219, 254, 231, 31, 169, 171, 17, 120, 140]),
	"days": 1,
	"down": 2,
	"owner": "25f5f29e64af1e8d457e3397dd6f8b60e0cee1200aeaf6d4029ac8fe0c3bc98a0406f79a9ad8620773a3a50f705e63449e1504a4cdee8d88e58f8a0f8ec7fad7f2843bcc04e70a1a0edde9b2bc554d340eddb612a5c74e25c1fa2f673536775c7a70530baacb22b736b496bc54ae9d75c5773b842071f414151e707f6665ef87465af84f6cbc5b752eca1ce03190a1ee093a650bcfbdf65e9fec698b2258fddf5b786eab33d5323d6c48b06d38db085cb29ab940b669ed6b0590c2ace3d1213cd5fc598acbd70046becac2cf0c782efb421a49900426ad252351e05963ed04f16aa736785788d3a0f0b06c9649ae56297bd3cbef3a5497adb8d58d628b1c1dba",
}

URL_API = 'http://localhost:8070'


async function test(url, expected, method, headers) {
	return new Promise((resolve, reject) => {
		request({url, method: method || "GET", headers: headers || {}}, (error, response, body) => {
			if (process.env.DEBUG) {
				console.log(chalk.grey(`\t [+] ${method || "GET"} ${url} = ${response ? response.statusCode : error}`))
			}
			if (error) {
				reject(error)
			} else if (expected.body && expected.body !== body) {
				reject({ url, desc:'not good Body', code: response.statusCode, body, expected })
			} else if (response && expected.code && response.statusCode !== expected.code) {
				reject({ url, desc:'not good response code', code: response.statusCode, body, expected })
			} else {
				resolve(body)
			}
		})
	})
}

async function testUploadFoo() {
	return new Promise((resolve, reject) => {
		let socket = io(`${URL_API}`, {
			reconnection: true,
			reconnectionDelay: 200,
			reconnectionDelayMax: 500,
			reconnectionAttempts: 3,
		});
		socket.once('error', (e) => { 
			reject(e)
		})

		//TEST not event:
		socket.emit('NimporteQuoi', Buffer.alloc(42))
		setTimeout(() => {
			socket.disconnect()
			resolve('OK')
			}, 1000)
	})
}

async function testUploadMetaError() {
	return new Promise((resolve, reject) => {
		let socket = io(`${URL_API}`, {
			reconnection: true,
			reconnectionDelay: 200,
			reconnectionDelayMax: 500,
			reconnectionAttempts: 3,
		});
		socket.once('error', (e) => { 
			reject(e)
		})
		socket.once('meta', (meta) => {
			console.log(meta);
			reject('Error');
		})

		socket.emit('meta', Buffer.alloc(42))
		setTimeout(() => {
			socket.disconnect()
			resolve('OK')
		}, 1000)
	})
}

async function testUploadMetaOk() {
	return new Promise((resolve, reject) => {
		let socket = io(`${URL_API}`, {
			reconnection: true,
			reconnectionDelay: 200,
			reconnectionDelayMax: 500,
			reconnectionAttempts: 3,
		});
		socket.once('error', (e) => { 
			reject(e)
		})
		socket.once('meta', (meta) => {
			if (meta.id) {
				resolve('OK')
			} else {
				reject('There is not id in meta response')
			}
		})

		socket.emit('meta', ExampleMeta)
		setTimeout(() => {
			socket.disconnect()
			reject('Error');
		}, 1000)
	})
}

async function testUploadFileError() {
	return new Promise((resolve, reject) => {
		let socket = io(`${URL_API}`, {
			reconnection: true,
			reconnectionDelay: 200,
			reconnectionDelayMax: 500,
			reconnectionAttempts: 3,
		});
		socket.once('error', (e) => { 
			resolve(e)
		})
		socket.once('meta', (meta) => {
			reject('Error server should return error')
		})

		socket.emit('chunk', ExampleMeta)
		setTimeout(() => {
			socket.disconnect()
			reject('Error');
		}, 1000)
	})
}

async function testUploadAuthTagError() {
	return new Promise((resolve, reject) => {
		let socket = io(`${URL_API}`, {
			reconnection: true,
			reconnectionDelay: 200,
			reconnectionDelayMax: 500,
			reconnectionAttempts: 3,
		});
		socket.once('error', (e) => { 
			resolve(e)
		})
		socket.once('disconnect', (e) => { 
			resolve(e)
		})
		socket.once('meta', (meta) => {
			reject('Error server should return error')
		})
		socket.once('authTag', (meta) => {
			reject('Error server should return error')
		})

		socket.emit('authTag', ExampleMeta)
		let time = setTimeout(() => {
			socket.disconnect()
			reject('Error');
		}, 1000)
	})
}

async function testUpload(metaParam) {
	const metaUse = metaParam || ExampleMeta
	return new Promise((resolve, reject) => {
		let socket = io(`${URL_API}`, {
			reconnection: true,
			reconnectionDelay: 200,
			reconnectionDelayMax: 500,
			reconnectionAttempts: 3,
		});
		let upload = false
		socket.once('error', (e) => { 
			reject(e)
		})
		socket.once('disconnect', (e) => {
			if (!upload) {
				reject(e)
			} else {
				resolve()
			}
		})
		socket.once('meta', (meta) => {
			socket.once('authTag', (ok) => {
				if (ok === 'Ok') {
					resolve(meta.id)
				} else {
					reject({msg:'ok is not OK', ok})
				}
			})
			socket.emit('chunk', Buffer.alloc(42))
			socket.emit('authTag', Buffer.alloc(16))
			upload = true;
		})

		socket.emit('meta', metaUse)
		let time = setTimeout(() => {
			socket.disconnect()
			reject('Error');
		}, 1500)
	})
}

async function test404() {
	const proms = [];
	// nothing
	proms.push(test(URL_API, {code: 404}))

	//foo
	proms.push(test(URL_API+'/nimp', {code: 404}))

	//info
	proms.push(test(URL_API+'/info', {code: 404}))
	proms.push(test(URL_API+'/info/', {code: 404}))
	proms.push(test(URL_API+'/info/toto', {code: 404}))
	proms.push(test(URL_API+'/info/zzzzzzzzzzzzzzzzzzzzzz42', {code: 404}))

	// /file/delete
	proms.push(test(URL_API+'/file/delete', {code: 404}))
	proms.push(test(URL_API+'/file/delete/', {code: 404}))
	proms.push(test(URL_API+'/file/delete/toto', {code: 404}))
	proms.push(test(URL_API+'/file/delete/zzzzzzzzzzzzzzzzzzzzzz42', {code: 404}))
	proms.push(test(URL_API+'/file/delete', {code: 404}, "DELETE"))
	proms.push(test(URL_API+'/file/delete/', {code: 404}, "DELETE"))
	proms.push(test(URL_API+'/file/delete/toto', {code: 404}, "DELETE"))
	proms.push(test(URL_API+'/file/delete/zzzzzzzzzzzzzzzzzzzzzz42', {code: 404}, "DELETE"))

	//nonce
	proms.push(test(URL_API+'/nonce', {code: 404}))
	proms.push(test(URL_API+'/nonce/', {code: 404}))
	proms.push(test(URL_API+'/nonce/toto', {code: 404}))
	proms.push(test(URL_API+'/nonce/zzzzzzzzzzzzzzzzzzzzzz42', {code: 404}))

	//meta
	proms.push(test(URL_API+'/meta', {code: 404}))
	proms.push(test(URL_API+'/meta/', {code: 404}))
	proms.push(test(URL_API+'/meta/toto', {code: 404}))
	proms.push(test(URL_API+'/meta/zzzzzzzzzzzzzzzzzzzzzz42', {code: 404}))

	//download
	proms.push(test(URL_API+'/download', {code: 404}))
	proms.push(test(URL_API+'/download/', {code: 404}))
	proms.push(test(URL_API+'/download/toto', {code: 404}))
	proms.push(test(URL_API+'/download/zzzzzzzzzzzzzzzzzzzzzz42', {code: 404}))

	return Promise.all(proms)
}

async function testNonceOK(id) {
	let IDFile = id
	if (!id) {
		IDFile = await testUpload()
	}
	return test(URL_API + '/nonce/' + IDFile, {code: 200},  "GET")
}


async function test401() {
	const IDFile = await testUpload()
	const nonce = await testNonceOK(IDFile)
	return new Promise((resolve, reject) => {
		try {
			const proms = [];
			const hmac = crypto.createHmac('sha256', ExampleMeta.keyAuth);
			hmac.write(JSON.parse(nonce).nonce);
			hmac.end();
			let signNonce = hmac.read();

			signNonce.write('42')
			signNonce = Buffer.from(JSON.stringify(signNonce)).toString('base64')

			//info
			proms.push(test(URL_API+'/info/' + IDFile, {code: 401}, "GET", {'owner': '25f5f29e64af1e8d457e3397dd6f8b60e0cee1200aeaf6d4029ac8fe0c3bc98a0406f79a9ad8620773a3a50f705e63449e1504a4cdee8d88e58f8a0f8ec7fad7f2843bcc04e70a1a0edde9b2bc554d340eddb612a5c74e25c1fa2f673536775c7a70530baacb22b736b496bc54ae9d75c5773b842071f414151e707f6665ef87465af84f6cbc5b752eca1ce03190a1ee093a650bcfbdf65e9fec698b2258fddf5b786eab33d5323d6c48b06d38db085cb29ab940b669ed6b0590c2ace3d1213cd5fc598acbd70046becac2cf0c782efb421a49900426ad252351e05963ed04f16aa736785788d3a0f0b06c9649ae56297bd3cbef3a5497adb8d58d628b1c1d42'}))

			// /file/delete
			proms.push(test(URL_API+'/file/delete/' + IDFile, {code: 401}, "GET", {'owner': '25f5f29e64af1e8d457e3397dd6f8b60e0cee1200aeaf6d4029ac8fe0c3bc98a0406f79a9ad8620773a3a50f705e63449e1504a4cdee8d88e58f8a0f8ec7fad7f2843bcc04e70a1a0edde9b2bc554d340eddb612a5c74e25c1fa2f673536775c7a70530baacb22b736b496bc54ae9d75c5773b842071f414151e707f6665ef87465af84f6cbc5b752eca1ce03190a1ee093a650bcfbdf65e9fec698b2258fddf5b786eab33d5323d6c48b06d38db085cb29ab940b669ed6b0590c2ace3d1213cd5fc598acbd70046becac2cf0c782efb421a49900426ad252351e05963ed04f16aa736785788d3a0f0b06c9649ae56297bd3cbef3a5497adb8d58d628b1c1d42'}))
			proms.push(test(URL_API+'/file/delete/' + IDFile, {code: 401}, "DELETE", {'owner': '25f5f29e64af1e8d457e3397dd6f8b60e0cee1200aeaf6d4029ac8fe0c3bc98a0406f79a9ad8620773a3a50f705e63449e1504a4cdee8d88e58f8a0f8ec7fad7f2843bcc04e70a1a0edde9b2bc554d340eddb612a5c74e25c1fa2f673536775c7a70530baacb22b736b496bc54ae9d75c5773b842071f414151e707f6665ef87465af84f6cbc5b752eca1ce03190a1ee093a650bcfbdf65e9fec698b2258fddf5b786eab33d5323d6c48b06d38db085cb29ab940b669ed6b0590c2ace3d1213cd5fc598acbd70046becac2cf0c782efb421a49900426ad252351e05963ed04f16aa736785788d3a0f0b06c9649ae56297bd3cbef3a5497adb8d58d628b1c1d42'}))

			//meta
			proms.push(test(URL_API+'/meta/' + IDFile, {code: 401}, "GET", {'signNonce': signNonce}))


			//download
			proms.push(test(URL_API+'/download/' + IDFile, {code: 401}, "GET", {'signNonce': signNonce}))


			Promise.all(proms).then(() => {resolve()}).catch((e) => {reject(e)})
		} catch (error) {
			reject(error)
		}
	})
}

async function testComplet() {
	const IDFile = await testUpload()
	const nonce = await testNonceOK(IDFile)
	const proms = [];
	const hmac = crypto.createHmac('sha256', ExampleMeta.keyAuth);
	hmac.write(JSON.parse(nonce).nonce);
	hmac.end();
	let signNonce = hmac.read();

	signNonce = Buffer.from(JSON.stringify(signNonce)).toString('base64')

	//info
	await test(URL_API+'/info/' + IDFile, {code: 200}, "GET", {'owner': ExampleMeta.owner})

	//meta
	await test(URL_API+'/meta/' + IDFile, {code: 200}, "GET", {'signNonce': signNonce})

	//download
	await test(URL_API+'/download/' + IDFile, {code: 200}, "GET", {'signNonce': signNonce})

	// /file/delete
	await test(URL_API+'/file/delete/' + IDFile, {code: 404}, "GET", {'owner': ExampleMeta.owner})
	await test(URL_API+'/file/delete/' + IDFile, {code: 200}, "DELETE", {'owner': ExampleMeta.owner})

	return new Promise((resolve, reject) => {
		try {

			// Normally the file is delete

			//info
			proms.push(test(URL_API+'/info/' + IDFile, {code: 404}, "GET", {'owner': ExampleMeta.owner}))

			//meta
			proms.push(test(URL_API+'/meta/' + IDFile, {code: 404}, "GET", {'signNonce': signNonce}))

			//download
			proms.push(test(URL_API+'/download/' + IDFile, {code: 404}, "GET", {'signNonce': signNonce}))

			Promise.all(proms).then(() => {resolve()}).catch((e) => {reject(e)})
		} catch (error) {
			reject(error)
		}
	})
}

async function testExpire() {
	const IDFile = await testUpload()
	const nonce = await testNonceOK(IDFile)
	const proms = [];
	const hmac = crypto.createHmac('sha256', ExampleMeta.keyAuth);
	hmac.write(JSON.parse(nonce).nonce);
	hmac.end();
	let signNonce = hmac.read();

	signNonce = Buffer.from(JSON.stringify(signNonce)).toString('base64')


	//download
	await test(URL_API+'/download/' + IDFile, {code: 200}, "GET", {'signNonce': signNonce})
	await test(URL_API+'/download/' + IDFile, {code: 200}, "GET", {'signNonce': signNonce})
	await test(URL_API+'/download/' + IDFile, {code: 404}, "GET", {'signNonce': signNonce})

	return new Promise((resolve, reject) => {
		try {

			// Normally the file is delete

			//info
			proms.push(test(URL_API+'/info/' + IDFile, {code: 404}, "GET", {'owner': ExampleMeta.owner}))

			//meta
			proms.push(test(URL_API+'/meta/' + IDFile, {code: 404}, "GET", {'signNonce': signNonce}))

			//download
			proms.push(test(URL_API+'/download/' + IDFile, {code: 404}, "GET", {'signNonce': signNonce}))

			Promise.all(proms).then(() => {resolve()}).catch((e) => {reject(e)})
		} catch (error) {
			reject(error)
		}
	})
}

async function testValueMetaError() {
	async function _testErrorUploadMeta(metaParam) {
		return new Promise((resolve, reject) => {
			testUpload(metaParam).then(() => {
				reject(metaParam)
			})
			.catch(() => {
				resolve();
			})
		})

	}
		let metaTest = JSON.parse(JSON.stringify(ExampleMeta))
		const proms = []
		metaTest.days = -42
		proms.push(_testErrorUploadMeta(metaTest))

		metaTest.days = 11
		proms.push(_testErrorUploadMeta(metaTest))

		metaTest.days = []
		proms.push(_testErrorUploadMeta(metaTest))

		metaTest = JSON.parse(JSON.stringify(ExampleMeta))
		metaTest.owner = ''
		proms.push(_testErrorUploadMeta(metaTest))

		metaTest = JSON.parse(JSON.stringify(ExampleMeta))
		metaTest.enc = '42'
		proms.push(_testErrorUploadMeta(metaTest))

		metaTest = JSON.parse(JSON.stringify(ExampleMeta))
		metaTest.ivMeta = {42: 'ecole'}
		proms.push(_testErrorUploadMeta(metaTest))

		metaTest = JSON.parse(JSON.stringify(ExampleMeta))
		metaTest.keyAuth = {42: 'ecole'}
		proms.push(_testErrorUploadMeta(metaTest))


		metaTest = JSON.parse(JSON.stringify(ExampleMeta))
		metaTest.down = 10001
		proms.push(_testErrorUploadMeta(metaTest))
		return Promise.all(proms)
} 

Tests = [
	testUploadFoo,
	testUploadMetaError,
	testUploadMetaOk,
	testUploadFileError,
	testUploadAuthTagError,
	testUpload,
	test404,
	test401,
	testNonceOK,
	testComplet,
	testExpire,
	testValueMetaError
]
const proms = []
Tests.forEach(elem => {
	proms.push(elem().then((a) => {
		console.log(chalk.green(`- ${elem.name}: OK`))
	})
	.catch((e) => {
		console.log(chalk.red(`- ${elem.name}: Not OK`));
		console.log(chalk.red(JSON.stringify(e)));
	}));
});

