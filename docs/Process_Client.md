# Process Client

## Encrypt
> **Only on the client**

### Keys
> Chunk by Chunk
1. Get file from disk of client 
2. Create Tarball
3. Gzip
4. Encrypt ([Process_enc.md](./Process_enc.md))
5. Send to Server ([Process_Upload-Download.md](./Process_Upload-Download.md))

​
```text

Read Chunk by Chunk
+--------------+
|   - file A   |
|   - file B   |
|   - file C   | --+
|   - file D   |   | T
|   - file E   |   | A
+--------------+   | R    Create Tarball Chunk by Chunk
                   +---> +-------------+
                         | Archive.tar |
                         +-------------+
                           | G
                           | Z
                           | I
                           | P
  +----------------+ <---- +
  | Archive.tar.gz |
  +----------------+
               | A
               | E
               | S
               +---> +--------------+
                     | Encrypt Data |
                     +--------------+
                           |
                           |
                 Send <----+
```