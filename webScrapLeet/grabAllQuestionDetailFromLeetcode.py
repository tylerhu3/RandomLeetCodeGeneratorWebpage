import codecs
from urllib.request import urlopen, Request
#stuff to test below:
# from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
#https://stackoverflow.com/questions/45448994/wait-page-to-load-before-getting-data-with-requests-get-in-python-3
"""
For the below to work we need chromium driver from : https://sites.google.com/a/chromium.org/chromedriver/downloads
download that and put chromedriver.exe into 
...\Python\Python38-32\Scripts
"""

from bs4 import BeautifulSoup
from selenium import webdriver

# import selenium as se

options = webdriver.ChromeOptions()
options.add_argument('headless')

driver = webdriver.Chrome(options=options)

url = "https://leetcode.com/problems/longest-palindromic-substring"
# browser = driver
driver.get(url)
html = driver.page_source
soup = BeautifulSoup(html, 'lxml')
a = soup.findAll("div", {"class": "content__u3I1 question-content__JfgR"})
print(a)