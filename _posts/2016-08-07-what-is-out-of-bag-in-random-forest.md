---
layout: post
title: What is out-of-bag (OOB) in Random Forest?
date:   2016-08-07 06:14:00 +0000
tags: [python, machine learning, sklearn]
---
As models are often trained on limited amount of data, one has always to wonder how well a model will generalise, that is how well it will perform on data it has not been trained on. One of the procedures normally used for this estimation is called [cross-validation](https://en.wikipedia.org/wiki/Cross-validation_(statistics)). The idea is pretty simple: we split the training set into two random subsets; the first subset becomes our new training set while the second set is used for testing purposes. Training the model on some data while assessing its performance on some other data gives us a rough estimate on how well the model will perform on new data.

The main drawback of cross validation is that you need to split your training set into two subsets, thus losing precious data for your model to train on. If you have a million data points that is not too bad, but if you are operating on a limited amount of data losing 20, 35 or 50% of your training set may actually be a problem. Good news is, if your models is a Random Forest, you don't need to. In fact, a different estimate can be used for the purpose and its name is **out-of-bag (or simply OOB) error**. [Manoj Awasthi](http://stackoverflow.com/users/83602/manoj-awasthi) provided a great explanation of the idea [on Stack Overflow](http://stackoverflow.com/questions/18541923/what-is-out-of-bag-error-in-random-forests).

> I will take an attempt to explain:

> Suppose our training data set is represented by T and suppose data set has M features (or attributes or variables).

    T = {(X1,y1), (X2,y2), ... (Xn, yn)}

> and

    Xi is input vector {xi1, xi2, ... xiM}

    yi is the label (or output or class). 
> summary of RF:

> Random Forests algorithm is a classifier based on primarily two methods -

> - Bagging
> - Random subspace method.

> Suppose we decide to have `S` number of trees in our forest then we first create `S` datasets of `"same size as original"` created from random resampling of data in T with-replacement (n times for each dataset). This will result in `{T1, T2, ... TS}` datasets. Each of these is called a bootstrap dataset. Due to "with-replacement" every dataset Ti can have duplicate data records and Ti can be missing several data records from original datasets. This is called [Bootstrapping](en.wikipedia.org/wiki/Bootstrapping_(statistics)).

> Bagging is the process of taking bootstraps & then aggregating the models learned on each bootstrap.

> Now, RF creates S trees and uses `m (=sqrt(M) or =floor(lnM+1))` random subfeatures out of M possible features to create any tree. This is called random subspace method.

> So for each `Ti` bootstrap dataset you create a tree `Ki`. If you want to classify some input data `D = {x1, x2, ..., xM}` you let it pass through each tree and produce S outputs (one for each tree) which can be denoted by `Y = {y1, y2, ..., ys}`. Final prediction is a majority vote on this set.

> Out-of-bag error:

> After creating the classifiers (`S` trees), for each `(Xi,yi)` in the original training set i.e. `T`, select all Tk which does not include `(Xi,yi)`. This subset, pay attention, is a set of boostrap datasets which does not contain a particular record from the original dataset. This set is called out-of-bag examples. There are n such subsets (one for each data record in original dataset T). OOB classifier is the aggregation of votes ONLY over Tk such that it does not contain `(xi,yi)`.

> Out-of-bag estimate for the generalization error is the error rate of the out-of-bag classifier on the training set (compare it with known `yi`'s).

> Why is it important? The study of error estimates for bagged classifiers in Breiman (1996b), gives empirical evidence to show that the out-of-bag estimate is as accurate as using a test set of the same size as the training set. Therefore, using the out-of-bag error estimate removes the need for a set aside test set.