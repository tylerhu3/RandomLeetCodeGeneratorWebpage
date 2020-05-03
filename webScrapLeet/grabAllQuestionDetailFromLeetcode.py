import codecs
from urllib.request import urlopen, Request
#stuff to test below:
# from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
#https://stackoverflow.com/questions/45448994/wait-page-to-load-before-getting-data-with-requests-get-in-python-3
reg_url = "http://leetcode.com/problems/find-the-minimum-number-of-fibonacci-numbers-whose-sum-is-k/"

headers={
    "User-Agent": "Chrome/80.0.3987.163",
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',} 
req = Request(url=reg_url, headers=headers) 
html = urlopen(req).read() 

print(html)

# user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'
# print(containers)
# myUrl = "https://leetcode.com/problems/find-the-minimum-number-of-fibonacci-numbers-whose-sum-is-k/"
# hdr = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
#        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
#        'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
#        'Accept-Encoding': 'none',
#        'Accept-Language': 'en-US,en;q=0.8',
#        'Connection': 'keep-alive'}




# f = codecs.open("x.html", 'r')
# x0 = f.read()
# print(x0)

# page_soup = soup(x0, "html.parser")

# class Leet:
#     # class variable shared by all instances
#     def __init__(self, num, title, url, diff):
#         self.num = num
#         self.title = title
#         self.url = url
#         self.diff = diff


# containers = page_soup.findAll("tr") 

# filename = "LeetQuestions.txt" #name of file
# f = open(filename, "w") #open file and declare access type
# headers = "#, Title, Sub-URL, Difficulty \n" # the headers for each column

# f.write("[")

# for container in containers:
    # f.write("{")
    # x1 = container.findAll("td")
    #Please notice the "." gets the html tag and the brackets refer
    #to the element within the tag. Also to get the text within the
    #tags we do .text as the last parameter
    # problemNumber = "\"num\": \"" + x1[1].text + "\""
    # problemTitle = x1[2]["value"]
    # problemURL = "https://leetcode.com" + x1[2].a["href"]
    # problemDifficulty = "\"diff\": \"" + x1[5].span.text + "\""
    # f.write( problemNumber + ",\n" + prooblemTitle.replace(",", "|") + ",\n" + problemURL + ",\n" + problemDifficulty +  "\n")
    # print(problemURL)
    # f.write("},\n")
# f.write("]\n")

# f.close()
    