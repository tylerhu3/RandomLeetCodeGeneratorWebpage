from urllib.request import urlopen, Request
from bs4 import BeautifulSoup as soup
import unicodedata
import io
# https://stackoverflow.com/questions/45448994/wait-page-to-load-before-getting-data-with-requests-get-in-python-3
# For the below to work we need chromium driver from : https://sites.google.com/a/chromium.org/chromedriver/downloads
# download that and put chromedriver.exe into 
# ...\Python\Python38-32\Scripts


from bs4 import BeautifulSoup
from selenium import webdriver

#options and headless are something we found online to 
#help grab the data
options = webdriver.ChromeOptions()
options.add_argument('headless')
driver = webdriver.Chrome(options=options)

def get_description(url):
    driver.get(url)
    
    #all all the code into here
    html = driver.page_source

    #have bs4 put everything in a neat package
    soup = BeautifulSoup(html, 'lxml')

    #find all class where the class name is "content__u3I1 question-content__JfgR"
    description = soup.findAll("div", {"class": "content__u3I1 question-content__JfgR"})
    
    print(str(description[0]))
    return str(description[0])

url = "https://leetcode.com/problems/reverse-integer"

returnedDiv = get_description(url)

filename = "LeetQuestionsTester.json" #name of file
f = io.open(filename, "w",encoding="utf-8") #open file and declare access type



# f.write("[")
# f.write("{")
# returnedDiv = "\"param0\": \"" + returnedDiv + "\""
f.write(returnedDiv)
# f.write("},\n")
# f.write("]\n")



f.close()