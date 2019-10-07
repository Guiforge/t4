# GET Nonce auth

Retrieve nonce from file

## Prerequisites

None.

## HTTP Request

```text
/nonce/${Id Of File}
```

## Request parameters

In the request URL, provide the following query parameters with values.

| Parameter | Type | Description |
|:----------|:-----|:------------|
| Id Of File | string| the parameter is include to url (no need for: '?')|

## Request body

Do not supply a request body with this method.

## Example

### Request

```bash
#localhost:8070/meta/5d9b4b7867abf700104ecadf
curl -v -X 'GET' localhost:8070/nonce/5d9b4b7867abf700104ecadf
```

### Response

```json
// if you have good Id of file
//HTTP/1.1 200 OK
{
    "nonce": "QmEjVTkWqJ8DGMtRKXXTB/niOmBVM1ZhmgQmqP3r1R+TctTzPWnHzyzB"
}

// if you don't have good Id of file and good signKey
//HTTP/1.1 404 Not Found
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Error</title>
</head>

<body>
    <pre>Cannot GET /nonce/5d9b4b7867abf700104ecad</pre>
</body>

</html>
```
