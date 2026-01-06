## 使用 mosquitto 建立 MQTT broker

1. 在根目錄建立 `config`  

```bash
mkdir -p ~/mosquitto/{config,data,log}    
touch ~/mosquitto/config/mosquitto.conf
```

2. 在 `.conf` 檔案

```
listener 1883
allow_anonymous false
password_file /mosquitto/config/passwords
```

3. 建立 container

```bash
docker run -d \
  --name mosquitto \
  -p 1883:1883 \
  -v ~/mosquitto/config:/mosquitto/config \
  -v ~/mosquitto/data:/mosquitto/data \
  -v ~/mosquitto/log:/mosquitto/log \
  eclipse-mosquitto
```

4. 建立 MQTT 帳號密碼

```bash
touch ~/mosquitto/config/passwords
docker exec -it mosquitto sh
cd /mosquitto/config
mosquitto_passwd passwords (帳號)
```

## Redis

```bash
docker run -d \
  --name smarthub-householder-redis \
  -p 6379:6379 \
  redis:7.2-alpine \
  redis-server --requirepass "password"

```

```bash
npm install ioredis
```
