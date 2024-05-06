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

## Bereitstellung

- Die Anwendung wird Momentan nicht bereitgestellt. Um die Anwendung lokal auszuführen, führen Sie die folgenden Schritte aus:
- Klonen Sie das Repository auf Ihren Computer.
- Navigieren Sie in das Projektverzeichnis und führen Sie `npm install` aus, um die erforderlichen Pakete zu installieren.
- Erstellen Sie eine `.env`-Datei im Hauptverzeichnis und fügen Sie die folgenden Umgebungsvariablen hinzu (selbstverständlich mit Ihren eigenen Werten):

```plaintext
PORT=3000
DB_SERVER=localhost
DB_DATABASE=weather_db
DB_USER=sa
DB_PASSWORD=your_password
WEATHER_API_KEY=your_api_key
```

- Führen Sie `npm run frontend` aus, um das Frontend zu starten.
- Führen Sie `npm run backend` in einem anderen Terminal aus, um das Backend zu starten.

---

# Projektbeschreibung

## Funktionalität der Anwendung

Die Anwendung ermöglicht es Benutzern:

- Den Namen einer Stadt einzugeben.
- Die aktuellen Wetterdaten für diese Stadt einzusehen, einschließlich Temperatur, Luftfeuchtigkeit, Windgeschwindigkeit und Wetterbedingungen.
- Die lokale Datenbank automatisch mit den neuesten Daten zu aktualisieren, wenn die gespeicherten Daten älter als 15 Minuten sind oder wenn die Daten nicht vorhanden sind.
- Zudem können Benutzer auf einen Wetterbericht zugreifen, welche Durchschnitt, Minimale und Maximale Werte für Temperatur, Luftfeuchtigkeit und Windgeschwindigkeit, basierend auf den gespeicherten Daten, anzeigt.

## Architektur

Beschreiben Sie die Gesamtarchitektur der Anwendung:

- **Frontend:** Das Frontend besteht aus einer einfachen HTML-Seite und einem kleinen JavaScript-Programm, das Benutzereingaben verarbeitet und die Anzeige aktualisiert. Dabei ist die Eingabe einer Stadt ein Formular, welches die Daten an das Backend sendet und die Antwort anzeigt.
- **Backend:** Das Backend ist eine Node.js-Anwendung, welche express.js verwendet, um Anfragen zu verarbeiten.
- **Datenbank:** Übersicht über das Datenbankschema und wie Daten gespeichert und abgerufen werden.

---

# Herausforderungen

## Technische Herausforderungen

Listen und beschreiben Sie die wichtigsten technischen Herausforderungen, die während des Projekts aufgetreten sind, wie:

- Probleme bei der API-Integration.
- Konfiguration und Optimierung der Datenbank.
- Umgang mit Zeitunterschieden bei Wetterdaten.

## Problemlösungsstrategien

Diskutieren Sie die Strategien, die verwendet wurden, um diese Herausforderungen zu überwinden, wie:

- Implementierung von Fehlerbehandlung bei API-Aufrufen.
- Verwendung von SQL-Funktionen zur Verwaltung von Zeitumrechnungen.

---

# Fazit

## Projektergebnisse

Fassen Sie die Ergebnisse des Projekts zusammen:

- Erfolgreiche Implementierung des Echtzeit-Wetterdatenabrufsystems.
- Effizienter Daten-Cache- und Update-Mechanismus, der API-Aufrufe minimiert.

## Zukünftige Verbesserungen

Diskutieren Sie mögliche zukünftige Verbesserungen für das Projekt:

- Unterstützung für detailliertere Wettervorhersagen hinzufügen.
- Implementierung von Benutzerauthentifizierung, um personalisierte Einstellungen zu ermöglichen.

---

# Gelernte Lektionen

## Schlüsselerkenntnisse

Heben Sie die wichtigsten Erkenntnisse aus dem Projekt hervor, wie:

- Wichtigkeit gründlicher API-Tests und Behandlung von Randfällen.
- Vorteile der Verwendung von Umgebungsvariablen und sichere Speicherung sensibler Informationen wie API-Schlüssel.

## Verbesserungen für zukünftige Projekte

Vorschläge für Verbesserungen basierend auf den Erfahrungen dieses Projekts:

- Bessere anfängliche Planung in Bezug auf das Datenschema, um zusätzliche Wetterparameter aufzunehmen.
- Robustere Fehlerbehandlung im Frontend zur Verbesserung der Benutzererfahrung.

---
