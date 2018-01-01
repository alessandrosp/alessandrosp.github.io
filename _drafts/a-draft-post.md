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

    image goes here


## Keywords

For each candidate, top 10 tfidf words (exclude stop words)

## Clustering

Use word embedding to generate average vectors for each individual tweet. Add sentiment score. Cluster with k=2 (left/right) and k=3 (left/right/other). Reduce dimensionality to 2 to display results (each tweet a point; color of the point for the party; bakcground color for the cluster; if too complicated, the use colours for clusters and shape points for party or viceversa). 
