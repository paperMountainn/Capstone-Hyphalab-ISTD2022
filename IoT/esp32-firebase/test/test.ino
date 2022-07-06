#include "DHT.h"
#include "SparkFunCCS811.h" 
#include <Wire.h>

// Defining all the pins
#define DHTPIN1 23     // Temp & Hum sensor 1
#define DHTPIN2 19    // Temp & Hum Sensor 2
#define HUM 32          // Ultrasonic Humidifier 1
#define VENT 33         // Ventilation fan
#define CCS811_ADDR 0x5A  //Alternate I2C Adress for CO2

// Defining Parameters
// Incubation Parameters
#define MaxTempI
#define MinTempI
#define MaxHumI
#define MinHumI
#define MaxCO2I
String state = "Incubation";

// Fruiting Parameters
#define MaxTempF
#define MinTempF
#define MaxHumF
#define MinHumF
#define MaxCO2F


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

void setup(){
  Serial.begin(115200);         // start serial monitor
  Wire.begin();
  dht1.begin();                 // start temp and hum sensor
  dht2.begin();
  pinMode(HUM, OUTPUT);
  pinMode(VENT, OUTPUT);
  CO2Sensor.begin();
  
}


void loop(){
  TempHumReading();  // Temp & Hum Reading
  CO2Reading(); // Co2 Reading
  digitalWrite(HUM, HIGH);
  digitalWrite(VENT, HIGH);  
//  Serial print temp and hum, uncomment if required
  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.print(F("°C "));
  Serial.print(F("%  CO2: "));
  Serial.print(co2);
  Serial.println(F(" ppm "));
  delay(1000);
//  if (t > MaxTempF || h < MinHumF) {
//    digitalWrite(HUM1,HIGH)
//    digitalWrite(HUM2,HIGH)
//  }

  
}