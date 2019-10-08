# Process Upload/Download

## Upload
> cf: [SocketIO_Upload.md](./SocketIO_Upload.md)
1. Client sends Meta data
2. Client sends all binary data of file encrypted chunk by chunk (like stream)
3. Client sends AuthTag used in AES GCM

## Download
> Client derives Super Master Key to signKey
1. Client requests nonce [GET_nonce.md](./GET_nonce.md)
	- Server sends nonce
2. Client signs nonce with signKey with HMAC algo
3. Client sends a request meta with sign nonce in header [GET_meta.md](./GET_meta.md)
	- Server checks signature before answer
4. Client sends a request download with sign nonce in header [GET_download.md](./GET_download.md)
	- Server checks signature before answer