#include <SPI.h>
#include <Ethernet.h>
#include <DHT.h>
#include <ArduinoJson.h>

#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

// IP de tu PC en la red local (cambia según corresponda)
IPAddress serverIp(192, 168, 0, 2);

EthernetClient client;

void setup() {
  Serial.begin(9600);
  dht.begin();

  if (Ethernet.begin(mac) == 0) {
    Serial.println("Fallo DHCP, asignando IP estática");
    IPAddress ip(192, 168, 0, 16);
    Ethernet.begin(mac, ip);
  }
  delay(1000);
  Serial.print("IP Arduino: ");
  Serial.println(Ethernet.localIP());
}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("Error leyendo sensor");
  } else {
    if (client.connect(serverIp, 8080)) {
      StaticJsonDocument<200> doc;
      doc["temp"] = t;
      doc["hum"] = h;

      String jsonData;
      serializeJson(doc, jsonData);

      client.println("POST /ingest HTTP/1.1");
      client.print("Host: ");
      client.println("192.168.0.2");
      client.println("Content-Type: application/json");
      client.print("Content-Length: ");
      client.println(jsonData.length());
      client.println();
      client.println(jsonData);

      Serial.print("Datos enviados: ");
      Serial.println(jsonData);

      client.stop();
    } else {
      Serial.println("No se pudo conectar al servidor");
    }
  }
  delay(60000);  // Espera 60 segundos antes de enviar nuevo dato
}

