# Jarmolkowicz & Partners

Statyczna wizytówka spółki. HTML, CSS i lokalne fonty. Bez instalowania pakietów.

## Pliki źródłowe

- `index.html` – jedyny plik wejściowy publikowanej strony.
- `style.css` – układ i typografia.
- `assets/` – zdjęcie, ikona, fonty i ich licencje.
- `scripts/prepare-pages.mjs` – kontrola odnośników i przygotowanie plików do publikacji.
- `.github/workflows/pages.yml` – automatyczne wdrożenie po zmianach na `main`.

Podgląd `jarmolkowicz-partners-v2.html`, folder `Versions/` i pliki tymczasowe pozostają lokalnie. Nie trafiają do repozytorium ani do wdrożenia.

## Kontrola lokalna

Wymagany Node.js 24 (w GitHub Actions jest ustawiany automatycznie).

```sh
node scripts/prepare-pages.mjs
```

Polecenie sprawdza lokalne odnośniki i kotwice, a następnie odtwarza katalog `_site/` z 10 jawnie wskazanych plików. Tylko ten katalog jest publikowany.

Stronę można obejrzeć, otwierając `index.html` w przeglądarce. Nie trzeba tworzyć osobnego pliku podglądu.

## Pierwsze wdrożenie

1. Wyślij gałąź `main` do repozytorium:
   ```sh
   git push -u origin main
   ```
2. W repozytorium otwórz **Settings → Pages → Build and deployment → Source** i wybierz **GitHub Actions**.
3. W zakładce **Actions** uruchom **Deploy website to GitHub Pages → Run workflow**, jeśli pierwsze automatyczne uruchomienie nastąpiło przed włączeniem Pages.
4. Po udanym wdrożeniu adres strony pojawi się w podsumowaniu zadania.

Domyślny adres:
https://jarmolkowicz.github.io/jarmolkowicz-and-partners-website/

Kolejne zmiany na `main` będą wdrażane automatycznie. Wszystkie ścieżki do plików są względne, więc działają zarówno pod adresem repozytorium, jak i we własnej domenie.

## Domena www.jarmolkowicz.pl

Zmiana domeny jest osobnym krokiem. Obecnego przekierowania na jarmolkowicz.com ani DNS nie zmieniono.

1. Zweryfikuj domenę w ustawieniach konta GitHub zgodnie z dokumentacją.
2. W **Settings → Pages → Custom domain** wpisz `www.jarmolkowicz.pl`.
3. U operatora DNS ustaw rekord `CNAME` dla `www` na `jarmolkowicz.github.io` (bez nazwy repozytorium). Dopiero przy przełączeniu usuń dotychczasową usługę przekierowania dla tego adresu.
4. Skonfiguruj też domenę bez `www`, zgodnie z dokumentacją GitHub Pages i ustawieniami operatora.
5. Po potwierdzeniu DNS i wydaniu certyfikatu włącz **Enforce HTTPS**.

Zachowaj rekordy pocztowe. Dla wdrożeń przez GitHub Actions plik `CNAME` w kodzie nie jest wymagany i nie steruje domeną.

## Status i prawa do plików

Zdjęcie pochodzi od właścicieli strony. Fonty Inter i Lora mają licencje OFL dołączone w `assets/fonts/`. Repozytorium nie przyznaje licencji na pozostałe materiały.

Do kontaktu służą obecne linki LinkedIn i Pracownia; adresów e-mail nie dopisano. Wizualna kontrola układu w przeglądarce pozostaje do wykonania. Skrypt nie sprawdza, jak strona wygląda ani czy zewnętrzne profile są dostępne.

## Dokumentacja

- [GitHub Pages: własny workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Własna domena](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Ograniczenia GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
