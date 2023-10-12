import requests
from credentials import CLIENT_ID, CLIENT_SECRET # Change in the credentials.py file

if __name__ == "__main__":
    url = "https://accounts.spotify.com/api/token"
    
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    }

    response = requests.post(url, headers=headers, data=data)

    # Saves the Access Token in a json file
    if response.status_code == 200:
        with open("spotify_token_response.json", "w") as file:
            file.write(response.text)
    else:
        print("Request failed with status code:", response.status_code)
        print("Response content:")
        print(response.text)  # Print the response content in case of an error