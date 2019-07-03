# Backend Engineering Challenge - Solution

🤓 Geek time. A simple explanation on my approach to this problem. Keep in mind this could be solved in a number of different ways and there could be better solutions for specific contexts. This logic attempts to solve this problem for **most** situations that involve big data and an enormous input file (which I believe makes sense at Unbabel).

## Logic

Basically, given a set events with a timestamp and a duration we want to calculate a moving average with a window specified by the user. In other words, we want to go from the smallest recorded time (rounded to 0s in the seconds) to the largest recorded time (rounded to the next minute), for each value subtract a window time and calculate the average duration of all the timestamps in that group. Graphical explanation:

**Data:**

2018-12-26 18:11:08.509654
2018-12-26 18:15:19.903159
2018-12-26 18:23:19.903159

**Smallest value:** 
2018-12-26 18:11:00 (18:11:08 rounded down)

**Highest value:** 
2018-12-26 18:24:00 (18:23:19 rounded up) 
 
**Calculate moving averages:** (removed unnecessary time for a clearer outlook) 
 
18:01 - 18:11 All the events inside this time interval
18:02 - 18:12 (...)

## OK, fair enough, what's the challenge?

The problem here is not the calculation of moving averages, that is a relatively easy arithmetic operation. The problem here is how you approach your data fetching. The simplest approach, but also not really scalable, involves reading the input file multiple times everytime you need to fetch data. And this works fairly well with small files. However, this approach is problematic if we are using huge files (above GB size). The first bytes of information will be read throughout the whole process and not really needed (imagine a file with an hour of logs we keep on parsing the first 2 minutes repeatedly to access the other ones...).

So how do we do this? Parse the whole file into memory? 

Also a fairly straightforward solution if it wasn't for our RAM limit. We can't load 100GB of data to RAM on most systems (or atleast it is not desirable).

## A more scalable approach

We can solve this problem reading each line of the file only once and keeping a simple cache in memory. Basically, everytime we read a line, we want to output all the moving averages we need to calculate up until that instance. If we read a line with the following timestamp:

2018-12-26 18:15:19.903159

We are gonna output all the moving averages from where we started up until 18:15:00. This way, when we read the next line we already have all the previous work done. Instead of using our 1 minute incremental times as a step, **we consider each line read as a step** and wrapping the rest of the code around that.

But how do we access previous line's data? We keep a cache with timestamps and their event duration. Everytime we finish parsing one interval we can clear from that cache all the values that are already outside of our window since we won't need them anymore.