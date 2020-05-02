import codecs
from bs4 import BeautifulSoup as soup

f = codecs.open("x.html", 'r')
x0 = f.read()
# print(x0)

page_soup = soup(x0, "html.parser")

# we need to grab the list of video cards
# this was found how to do by going to the page 
# on chrome and then using the "inspect" ability, 
# figure out the individual search results is in a div
# with the class name item-container
# use class below, we can also use id if we wanted to

containers = page_soup.findAll("tr") 

filename = "LeetQuestions.txt" #name of file
f = open(filename, "w") #open file and declare access type
headers = "#, Title, Sub-URL, Difficulty \n" # the headers for each column

f.write("[")

for container in containers:
    f.write("{")
    x1 = container.findAll("td")
    #Please notice the "." gets the html tag and the brackets refer
    #to the element within the tag. Also to get the text within the
    #tags we do .text as the last parameter
    problemNumber = "\"num\": \"" + x1[1].text + "\""
    prooblemTitle = "\"title\": \"" + x1[2]["value"] + "\""
    problemURL = "\"url\": \" " + "https://leetcode.com" + x1[2].a["href"] + "\""
    problemDifficulty = "\"diff\": \"" + x1[5].span.text + "\""
    f.write( problemNumber + ",\n" + prooblemTitle.replace(",", "|") + ",\n" + problemURL + ",\n" + problemDifficulty +  "\n")

    f.write("},\n")
f.write("]\n")

f.close()
    