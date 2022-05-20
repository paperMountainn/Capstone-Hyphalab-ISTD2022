// Example testing sketch for various DHT humidity/temperature sensors
// Written by ladyada, public domain
// apparently you need to download the groove temperature lib here
// https://files.seeedstudio.com/wiki/Grove-Temperature-Humidity-Sensor/Grove_Temperature_And_Humidity_Sensor-master.zip
// if you have 2 DHT libraries installed, please delete one of them first

// works fine

#include "Wire.h"
#include "DHT.h"
#define DHTTYPE DHT20   // DHT 20
/*Notice: The DHT10 and DHT20 is different from other DHT* sensor ,it uses i2c interface rather than one wire*/
/*So it doesn't require a pin.*/
DHT dht(DHTTYPE);         //   DHT10 DHT20 don't need to define Pin

// debugging can be done like this, or you can just use an if else statement 
#if defined(ARDUINO_ARCH_AVR)
    #define debug  Serial
 
#elif defined(ARDUINO_ARCH_SAMD) ||  defined(ARDUINO_ARCH_SAM)
    #define debug  SerialUSB
#else
    #define debug  Serial
#endif
 
void setup() {
 
    debug.begin(115200);
    debug.println("DHTxx test!");
    Wire.begin();
 
    /*if using WIO link,must pull up the power pin.*/
    // pinMode(PIN_GROVE_POWER, OUTPUT);
    // digitalWrite(PIN_GROVE_POWER, 1);
 
    dht.begin();
}
 
void loop() {
    float temp_hum_val[2] = {0};
    // Reading temperature or humidity takes about 250 milliseconds!
    // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
 
 
    if (!dht.readTempAndHumidity(temp_hum_val)) {
        debug.print("Humidity: ");
        debug.print(temp_hum_val[0]);
        debug.print(" %\t");
        debug.print("Temperature: ");
        debug.print(temp_hum_val[1]);
        debug.println(" *C");
    } else {
        debug.println("Failed to get temprature and humidity value.");
    }
 
    delay(1500);
}