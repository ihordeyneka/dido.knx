# dido.knx
KNX home automation project via knx.js

### Prerequisites
1. Install Docker and Docker-Compose.
2. Access to DNS settings for the domain.

## Configuration
### Environment Settings
Use sample.env file as a template and create .env file or set environment variables accordingly.

#### KNX Settings
- KNX_ENV - _development_ or _production_
- KNX_CONN - _knxConnection_ or _mockConnection_
- KNX_ADMIN - username of the admin user
- KNX_PWD - password of the admin user
- KNX_HTTP_PORT - http port of node.js app, leave it as _8787_
- KNX_IP_ADDR - LAN IP address of the KNX interface device, for example _192.168.0.99_
- KNX_IP_PORT - KNX port, usually _3671_

#### SMS Settings
- TWILIO_SID - Twilio SID
- TWILIO_KEY - Twilio Auth Key
- TWILIO_FROM - Twilio FROM phone number
- TWILIO_TO - Twilio TO phone number

### Domain Settings
1. Use *user_conf.d/nginx.conf* file to configure NGINX reverse proxy settings.
server_name for SSL needs to be set properly.
2. Configure A record on the DNS and point it the required machine. If machine is hidden behind NAT, then proper port forwarding must be configured.

## Running
In the root directory execute _docker-compose up_. This should set up an nginx reverse proxy and an underlying node.js server and configure LetsEncrypt SSL certificates with autorenewal on the given machine. If clean-up is needed, then executed _docker-compose down_ and _docker image rm didoknx_node_.
