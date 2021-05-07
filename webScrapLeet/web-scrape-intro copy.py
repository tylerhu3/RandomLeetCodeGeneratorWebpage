import bs4
from urllib2 import urlopen as uReq 
from bs4 import BeautifulSoup as soup 

print("web scrap")

my_url = 'https://www.newegg.com/Video-Cards-Video-Devices/Category/ID-38?Tpk=video%20cards'

uClient = uReq(my_url) #opening connection
page_html = uClient.read() #grabbing page
uClient.close() #close connection

page_soup = soup(page_html, "html.parser") #grabs entire html file into memory location

# we need to grab the list of video cards
# this was found how to do by going to the page 
# on chrome and then using the "inspect" ability, 
# figure out the individual search results is in a div
# with the class name item-container
# use class below, we can also use id if we wanted to

containers = page_soup.findAll("div", {"class", "item-container"}) 


#putting it into a csv file
filename = "graphics_card.csv" #name of file
f = open(filename, "w") #open file and declare access type
headers = "brand, product_name, shippping \n" # the headers for each column

f.write(headers)

for container in containers:
     # {"class", "item-info"} would give the same effect as "item-info"
    temp_div = container.find("div",  {"class", "item-info"})
    brand = temp_div.div.a.img["title"]
    temp_a = container.find("a", {"class", "item-title"}) # find all a tags with class item-title
    title = temp_a.text
    shipping = container.find("li", {"class":"price-ship"}).text.strip()
    print("brand" + brand);
    print("title" + title);
    print("shipping" + shipping + "\n");
    f.write(brand + "," + title.replace(",", "|") + "," + shipping + '\n');
f.close() #if you dont close this, excel can't access it. 