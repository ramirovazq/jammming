const clientId = '15a3516edcf340f79e9c0f0dec942ce7';
//const redirectURI = 'http://ramiroquai.surge.sh';
const redirectURI = 'http://localhost:3000/';
let accessToken = null;



const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return new Promise(
        resolve => resolve(accessToken)
      );
    }else {

      const accessTokenCheck = window.location.href.match(/access_token=([^&]*)/);
      const expiresInCheck = window.location.href.match(/expires_in=([^&]*)/);

      if (accessTokenCheck && expiresInCheck) {
        accessToken = accessTokenCheck[1];
        const expiresIn = expiresInCheck[1];
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
      } else {
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      }

      return new Promise(
        resolve => resolve(accessToken)
      );

    }//else
  },



  search(term) {

    return Spotify.getAccessToken().then(() => {

      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
        { headers: { Authorization: `Bearer ${accessToken}` }
         }).then(
            response => response.json()
          ).then(
            jsonResponse => {

          if (jsonResponse.tracks) {

            return jsonResponse.tracks.items && jsonResponse.tracks.items.map(track => {

              return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                preview: track.preview_url
              };

            });

          }//if

          return [];


        }
      );//then

    });

  },//search

  savePlaylist(playlistname, trackURIs){
    if(playlistname && trackURIs){
        return Spotify.getAccessToken().then( () => {

            // genera UsersID
            let respuesta_usersID = fetch(`https://api.spotify.com/v1/me`, 
                { headers: { Authorization: `Bearer ${accessToken}` }
                }).then(response => {
                    if(response.ok){
                        return response.json();
                      }
                    throw new Error('Peticion fallida');
                  }).then(
                    jsonResponse => {
                        return (jsonResponse.id);
                    }
                 );//then


            // genera el Playlist
            respuesta_usersID.then(user_id => {
    
                console.log("set tiene el usersID");
                console.log(user_id);

                fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`,                         
                        { 
                            method: 'POST',
                            headers: {Authorization:`Bearer ${accessToken}`, 'Content-Type': 'application/json'},                               
                            body: JSON.stringify({
                                'name': playlistname,
                              //  'tracks': trackURIs
                            })//stringify
                        }).then(response => {
                            if(response.ok){
                                return response.json();
                            }
                            throw new Error('Requested failed!');
                        }).then( jsonResponse => {
                            // code success         

                            let playlistID = jsonResponse.id;
                            // FETCH add playlist  INICIO
                                fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlistID}/tracks`,                         
                                { 
                                    method: 'POST',
                                    headers: {Authorization:`Bearer ${accessToken}`, 'Content-Type': 'application/json'},                               
                                    body: JSON.stringify({
                                      //  'name': playlistname,
                                        'uris': trackURIs
                                    })//stringify
                                }).then(response => {
                                    if(response.ok){
                                        return response.json();
                                    }
                                    throw new Error('Requested failed!');
                                }).then(jsonResponse => {console.log(jsonResponse);});
                              
                            // FETCH add playlist  END  


                         });
            });
            

           




        });
    }
    return "";

  }//savePlaylist

};



export default Spotify;
