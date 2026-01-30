# Contributing & Update Flow

This repo is deployed on the Octotech server using Portainer + Traefik.
No host ports are exposed; routing is handled via Traefik labels.

## Update Steps (Server)
1) SSH to the server and go to the app directory:
```
cd /datastore/azfin/app
```

2) Pull latest changes:
```
git pull
```

3) Rebuild images:
```
docker build -t azfin-backend:latest -f /datastore/azfin/app/Dockerfile.backend /datastore/azfin/app
docker build -t azfin-frontend:latest -f /datastore/azfin/app/Dockerfile.frontend /datastore/azfin/app
```

4) Redeploy stack in Portainer using `/datastore/azfin/azfin-stack.yml`.

## Verification
```
curl -H "Host: azfin.octotech.az" http://127.0.0.1:8080/
curl -H "Host: azfin.az" http://127.0.0.1:8080/
docker ps | grep azfin
```

## Notes
- `data.json`, `requests.json`, and `uploads/` are runtime data and are not committed to git.
- If you change API paths, update Traefik rules in the stack file.
