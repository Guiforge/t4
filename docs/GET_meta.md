# GET Meta Data

Retrieves the metaData from a file.

## Prerequisites

- Know Super Secret main key
- Derive Super Secret main key into signKey
- Ask nonce to server
- sign nonce with signKey

## HTTP Request

```text
/meta/${Id Of File}
```

## Request parameters

In the request URL, provide the following query parameters with values.

| Parameter | Type | Description |
|:----------|:-----|:------------|
| Id Of File | string| the parameter is include to url (no need for: '?')|

## Optional request headers

| Name | Value |
|:-----|:------|
|signNonce| The value of signNonce Buffer encode in bas64 |

## Request body

Do not supply a request body with this method.

## Example

### Request

```bash
#localhost:8070/meta/5d9b4b7867abf700104ecadf
#signNonce: eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6WzEyNCw1MSwzMyw4OSwxODYsMTU0LDE2NSwxNDYsOTksMTYsMjM3LDE2NCwxMjcsNDEsMTc1LDE3MCwxNjgsMTk3LDExMiwxMjAsOTAsMTk0LDIzNCwyMzYsNDQsOTIsMjIwLDE3NSwyMzcsNTQsODcsOTddfQ==
curl -X 'GET' --header "signNonce: eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6WzEyNCw1MSwzMyw4OSwxODYsMTU0LDE2NSwxNDYsOTksMTYsMjM3LDE2NCwxMjcsNDEsMTc1LDE3MCwxNjgsMTk3LDExMiwxMjAsOTAsMTk0LDIzNCwyMzYsNDQsOTIsMjIwLDE3NSwyMzcsNTQsODcsOTddfQ==" localhost:8070/meta/5d9b4b7867abf700104ecadf
```

### Response

```json
// if you have good Id of file and good signKey
//HTTP/1.1 200 OK
{
    "meta": {
        "enc": {
            "encrypted": "eab8deecff62e0f92791a434ab69abd4783ec91b0cacd93850fe6a530c4d445409b8a1f604b85bbe445813619e9266d01b4bd772485a234f9921c0ea45aed2bc4c5bb712ff0c5d7099f5b1694391b482bd823807fef3e3cad20d72e331df04fb5e32a655eb53e45f87617363af4dc023c6945feb9a1d4aa758f12afcb49d6e9bc0684cae24e3f2ba617847d9c20721f450a82c9fd3d74cd99227636cbb41f8ce23d8bb85b84dfbcd6ae39bd0d37cf80f24ddd056d8100efca2755994a0b3dcaa31746d9afa6bd3aeaeab878ffbe476eca68d18fe09634ff76599749f468ce48dadc75a25d516b4d6764a70e417c3f8f8263a265e4b034324474f1c07f715a6ee532ffea0f6d3e20c06a5b75275a424be216f1073d0bf526154f40bf7fe59dedeaaeb24d921507f24885d58df97151d763c46f8c1a3e5475e8444a56505643f0335c136bd1e6de679c7cd0b1d5320085085f95c6b3dff096ab61d5c9b6bb9812d36c692c38e64dc6a02a59223aa2f68b16b95298d3d482b53a73fd39ef1d882fc9291583b152ffb4ae5164db07e1b7063aa81f9fe22d21bc003a9b1c34202071ecaeb01fc3d714cade102dc1a5f44a830fd351401bfa698fadc89c490acbac851e1721ecd7154f6322d58ec8eea7131153863f78633aa5f6d46199e2768e5acd1d6f6860cd506d56c120cb6a7afd233d639c5cfa21e62dc883d59aa74fb01768ded3ae06785e26fd5ca19e352f4",
            "auth": "jQ/OizQq63ka/EnWTHMjDw=="
        },
        "ivMeta": "ZOeOgKSKie2X5BxMKC/FOJYmczMQw0RQNq5w6NIT0goJSJHxJTEFQyA+lzcrvdCBshYWBOrHYSKaMj2nHYS3VBlHbLEt4ewfq8MMYLrUQFOQJaBSG0AgitHCyyU/ooEsy1ms5LWofUEEziWN3boH06KbuUuGiFVbZB65KDRta+Q=",
        "sizeZip": 729468,
        "authTag": "gouim07N4LLzdFXlWserSg=="
    }
}

//--------------------------------------------------
// if you don't have good Id of File:
// HTTP/1.1 404 Not Found
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Error</title>
</head>

<body>
    <pre>Cannot GET /meta/5d9b4b7867abf700104ecad</pre>
</body>

</html>

//--------------------------------------------------
//if you don't have the signNonce
//HTTP/1.1 401 Unauthorized
Unauthorized

```

## Remarks

**Only if you have Super Secret Key without send the Super Secret Key !**
