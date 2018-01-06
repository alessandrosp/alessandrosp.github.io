# Introduction

The following data comes from [termometropolitico.it](https://www.termometropolitico.it/sondaggi-politici-elettorali) and refer to the period of time Dec 18 to Dec 24 of 2017. Only parties with 5%+ have been included.

| Party | Initials | % | Leader
| ----------- | ----------- | ----------- | ----------- |
| Movimento 5 Stelle | M5S | 27.7 | [Luigi di Maio](https://twitter.com/luigidimaio)*
| Partito Democratico | PD | 24.2 | [Matteo Renzi](https://twitter.com/matteorenzi)
| Forza Italia | FI | 15.7 | [Silvio Berlusconi](https://twitter.com/berlusconi)
| Lega Nord | Lega | 13.7 | [Matteo Salvini](https://twitter.com/matteosalvinimi)
| Libertà e Uguaglianza | LeU | 6.9 | [Pietro Grasso](https://twitter.com/PietroGrasso)
| Fratelli d'Italia | FDI | 5.2 | [Giorgia Meloni](https://twitter.com/GiorgiaMeloni)

*Many would argue that the *de facto* leader of the party is Beppe Grillo; as Luigi di Maio won the most recent primary elections, I decided to go with him.

# The analysis

## Data collection

- Use Twitter API to get all the tweets posted by candidates from January 1, 2017 to December 24, 2017 (extremes included). Retweets are ignored.
- The code for data collection is available here.
- For the duration of the analysis the tweets are stored in a local database to avoid re-querying the Twitter API multiple times.

## Descriptive stats

- How many tweets
- Average length
- Longest
- Shortest
- Number of tweets with links
- Number of hash
- Number of mentions

## Sentiment analysis

I used the [Polyglot package](http://polyglot.readthedocs.io/en/latest/Sentiment.html) to compute some rough sentiment scores for each candidate's tweets. I chose Polyglot as it's one of the few packages to offer localization in Italian. Note that Polyglot only offer a polarity score (-1.0, 0.0 or +1.0) for words. Sentiment scores were computed by averaging the polarity score for each tweet.

Specifically:

- Loaded the data from TinyDB
- Cleaned the tweets
 - Removed links
 - Removed hash
 - Removed mentions
- Computed polarity for each word via Polyglot
- For each tweet an average polarity was computed (ignoring words with polarity equal to zero)
- Tweets with an average polarity (i.e. sentiment score) smaller than zero were labeled as *negative*, with an average polarity equal to zero *neutral* and with an average polarity higher than zero *positive*

The results are summarized below:

![Stacked bar plot]({{ "/assets/images/sentiment-plot.svg" | absolute_url }})


## Keywords analysis

For each candidate, top 10 tfidf words (exclude stop words)

| GiorgiaMeloni     | PietroGrasso                 | berlusconi         | luigidimaio        | matteorenzi | matteosalvinimi   | 
|-------------------|------------------------------|--------------------|--------------------|-------------|-------------------| 
| italia            | storiedisangueamiciefantasmi | lintervista        | stelle             | avanti      | salvini           | 
| governo           | grazie                       | tgcom              | renzi              | lingotto    | lega              | 
| oggi              | vittime                      | italia             | governo            | trenopd     | italia            | 
| sindaco           | senato                       | elezionisicilia    | oggi               | lavoro      | stopinvasione     | 
| intervista        | maggio                       | musumecipresidente | diretta            | oggi        | italiani          | 
| amministrative    | anni                         | italiani           | italia             | italia      | primagliitaliani  | 
| italiasovrana     | oggi                         | stato              | sceglieteilfuturo  | assembleapd | andiamoagovernare | 
| renzi             | palermo                      | portaaporta        | movimento          | insieme     | dimartedi         | 
| italiani          | mafia                        | settegiorni        | rally              | scuolapd    | lintervista       | 
| roma              | ricordo                      | paese              | ospite             | futuro      | live              | 
| immigrati         | presto                       | confapi            | voto               | millegiorni | ottoemezzo        | 
| piazza            | esempio                      | governo            | sicilia            | portaaporta | amici             | 
| tempodipatrioti   | libera                       | europa             | tour               | europa      | governo           | 
| appelloaipatrioti | ucciso                       | stelle             | grazie             | grazie      | portaaporta       | 
| anni              | libreria                     | politica           | solo               | istat       | congressolega     | 
| diretta           | impegno                      | matrix             | paese              | perché      | anni              | 
| aspetto           | italia                       | programma          | prima              | finestra    | renzi             | 
| fratelli          | legge                        | anni               | grande             | scienza     | gabbiaopen        | 
| europa            | stato                        | tasse              | italiani           | euro        | casa              | 
| immigrazione      | liberieuguali                | chetempochefa      | legge              | politica    | pontida           | 
| sostenere         | piolatorre                   | molto              | sera               | democratica | video             | 
| seguitemi         | bellissimo                   | solo               | lotti              | andiamo     | agorarai          | 
| atreju            | voce                         | fatto              | renziconfessa      | cosa        | immigrati         | 
| candidatura       | auguri                       | lavoro             | rispettoperzuccaro | prima       | diretta           | 
| nazionale         | insieme                      | fiscale            | romeo              | tempo       | matrix            | 

Few observations in random order:

- Salvini is the only candidate to have his own name as a keyword;
- Many keywords in Grasso's vocabulary refer to Mafia (e.g., victims, Palermo, mafia, killed, etc.), which makes sense given that Grasso has been for many years Prosecutor at the Court of Palermo;

It's also interesting to note how the different candidates are all talking about their favourite subjects rather than interact on the same set of issues. For example the word *immigrati* (en: *immigrants*) appears in the vocabulary of both far-right candidates Matteo Salvini and Giorgia Meloni; yet, the word is absent from Matteo Renzi's vocabulary, signifying that an opposite narrative is not present. In other words: candidates do not seem to offer different points of views on the same problems, they seem to be all talking about their own issues.


## Clustering

Use word embedding to generate average vectors for each individual tweet. Add sentiment score. Cluster with k=2 (left/right) and k=3 (left/right/other). Reduce dimensionality to 2 to display results (each tweet a point; color of the point for the party; bakcground color for the cluster; if too complicated, the use colours for clusters and shape points for party or viceversa). 
