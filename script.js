/* =========================================================================
   Blade – Subscription Slayer · Landingpage JS
   Vanilla JS, keine Abhängigkeiten. Alles progressive enhancement:
   Die Seite funktioniert auch ohne JS (Inhalt ist Deutsch im HTML).
   ========================================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     1) Aktuelles Jahr im Footer
     --------------------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------------
     2) Mobile-Menü
     --------------------------------------------------------------------- */
  var menuBtn = document.getElementById('menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('hidden') === false;
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    // Menü schließen, wenn ein Link geklickt wird
    mobileMenu.querySelectorAll('.menu-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------------------------------------------------------------
     3) Scroll-Reveal via IntersectionObserver
        (respektiert prefers-reduced-motion über CSS)
     --------------------------------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: einfach alles sichtbar machen
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------------------------------------------------------------------
     4) FAQ-Accordion: immer nur eines offen (optional, angenehmer)
     --------------------------------------------------------------------- */
  var faqItems = document.querySelectorAll('#faq details');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ---------------------------------------------------------------------
     5) Sprach-Umschalter DE / EN
        Standard = DE (steht bereits im HTML). Beim ersten Laden speichern
        wir den DE-Originaltext je Element und tauschen bei EN gegen die
        Übersetzung. Auswahl wird in localStorage gemerkt.
     --------------------------------------------------------------------- */
  var EN = {
    'skip': 'Skip to content',
    // Navigation
    'nav.features': 'Features', 'nav.how': 'How it works', 'nav.privacy': 'Privacy',
    'nav.pricing': 'Pricing', 'nav.faq': 'FAQ', 'nav.cta': 'Try now',
    // Hero
    'hero.badge': 'Slay your subscriptions',
    'hero.h1a': 'Take control of your subscriptions.',
    'hero.h1b': 'Slay them.',
    'hero.sub': 'Blade detects your subscriptions automatically with AI – straight from your inbox, fully on-device. Keep costs and cancellation dates in view and save real money.',
    'hero.store1small': 'Download on the', 'hero.store2small': 'Get it on',
    'hero.soon': 'Coming soon · Be there from day one',
    // Mockup
    'mock.hello': 'Good evening', 'mock.overview': 'Your overview',
    'mock.monthly': 'Monthly cost', 'mock.year': '€ 1,048.80 / year',
    'mock.cancel': 'Cancels in 3 days', 'mock.slay': '⚔️ 3 subscriptions to slay',
    // Trust
    'trust.1': 'Scan runs locally on device', 'trust.2': 'Languages worldwide',
    'trust.3num': 'All', 'trust.3': 'Inboxes: Gmail & IMAP', 'trust.4': 'compliant & data-minimal',
    // Features intro
    'features.eyebrow': 'Features', 'features.h2': 'Everything to master your subscriptions',
    'features.sub': 'From automatic detection to one-tap cancellation – Blade does the work for you.',
    // F1
    'f1.tag': 'Deep Scan', 'f1.h': 'Detect subscriptions automatically – with AI',
    'f1.p': 'Blade scans your inbox – Gmail and IMAP (iCloud, Yahoo, GMX, Web.de, T-Online and more) – and detects subscriptions automatically. The AI runs fully <strong class="text-white">on-device</strong>: nothing is stored on servers. In 14 languages.',
    'f1.l1': 'Gmail & all common IMAP inboxes', 'f1.l2': 'AI detection without cloud upload',
    'f1.l3': 'Finds forgotten & hidden subscriptions too',
    'f1.m1': 'Scanning inbox…', 'f1.found': 'detected',
    // F2
    'f2.tag': 'Inbox Slayer', 'f2.h': 'Newsletters & spam gone with one swipe',
    'f2.p': 'Blade spots newsletters and spam in your inbox and lets you unsubscribe with a single swipe. Less noise, more clarity.',
    'f2.l1': 'One-swipe unsubscribe', 'f2.l2': 'Detects pushy senders automatically',
    'f2.m1': 'Newsletters & spam', 'f2.unsub': 'Unsubscribe', 'f2.done': '✓ Gone',
    // F3
    'f3.tag': 'AI Mail Import', 'f3.h': 'Paste an email, done',
    'f3.p': 'Got a confirmation email? Just paste it – the AI reads provider, price and interval automatically and adds the subscription for you. No typing.',
    'f3.l1': 'Automatic reading of price & term',
    'f3.l2': 'Add manually incl. plan choice (Netflix HD/UHD, Spotify, Disney+ …)',
    'f3.mfrom': 'From: billing@netflix.com', 'f3.parsing': 'AI reading…', 'f3.add': 'Add subscription',
    // F4
    'f4.tag': 'Cancel & Reactivate', 'f4.h': 'Cancelling made easy',
    'f4.p': 'Direct links take you straight to the provider’s cancellation page. And if you delete a subscription by accident, it’s <strong class="text-white">reactivatable for 24 hours</strong>.',
    'f4.l1': 'Direct links to providers', 'f4.l2': '24-hour reactivation as a safety net',
    'f4.due': 'Due: in 3 days', 'f4.cancelbtn': 'Cancel now →',
    'f4.deleted': 'Deleted · reactivatable 24 h', 'f4.reactivate': 'Undo',
    // F5
    'f5.tag': 'Overview', 'f5.h': 'A calm dashboard for everything',
    'f5.p': 'Monthly and yearly costs, sorted by category. Blade shows you clearly where your money goes – without visual noise.',
    'f5.l1': 'Monthly & yearly costs at a glance', 'f5.l2': 'Categories & many currencies',
    'f5.m1': 'Yearly spend', 'f5.cat1': 'Streaming', 'f5.cat2': 'Software', 'f5.cat3': 'Fitness',
    // F6
    'f6.tag': 'Share household', 'f6.h': 'Manage subscriptions together',
    'f6.p': 'Share subscriptions with family or flatmates. Everyone sees what’s running and what it costs – transparent and fairly split.',
    'f6.l1': 'Shared household for family & flatshare', 'f6.l2': 'Sign in with email/password or Google',
    'f6.m1': 'Household “Blade Family”', 'f6.shared': 'shared',
    // How
    'how.eyebrow': 'How it works', 'how.h2': 'Three steps to full clarity',
    'how.s1h': 'Connect your inbox', 'how.s1p': 'Connect Gmail or an IMAP inbox (iCloud, GMX, Web.de …). Secure and in seconds.',
    'how.s2h': 'AI detects subscriptions', 'how.s2p': 'The on-device deep scan finds all subscriptions automatically – without data ever leaving your device.',
    'how.s3h': 'Save & slay', 'how.s3p': 'Keep track of dates, cancel the unnecessary with one tap and save every month.',
    // Privacy
    'privacy.tag': 'Privacy', 'privacy.h2': 'Your data stays with you',
    'privacy.p': 'The email scan runs <strong class="text-white">entirely on-device</strong>. Blade stores nothing on servers and shares nothing. Data-minimal and GDPR-compliant – privacy is not a feature for us, it’s a founding principle.',
    'privacy.c1h': 'On-device', 'privacy.c1p': 'Analysis happens locally on your device.',
    'privacy.c2h': 'No server storage', 'privacy.c2p': 'Your emails never land in a cloud.',
    'privacy.c3h': 'GDPR-compliant', 'privacy.c3p': 'Built to European standards.',
    'privacy.c4h': 'No sharing', 'privacy.c4p': 'No ads, no data selling.',
    // Pricing
    'pricing.eyebrow': 'Pricing', 'pricing.h2': 'Start free. Go Pro.',
    'pricing.sub': 'All core features free. Upgrade for the full slay.',
    'pricing.free': 'Free', 'pricing.freesub': 'forever',
    'pricing.f1': 'Add subscriptions manually', 'pricing.f2': 'Overview & cost dashboard',
    'pricing.f3': 'Cancellation reminders', 'pricing.f4': '1 inbox', 'pricing.freecta': 'Start for free',
    'pricing.popular': 'Popular', 'pricing.pro': 'Blade Pro', 'pricing.month': '/month',
    'pricing.prosub': 'cancel anytime', 'pricing.p1': 'Everything in Free, plus:',
    'pricing.p2': 'AI Deep Scan & AI Mail Import', 'pricing.p3': 'Inbox Slayer (unlimited)',
    'pricing.p4': 'Multiple inboxes & share household', 'pricing.p5': 'Direct links & 24 h reactivation',
    'pricing.procta': 'Get Pro', 'pricing.note': '* Placeholder pricing. Final plans at launch.',
    // FAQ
    'faq.eyebrow': 'FAQ', 'faq.h2': 'Frequently asked questions',
    'faq.q1': 'Is the email scan safe?',
    'faq.a1': 'Yes. The deep scan runs fully on-device – your emails are analysed locally and never stored on servers or shared. Blade is GDPR-compliant.',
    'faq.q2': 'Which providers & inboxes are supported?',
    'faq.a2': 'Gmail and all common IMAP inboxes such as iCloud, Yahoo, GMX, Web.de and T-Online. Streaming, software, fitness and many more subscriptions are detected.',
    'faq.q3': 'How does cancelling work?',
    'faq.a3': 'Blade provides direct links to each provider’s cancellation page. Accidentally deleted subscriptions can be restored within 24 hours.',
    'faq.q4': 'Which languages & currencies are supported?',
    'faq.a4': 'Blade supports 14 languages and many currencies – ideal for international households.',
    'faq.q5': 'Which platforms does Blade run on?',
    'faq.a5': 'Blade is coming for iOS and Android. Sign in via email/password or with Google.',
    // CTA
    'cta.h': 'Ready to slay your subscriptions?',
    'cta.p': 'Download Blade and take control of your subscriptions – private, smart and premium.',
    'cta.soon': 'Coming soon on the App Store & Google Play',
    // Footer
    'footer.tag': 'Slay your subscriptions. The on-device subscription manager for iOS & Android.',
    'footer.product': 'Product', 'footer.legal': 'Legal', 'footer.social': 'Social',
    'footer.imprint': 'Imprint', 'footer.privacy': 'Privacy Policy', 'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.', 'footer.made': 'Built with ♥ and privacy.'
  };

  var i18nEls = document.querySelectorAll('[data-i18n]');
  // DE-Original einmalig sichern
  i18nEls.forEach(function (el) { el.setAttribute('data-de', el.innerHTML); });

  function setLang(lang) {
    i18nEls.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (lang === 'en' && EN[key] != null) {
        el.innerHTML = EN[key];
      } else {
        el.innerHTML = el.getAttribute('data-de');
      }
    });
    document.documentElement.lang = lang;
    // Button-States
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var active = btn.getAttribute('data-lang') === lang;
      btn.setAttribute('aria-pressed', String(active));
      btn.classList.toggle('text-white', active);
      btn.classList.toggle('bg-white/10', active);
      btn.classList.toggle('text-steel', !active);
    });
    try { localStorage.setItem('blade-lang', lang); } catch (e) {}
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.getAttribute('data-lang'));
    });
  });

  // Gespeicherte Sprache wiederherstellen (Default DE)
  var saved = 'de';
  try { saved = localStorage.getItem('blade-lang') || 'de'; } catch (e) {}
  if (saved === 'en') setLang('en');
})();
