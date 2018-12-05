Neighborhood map
---
Neighborhood map is a udacity nanaodegree project, it is main function is to build
similar to Google map application, where the user could type in what he want to
search for, and then the result will be shown in the map, multiple locations for 
the same keyword search might appear

It uses both foursquare and Leaflet to get and display information on the page

How to use
---
- Download this Repository by clicking on the Download button, or by using got clone command
- This repoistory uses foursquare api to get information, so you will need to register
at foursquare (Free with limited Quota), and then have your client-id and client-secret stored
in the foursquare_data.js file
- go to the folder that has this project and then douple click on 'index.html' file
- on the Text box at the top-left side, type what are you looking for within this area
- click Filter button to apply filtering and for the result to appear in the map
- from the list, you can click on the location that are intereseted in, so that more
information is revealed to you.
- Note that this repository uses foursquare to get location information, including
images, if your Quota has exceeded or somehow you lost connectivity with foursquare 
server, you will recieve an Error message.

ToDo
---
- Add additional links to markers
- Add more venues to foursquare
- Animate the marker to bounce when it is clicked
- Add The ability to read Data from sql database


LICENSE
--------
Neighborhood map  is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Neighborhood map is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with ud_loganalysis.  If not, see <http://www.gnu.org/licenses/>.





credits:
Thanks to sherminn.chong for his documentation about animating leaflet Markers
http://piratefsh.github.io/how-to/2015/10/16/animating-leaflet-markers.html
