import printCards from "../dashboard/printCards";
import axios from 'axios';

var lat = 0;
var long = 0;

  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
  });
export default async function findRest(type)
{   
  return printCards( await axios.request({
        method: 'get',
        url: `https://developers.zomato.com/api/v2.1/search?q=${type}&count=10&lat=${lat}&lon=${long}`,
        headers: {
          'Content-Type': 'application/json',
          'user-key': '5648771064d1fb9bf22a7edf5a083ff7'
        }
      }));
      

}

export async function findFavorites(data)
{
    var postData = 
    []

    for(var i = 0; data.data[i]; i++)
    { 
      postData[i] = await axios.request({
        method: 'get',
        url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${data.data[i]}`,
        headers: {
          'Content-Type': 'application/json',
          'user-key': '5648771064d1fb9bf22a7edf5a083ff7'
        }
      });
    }
    return postData;


    
}
