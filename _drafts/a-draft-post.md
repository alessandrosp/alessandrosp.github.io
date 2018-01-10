# Introduction

The following data comes from [termometropolitico.it](https://www.termometropolitico.it/sondaggi-politici-elettorali) and refer to the period of time 2017, Dec 18 - 2017, Dec 24. Only parties with 5%+ have been included.

| Party | Initials | % | Leader | Orientation
| ----------- | ----------- | ----------- | ----------- | -----------
| Movimento 5 Stelle | M5S | 27.7 | [Luigi di Maio](https://twitter.com/luigidimaio)* | Anti-establishment
| Partito Democratico | PD | 24.2 | [Matteo Renzi](https://twitter.com/matteorenzi) | Centre-left
| Forza Italia | FI | 15.7 | [Silvio Berlusconi](https://twitter.com/berlusconi)** | Centre-right
| Lega Nord | Lega | 13.7 | [Matteo Salvini](https://twitter.com/matteosalvinimi) | Far-right
| Libertà e Uguaglianza | LeU | 6.9 | [Pietro Grasso](https://twitter.com/PietroGrasso) | Far-left
| Fratelli d'Italia | FDI | 5.2 | [Giorgia Meloni](https://twitter.com/GiorgiaMeloni) | Far-right

*Many would argue that the *de facto* leader of the party is Beppe Grillo; as Luigi di Maio won the most recent primary elections, I decided to go with him.
**In the rest of the post I would refer as these politicians simply as *candidates*, even though Berlusconi may or may not be the actual prime minister candidate of his party.

# The analysis

## Data collection

- Use Twitter API to get all the tweets posted by candidates from January 1, 2017 to December 24, 2017 (extremes included). Retweets are ignored;
- The code for data collection is available [here](https://github.com/annoys-parrot/twitter-ita-politics-2017/blob/master/data-collection.py);
- For the duration of the analysis the tweets are stored in a local database to avoid re-querying the Twitter API multiple times;

## Descriptive analysis

For each candidate, a number of descriptive statistics were computed. The full code can be found here.

|                  | GiorgiaMeloni | PietroGrasso | berlusconi | luigidimaio | matteorenzi | matteosalvinimi | 
|------------------|---------------|--------------|------------|-------------|-------------|-----------------| 
| num_tweets       | 617           | 143          | 651        | 420         | 518         | 3188            | 
| average_length   | 149.84        | 147.16       | 171.84     | 128.77      | 126.75      | 127.00          | 
| average_hashes   | 1.84          | 1.03         | 1.03       | 0.63        | 1.23        | 1.28            | 
| average_mentions | 0.33          | 0.54         | 0.23       | 0.36        | 0.14        | 0.11            | 
| average_links    | 0.99          | 0.92         | 0.33       | 0.92        | 0.58        | 0.74            | 

Note: because of the way Twitter works, average_links refers to both external links and images.

## Sentiment analysis

I used the [Polyglot package](http://polyglot.readthedocs.io/en/latest/Sentiment.html) to compute some rough sentiment scores for each candidate's tweets. I chose Polyglot as it's one of the few packages to offer localization in Italian. Note that Polyglot only offer a polarity score (-1.0, 0.0 or +1.0) for words. Sentiment scores were computed by averaging the polarity score for each tweet.

Specifically:

- Loaded the data from TinyDB
- Cleaned the tweets
 - Removed links
 - Removed hashtags
 - Removed mentions
- Computed polarity for each word via Polyglot
- For each tweet an average polarity was computed (ignoring words with polarity equal to zero)
- Tweets with an average polarity (i.e. sentiment score) smaller than zero were labeled as *negative*, with an average polarity equal to zero *neutral* and with an average polarity higher than zero *positive*
- The code is available [here](https://github.com/annoys-parrot/twitter-ita-politics-2017/blob/master/sentiment-analysis.py)

The results are summarized below. Candidates are presented from far-left to far-right, with anti-establishment party M5S in the middle.

![Stacked bar plot]({{ "/assets/images/sentiment-plot.svg" | absolute_url }})

Right parties seem to have an higher percentage of negative tweets. While this could be the result of a precise communication strategy, it's also important to note that the government was left-wing in 2017 and thus it makes sense for right parties to be more critical about the overall economical and political landscape.

## Keywords analysis

For each candidate, a list of 25 keywords was computed by analysing their tweets and comparing them against the other five candidates.

Specifically:

- Loaded the data from TinyDB
- Cleaned the tweets
  - Removed links
  - Removed mentions
  - Removed special characters
  - Cast everything as lowercase
 - Created a single string containing for each candidate all of her or his tweets
 - Computed the tfidf matrix
 - Selected the top 25 words with highest tfidf score for each candidate

The results are summarized below. Candidates are presented from far-left to far-right, with anti-establishment party M5S in the middle.

| PietroGrasso                 | matteorenzi | luigidimaio        | berlusconi         | GiorgiaMeloni      | matteosalvinimi   | 
|------------------------------|-------------|--------------------|--------------------|--------------------|-------------------| 
| storiedisangueamiciefantasmi | avanti      | renzi              | lintervista        | italia             | salvini           | 
| grazie                       | lingotto    | governo            | elezionisicilia    | governo            | lega              | 
| vittime                      | trenopd     | oggi               | tgcom24            | oggi               | italia            | 
| senato                       | lavoro      | diretta            | italia             | amministrative2017 | stopinvasione     | 
| anni                         | oggi        | sceglieteilfuturo  | musumecipresidente | sindaco            | italiani          | 
| oggi                         | italia      | italia             | italiani           | intervista         | primagliitaliani  | 
| palermo                      | assembleapd | stelle             | stato              | italiasovrana      | andiamoagovernare | 
| mafia                        | insieme     | rally              | portaaporta        | renzi              | dimartedi         | 
| ricordo                      | scuolapd    | movimento          | settegiorni        | italiani           | lintervista       | 
| presto                       | futuro      | sindaci5stelle     | paese              | roma               | live              | 
| esempio                      | millegiorni | ospite             | confapi            | immigrati          | ottoemezzo        | 
| libera                       | portaaporta | voto               | governo            | piazza             | amici             | 
| ucciso                       | europa      | sicilia            | europa             | tempodipatrioti    | governo           | 
| libreria                     | grazie      | tour               | politica           | appelloaipatrioti  | portaaporta       | 
| impegno                      | istat       | grazie             | matrix             | diretta            | congressolega     | 
| italia                       | perché       | solo               | programma          | anni               | anni              | 
| legge                        | finestra    | paese              | anni               | aspetto            | renzi             | 
| stato                        | scienza     | prima              | tasse              | fratelli           | gabbiaopen        | 
| 9maggio                      | politica    | grande             | chetempochefa      | europa             | casa              | 
| liberieuguali                | democratica | italiani           | molto              | immigrazione       | video             | 
| piolatorre                   | andiamo     | legge              | solo               | sostenere          | agorarai          | 
| bellissimo                   | cosa        | sera               | fatto              | seguitemi          | immigrati         | 
| voce                         | prima       | lotti              | lavoro             | atreju17           | diretta           | 
| auguri                       | tempo       | renziconfessa      | fiscale            | candidatura        | matrix            | 
| insieme                      | leopolda    | rispettoperzuccaro | oggi               | nazionale          | facciamosquadra   | 


Few observations in random order:

- Many keywords in Grasso's vocabulary refer to Mafia (e.g., victims, 9may, Palermo, mafia, killed, etc.), which makes sense given that Grasso has been for many years Prosecutor at the Court of Palermo;
- Luigi Di Maio, Giorgia Meloni and Matteo Salvini all have *renzi* in their vocabulary (referring to Matteo Renzi, leader of PD). Interestingly, Berlusconi doesn't;
- Unsurprisingly, the two far-right parties all have many immigration-related keywords (e.g., immigrants, immigration, stoptheinvasion, italiansfirst, etc.);
- Salvini is the only candidate to have his own name as a keyword. This may be simply the result of him having named his "sub-party" Noi Con Salvini (en: Us With Salvini);

It's also interesting to note how candidates do not seem to be communicating about the same issues from different points of view (e.g., immigration is good vs. immigration is bad) as much as talking about what they consider the most important problems for the country. In other words, nobody seems to be offering an opposite narrative to other candidates'.
