# Deployment (Portainer + Traefik)

This repository is deployed on the Octotech server using Portainer + Traefik (no host ports exposed).

## Paths
- /datastore/azfin/app
- /datastore/azfin/uploads
- /datastore/azfin/data.json (create with {})
- /datastore/azfin/requests.json (create with [])

## Build images on host
```
docker build -t azfin-backend:latest -f /datastore/azfin/app/Dockerfile.backend /datastore/azfin/app
docker build -t azfin-frontend:latest -f /datastore/azfin/app/Dockerfile.frontend /datastore/azfin/app
```

## Portainer stack
Use `/datastore/azfin/azfin-stack.yml` (prebuilt images, edge network, Traefik labels).
Domains: `azfin.octotech.az` and `azfin.az`.
Backend routes: `/api` and `/uploads`.

## Cloudflared
Public Hostname targets:
- azfin.octotech.az -> http://127.0.0.1:8080
- azfin.az -> http://127.0.0.1:8080

## Verify
```
curl -H "Host: azfin.octotech.az" http://127.0.0.1:8080/
curl -H "Host: azfin.az" http://127.0.0.1:8080/
docker ps | grep azfin
```

## Update flow
1) `git pull` in `/datastore/azfin/app`
2) Rebuild images (commands above)
3) Redeploy the stack in Portainer
