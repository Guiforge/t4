# Quick Start  

## Required for dev  
- docker
- node/npm

### Manual  

```bash
docker-compose -f docker-compose.dev.yaml up
cd t4_front; npm run dev
cd t4_front; node mitm.js
```

### Launch.sh  

- docker-machine
```bash
docker-machine create t4
./lauch.sh poc t4
```
*Don't forget port binding*

> front: localhost:8080  
API: localhost:8070  
Express-mongo: localhost:8081  
