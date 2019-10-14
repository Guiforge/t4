# DELETE file

Delete file  

## Prerequisites

- Know owner tag  

## HTTP Request

```text
/file/delete/${Id Of File}
```

## Request parameters

In the request URL, provide the following query parameters with values.  

| Parameter | Type | Description |  
|:----------|:-----|:------------|  
| Id Of File | string| the parameter is include to url (no need for: '?')|  

## Optional request headers

| Name | Value |  
|:-----|:------|  
|owner| The value of signNonce Buffer encode in bas64 |  

## Request body

Do not supply a request body with this method.  

## Example

### Request

```bash
#localhost:8070/file/delete/5d9b4b7867abf700104ecadf
#owner: 6f0b75b03f21f766c846871ea43542f37a67fd8f4be545ae66eb1054e03817f5ae7ea5eaa41ba8164b1ac65f7afa4d01fa50f46e904363c51e1d5344b2d9626ee6f401ad0fcd2001f291db6873c028bc99f86ad7f69b24d8181765eec2bcd9c0e484ee1295f88a10d5894e4cfdf25cfe7196cd58813d7cf1eb37cbabefa051758d3222abdd8cc83cf7055279bcf313e1085a877d84c21ecef858b9f8842c6e8781a0acfc6f6c9be3079fa536e221e7f428d1ec8bf8c42504ebca9ad777f5658499a01dc47439ee6cd8ea33655288fe8980a3a56005cd3f755878fe57834b0bf6d069b97d841e42b3f307efc34a77ba9976ac84499695feef89da58062e4114f6
curl -X 'DELETE' --header "owner: 6f0b75b03f21f766c846871ea43542f37a67fd8f4be545ae66eb1054e03817f5ae7ea5eaa41ba8164b1ac65f7afa4d01fa50f46e904363c51e1d5344b2d9626ee6f401ad0fcd2001f291db6873c028bc99f86ad7f69b24d8181765eec2bcd9c0e484ee1295f88a10d5894e4cfdf25cfe7196cd58813d7cf1eb37cbabefa051758d3222abdd8cc83cf7055279bcf313e1085a877d84c21ecef858b9f8842c6e8781a0acfc6f6c9be3079fa536e221e7f428d1ec8bf8c42504ebca9ad777f5658499a01dc47439ee6cd8ea33655288fe8980a3a56005cd3f755878fe57834b0bf6d069b97d841e42b3f307efc34a77ba9976ac84499695feef89da58062e4114f6" localhost:8070/file/delete/5d9b4b7867abf700104ecadf
```

### Response

```json
// if you have good Id of file and good owner tag
//HTTP/1.1 200 OK
OK

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
    <pre>Cannot DELETE /file/delete/5d9b4b7867abf700104ecad</pre>
</body>

</html>

//--------------------------------------------------
//if you don't have the good owner
//HTTP/1.1 401 Unauthorized
Unauthorized

```

## Remarks

**Only if you have owner tag !**  
***the owner tag can't decrypt file or meta***  
