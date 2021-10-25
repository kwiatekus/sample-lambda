import requests
def main(event, context):
    r = requests.get('https://swapi.dev/api/people/15')
    return r.json()
