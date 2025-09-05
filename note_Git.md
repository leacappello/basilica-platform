Da terminale si va nella cartella dove è contenuto il progetto:

- cd basilica-platform

Per essere certi di trovarli li:

- get remote -v

restituirà (Output):
origin https://github.com/leacappello/basilica-platform.fit (fetch)
origin https://github.com/leacappello/basilica-platform.fit (push)

- git status

- git diff
  mostrerà la sostituzione effettuata nel nostro caso si è cambiato h1

- git add index.html
- git status
- git commit -m "feat: aggiorna H1 della home(demo visiva)
- git push -u origin main

------------------------Esercizio------------------------------

Aprire un branch con il vostro nome e cognome

- git checkout -b feature/Giordana-Pandolfo-sottotitolo-hero

in index.html aggiungere un sottotitolo sotto H1 (<p class="muted"....>)

Fare add -> commit > push

- git add index.html
- git commit -m "feat:aggiunge sottotitolo alla hero"
- git push origin feature/Giordana-Pandolfo-sottotitolo-hero

Su GitHub aprire una PR (Pull Request)
Fare una review incrociata, viene fatta un merge (tutti possono aggiornare la main)

- git checkout main

Se si commette un errore si può tornare indietro in tutta sicurezza:

1. Se non è stato fatto il commit:

- git restore index.html

2. Se è stato fatto il commit:

- git revert<SHA-del-commit>

Lo SHA in Git è il codice identificativo univoco di un commit:

- git log

