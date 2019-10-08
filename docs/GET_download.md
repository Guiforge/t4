# GET Download

Retrieves the encrypt file data

## Prerequisites

- Know Super Secret main key
- Derive Super Secret main key into signKey
- Ask nonce to server
- Sign nonce with signKey

## HTTP Request

```text
/download/${Id Of File}
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
#localhost:8070/download/5d9b4b7867abf700104ecadf
#signNonce: eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6WzEyNCw1MSwzMyw4OSwxODYsMTU0LDE2NSwxNDYsOTksMTYsMjM3LDE2NCwxMjcsNDEsMTc1LDE3MCwxNjgsMTk3LDExMiwxMjAsOTAsMTk0LDIzNCwyMzYsNDQsOTIsMjIwLDE3NSwyMzcsNTQsODcsOTddfQ==
curl -X 'GET' --header "signNonce: eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6WzEyNCw1MSwzMyw4OSwxODYsMTU0LDE2NSwxNDYsOTksMTYsMjM3LDE2NCwxMjcsNDEsMTc1LDE3MCwxNjgsMTk3LDExMiwxMjAsOTAsMTk0LDIzNCwyMzYsNDQsOTIsMjIwLDE3NSwyMzcsNTQsODcsOTddfQ==" localhost:8070/download/5d9b4b7867abf700104ecadf
```

### Response

```json
// if you have good Id of file and good signKey
//HTTP/1.1 200 OK
// binary file metaData

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
