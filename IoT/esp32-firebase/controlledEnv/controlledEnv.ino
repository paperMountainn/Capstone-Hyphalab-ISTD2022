/*
  Rui Santos
  Complete project details at our blog: https://RandomNerdTutorials.com/esp32-data-logging-firebase-realtime-database/
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files.
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

#include <Arduino.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <Wire.h>
//#include <Adafruit_Sensor.h>
//#include <Adafruit_BME280.h>
#include "time.h"
#include "secrets.h"

// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

#include "DHT.h"
#include "SparkFunCCS811.h" 
#include <Wire.h>

// Defining all the pins
#define DHTPIN1 23     // Temp & Hum sensor 1
#define DHTPIN2 19     // Temp & Hum Sensor 2
#define HUM 32          // Ultrasonic Humidifier 1
#define VENT 33         // Ventilation fan
#define CCS811_ADDR 0x5A  //Alternate I2C Adress for CO2
// // Insert your network credentials
// #define WIFI_SSID "REPLACE_WITH_YOUR_SSID"
// #define WIFI_PASSWORD "REPLACE_WITH_YOUR_PASSWORD"

// // Insert Firebase project API Key
// #define API_KEY "REPLACE_WITH_YOUR_PROJECT_API_KEY"

// // Insert Authorized Email and Corresponding Password
// #define USER_EMAIL "REPLACE_WITH_THE_USER_EMAIL"
// #define USER_PASSWORD "REPLACE_WITH_THE_USER_PASSWORD"

// // Insert RTDB URLefine the RTDB URL
// #define DATABASE_URL "REPLACE_WITH_YOUR_DATABASE_URL"

// Define Firebase objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// Setting up sensors
#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321

DHT dht1(DHTPIN1, DHTTYPE);
DHT dht2(DHTPIN2, DHTTYPE);
CCS811 CO2Sensor(CCS811_ADDR);


float h = 0;
float t = 0;
float co2 = 0;
String HUMState = "OFF";
String CO2_status = "pending";

void TempHumReading(){
  h = dht1.readHumidity();
  t = dht1.readTemperature();
//  if (isnan(h) || isnan(t)) {
//    Serial.println(F("Failed to read from DHT sensor!"));}
}

void CO2Reading(){
   if (CO2Sensor.dataAvailable())
  {
    //If so, have the sensor read and calculate the results.
    //Get them later
    CO2Sensor.readAlgorithmResults();
    co2 = CO2Sensor.getCO2();
}
}

// Variable to save USER UID
// String uid;

// instead of using USER ID, use esp32's chip mac address
uint64_t chipid = ESP.getEfuseMac(); 
uint16_t chip = (uint16_t)(chipid >> 32);
char ssid[40];


// Database main path (to be updated in setup with the user UID)
String databasePath;
// Database child nodes
String tempPath = "/temperature";
String humPath = "/humidity";
String presPath = "/co2";
String timePath = "/timestamp";

// Parent Node (to be updated in every loop)
String parentPath;

int timestamp;
FirebaseJson json;

const char* ntpServer = "pool.ntp.org";

// BME280 sensor
//Adafruit_BME280 bme; // I2C
float temperature;
float humidity;
float pressure;

// Timer variables (send new readings every three minutes)
unsigned long sendDataPrevMillis = 0;
unsigned long timerDelay = 180000;

// Initialize BME280
//void initBME(){
//  if (!bme.begin(0x76)) {
//    Serial.println("Could not find a valid BME280 sensor, check wiring!");
//    while (1);
//  }
//}

// Initialize WiFi
void initWiFi() {
  // setup esp32id
  snprintf(ssid, 40, "ESP32-Incubation-%04X%08X", chip, (uint32_t)chipid);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
  Serial.println();
}

// Function that gets current epoch time
unsigned long getTime() {
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    //Serial.println("Failed to obtain time");
    return(0);
  }
  time(&now);
  return now;
}

void setup(){
    Serial.begin(115200);
    Wire.begin();
    dht1.begin();                 // start temp and hum sensor
    CO2Sensor.begin();

  // Initialize BME280 sensor
//  initBME();
  initWiFi();
  configTime(0, 0, ntpServer);

  // Assign the api key (required)
  config.api_key = API_KEY;

  // Assign the user sign in credentials
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  // Assign the RTDB URL (required)
  config.database_url = DATABASE_URL;

  Firebase.reconnectWiFi(true);
  fbdo.setResponseSize(4096);

  // Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

  // Assign the maximum retry of token generation
  config.max_token_generation_retry = 5;

  // Initialize the library with the Firebase authen and config
  Firebase.begin(&config, &auth);

  // Getting the user UID might take a few seconds
  // Serial.println("Getting User UID");
  // while ((auth.token.uid) == "") {
  //   Serial.print('.');
  //   delay(1000);
  // }
  // Print user UID
  // uid = auth.token.uid.c_str();
  // Serial.print("User UID: ");
  Serial.print("ESP32 ssid: ");
  Serial.println(ssid);

  // Update database path
//  databasePath = "/UsersData/" + uid + "/readings";
  // databasePath = "/UsersData/" + uid + "/";
  // convert ssid to String, cuz char[23] can't append to path
//  databasePath = "/UsersData/" + ssid + "/";
//  databasePath = "/UsersData/" + ssid + "/";
}

int count = 0;



void loop(){

  // Send new readings to database
   TempHumReading();  // Temp & Hum Reading
   CO2Reading(); // Co2 Reading
  if (Firebase.ready() /*&& (millis() - sendDataPrevMillis > timerDelay || sendDataPrevMillis == 0) */){
    Serial.println(ssid);
//    sendDataPrevMillis = millis();
     delay(1000);

    //Get current timestamp
    timestamp = getTime();
    Serial.print ("time: ");
    Serial.println (timestamp);
    // databasePath = "/UsersData/" + String(ssid);
    databasePath = String(ssid);
    parentPath = databasePath + "/" + String(timestamp);
    Serial.println (parentPath);

    json.set(tempPath.c_str(), String(t));
    json.set(humPath.c_str(), String(h));
    json.set(presPath.c_str(), String(co2));
    json.set(timePath, String(timestamp));
    count++;
    Serial.printf("Set json... %s\n", Firebase.RTDB.setJSON(&fbdo, parentPath.c_str(), &json) ? "ok" : fbdo.errorReason().c_str());
  }
}
