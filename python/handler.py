import requests
def main(event, context):
    r = requests.get('https://swapi.dev/api/people/13')
    return r.json()