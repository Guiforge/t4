# SocketIO Upload file

Upload file to server

## Prerequisites

Connect with socket.io-client to server same port like API

## Events
___
### **meta**

Client: emit 'meta'

#### Request parameters


| Parameter | Type | Description |
|:----------|:-----|:------------|
| meta | Object| metaData of file|

```js
    meta: {
    	enc: {
    		"encrypted": [String] //Encrypt meta,
    		"auth": [Buffer] //tag auth in AES GCM ,
    	}
    	ivMeta: [Buffer], // Initialisation vetor, encrypt mea
    	down: [Number], // number of download before expire
		days: [Number], // number of days before expire
		owner: [Buffer] // owner tag 
		keyAuth: [Buffer] // a key derived from the master super secret key
    }
	
	// Encrypt meta
	// encrypted: {
    // 		filesName: this.files,
    // 		ivFiles: ivFiles
    // 	} 
```

#### Example

##### Request

```js
Object { enc: {…}, ivMeta: Uint8Array(128), keyAuth: Uint8Array(64), days: 1, down: 1, owner: Uint8Array(512) }

```

##### Response

server emit 'meta'

```js
{ id: [ObjectID] }
```
___
### **chunk**

Client: emit 'chunk', with node js stream Writable

#### Request parameters


| Parameter | Type | Description |
|:----------|:-----|:------------|
| chunk | TypeArray/Buffer| binary data of file (encrypt)|
___
### **authTag**

Client: emit 'authTag', send auhtTag required to finish download and AES GCM encryption

#### Request parameters


| Parameter | Type | Description |
|:----------|:-----|:------------|
| authTag | TpeArray/Buffer| AuthTag from AES GCM encryption|


##### Response

server emit 'authTag' when all upload is done

```js
Ok
```
