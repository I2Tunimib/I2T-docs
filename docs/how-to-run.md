---
sidebar_position: 3
---

# How to run

To run the application locally both client and server applications have to run at the same time.

## Start backend application
Ensure that you have installed `NodeJS` and `npm` before continuing.

1. Clone the repository:

```bash
git clone https://github.com/I2Tunimib/I2T-backend.git
```

2. Install all required packages:

```bash
cd I2T-backend && npm install
```

3. Create a `.env` file in the root of the application and fill it with the content you can find [here](https://drive.google.com/file/d/1-2R_VS13Cc9KFbaxFHD21MLpSOII_daH/view?usp=sharing) (you can access the content with a unimib account).

4. The ASIA services are not exposed publicly. To communicate with those services a tunnel communication needs to be established. Open a terminal
and create a tunnel to the ASIA reconciliation service. You can view [here](https://drive.google.com/file/d/1_UPUWeXVldL_s5TTyscgDA-UXKoBNEzk/view?usp=sharing) information about the remote machine (you can access the content with a unimib account):

```bash
ssh -p [REMOTE_MACHINE_IP] -N -L 8089:127.0.0.1:8089 asia@[REMOTE_MACHINE_IP]
```

Do the same to create a communication with the extension service:

```bash
ssh -p 106 -N -L 8088:127.0.0.1:8088 asia@[REMOTE_MACHINE_IP]
```

5. Launch the application:

```bash
npm run start-dev
```

## Start backend application (With docker)
Ensure that you habe installed `Docker` and `docker-compose` before continuing.

1. Clone the repository:

```bash
git clone https://github.com/I2Tunimib/I2T-backend.git
```
2. Create a `.env` file in the root of the application and fill it with the content you can find [here](https://drive.google.com/file/d/1-2R_VS13Cc9KFbaxFHD21MLpSOII_daH/view?usp=sharing) (you can access the content with a unimib account).

3. The ASIA services are not exposed publicly. To communicate with those services a tunnel communication needs to be established. Open a terminal
and create a tunnel to the ASIA reconciliation service. You can view [here](https://drive.google.com/file/d/1_UPUWeXVldL_s5TTyscgDA-UXKoBNEzk/view?usp=sharing) information about the remote machine (you can access the content with a unimib account):

```bash
ssh -p [PORT_SSH] -N -L 8089:127.0.0.1:8089 asia@[REMOTE_MACHINE_IP]
```

Do the same to create a communication with the extension service:

```bash
ssh -p [PORT_SSH] -N -L 8088:127.0.0.1:8088 asia@[REMOTE_MACHINE_IP]
```

4. Build docker image and start the container:

```bash
docker-compose -f docker-compose.dev.yml up
```

## Start frontend application
Ensure that you have installed `NodeJS` and `npm` before continuing.

1. Clone the repository:

```bash
git clone https://github.com/I2Tunimib/I2T-frontend.git
```

2. Install all required packages:

```bash
cd I2T-frontend && npm install
```

3. Create a `.env` file in the root of the application and fill it with the content you can find [here](https://drive.google.com/file/d/1Bb1Xqmrw1Vo8I2j9-IfQpZZNa5QMU6_-/view?usp=sharing) (you can access the content with a unimib account).

4. Launch the application:

```bash
npm run start
```