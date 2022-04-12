// Example testing sketch for various DHT humidity/temperature sensors
// Written by ladyada, public domain
#include "Wire.h"
#include "DHT.h"
#define DHTTYPE DHT20   // DHT 20
/*Notice: The DHT10 and DHT20 is different from other DHT* sensor ,it uses i2c interface rather than one wire*/
/*So it doesn't require a pin.*/
DHT dht(DHTTYPE);         //   DHT10 DHT20 don't need to define Pin
 

 
void setup() {
 
    Serial.begin(9600);
    Serial.println("DHTxx test!");
    Wire.begin();
 
    /*if using WIO link,must pull up the power pin.*/
    // pinMode(PIN_GROVE_POWER, OUTPUT);
    // digitalWrite(PIN_GROVE_POWER, 1);
 
    dht.begin();
    pinMode(2, OUTPUT);
    pinMode(3, OUTPUT);
    pinMode(4, OUTPUT);
}
 
void loop() {
    float temp_hum_val[2] = {0};
    // Reading temperature or humidity takes about 250 milliseconds!
    // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
 
 
    if (!dht.readTempAndHumidity(temp_hum_val)) {
        Serial.println(float(temp_hum_val[0]));
        Serial.println(float(temp_hum_val[1]));
    } else {
        Serial.println("Failed to get temprature and humidity value.");
        dht.begin();
    }
    if (temp_hum_val[0] < 95 ) {
      digitalWrite(2, HIGH);
    }
    else {
      digitalWrite(2, LOW);
    }
    
    if  (temp_hum_val[1] > 20){
      digitalWrite(3, HIGH);
      digitalWrite(4, LOW);
     }
    else if (temp_hum_val[1] < 18) {
      digitalWrite(3, LOW);
      digitalWrite(4, HIGH); 
    }
    else {
      digitalWrite(3, LOW);
      digitalWrite(4, LOW);
    }
    if (Serial.available() > 0) {
      String data = Serial.readStringUntil('\n');
      Serial.print("You sent me: ");
      Serial.println(data);
    
    delay(1500);
}}
