import requests
def main(event, context):
    r = requests.get('https://swapi.dev/api/people/10')
    return r.json()
