import json
import re

# Takes a list of json objects and returns
# a dict containing lists with the top 5 items
# in each category
def top_five(items: list) -> dict:
  #Sort list by price
  sortedItems = sorted(items, reverse=True, key=lambda a: a['price'])
  cds = []
  dvds = []
  books = []
  i = 0

  # Iterated through sorted list and only add if the list is not full
  # does not return more than 5 items even if there are more matching
  # items. Can discuss secondary criteria for adding to list if necessary
  for item in sortedItems:
    if len(cds) >= 5 and len(dvds) >= 5 and len(books) >= 5:
      break
    else:
      match item.get('type'):
        case 'cd':
          if len(cds) < 5:
            cds.append(item)
        case 'dvd':
          if len(dvds) < 5:
            dvds.append(item)
        case 'book':
          if len(books) < 5:
            books.append(item)
 
  #return dict containing list of most expensive inventory
  return {
    "cds": cds,
    "dvds": dvds,
    "books": books
  }

## Takes a list of dictionaries as a parameter
## returns a dictionary contiaining all of the cds
## with a running time greater than 60 minutes
def running_time(items: list) -> list:
  payload = []
  for item in items:
    if item.get('type') == 'cd':
      total = 0
      #add the running time of each track
      for track in item.get('tracks'):
        total = total + track.get('seconds')
      #if total is greater than 60 minutes add to payload
      if total/60 > 60:
        payload.append(item)
      total = 0
  
  return payload

## Takes a list of dictionaries as a parameter
## returns a list containing all authors who
## have published a book and a cd
def double_threat(items: list) -> list:
  double_threats = []
  talent = {}
  #Iterate through list and store book and cd publishes in talent dict
  for item in items:
    author = item.get('author')
    authorObject = talent.get(author, {})
    if item.get('type') == 'book':
      authorObject['book'] = True
      talent.update({author:authorObject})
    elif item.get('type') == 'cd':
      authorObject['cd'] = True
      talent.update({author:authorObject})

  # Iterate through talent dict and if author has
  # published a book and a cd then add to the double threats list
  for author in talent:
    if talent[author].get('book') and talent[author].get('cd'):
      double_threats.append(author)
  return double_threats

def year(items: list) -> list:
  years = []
  # regex will match 1-9999 in string this will account 
  # for history and scifi books with old or future dates
  # This could be easily modified per business requirements  
  for item in items:
    if bool(re.match(r"^[1-9][0-9]{0,3}(?![0-9])", item.get('title'))):
      years.append(item)
      continue

    match item.get('type'):
      case 'book':
        for chapter in item.get('chapters'):
          if bool(re.match(r"^[1-9][0-9]{0,3}(?![0-9])",chapter)):
            years.append(item)
            continue
      case 'cd':
        for track in item.get('tracks'):
          if bool(re.match(r"^[1-9][0-9]{0,3}(?![0-9])", track.get('name'))):
            years.append(item)
            continue
  return years

with open('inventory.json', 'r') as file:
  inventory = json.load(file)

years = year(inventory)
top_inventory = top_five(inventory)
long_running = running_time(inventory)
talent = double_threat(inventory)







