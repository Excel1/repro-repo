# Keycloak Development Container

This project starts a local Keycloak instance for development with:
- Realm: `myrealm`
- Client: `myclient`
- User: `test / test`
- Admin: `admin / admin`
- External realm volume, changes persist across container restarts

---

## Starting

- Build and start: `docker compose up -d --build` (-d for detached/background mode)
- Admin UI: http://192.168.188.20:8080
- Login credentials:
    - Admin: `admin / admin`
    - Test user: `test / test`

---

## Stopping

- Stop: `docker compose down`

---

## Files

- docker-compose.yml – Container definition and ports
- keycloak/Dockerfile – Custom Keycloak image with realm import
- keycloak/realm-template.json – Template for realm + clients + test user
- keycloak_data (Docker volume) – Persistent realm data

---

## Notes

- Open redirects & origins are fully open (`*`) for development purposes
- Internal management port remains 9000 (Dev mode only)
- Web interface port externally accessible on 9001
