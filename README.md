# T-rackerApp

[Deployed T-rackerApp](https://iot-webapp-28f3a.web.app/)

The T-rackerApp is a web-application that can improve efficiency of operations within Hypha.

Hypha is a high-tech mushroom farm facility designed in 2022. Hypha is part of SUTD's Capstone Project. 

The Capstone project brings together students from different pillars to work in design teams, contributing their respective expertise and skills to solve real-world challenges.

It also provides them with a realistic design situation where projects usually span multiple disciplines and require team-based efforts to create a solution.

[SUTD Capstone](https://sutd.edu.sg/Capstone)

# Table of Contents
1. [Introduction](#introduction)
    * [Team Members](#team)
3. [Features and Demonstration](#features-and-demo)
    * [Features](#features)
    * [Demonstration Video](#demo-video)
4. [Project Structure](#proj-structure)
    * [T-rackerApp Structure](#trackerapp-structure)
    * [Repository Structure](#gitub-structure)
6. [Running Locally](#local)
7. [Deployment](#deploy)


## Introduction <a name="introduction"></a>
The T-rackerApp is a web-application that is used by mushroom farmers to increase efficiency of their operations within the farm and to observe contaminations.


### Capstone Project Team Members<a name="team"></a>
* Anisha Singh Le Shuang (EPD) 1004656
* Teo Sze Jia (EPD) 1004691
* Benjamin Lim En How (ASD) 1004098
* Lim Shang Zhi, Benjamin (ASD) 1004245
* Stephanie Seow Xi Hui (CSD) 1004347
* Pan Zishan (CSD) 1004564

It is used for these two mushroom growth stages, the incubation stage, and the fruiting stage, which are the crux of the end-to-end mushroom growth process.

#### [Technical Documentation](https://docs.google.com/document/d/1bp3JN2mwAVIE5qnYJ_XPm3Lm5joN__wfxMt7xaWsARk/edit?usp=sharing)

#### [User Guide](https://docs.google.com/document/d/1JVcStmPJS-rqQn4QfGiUEFJt1uvWqL7TmXm4HrD_0Cw/edit?usp=sharing)

## Features and Demonstration Video <a name="features-and-demo"></a>

### Features <a name="features"></a>
1. Dashboard Real-time Growth Parameter Monitoring
2. Contamination Observation
4. Rack Logistics Management
5. Engineer-Operator Task Management

### Demonstration Video <a name="demo-video"></a>

## Project Structure <a name="proj-structure"></a>
### T-rackerApp Structure <a name="trackerapp-structure"></a>

[![T-rackerApp Infrastructure](https://i.imgur.com/B6nsVbd.png)](https://imgur.com/B6nsVbd)

### Github Repository Structure <a name="gitub-structure"></a>
This Github Repository contains all source code used for various sub-systems of the T-rackerApp. 
* `/IoT` - Contains various Items related to IoT application, and IoT sensor codes.
    * `/IoT/esp32-firebase` - ESP32 Arduino Code and sending data to Firebase
    * `/IoT/iot-webapp` - Web application frontend, backend and machine learning API code.
    
    
* `/machine-learning` - Contamination Binary Classification Code, various models and transfer learning code.


### Running Locally <a name="local"></a>
In a terminal, clone the Github Repository into a directory of your preference
```
git clone https://github.com/paperMountainn/Capstone-Hyphalab-ISTD2022.git
```
Setup the React Frontend

a. First ensure that you have [NodeJS](https://nodejs.org/en/) installed. 
b. Run the following
```
cd Capstone-Hyphalab-ISTD2022/IoT/iot-webapp/FrontEnd

npm install

npm start
```
c. Go to `localhost:3000/` as instructed by the terminal.

In another terminal, set up the Express and MongoDB backend.

a. Run the following
```
cd Capstone-Hyphalab-ISTD2022/IoT/iot-webapp/Backend

npm install
```
b. Comment out the lines in `app.js` line 17 with //, and remove the // infront of line 18.
```
// connect to mongoose from Express
mongoose.connect(
    //"mongodb+srv://admin:admin@cluster0.4fcsl.mongodb.net/controlled-environment",
'mongodb://localhost:27017/controlled-environment', 
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true 
})
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
})
```
c. run
```
nodemon app.js
```

In another terminal, set up the Flask Machine Learning contamination detection API
a. First, ensure that you have [Python](https://www.python.org/)  installed. 
b. run 
```
cd Capstone-Hyphalab-ISTD2022/IoT/iot-webapp/ML-flask

python -m venv venv # create a virtual environment
source venv/bin/activate # activate it

pip install -r requirements.txt

cd Flask-Contam-ML

```
c. Change the directory of the .pth file in `Flask-Contam-ML/flaskContamML/routes.py` to the correct location on your machine at line 13. 

(The `resnet18_hyphaAug.pth` is in `Flask-Contam-ML/flaskContamML`)
```
model_path = '/Users/zishanpan/Desktop/capstone-code/Capstone-Hyphalab-ISTD2022/IoT/iot-webapp/ML-flask/Flask-Contam-ML/flaskContamML/resnet18_hyphaAug.pth'
loaded_model = torch.load(model_path)
```
d. run
```
python run.py
```

### Deployment  <a name="deploy"></a>
* Firebase Frontend Deployment
Google Firebase stores and allows the frontend to retrieve real-time sensor data and images.


* MongoDB Atlas
MongoDB used is hosted on MongoDB atlas.

* ExpressJS + NodeJS backend connected to MongoDB
Hosted on Heroku.

* Flask Machine Learning API
Hosted on Heroku.





