---
date_created: 2023-10-05 08:59:59
date_modified: 2023-10-22 14:48:04
tags:
  - Software/Docker
  - os/wsl
---
# Docker Data Location WSL2

## Configuring WSL 2 Virtual Disk Location

This step is specific for the Docker Desktop installation with WSL 2. The WSL 2 Docker Desktop Data Virtual Machine default location is **%USERPROFILE%\AppData\Local\Docker\wsl\data\ext4.vhdx**. You can follow the below-listed steps to relocate the docker data.

1. Quit the Docker Desktop by right-clicking the Docker Tray Icon
2. Relocate the docker-desktop-data virtual machine disk image using the below-mentioned commands.

	```bash
	wsl --shutdown  
	wsl --export docker-desktop-data docker-desktop-data.tar  
	wsl --unregister docker-desktop-data  
	wsl --import docker-desktop-data d:\docker\wsl\data docker-desktop-data.tar --version 2
	```

3. Delete docker-desktop-data.tar.
4. Start Docker Desktop. It should start using the new location of WSL data.
