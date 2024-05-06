# Datenbanken-Projekt

## Projektname

Wetterdaten-Anwendung

## Zweck

Das Ziel dieses Projekts ist die Entwicklung einer Webanwendung, die Echtzeit-Wetterdaten für jede angegebene Stadt liefert. Die Anwendung ruft Wetterinformationen von einer externen API ab, wenn diese nicht in der lokalen Datenbank verfügbar sind oder wenn die Daten älter als 10 Minuten sind.

## Verwendete Tools und Technologien

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Datenbank:** Microsoft SQL Server
- **APIs:** WeatherAPI.com

## Bereitstellung

- Gehostet auf [Plattformname] (Link zur Website, falls verfügbar)

---

# Projektbeschreibung

## Funktionalität der Anwendung

Die Anwendung ermöglicht es Benutzern:

- Den Namen einer Stadt einzugeben.
- Die aktuellen Wetterdaten für diese Stadt einzusehen, einschließlich Temperatur, Luftfeuchtigkeit, Windgeschwindigkeit und Wetterbedingungen.
- Die lokale Datenbank automatisch mit den neuesten Daten zu aktualisieren, wenn die gespeicherten Daten älter als 10 Minuten sind.

## Architektur

Beschreiben Sie die Gesamtarchitektur der Anwendung:

- **Frontend:** Wie das Frontend mit dem Benutzer interagiert und Anfragen an das Backend sendet.
- **Backend:** Wie das Backend Anfragen verarbeitet, mit der externen Wetter-API interagiert und die Datenspeicherung mit SQL Server verwaltet.
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
