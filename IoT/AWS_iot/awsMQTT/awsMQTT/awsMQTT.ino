// referenced from: https://how2electronics.com/connecting-esp32-to-amazon-aws-iot-core-using-mqtt/
// https://github.com/sborsay/AWS-IoT/blob/master/ESP32-to-AWSIoT-modfied

#include "secrets.h"
#include <WiFiClientSecure.h>
#include <PubSubClient.h> // install with Library Manager, I used v2.6.0

WiFiClientSecure wiFiClient;
void msgReceived(char* topic, byte* payload, unsigned int len);
// PubSubClient pubSubClient(awsEndpoint, 8883, msgReceived, wiFiClient); 
PubSubClient pubSubClient(AWS_IOT_ENDPOINT, 8883, msgReceived, wiFiClient); 

void setup() {
  Serial.begin(115200); delay(50); Serial.println();
  Serial.println("ESP32 AWS IoT Example");
  Serial.printf("SDK version: %s\n", ESP.getSdkVersion());

  Serial.print("Connecting to "); Serial.print(WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  WiFi.waitForConnectResult();
  Serial.print(", WiFi connected, IP address: "); Serial.println(WiFi.localIP());

  wiFiClient.setCACert(AWS_CERT_CA);
  wiFiClient.setCertificate(AWS_CERT_CRT);
  wiFiClient.setPrivateKey(AWS_CERT_PRIVATE);
}

unsigned long lastPublish;
int msgCount;

void loop() {

  pubSubCheckConnect();

  //If you need to increase buffer size, you need to change MQTT_MAX_PACKET_SIZE in PubSubClient.h
  char fakeData[128];

 float var1 =  random(55,77); //fake number range, adjust as you like
 float var2 =  random(77,99);
 
 sprintf(fakeData,  "{\"uptime\":%lu,\"temp\":%f,\"humid\":%f}", millis() / 1000, var1, var2);

 // format of data looks like this
//  {
//   "uptime": 20,
//   "temp": 55,
//   "humid": 84
//  }


  if (millis() - lastPublish > 10000) {
    // String msg = String("Hello from ESP32: ") + ++msgCount;
    // boolean rc = pubSubClient.publish("outTopic", msg.c_str());
    boolean rc = pubSubClient.publish("outTopic", fakeData);
    Serial.println("Published, rc="); Serial.print( (rc ? "OK: " : "FAILED: ") );
    Serial.println(fakeData);
    lastPublish = millis();
  }
}

void msgReceived(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message received on "); Serial.print(topic); Serial.print(": ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void pubSubCheckConnect() {
  if ( ! pubSubClient.connected()) {
    Serial.print("PubSubClient connecting to: "); Serial.print(AWS_IOT_ENDPOINT);
    while ( ! pubSubClient.connected()) {
      Serial.print(".");
      pubSubClient.connect(THINGNAME);
      delay(1000);
    }
    Serial.println(" connected");
    pubSubClient.subscribe("inTopic");
  }
  pubSubClient.loop();
}
