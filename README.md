# Central Hub for the Suicide Prevention & Research Impact Network
### Made by Team 4
- Dylan Morrison
- Mathew Steele
- Ethan Gourley

The SPRIN Central Hub aims to provide a platform for collaboration between the community towards the continued effort to improve our understanding surrounding suicide research and prevention

## Live Service URL Available <a href="http://129.151.87.53/home">Here</a>


## Running Locally
The application can be run locally, either via the use of docker or by running one of the available shell scripts.
### Docker
```
docker build -t sprin-application .
docker run -p 3000:3000 sprin-application
```
The application will be viewable at <hr href="http://localhost:3000">http://localhost:3000</href>

### Linux / MacOS
```
chmod +x ./run.sh
./run.sh
```

### Windows
```
PowerShell -File ./run.ps1
```

The application will be viewable at <hr href="http://localhost:5173">http://localhost:5173</href>