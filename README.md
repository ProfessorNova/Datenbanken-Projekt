# Datenbanken-Projekt

## Projektname

Wetterdaten-Anwendung

## Zweck

Das Ziel dieses Projekts ist die Entwicklung einer Webanwendung, die Echtzeit-Wetterdaten für jede angegebene Stadt liefert. Die Anwendung ruft Wetterinformationen von einer externen API ab, wenn diese nicht in der Datenbank verfügbar sind oder wenn die Daten älter als 15 Minuten sind.

## Verwendete Tools und Technologien

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Datenbank:** Microsoft SQL Server
- **APIs:** www.weatherapi.com

## Setup-Guide

Die Anwendung wird Momentan nicht öffentlich gehostet. Um die Anwendung lokal auszuführen, führen Sie die folgenden Schritte aus:

- Klonen Sie das Repository auf Ihren Computer.
- Navigieren Sie in das Projektverzeichnis und führen Sie `npm install` aus, um die erforderlichen Pakete zu installieren.
- Stellen Sie sicher, dass Sie eine Microsoft SQL Server-Datenbank haben, auf die Sie zugreifen können. (Falls Sie keinen Zugriff auf den ITNT0005-Server der Hochschule Esslingen haben, können Sie eine lokale Instanz von Microsoft SQL Server verwenden. Die Datenbank muss die gleichen Tabellen und Stored Procedures wie die ITNT0005-Datenbank enthalten. Siehe [Datenbank](#datenbank) für weitere Informationen.)
- Erstellen Sie einen kostenlosen Account auf [www.weatherapi.com](http://www.weatherapi.com) und erhalten Sie einen API-Schlüssel.
- Erstellen Sie eine `.env`-Datei im Hauptverzeichnis und fügen Sie die folgenden Umgebungsvariablen hinzu (selbstverständlich mit Ihren eigenen Werten):

```plaintext
PORT=3000
DB_SERVER=localhost
DB_DATABASE=weather_db
DB_USER=sa
DB_PASSWORD=your_password
WEATHER_API_KEY=your_api_key
```

- Führen Sie `npm run backend` aus, um das Backend zu starten.
- Führen Sie `npm run frontend` in einem anderen Terminal aus, um das Frontend zu starten.

---

# Projektbeschreibung

## Funktionalität der Anwendung

Die Anwendung ermöglicht es Benutzern:

- Den Namen einer Stadt einzugeben.
- Die aktuellen Wetterdaten für diese Stadt einzusehen, einschließlich Temperatur, Luftfeuchtigkeit, Windgeschwindigkeit und Wetterbedingungen.
- Die lokale Datenbank automatisch mit den neuesten Daten zu aktualisieren, wenn die gespeicherten Daten älter als 15 Minuten sind oder wenn die Daten nicht vorhanden sind.
- Zudem können Benutzer auf einen Wetterbericht zugreifen, welche Durchschnitt, Minimale und Maximale Werte für Temperatur, Luftfeuchtigkeit und Windgeschwindigkeit, basierend auf den gespeicherten Daten dieser Stadt, anzeigt.

## Architektur

Beschreiben Sie die Gesamtarchitektur der Anwendung:

### Frontend

Das Frontend besteht aus einer einfachen HTML-Seite und einem kleinen JavaScript-Programm, das Benutzereingaben verarbeitet und die Anzeige aktualisiert. Dabei ist die Eingabe einer Stadt ein Formular, welches die Daten an das Backend sendet und die Antwort anzeigt. Des Weiteren wurde das UI mit Tailwind CSS und DaisyUI gestaltet.
Die Dateien für das Frontend sind im Projektverzeichnis unter `src/client/public` zu finden.

### Backend

Das Backend ist eine Node.js-Anwendung, welche express.js verwendet, um Anfragen zu verarbeiten. Es enthält eine Route (/weather/:city), die die Wetterdaten für eine bestimmte Stadt abruft und eine Route (/report/:city), die einen Wetterbericht für die Stadt anzeigt.
Das Backend kommuniziert mit einer Wetter-API, um aktuelle Wetterdaten abzurufen, und mit dem Datenbank-Server ITNT0005 (nur aus dem HE-VPN erreichbar), um gespeicherte Wetterdaten zu speichern und abzurufen.
Dementsprechend ist der Programmcode für das Backend auf drei Dateien aufgeteilt: `index.js`, `db.js` und `weatherAPI.js`.
`index.js` enthält die Routen und die Logik für die Datenbankabfragen, `db.js` enthält die Funktionen für die Datenbankverbindung und `weatherAPI.js` enthält die Funktionen für die API-Anfragen, sowie eine Methode um mithilfe der Zeitzonen die Zeit in UTC umzurechnen.
Die Dateien für das Backend sind im Projektverzeichnis unter `src/server` zu finden.

### API

Die Anwendung verwendet die [www.weatherapi.com](http://www.weatherapi.com) API, um aktuelle Wetterdaten abzurufen. Die API erfordert einen API-Schlüssel, der in der .env-Datei gespeichert ist. Die Anfrage sieht folgendermaßen aus: `http://api.weatherapi.com/v1/current.json?key=API_KEY&q=CITY_NAME`.
Wobei `API_KEY` der API-Schlüssel und `CITY_NAME` der Name der Stadt ist, für die die Wetterdaten abgerufen werden sollen.
Die Antwort besitzt folgendes Format (hier als Beispiel für London):

```
{
  "location": {
      "name": "London",
      "region": "City of London, Greater London",
      "country": "United Kingdom",
      "lat": 51.52,
      "lon": -0.11,
      "tz_id": "Europe/London",
      "localtime_epoch": 1715061312,
      "localtime": "2024-05-07 6:55"
  },
  "current": {
      "last_updated_epoch": 1715060700,
      "last_updated": "2024-05-07 06:45",
      "temp_c": 9,
      "temp_f": 48.2,
      "is_day": 1,
      "condition": {
      "text": "Mist",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/143.png",
      "code": 1030
      },
      "wind_mph": 4.3,
      "wind_kph": 6.8,
      "wind_degree": 360,
      "wind_dir": "N",
      "pressure_mb": 1018,
      "pressure_in": 30.06,
      "precip_mm": 0,
      "precip_in": 0,
      "humidity": 93,
      "cloud": 0,
      "feelslike_c": 7.9,
      "feelslike_f": 46.1,
      "vis_km": 3.9,
      "vis_miles": 2,
      "uv": 3,
      "gust_mph": 8,
      "gust_kph": 12.9
  }
}
```

Von den gelieferten Daten werden nur `location.name`, `current.temp_c`, `current.wind_kph`, `current.humidity`, `current.condition.text`, `current.last_updated` und `location.localtime` verwendet.

### Datenbank

Die Anwendung verwendet eine Microsoft SQL Server-Datenbank der Hochschule Esslingen, um Wetterdaten zu speichern. Die Datenbank in welcher die Daten von diesem Projekt gespeichert werden, lautet `SWB_DB2_Projekt`. Die Hier verwendeten Namen für die Tabellen, Trigger, Funktionen und Stored Procedures sind selbstverständlich völlig frei wählbar, solange sie im Code konsistent verwendet werden. Bei Änderungen an den Name müssen auch die entsprechenden Stellen im Code in `db.js` und `index.js` angepasst werden. Die Codebeispiele für die Erstellung der Tabellen und Stored Procedures sind identisch mit den tatsächlichen Tabellen und Stored Procedures, die in der `SWB_DB2_Projekt`-Datenbank erstellt wurden.

Zu den Daten für diese Projekt zählen:

- Die Tabelle `Wieland_WeatherData`, welche die alle angefragten Wetterdaten speichert. Die Tabelle enthält die folgenden Spalten:

  - `WeatherId` (Primärschlüssel, INT): Eine eindeutige ID für jede Wetterdatenreihe mit automatischer Inkrementierung.
  - `City` (VARCHAR): Der Name der Stadt, für die die Wetterdaten abgerufen wurden.
  - `Temperature` (FLOAT): Die Temperatur in Grad Celsius.
  - `Humidity` (INT): Die Luftfeuchtigkeit in Prozent.
  - `WindSpeed` (FLOAT): Die Windgeschwindigkeit in Kilometern pro Stunde.
  - `ObservationTime` (DATETIME): Das Datum und die Uhrzeit, zu der die Wetterdaten beobachtet wurden.
  - `Condition` (VARCHAR): Die Wetterbedingungen in textueller Form.

    Code zum Erstellen der Tabelle:

    ```sql
    CREATE TABLE Wieland_WeatherData (
        WeatherId INT PRIMARY KEY IDENTITY(1,1),
        City VARCHAR(100),
        Temperature FLOAT,
        Humidity INT,
        WindSpeed FLOAT,
        ObservationTime DATETIME,
        Condition VARCHAR(255)
    );
    ```

- Die Tabelle `Wieland_LatestWeather`, welche pro Stadt die neuesten Wetterdaten speichert.

  - `City` (Primärschlüssel, VARCHAR): Der Name der Stadt, für die die Wetterdaten abgerufen wurden.
  - `Temperature` (FLOAT): Die Temperatur in Grad Celsius.
  - `Humidity` (INT): Die Luftfeuchtigkeit in Prozent.
  - `WindSpeed` (FLOAT): Die Windgeschwindigkeit in Kilometern pro Stunde.
  - `ObservationTime` (DATETIME): Das Datum und die Uhrzeit, zu der die Wetterdaten beobachtet wurden.
  - `Condition` (VARCHAR): Die Wetterbedingungen in textueller Form.

    Code zum Erstellen der Tabelle:

    ```sql
    CREATE TABLE Wieland_LatestWeather (
        City VARCHAR(100) PRIMARY KEY,
        Temperature FLOAT,
        Humidity INT,
        WindSpeed FLOAT,
        ObservationTime DATETIME,
        Condition VARCHAR(255)
    );
    ```

- Die Stored Procedure `Wieland_sp_GetLatestWeather`, welche die neuesten Wetterdaten für eine bestimmte Stadt abruft von der Tabelle `Wieland_LatestWeather`. Die Stored Procedure wird mit dem Parameter `@City` aufgerufen.
  Code zum Erstellen der Stored Procedure:

  ```sql
    CREATE PROCEDURE Wieland_sp_GetLatestWeather
      @City VARCHAR(100)
    AS
    BEGIN
      SELECT *
      FROM [db_owner].[Wieland_LatestWeather]
      WHERE City = @City;
    END;
  ```

- Die Stored Procedure `Wieland_sp_InsertWeatherData`, welche die Wetterdaten in die Tabelle `Wieland_WeatherData` einfügt. Die Stored Procedure wird mit den Parametern `@City`, `@Temperature`, `@Humidity`, `@WindSpeed`, `@ObservationTime` und `@Condition` aufgerufen.
  Code zum Erstellen der Stored Procedure:

  ```sql
  CREATE OR ALTER PROCEDURE Wieland_sp_InsertWeatherData
    @City VARCHAR(100),
    @Temperature FLOAT,
    @Humidity INT,
    @WindSpeed FLOAT,
    @ObservationTime DATETIME,
  	@Condition VARCHAR(255)
  AS
  BEGIN
    INSERT INTO [db_owner].[Wieland_WeatherData] (City, Temperature, Humidity, WindSpeed, ObservationTime, Condition)
    VALUES (@City, @Temperature, @Humidity, @WindSpeed, @ObservationTime, @Condition);
  END;

  ```

- Der Trigger `Wieland_tr_UpdateLatestWeather` welcher die neuesten Wetterdaten in der Tabelle `Wieland_LatestWeather` aktualisiert, wenn neue Wetterdaten in die Tabelle `Wieland_WeatherData` eingefügt werden.
  Code zum Erstellen des Triggers:

  ```sql
  CREATE OR ALTER TRIGGER Wieland_tr_UpdateLatestWeather
  ON [db_owner].[Wieland_WeatherData]
  AFTER INSERT
  AS
  BEGIN
    SET NOCOUNT ON;

    -- The 'LatestWeather' table should have the same structure or at least the relevant columns as 'WeatherData'.

    UPDATE lw
    SET
        lw.Temperature = i.Temperature,
        lw.Humidity = i.Humidity,
        lw.WindSpeed = i.WindSpeed,
        lw.ObservationTime = i.ObservationTime,
  		lw.Condition = i.Condition
    FROM [db_owner].[Wieland_LatestWeather] lw
    INNER JOIN inserted i
        ON lw.City = i.City;

    -- If no existing record for the city is found, insert the new record into 'LatestWeather'
    INSERT INTO [db_owner].[Wieland_LatestWeather] (City, Temperature, Humidity, WindSpeed, ObservationTime, Condition)
    SELECT i.City, i.Temperature, i.Humidity, i.WindSpeed, i.ObservationTime, i.Condition
    FROM inserted i
    WHERE NOT EXISTS (
        SELECT 1 FROM [db_owner].[Wieland_LatestWeather] lw WHERE lw.City = i.City
    );
  END;
  ```

- Die Funktion `Wieland_fn_GetWeatherReport`, welche einen Wetterbericht für eine bestimmte Stadt basierend auf den gespeicherten Wetterdaten zurückgibt. Der Bericht enthält Durchschnitt, Minimale und Maximale Werte für Temperatur, Luftfeuchtigkeit und Windgeschwindigkeit.
  Die Funktion wird mit den Parametern `@City`, `@FromDate` und `@ToDate` aufgerufen. `@FromDate` und `@ToDate` sind Datumsparameter, die den Zeitraum für den Bericht festlegen. Im derzeitigen Projekt wird der Zeitraum vom 01.01.2024 bis zum 01.01.2025 festgelegt.
  Code zum Erstellen der Funktion:

  ```sql
  CREATE OR ALTER FUNCTION Wieland_fn_WeatherReport
  (
    @City VARCHAR(100),
    @FromDate DATETIME,
    @ToDate DATETIME
  )
  RETURNS TABLE
  AS
  RETURN
  (
    SELECT
        AVG(Temperature) AS AvgTemperature,
        MIN(Temperature) AS MinTemperature,
        MAX(Temperature) AS MaxTemperature,
        AVG(Humidity) AS AvgHumidity,
        MIN(Humidity) AS MinHumidity,
        MAX(Humidity) AS MaxHumidity,
        AVG(WindSpeed) AS AvgWindSpeed,
        MIN(WindSpeed) AS MinWindSpeed,
        MAX(WindSpeed) AS MaxWindSpeed
    FROM
        [db_owner].[Wieland_WeatherData]
    WHERE
        City = @City AND
        ObservationTime BETWEEN @FromDate AND @ToDate
  );
  ```

---

# Herausforderungen

## Technische Herausforderungen

### Problem 1: Zeitumrechnung

Die API gibt die Zeit in der lokalen Zeitzone der Stadt zurück. Dies erzeugt ein Koflikt, wenn man überprüfen möchte, ob die Daten in der Datenbank älter als 15 Minuten sind. Denn wenn die Daten von einer Stadt in einer Zeitzone abgerufen werden, die der unseren um mehrere Stunden voraus ist, dann wird bei der Abfrage die Zeitangabe immer veraltet sein.

### Problem 2: Veränderung der Datenbankstruktur

Die Datenbankstruktur musste einmal verändert werden, da die ursprüngliche Struktur der Tabellen nicht die Spalte `Condition` enthielt. Diese Spalte wurde benötigt, um die Wetterbedingungen in textueller Form zu speichern. Und was wäre eine Wetterdatenbank ohne die Wetterbedingungen?

### Problem 3: Doppelte Einträge in der Datenbank durch Testen

Durch das Ausführen von Tests von den unfertigen Funktionen, wurden doppelte Einträge in der Datenbank erzeugt. Dies führte zwar zu keinen größeren Problemen, jedoch war es nicht gewünscht, dass die Datenbank unnötig mit doppelten Einträgen belastet wird. Allerdings sollten auch nicht einfach alle Daten nochmal gelöscht werden, da die Datenbank auch für die Präsentation benötigt wird.

### Problem 4: Wahl der API

Die Wahl der API field zuerst auf OpenWeatherMap, jedoch war die API nicht kostenlos und die Anfragen waren limitiert.

## Problemlösungsstrategien

### Lösung zu Problem 1: Zeitumrechnung

Um das Problem der Zeitumrechnung zu lösen, wurde eine Funktion in `weatherAPI.js` implementiert, die die Zeit in UTC umrechnet. Diese Funktion wird verwendet, um die Zeit in der API-Antwort mit hilfe der Zeitzoneninformationen umzurechnen. Somit sind alle Zeiten in der Datenbank in UTC gespeichert und können einfach mit der aktuellen Zeit verglichen werden.

### Lösung zu Problem 2: Veränderung der Datenbankstruktur

Um die Datenbankstruktur zu verändern, wurden die Tabellen nicht einfach gelöscht und neu erstellt, sondern es wurden die Tabellen mit den neuen Spalten erweitert. Dies wurde mit folgendem SQL-Befehl durchgeführt:

```sql
ALTER TABLE [db_owner].[Wieland_LatestWeather]
ADD Condition VARCHAR(255);
ALTER TABLE [db_owner].[Wieland_WeatherData]
ADD Condition VARCHAR(255);
```

### Lösung zu Problem 3: Doppelte Einträge in der Datenbank durch Testen

Da die Funktionen nun fertiggestellt sind, wurden einmalig alle doppelten Einträge in der Datenbank gelöscht. Dies wurde mit folgendem SQL-Befehl durchgeführt:

```sql
DELETE FROM [db_owner].[Wieland_WeatherData]
WHERE WeatherId NOT IN (
    SELECT MIN(WeatherId)
    FROM [db_owner].[Wieland_WeatherData]
    GROUP BY City, ObservationTime
);
```

### Lösung zu Problem 4: Wahl der API

Nachdem festgestellt wurde, dass OpenWeatherMap nicht die beste Wahl war, wurde nach einer anderen API gesucht. Die Wahl fiel dann auf WeatherAPI, da sie eine einfache und kostenlose API ist.

---

# Fazit

## Projektergebnisse

Das Ergebnis ist zufriedenstellend und alle Anforderungen sind erfüllt. Die Anwendung ist funktionsfähig und liefert genaue und aktuelle Wetterdaten. Zudem ist der Programmcode gut strukturiert und dokumentiert.

## Zukünftige Verbesserungen

Mögliche Verbesserungen und Erweiterungen welche noch denkbar wären:

- Implementierung einer automatischen Aktualisierung der Wetterdaten in der Datenbank.
- Hinzufügen von Diagrammen und Grafiken zur Visualisierung der Wetterdaten.
- Implementierung einer Benachrichtigungsfunktion, um Benutzer über Wetterwarnungen zu informieren.
- Verbesserung der Benutzeroberfläche und Hinzufügen von zusätzlichen Funktionen wie Favoritenstädten und Wetterkarten.

---

# Gelernte Lektionen

## Schlüsselerkenntnisse

### 1. Es ist sinnvoll nicht gleich zu Programmieren

Da eine Woche lang über das Projekt nachgedacht wurde und welche Tabellen, Stored Procedures und so weiter benötigt werden, konnte das gesamte Projekt in nur einem Nachmittag geschrieben werden. Dies zeigt, dass es sinnvoll ist, sich vorher Gedanken zu machen und nicht gleich loszulegen.

### 2. Die Datenbank ist ein selbstständiges System

Es war besonders angenehm zu sehen, wie der Trigger automatisch die neuesten Wetterdaten in der Tabelle `Wieland_LatestWeather` aktualisiert hat. Dies zeigt, dass die Datenbank ein selbstständiges System ist, welches auch ohne das Backend funktioniert. Somit kann viel Logik in die Datenbank ausgelagert werden.

### 3. Die Wichtigkeit von Kommentaren und Dokumentation

Da der Code für das Backend in drei Dateien aufgeteilt ist, war es wichtig, dass der Code gut dokumentiert ist. Dies hat dazu beigetragen, dass der Code leicht zu verstehen und zu warten ist. Zusätzlich hilft es auch immer einen Setup-Guide zu haben, um alles auf einem anderen Computer wieder aufsetzen zu können.

### 4. Exception Handling

Es wurden viele Fehlerbehandlungen implementiert, um sicherzustellen, dass die Anwendung auch bei unerwarteten Fehlern nicht abstürzt. Zudem hilft dies auch dabei direkt herauszufinden, ob der Fehler in der API oder in der Datenbank liegt.

## Verbesserungen für zukünftige Projekte

Auch wenn das Projekt erfolgreich war, gibt es immer Raum für Verbesserungen und Lernen. Die Struktur war zwar gut, jedoch war der Umfang des Projekts nicht sehr groß. Würden die genannten [Verbesserungen](#zukünftige-verbesserungen) umgesetzt werden, würde die Momentante Strukturierung des Projekts vermutlich nicht mehr ausreichen.
Des Weiteren wurde in diesem Projekt mit Node.js und express.js gearbeitet, da dies bereits vertraute Technologien sind. Es wäre jedoch sinnvoll, sich auch mit anderen Technologien zu beschäftigen, um ein breiteres Wissen zu erlangen und um besser einschätzen zu können, welche Technologie für welches Projekt am besten geeignet ist.

---
