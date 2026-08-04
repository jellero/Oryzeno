# Oryzeno OpenLink

Sito statico di pre-lancio per una raccolta fondi destinata allo sviluppo di un terminale satellitare GEO a capacità affittata.

## Stato

La raccolta è deliberatamente **disattivata**. Prima di accettare pagamenti occorre:

1. scegliere/costituire il soggetto organizzatore;
2. completare i dati in `config.js`;
3. far revisionare condizioni, privacy, fiscalità e modello di raccolta da professionisti italiani;
4. creare un pulsante PayPal Donate e inserire il relativo `hostedButtonId`;
5. impostare `paypal.enabled: true`;
6. verificare il sito in sandbox e in produzione.

## PayPal

L’integrazione utilizza PayPal Donate SDK e funziona su hosting statico.

```js
paypal: {
  enabled: true,
  environment: "production",
  hostedButtonId: "ID_FORNITO_DA_PAYPAL",
  business: ""
}
```

In alternativa si può valorizzare `business`, ma per un account Business è preferibile l’ID del pulsante ospitato. Il sito carica PayPal soltanto dopo l’azione esplicita dell’utente.

## Avanzamento raccolta

Aggiornare manualmente in `config.js`:

```js
campaign: {
  goal: 500000,
  raised: 12500,
  supporters: 214
}
```

Un aggiornamento automatico richiede un backend sicuro, API PayPal e webhook. Non inserire secret nel repository pubblico.

## Pubblicazione GitHub Pages

È incluso `.github/workflows/pages.yml`. Nel repository aprire **Settings → Pages → Build and deployment → Source: GitHub Actions**. Dopo il primo deploy il sito dovrebbe essere disponibile nel dominio Pages del repository.

## Documenti legali

Le pagine fornite sono bozze operative e non consulenza legale. In particolare, il modello “keep-it-all” è presentato come donazione senza reward, prodotto, servizio o investimento. Se vengono aggiunti dispositivi, abbonamenti, ricompense o preordini, occorre riscrivere le condizioni applicando disciplina consumer, fiscale e di vendita a distanza.

## Sicurezza

- nessun dato carta è gestito dal sito;
- nessun analytics è incluso;
- PayPal viene caricato soltanto su azione dell’utente;
- non pubblicare credenziali API o secret;
- per progressi automatici usare un backend e verificare le firme webhook.
