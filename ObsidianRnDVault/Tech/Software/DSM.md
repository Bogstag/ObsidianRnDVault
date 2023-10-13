Kommando för att starta om ngix:

```bash
sudo synoservice --restart nginx
sudo synoservice --restart nmbd
sudo synoservice --restart avahi
```

General Command Line commands for handling DSM Services (Otestat):

```sh
sudo synoservicecfg --list
sudo synoservice --status
sudo synoservicecfg --stop <service>
sudo synoservicecfg --hard-stop <service>
sudo synoservicecfg --start <service>
sudo synoservicecfg --hard-start <service>
sudo synoservice --restart <service>
sudo synoservicectl --restart <service>

Testat:
sudo synoservicectl --restart sshd

[admin@diskstation ~]$ sudo synoservicecfg --list
DSM
apparmor
atalk
avahi
bluetoothd
bonjour
btacd
crond
cups-lpd
cupsd
dbus
dc-output
ddns
findhost
ftpd
ftpd-ssl
gcpd
heartbeat
hotplugd
iscsitrg
ldap-server
miniupnpd-handler
natpmpd
nfsd
nginx
nmbd
nslcd
ntpd-client
ntpd-server
pgsql
pkgctl-CloudStation
pkgctl-CodecPack
pkgctl-Docker
pkgctl-FileStation
pkgctl-LogCenter
pkgctl-MariaDB10
pkgctl-MediaServer
pkgctl-Node.js_v12
pkgctl-OAuthService
pkgctl-PHP7.4
pkgctl-SynoFinder
pkgctl-SynologyApplicationService
pkgctl-VideoStation
pkgctl-WebStation
pkgctl-phpMyAdmin
pkgctl-py3k
pppoerelay
rsyncd
s2s_daemon
samba
scemd
scsi_plugin_server
sftp
snmp
ssdp
ssh-shell
sssd
support-remote-access
synoagentregisterd
synoaic_monitor
synobackupd
synocacheclient
synocachepinfiletool
synocgid
synoconfd
synocontentextractd
synocrond
synogpoclient
synoindexd
synologanalyzer
synologrotate
synomkflvd
synomkthumbd
synomount
synonetd
synoovs-db
synoovs-vswitch
synoperfeventd
synopyntlmd
synorelayd
synosnmpcd
synostoraged
synotifyd
synotunnel
synovpnclient
synowifid
synowstransfer
syslog-acc
syslog-ng
syslog-notify
system
telnetd
tftp
upnpd
ups-net
ups-usb
usbipd
winbindd
```
