import sys
import urllib.request as urlr
import re

#get the first argument
try:
	i = sys.argv[1]
	#i = 'https://www.google.com/'
except:
	print("No argument")

#open the URL
html = urlr.urlopen(i)

#get the html code of the URL
data = html.read().decode("utf-8","ignore")

#r'...' is a raw string.
urls = re.findall(r'href=[\'"]?([^\'" >]+)', data)
metas = re.findall(r'<meta ?([^>]+)', data)
htmlAll = re.findall(r'.*', data)
title = re.findall(r'<title>(.*?)</title>', data)

print(urls)
print(metas)
print(htmlAll)
print(title)
