# import requests
# import json

# f= open("pokeImg.json","w+")
# for num in range(1,152):
#     URL = f'https://pokeapi.co/api/v2/pokemon/{num}'
#     print(num)
#     # sending get request and saving the response as response object 
#     r = requests.get(url = URL) 
    
#     # extracting data in json format 
#     data = r.json()
#     print(data['sprites']['front_default'])
#     x = data['sprites']['front_default']
#     y = data['sprites']['back_default']
#     f.write('(\n"id": "{}",\n"front": "{}",\n"back": "{}"\n),\n'.format(num, x, y))
# f.close()