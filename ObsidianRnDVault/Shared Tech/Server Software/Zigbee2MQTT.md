---
tags: [Software/Zigbee2MQTT, Software/HomeAssistant, Container]
---


* [Docs](https://www.zigbee2mqtt.io/)
* [Supported devices](https://www.zigbee2mqtt.io/supported-devices/)
* [Zigbee2MQTT Home Assistant addon](https://github.com/zigbee2mqtt/hassio-zigbee2mqtt)

## Settings
```yaml
data_path: /config/zigbee2mqtt
socat:
  enabled: false
  master: pty,raw,echo=0,link=/tmp/ttyZ2M,mode=777
  slave: tcp-listen:8485,keepalive,nodelay,reuseaddr,keepidle=1,keepintvl=1,keepcnt=5
  options: "-d -d"
  log: false
mqtt: {}
serial:
  port: /dev/ttyACM0
  adapter: deconz
permit_join: false
advanced:
  pan_id: GENERATE
  channel: 20
  network_key: GENERATE
```

### Ports
| Port Number | Transport Protocol | Description |
| ----------- | ------------------ | ----------- |
| 8485        | tcp                | Socat tcp-lisen port |

