uint64_t chipid = ESP.getEfuseMac(); 
uint16_t chip = (uint16_t)(chipid >> 32);
char ssid[40];

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  snprintf(ssid, 50, "ESP32-%04X%08X", chip, (uint32_t)chipid);
  String ssid = ssid;
  
  
  Serial.println("hi");
  Serial.println(ssid);
  Serial.println(ssid);

}
void loop() {
  // put your main code here, to run repeatedly:
  String databasePath = "/UsersData/" + String(ssid) + "/";
  Serial.println(databasePath);
  Serial.println("yo");
  Serial.println(ssid);
  delay(1000);
  

}