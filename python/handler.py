import requests
def main(event, context):
    r = requests.get('https://swapi.dev/api/people/14')
    return r.json()