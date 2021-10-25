import requests
def main(event, context):
    r = requests.get('https://swapi.dev/api/people/11')
    return r.json()
