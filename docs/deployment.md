# SPRIN Central Hub - Deployment Guide

## Overview

This document provides instructions for deploying the SPRIN Central Hub, a web application designed to serve as a central hub for the Suicide Prevention Research and Impact Network (SPRIN). The application provides resources related to suicide prevention and mental health awareness, as well as allowing SPRIN to share resources such as PDFs, videos, and share details about upcoming events.

This file covers the prerequisites required for deploying the application using a Docker Compose file, as well as storage requirements and instructions for updating the application. Additionally, a maintenance section is included for ongoing management of the application.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Environment Variables](#environment-variables)
4. [Deployment](#deployment)
5. [Maintenance](#maintenance)
6. [Contact Information](#contact-information)


## Prerequisites

### Required Software
- Docker installed
- Docker Compose installed

### System Requirements

- 2 GB RAM or higher
- 16 GB of available storage or higher

## Environment Variables and Secrets

The following environment variables are required to properly configure the application:

### Environment Variables

| Variable | Description |
| --- | --- |
| `PORT` | The port number for the server to listen on. |
| `SECRET` | A secret key used to sign session cookies. |
| `MONGODB_URI` | The URI of the MongoDB server used by the application. |
| `MONGODB_USER` | The username for the MongoDB server. |
| `MONGODB_PASS` | The password for the MongoDB server. |
| `LOCAL_DATABASE_NAME` | The name of the local MongoDB database. |
| `DATABASE_NAME` | The name of the database to use for the application during development |
| `NODE_ENV` | The node environment, can be either `development` or `production`. |

### Database Information

The application uses MongoDB as its database, and a container for it has been configured in the `docker-compose.yaml` file. The root user's credentials have also been defined in this file, which can be changed if required.

To create the required tables/collections and a new user with privileges scoped to those tables, a `mongo-init.js` file has been provided. When the MongoDB container starts up, it executes this script to set up the database. The new user created by this script has fewer privileges than the root user to limit its access only to the tables required by the application.

The server accesses the database using the credentials provided in the .env file. Specifically, the `MONGODB_USER` and `MONGODB_PASS` environment variables correspond to the username and password of the user created by the `mongo-init.js` file. 
## Deployment

### Docker Volumes Overview

Volumes in Docker are used to persist data generated by and used by containers. Volumes are being used persist the data required for the MongoDB instance as well as the logs and uploaded files of the application.

The following table lists the volumes defined in the docker-compose.yaml file and their purpose:

| Volume | Description |
| ------ | ----------- |
| `mongo_data` | This volume is used to store the data for the MongoDB container. |
| `logs` | This volume is used to store the application logs. |
| `uploads` | This volume is used to store the uploaded to the server. |

### Deployment Instructions

1. Clone the repository: git clone https://github.com/your-username/your-repo.git
2. Navigate to the project directory: cd your-repo
3. Create a .env file based on the provided .env.sample file and set the required environment variables.
4. Modify the docker-compose.yaml file to suit your needs if necessary, e.g., change the mapped port.
5. Run the command docker-compose up --build to build and start the application.
6. Access the application at http://localhost:3000.

By default, the application is mapped to port 3000 on the host machine, which is mapped to port 80 in the container. If you wish to map the application to a different port, modify the ports section of the docker-compose.yaml file. Note that the left-hand side of the port mapping should be modified, not the right-hand side.

### Stopping the Application

To stop the containers without removing them or the volumes, the following command can be used:

`docker-compose stop`


This command will persist the containers and the volumes, allowing you to restart them later with `docker-compose start`.

In order to delete the containers, but preserve the data used by the application, run the following command:

`docker-compose down --volumes`

This command will remove the containers and the volumes associated with the project, but will not delete the data stored in the volumes. The volumes can be reused later by running the `docker-compose up` command.

**Note:** If all data is the be deleted `docker-compose down` can be run without the `--volumes` flag set. However, this action is not recommended as it will permanently delete all data stored in the volumes.

## Maintenance
### Security Auditing

To ensure the security of the application, it is important to regularly audit the installed packages for known vulnerabilities. This can be done using the `npm audit` command.

To audit the packages in the backend project, navigate to the root directory of the project and run the following command:

`npm audit`

To audit the packages in the frontend project, navigate to the `/src/frontend` directory and run the following command:

`npm audit`

If any vulnerabilities are found, they will be listed in the output of the command along with recommended actions to fix them. The vulnerabilites can be attempted to be fixed automatically by running `npm audit fix`.

It is recommended to perform regular security audits of the application, especially after any updates or changes to the packages used in the project.

### Cleaning up Log Files

Logs can accumulate over time and take up valuable disk space. To clean up log files, you can follow these steps:

1. Open a terminal window and navigate to the directory where the `docker-compose.yaml` file is located.

2. Use the following command to list all running containers:

`docker ps`

Note the container ID of the application container for which you want to clean up logs.

3. Use the following command to access the shell of the application container:


`docker exec -it [CONTAINER ID] sh`

Once inside the container shell, navigate to the directory where the logs are located. This should be in the `/logs` folder in the directory where the shell is initialised in.

4. Use the following command to remove the contents of the log files:

`> [LOG FILE NAME]`

Replace [LOG FILE NAME] with the name of the log file you want to clear.

5. Repeat step 4 for all three log files `all.log http.log error.log`

6. Exit the container shell by typing `exit`.

### Database Backup and Restore

It's important to regularly backup your database to prevent data loss in case of a disaster. With Docker Compose, you can backup your MongoDB database by creating a copy of the data volume used by the container.
#### Getting the Backup

To backup the database, follow these steps:

1. Open a terminal window and navigate to the directory where your docker-compose.yml file is located.

2. Use the following command to create a backup of the database:


``` bash
docker run --rm \
--volumes-from mongodb \
-v $(pwd):/backup \
busybox tar cvzf /backup/mongo-backup.tar.gz /data/db
```
This command creates a backup of the MongoDB data volume and saves it as mongo-backup.tar.gz in the current directory.

3. Verify that the backup file has been created by running:

`ls -l mongo-backup.tar.gz`

This should show the file size and date.

#### Restoring the Backup

To restore the database from a backup, follow these steps:

1. Open a terminal window and navigate to the directory where the docker-compose.yml file is located.

2. Stop the application using `docker compose stop`


3. Use the following command to restore the database:


``` bash
docker run --rm \
--volumes-from mongodb \
-v $(pwd):/backup \
busybox tar xvf /backup/mongo-backup.tar.gz
```

This command extracts the backup file to the data volume used by the container.

4. Start the application again by using `docker compose start`


After completing these steps, the database should have been restored.

## Contact Information

If you encounter any issues or have any questions, please find our contact information below:

- Dylan Morrison: todo
- Mathew Steele: email
- Ethan Gourely: email