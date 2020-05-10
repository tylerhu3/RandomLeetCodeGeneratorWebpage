import codecs
from bs4 import BeautifulSoup as soup
from bs4 import BeautifulSoup
from urllib.request import urlopen, Request
from selenium import webdriver
import os.path
import io
from pathlib import Path

#options to help grab the description, this is needed
#because we need visit each websites description and 
#the website generates the description by js which is
#why we need selenium and webdriver.

options = webdriver.ChromeOptions()
options.add_argument('headless')
driver = webdriver.Chrome(options=options)

#function that will return our description
def get_description(name, url):
    #connect to url
    driver.get(url)
    #all all the code into here
    html = driver.page_source
    #have bs4 put everything in a neat package
    soup = BeautifulSoup(html, 'lxml')
    #find all class where the class name is "content__u3I1 question-content__JfgR"
    
    description = soup.findAll("div", {"class": "content__u3I1 question-content__JfgR"})
    if description == None or len(description) == 0:
        f = open(name + "premium", "w") #open file and declare access type
        f.close()   
        return
    output = str(description[0])
    save_path = './description/'
    name = os.path.join(save_path,name)   
    f = io.open(name, "w",encoding="utf-8") #open file and declare access type
    f.write(output)
    f.close()
    print(name + "was made successfully")

f = codecs.open("x.html", 'r')
#x0 should be all the html data

x0 = f.read()
page_soup = BeautifulSoup(x0, "html.parser")

filename = "premiumQ.json" #name of file
f = open(filename, "w") #open file and declare access type
#Find all tr in the html code
containers = page_soup.findAll("tr") 
f.write("[")

for container in containers: # iterate over all <tr> found
    
    x1 = container.findAll("td") #find all <td> elements from container
    
    my_file = Path("./description/"+ x1[1].text)
    if not my_file.is_file():

        # print(x1[1].text)
        f.write(x1[1].text+", ")
        # get_description(x1[1].text, "https://leetcode.com" + x1[2].a["href"])
    # if count > 6:
    #     #get description and put in file    
    #     get_description(x1[1].text, "https://leetcode.com" + x1[2].a["href"])


    # count +=1
f.write("]\n")

f.close()
    