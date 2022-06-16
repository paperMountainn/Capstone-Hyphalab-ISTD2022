#include <WiFiClient.h>
#include <HTTPClient.h>
#include <WebServer.h>
#include <DHT.h>
#include "SparkFunCCS811.h" 


WebServer server ( 80 );

const char *ssid = "Andromeda";  //ENTER YOUR WIFI ssid
const char *password = "okayokay";  //ENTER YOUR WIFI password

// Defining all the pins
#define DHTPIN1 23     // Temp & Hum sensor 1
#define DHTPIN2 0     // Temp & Hum Sensor 2
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
String VENTState = "OFF";
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
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  connectWifi();
  beginServer();
  Wire.begin();
  dht1.begin();
  pinMode(HUM, OUTPUT);
  pinMode(VENT, OUTPUT);
  CO2Sensor.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  server.handleClient();
  if (CO2Sensor.begin() == false){
    CO2_status = "CCS811 error. Please check wiring.";
  }
  else{
    CO2_status = "connected";
  }
  TempHumReading();
  CO2Reading();
  Print();
}

String getPage(){
  String page = "<html lang=en-EN><head><meta http-equiv='refresh' content='60'/>";
  page += "<title>ESP32 WebServer - educ8s.tv</title>";
  page += "<style> body { background-color: #fffff; font-family: Arial, Helvetica, Sans-Serif; Color: #000000; }</style>";
  page += "</head><body><h1>ESP32 WebServer</h1>";
  page += "<h3>BME280 Sensor</h3>";
  page += "<ul><li>Temperature: ";
  page += t;
  page += "<ul><li>Humidity: ";
  page += h;
  page += "<ul><li>CO2 Concentration: ";
  page += co2;
  page += "<ul><li>CO2 sensor status: ";
  page += CO2_status;
  page += "<form action='/' method='POST'>";
  page += "<ul><li>Ultrasonic Humidifier";
  page += "";
  page += "<INPUT type='radio' name='HUM' value='1'>ON";
  page += "<INPUT type='radio' name='HUM' value='0'>OFF</li></ul>";
  page += "<INPUT type='submit' value='Submit'>";
  page += "<ul><li>Exhaust Fan";
  page += "";
  page += "<INPUT type='radio' name='VENT' value='1'>ON";
  page += "<INPUT type='radio' name='VENT' value='0'>OFF</li></ul>";
  page += "<INPUT type='submit' value='Submit'>";
  page += "</body></html>";
  return page;
}

void connectWifi(){
  delay(1000);
  WiFi.mode(WIFI_OFF);
  delay(1000);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("");
  Serial.print("Connecting");
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  //If connection successful show IP address in serial monitor 
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: http://");
  Serial.println(WiFi.localIP());  //IP address assigned to your ESP
}

void beginServer() {
  server.on ("/", handleRoot);
  server.begin();
  Serial.println("HTTP Server started");
}

void handleRoot(){
  if (server.hasArg("HUM")){
    handleSubmit();
  }
  else{
    server.send(200, "text/html", getPage());
  }
}

//int LEDPIN = 32;
//String ledState = "OFF"; //need to bring up


void handleSubmit() {
  String HUMValue;
  String VENTValue;
  HUMValue = server.arg("HUM");
  VENTValue = server.arg("VENT");
  Serial.println("Set GPIO ");
  Serial.print(HUMValue);
  Serial.print(VENTValue);

  if (HUMValue == "1"){
    digitalWrite(HUM,HIGH);
    HUMState = "on";
    server.send(200, "text/html", getPage());
  }
  else if (HUMValue == "0"){
    digitalWrite(HUM,LOW);
    HUMState = "off";
    server.send(200, "text/html", getPage());
 }

//  if (HUMValue == "1" && VENTValue == "1"){
//    digitalWrite(HUM,HIGH);
//    HUMState = "on";
//    server.send(200, "text/html", getPage());
//    digitalWrite(VENT,HIGH);
//    VENTState = "on";
//    server.send(200, "text/html", getPage());
//  }
//  else if (HUMValue == "0" && VENTValue == "0"){
//    digitalWrite(HUM,LOW);
//    HUMState = "off";
//    server.send(200, "text/html", getPage());
//    digitalWrite(VENT,LOW);
//    VENTState = "off";
//    server.send(200, "text/html", getPage());
// }
//  else if (HUMValue == "0" && VENTValue == "1"){
//    digitalWrite(HUM,LOW);
//    HUMState = "off";
//    server.send(200, "text/html", getPage());
//    digitalWrite(VENT,HIGH);
//    VENTState = "on";
//    server.send(200, "text/html", getPage());
//  }
//  else if (HUMValue == "1" && VENTValue == "0"){
//    digitalWrite(HUM,HIGH);
//    HUMState = "on";
//    server.send(200, "text/html", getPage());
//    digitalWrite(VENT,LOW);
//    VENTState = "off";
//    server.send(200, "text/html", getPage());
//}
}

void Print(){
  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.print(F("°C "));
  Serial.print(F("%  CO2: "));
  Serial.print(co2);
  Serial.println(F(" ppm "));
  delay(1000);
}
