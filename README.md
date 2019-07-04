[![Build Status](https://travis-ci.com/ulissesferreira/backend-engineering-challenge.svg?branch=master)](https://travis-ci.com/ulissesferreira/backend-engineering-challenge)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9ffbc70924304c5ca44ce1f1a41f96cf)](https://www.codacy.com/app/ulissesferreira/backend-engineering-challenge?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ulissesferreira/backend-engineering-challenge&amp;utm_campaign=Badge_Grade)

# Solved - Information

Welcome to my take on this problem. Here is a couple of guidelines on how to run the project.

## Installing

To run this application you will need Node.js for the core code and Python for the tests. After having those tools installed, I recommend you install Yarn. You don't need Yarn to run the project but you will have to replace the yarn commands with the npm equivalent ones.

```console
git clone https://github.com/ulissesferreira/backend-engineering-challenge.git
cd backend-engineering-challenge
```

## 🏃‍ Running

Here is how you run the project. If you want to change environment variables or run node with specific arguments you can peek inside package.json and replace the start script as you please.

```console
yarn start
```

or 

```console
npm run start
```

Direct Node command (you can change parameters here)

```console
node src/index.js --input_file events.json --window_size 10
```

## 🚦 Testing

```console
yarn test
```

or 

```console
npm run test
```

Direct python command

```console
python tests/index.test.py
```

# Backend Engineering Challenge


Welcome to our Engineering Challenge repository 🖖

If you found this repository it probably means that you are participating in our recruitment process. Thank you for your time and energy. If that's not the case please take a look at our [openings](https://unbabel.com/careers/) and apply!

Please fork this repo before you start working on the challenge, read it careful and take your time and think about the solution. Also, please fork this repository because we will evaluate the code on the fork.

This is an opportunity for us both to work together and get to know each other in a more technical way. If have some doubt please open and issue and we'll reach out to help.

Good luck!

## Challenge Scenario

At Unbabel we deal with a lot of translation data. One of the metrics we use for our clients' SLAs is the delivery time of a translation. 

In the context of this problem, and to keep things simple, our translation flow is going to be modeled as only one event.

### *translation_delivered*

Example:

```json
{
	"timestamp": "2018-12-26 18:12:19.903159",
	"translation_id": "5aa5b2f39f7254a75aa4",
	"source_language": "en",
	"target_language": "fr",
	"client_name": "easyjet",
	"event_name": "translation_delivered",
	"duration": 20,
	"nr_words": 100
}
```

## Challenge Objective

Your mission is to build a simple command line application that parses a stream of events and produces an aggregated output. In this case, we're interested in calculating, for every minute, a moving average of the translation delivery time for the last X minutes.

If we want to count, for each minute, the moving average delivery time of all translations for the past 10 minutes we would call your application like (feel free to name it anything you like!).

	unbabel_cli --input_file events.json --window_size 10
	
The input file format would be something like:

	{"timestamp": "2018-12-26 18:11:08.509654","translation_id": "5aa5b2f39f7254a75aa5","source_language": "en","target_language": "fr","client_name": "easyjet","event_name": "translation_delivered","nr_words": 30, "duration": 20}
	{"timestamp": "2018-12-26 18:15:19.903159","translation_id": "5aa5b2f39f7254a75aa4","source_language": "en","target_language": "fr","client_name": "easyjet","event_name": "translation_delivered","nr_words": 30, "duration": 31}
	{"timestamp": "2018-12-26 18:23:19.903159","translation_id": "5aa5b2f39f7254a75bb33","source_language": "en","target_language": "fr","client_name": "booking","event_name": "translation_delivered","nr_words": 100, "duration": 54}


The output file would be something in the following format.

```
{"date": "2018-12-26 18:11:00", "average_delivery_time": 0}
{"date": "2018-12-26 18:12:00", "average_delivery_time": 20}
{"date": "2018-12-26 18:13:00", "average_delivery_time": 20}
{"date": "2018-12-26 18:14:00", "average_delivery_time": 20}
{"date": "2018-12-26 18:15:00", "average_delivery_time": 20}
{"date": "2018-12-26 18:16:00", "average_delivery_time": 25.5}
{"date": "2018-12-26 18:17:00", "average_delivery_time": 25.5}
{"date": "2018-12-26 18:18:00", "average_delivery_time": 25.5}
{"date": "2018-12-26 18:19:00", "average_delivery_time": 25.5}
{"date": "2018-12-26 18:20:00", "average_delivery_time": 25.5}
{"date": "2018-12-26 18:21:00", "average_delivery_time": 25.5}
{"date": "2018-12-26 18:22:00", "average_delivery_time": 31}
{"date": "2018-12-26 18:23:00", "average_delivery_time": 31}
{"date": "2018-12-26 18:24:00", "average_delivery_time": 42.5}
```

#### Notes

Before jumping right into implementation we advise you to think about the solution first. We will evaluate, not only if your solution works but also the following aspects:

+ Simple and easy to read code. Remember that [simple is not easy](https://www.infoq.com/presentations/Simple-Made-Easy)
+ Include a README.md that briefly describes how to build and run your code
+ Be consistent in your code. 

Feel free to, in your solution, include some your considerations while doing this challenge. We want you to solve this challenge in the language you feel most confortable with. Our machines run Python, Ruby, Scala, Java, Clojure, Elixir and Nodejs. If you are thinking of using any other programming language please reach out to us first 🙏.

Also if you have any problem please **open an issue**. 

Good luck and may the force be with you

#### Extra points

If you feeling creative feel free to consider any additional cases you might find interesting. Remember this is a bonus, focus on delivering the solution first.

