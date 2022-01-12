---
sidebar_position: 4
---

# Deploy

At the moment the frontend and server application are both served by the backend. At deploy time, the frontend application is built in static files which are then served by the backend server, while also providing SemTUI APIs.

## GitHub CD workflow

When pushing to the `main` branch of each repository a GitHub workflow deploys automatically the application as a docker image. The workflow follows the following steps:

1. Both repositories are checkout out locally in the remote GitHub runner.
2. The frontend application builds the static files with `npm run build`. Static files are placed in a directory called `build`.
3. The build files are then placed in the root directory of the backend cloned repository.
4. A `.env` file is created with Secrets placed securely in the GitHub repository settings.
5. A docker image is built and pushed to the GitHub container: https://github.com/I2Tunimib/I2T-frontend/pkgs/container/tui
6. Connect to the remote deploy server via SSH.
7. Pull the new image, stop the old container and start a new one with the new image running 