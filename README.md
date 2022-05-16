# <img src="https://user-images.githubusercontent.com/49319459/161066791-1b917a11-df1a-4e4d-9524-d606e59a1aed.png" width="28"> Browserabdruck - Durchblickt  
Diese Erweiterung informiert praxisnah was ein Browserabdruck (englisch: browser fingerprint) ist, und zeigt an, ob die aktuell besuchte Webseite einen Abdruck erstellt. 

## Zielsetzung

Privatsphäre im Internet ist für viele ein undurchsichtiges Thema. Es gibt genügend Browser Erweiterungen, um sich gegen Tracker zu schützen, wie z.B.  <a href="https://ublockorigin.com/" target="_blank"> uBlock Origin </a> oder <a href="https://addons.mozilla.org/en-GB/firefox/addon/noscript/" target="_blank">NoScript</a>. Es gibt aber bis jetzt keine Erweiterung, die interaktiv anzeigt ob die aktuell besuchte Webseite einen Fingerprint (zu Deutsch: Browserabdruck) erstellt. Mit einem Klick auf das Icon dieser Erweiterung in der Navigationsleiste öffnet sich ein Fenster, dass genau dies transparent darstellt:
<p align="center">
<!-- <img src="https://user-images.githubusercontent.com/49319459/161066777-f19713f3-d2ab-479a-8fc1-2ad7d433b0f8.png" /> -->
 <img src="https://user-images.githubusercontent.com/49319459/161102718-ddbd9ced-3b78-4702-a1a4-7f6af589793a.gif"  width="239" height="420"/> <!--  width="299" height="525" -->

</p>
Das Popup zeigt an welche Fingerprint Methoden von der aktuellen Seite verwendet werden. Mit einem Klick auf das Fragezeichen öffnet sich ein Informationsfeld zur Aufklärung der jeweiligen Trackingmethode. <br />
<br />
Ziel ist somit, Nutzer über den Browserabdruck zu informieren. Dabei hilft das Wissen, geeignete Gegenmaßnahmen zu ergreifen und Aufmerksamkeit über die bisher allgemein unbekannte Tracking Methode zu schaffen. <br />

## Features

<ul>
  <li> Popup Icon Button in der Navigationsleiste des Browsers</li>
  <li> Zeigt an, welcher Abdruck von der Webseite gesammelt wurde </li>
  <li> Einfache Erklärung mit Beispielen und Anwendungszweck der jeweiligen Fingerprintmethode</li>
 <li> Weitere Informationen zu Gegenmaßnahmen</li>
</ul>
Fingerprint/Tracking Methoden die erkannt werden:
<ul>
  <li> Canvas Fingerprinting</li>
  <li> WebGL Fingerprinting </li>
  <li> Audio Fingerprinting</li>
  <li> Orientierungssensor</li>
  <li> Bewegungssensor</li>
  <li> Batterie Status (Akkustand)</li>
  <li> Geolocation API (Standort)</li>
</ul>

## Was diese Erweiterung nicht macht
<ul>
 <li> Blockiert keine Trackingmethoden! Tracking wird <bold>nur</bold> erkannt, nicht verhindert. Dafür gibt es schon etablierte Erweiterung wie <a href="https://ublockorigin.com/" target="_blank"> uBlock Origin </a> oder <a href="https://addons.mozilla.org/en-GB/firefox/addon/noscript/" target="_blank">NoScript</a>. </li>
  <li> Es werden keine Daten jedweder Art gespeichert! Alle Daten persistieren nur so lange, wie eine Webseite besucht wird.  </li>
</ul>

## Installation
Diese Erweiterung wurde für Firefox und Google Chrome (und Chromium-basierte Browser wie Opera) entwickelt. Es gibt zwei Methoden der Installation: <br>
1. Die erste empfohlene Methode ist die Erweiterung in Firefox zu installieren. Es kann direkt aus dem Firefox Add-On Store installiert werden: https://addons.mozilla.org/en-US/firefox/addon/browserabdruck-durchblickt/
2. Die zur Zeit zweiten Methode der Installation in Google Chrome ist die <a href="https://github.com/Schmittenberger/Browserabdruck---Durchblickt/releases/download/KOMPASS/Browserabdruck---Durchblickt-v0.1-CHROME.zip">Erweiterung als ZIP herunterzuladen</a> und zu entpacken. Danach muss in Chrome die Seite chrome://extensions/ aufgerufen werden. Dann muss oben rechts der Entwicklermodus angeschaltet werden. Die Einstellung führt dazu, dass ein Menu herunterfährt. In dem Menu muss die Option "Entpackte Erweiterung laden" (auf Englisch: "Load unpacked extension") ausgewählt werden. In dem sich dann öffnenden Fenster muss der entpackte Ordner aus der heruntergeladenen ZIP ausgewählt werden.
