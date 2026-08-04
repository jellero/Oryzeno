# Oryzeno OpenLink — piattaforma di validazione

Questa branch contiene la ricostruzione completa del sito Oryzeno OpenLink come piattaforma di **pre-lancio e manifestazione d’interesse**, prima dell’apertura di qualsiasi raccolta fondi.

## Obiettivo

Validare con dati verificati la domanda per un terminale satellitare a basso consumo destinato a infrastrutture e località remote, attraverso due programmi distinti:

- **OpenLink Pro** — monitoraggio, backup fuori banda, telemetria, fotografie e clip su evento per imprese e gestori di infrastrutture;
- **OpenLink Commons** — capacità gratuita o sponsorizzata per privati, ricerca, ambiente, comunità remote, associazioni ed emergenze.

Il sito non promette ancora un prodotto, un servizio commerciale o una ricompensa. La raccolta fondi e PayPal restano disattivati.

## Contenuti inclusi

- homepage completa e responsive;
- casi d’uso per energia, acqua, meteo, montagna, webcam, incendi, telecomunicazioni, cloud edge ed emergenze;
- matrice tecnica di ciò che il collegamento può e non può fare;
- specifiche-obiettivo del terminale, indicate chiaramente come non definitive;
- roadmap, gate di validazione e budget preliminare a milestone;
- pagine mercato, trasparenza, rischi, privacy, cookie e condizioni;
- moduli separati per privati, aziende e istituzioni;
- modello di lettera d’interesse non vincolante;
- backend Cloudflare Worker + D1 per double opt-in, anti-abuso, statistiche aggregate, revoca ed export amministrativo.

## Stato dei moduli

I moduli sono intenzionalmente disabilitati in `config.js` finché non sono configurati:

1. soggetto giuridico e contatti del titolare;
2. dominio pubblico definitivo;
3. Cloudflare Worker, database D1 e migrazioni;
4. Cloudflare Turnstile;
5. Resend e dominio email verificato;
6. revisione legale e privacy professionale.

Non inserire secret nel repository pubblico.

## Sorgente distribuita

Per superare i limiti del connettore di pubblicazione, il pacchetto sorgente completo è salvato in Base64 nei file `archive/part-*`.

Ricostruzione locale:

```bash
cat archive/part-* | base64 -d > oryzeno-openlink-v2.zip
echo "5b25d853e7db496c49c5fa8ade82c1fb482ccae34e62be940e6dba662af1fb15  oryzeno-openlink-v2.zip" | sha256sum -c -
unzip oryzeno-openlink-v2.zip -d oryzeno-openlink-v2
```

SHA-256 del pacchetto:

```text
5b25d853e7db496c49c5fa8ade82c1fb482ccae34e62be940e6dba662af1fb15
```

## Pubblicazione

Il workflow `.github/workflows/pages.yml` ricostruisce il pacchetto, verifica l’hash e pubblica il sito su GitHub Pages dopo il merge in `main`.

Nel repository impostare, una sola volta:

**Settings → Pages → Build and deployment → Source: GitHub Actions**

## Sicurezza e privacy

- nessuna carta o pagamento viene gestito dal sito;
- nessun analytics o cookie di profilazione è incluso;
- il consenso marketing è separato e facoltativo;
- l’adesione viene conteggiata solo dopo double opt-in;
- Turnstile viene verificato lato server;
- le statistiche pubbliche sono aggregate e applicano una soglia minima per categoria;
- ogni aderente riceve un collegamento personale per revocare la manifestazione;
- le chiavi amministrative, Resend e Turnstile devono essere configurate come secret del Worker.

## Verifiche eseguite

- sintassi JavaScript;
- integrità ZIP e SHA-256;
- collegamenti interni e file referenziati;
- assenza di dipendenze frontend esterne;
- struttura del backend e migrazione D1.

Le bozze legali richiedono revisione professionale prima della pubblicazione operativa.
