(() => {
  'use strict';

  const cfg = window.ORYZENO_CONFIG || {};
  const campaign = cfg.campaign || {};
  const organiser = cfg.organiser || {};
  const paypal = cfg.paypal || {};

  const euro = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: campaign.currency || 'EUR',
    maximumFractionDigits: 0
  });

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  const raised = Number(campaign.raised || 0);
  const goal = Math.max(Number(campaign.goal || 1), 1);
  const percent = Math.min((raised / goal) * 100, 100);

  setText('raisedAmount', euro.format(raised));
  setText('goalAmount', euro.format(goal));
  setText('supporterCount', new Intl.NumberFormat('it-IT').format(campaign.supporters || 0));
  setText('progressPercent', `${percent.toFixed(percent < 1 ? 1 : 0)}%`);

  const progressBar = document.getElementById('progressBar');
  if (progressBar) progressBar.style.width = `${percent}%`;

  const organiserSummary = document.getElementById('organiserSummary');
  const organiserReady = organiser.legalName && !organiser.legalName.startsWith('DA COMPLETARE') && organiser.email && !organiser.email.startsWith('DA COMPLETARE');
  if (organiserSummary) {
    organiserSummary.textContent = organiserReady
      ? `${organiser.legalName} · ${organiser.email}`
      : 'Dati organizzatore da completare prima dell’attivazione.';
  }

  const termsConsent = document.getElementById('termsConsent');
  const enablePaypal = document.getElementById('enablePaypal');
  const donationStatus = document.getElementById('donationStatus');
  const paypalReady = Boolean(paypal.enabled && organiserReady && (paypal.hostedButtonId || paypal.business));

  const updateButtonState = () => {
    if (!enablePaypal) return;
    enablePaypal.disabled = !(paypalReady && termsConsent && termsConsent.checked);
  };

  termsConsent?.addEventListener('change', updateButtonState);
  updateButtonState();

  const loadPayPalDonate = () => new Promise((resolve, reject) => {
    if (window.PayPal?.Donation) return resolve();
    const script = document.createElement('script');
    script.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js';
    script.charset = 'UTF-8';
    script.onload = resolve;
    script.onerror = () => reject(new Error('Impossibile caricare PayPal'));
    document.head.appendChild(script);
  });

  enablePaypal?.addEventListener('click', async () => {
    if (!paypalReady || !termsConsent?.checked) return;
    enablePaypal.disabled = true;
    enablePaypal.textContent = 'Caricamento PayPal…';
    try {
      await loadPayPalDonate();
      const options = {
        env: paypal.environment === 'sandbox' ? 'sandbox' : 'production',
        image: {
          src: 'https://www.paypalobjects.com/it_IT/IT/i/btn/btn_donateCC_LG.gif',
          title: 'Sostieni Oryzeno OpenLink con PayPal',
          alt: 'Dona con PayPal'
        },
        onComplete: () => {
          if (donationStatus) {
            donationStatus.innerHTML = '<strong>Grazie per il sostegno.</strong><p>Conserva la ricevuta PayPal. L’avanzamento pubblico non è aggiornato automaticamente.</p>';
          }
        }
      };
      if (paypal.hostedButtonId) options.hosted_button_id = paypal.hostedButtonId;
      else options.business = paypal.business;
      window.PayPal.Donation.Button(options).render('#paypal-donate-button-container');
      enablePaypal.hidden = true;
      if (donationStatus) donationStatus.innerHTML = '<strong>Pagamento PayPal disponibile</strong><p>Scegli il pulsante sottostante per aprire la pagina sicura di PayPal.</p>';
    } catch (error) {
      enablePaypal.disabled = false;
      enablePaypal.textContent = 'Riprova con PayPal';
      if (donationStatus) donationStatus.innerHTML = `<strong>Errore di collegamento</strong><p>${error.message}</p>`;
    }
  });

  const cookieBanner = document.getElementById('cookieBanner');
  const cookieOk = document.getElementById('cookieOk');
  try {
    if (!localStorage.getItem('oryzenoPrivacyNoticeSeen')) cookieBanner.hidden = false;
    cookieOk?.addEventListener('click', () => {
      localStorage.setItem('oryzenoPrivacyNoticeSeen', '1');
      cookieBanner.hidden = true;
    });
  } catch {
    if (cookieBanner) cookieBanner.hidden = false;
    cookieOk?.addEventListener('click', () => { cookieBanner.hidden = true; });
  }
})();
