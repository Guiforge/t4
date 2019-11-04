# Process Encrypt

## Encrypt
> **Only on the client**

### Keys
1. Chooses a Super Secret Master Key (SSMK)
2. Chooses a initialisation vector for meta and file (IvM; IvF)
3. Derives the key into three other keys.
	- KeyFile: with PBKDF2, iteration: 100000 and salt: 'KeyFile' digest with sha512
	- KeyMeta: with PBKDF2, iteration: 100000 and salt: 'KeyMeta' digest with sha512
	- KeySign: with Hmac, sha512 and secret: 'KeySign'

4. Encrypt meta with KeyMeta and ivM and AES 256 GCM
5. Get AuthTag from the meta encryption
6. Encrypt file with KeyFile and ivM and AES 256 GCM
7. Get AuthTag from the file encryption

​
```text

Keys:
+--------------+
|  Secret Key  |
+--------------+
  P  |
  B  |----- + salt ----> +--------------+
  K  |                   |    KeyFile   |
  D  |                   +--------------+
  F  |----- + salt ----> +--------------+
  2  |                   |    KeyMeta   |
     |                   +--------------+
     |----- + salt ----> +--------------+
                         |    KeySign   |
                         +--------------+

Encrypt:
            +----------+
            | IV + Key |
            +----------+
                 |
            +---------+
            | AES GCM |  <----- DATA
            +---------+
              |     |
    AuthTag <-+     +-> Encrypt Data

```