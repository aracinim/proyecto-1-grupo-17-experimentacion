/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 136.0, "minX": 0.0, "maxY": 1083.0, "series": [{"data": [[0.0, 136.0], [0.1, 137.0], [0.2, 137.0], [0.3, 138.0], [0.4, 138.0], [0.5, 138.0], [0.6, 139.0], [0.7, 139.0], [0.8, 139.0], [0.9, 139.0], [1.0, 139.0], [1.1, 139.0], [1.2, 139.0], [1.3, 139.0], [1.4, 139.0], [1.5, 139.0], [1.6, 140.0], [1.7, 140.0], [1.8, 140.0], [1.9, 140.0], [2.0, 140.0], [2.1, 140.0], [2.2, 140.0], [2.3, 140.0], [2.4, 140.0], [2.5, 140.0], [2.6, 140.0], [2.7, 140.0], [2.8, 140.0], [2.9, 140.0], [3.0, 140.0], [3.1, 140.0], [3.2, 140.0], [3.3, 140.0], [3.4, 140.0], [3.5, 140.0], [3.6, 140.0], [3.7, 141.0], [3.8, 141.0], [3.9, 141.0], [4.0, 141.0], [4.1, 141.0], [4.2, 141.0], [4.3, 141.0], [4.4, 141.0], [4.5, 141.0], [4.6, 141.0], [4.7, 141.0], [4.8, 141.0], [4.9, 141.0], [5.0, 141.0], [5.1, 141.0], [5.2, 141.0], [5.3, 141.0], [5.4, 141.0], [5.5, 141.0], [5.6, 141.0], [5.7, 141.0], [5.8, 141.0], [5.9, 141.0], [6.0, 141.0], [6.1, 141.0], [6.2, 141.0], [6.3, 141.0], [6.4, 141.0], [6.5, 142.0], [6.6, 142.0], [6.7, 142.0], [6.8, 142.0], [6.9, 142.0], [7.0, 142.0], [7.1, 142.0], [7.2, 142.0], [7.3, 142.0], [7.4, 142.0], [7.5, 142.0], [7.6, 142.0], [7.7, 142.0], [7.8, 142.0], [7.9, 142.0], [8.0, 142.0], [8.1, 142.0], [8.2, 142.0], [8.3, 142.0], [8.4, 142.0], [8.5, 142.0], [8.6, 142.0], [8.7, 142.0], [8.8, 142.0], [8.9, 142.0], [9.0, 142.0], [9.1, 142.0], [9.2, 142.0], [9.3, 142.0], [9.4, 142.0], [9.5, 143.0], [9.6, 143.0], [9.7, 143.0], [9.8, 143.0], [9.9, 143.0], [10.0, 143.0], [10.1, 143.0], [10.2, 143.0], [10.3, 143.0], [10.4, 143.0], [10.5, 143.0], [10.6, 143.0], [10.7, 143.0], [10.8, 143.0], [10.9, 143.0], [11.0, 143.0], [11.1, 143.0], [11.2, 143.0], [11.3, 143.0], [11.4, 143.0], [11.5, 143.0], [11.6, 143.0], [11.7, 143.0], [11.8, 143.0], [11.9, 143.0], [12.0, 143.0], [12.1, 143.0], [12.2, 143.0], [12.3, 144.0], [12.4, 144.0], [12.5, 144.0], [12.6, 144.0], [12.7, 144.0], [12.8, 144.0], [12.9, 144.0], [13.0, 144.0], [13.1, 144.0], [13.2, 144.0], [13.3, 144.0], [13.4, 144.0], [13.5, 144.0], [13.6, 144.0], [13.7, 144.0], [13.8, 144.0], [13.9, 144.0], [14.0, 144.0], [14.1, 144.0], [14.2, 144.0], [14.3, 144.0], [14.4, 144.0], [14.5, 144.0], [14.6, 144.0], [14.7, 144.0], [14.8, 144.0], [14.9, 144.0], [15.0, 144.0], [15.1, 144.0], [15.2, 145.0], [15.3, 145.0], [15.4, 145.0], [15.5, 145.0], [15.6, 145.0], [15.7, 145.0], [15.8, 145.0], [15.9, 145.0], [16.0, 145.0], [16.1, 145.0], [16.2, 145.0], [16.3, 145.0], [16.4, 145.0], [16.5, 145.0], [16.6, 145.0], [16.7, 145.0], [16.8, 145.0], [16.9, 145.0], [17.0, 145.0], [17.1, 145.0], [17.2, 145.0], [17.3, 145.0], [17.4, 145.0], [17.5, 145.0], [17.6, 146.0], [17.7, 146.0], [17.8, 146.0], [17.9, 146.0], [18.0, 146.0], [18.1, 146.0], [18.2, 146.0], [18.3, 146.0], [18.4, 146.0], [18.5, 146.0], [18.6, 146.0], [18.7, 146.0], [18.8, 146.0], [18.9, 146.0], [19.0, 146.0], [19.1, 146.0], [19.2, 146.0], [19.3, 146.0], [19.4, 146.0], [19.5, 146.0], [19.6, 146.0], [19.7, 146.0], [19.8, 146.0], [19.9, 146.0], [20.0, 146.0], [20.1, 147.0], [20.2, 147.0], [20.3, 147.0], [20.4, 147.0], [20.5, 147.0], [20.6, 147.0], [20.7, 147.0], [20.8, 147.0], [20.9, 147.0], [21.0, 147.0], [21.1, 147.0], [21.2, 147.0], [21.3, 147.0], [21.4, 147.0], [21.5, 147.0], [21.6, 147.0], [21.7, 147.0], [21.8, 147.0], [21.9, 147.0], [22.0, 147.0], [22.1, 147.0], [22.2, 147.0], [22.3, 147.0], [22.4, 147.0], [22.5, 147.0], [22.6, 147.0], [22.7, 147.0], [22.8, 147.0], [22.9, 147.0], [23.0, 147.0], [23.1, 147.0], [23.2, 147.0], [23.3, 147.0], [23.4, 147.0], [23.5, 147.0], [23.6, 147.0], [23.7, 147.0], [23.8, 147.0], [23.9, 147.0], [24.0, 147.0], [24.1, 147.0], [24.2, 148.0], [24.3, 148.0], [24.4, 148.0], [24.5, 148.0], [24.6, 148.0], [24.7, 148.0], [24.8, 148.0], [24.9, 148.0], [25.0, 148.0], [25.1, 148.0], [25.2, 148.0], [25.3, 148.0], [25.4, 148.0], [25.5, 148.0], [25.6, 148.0], [25.7, 148.0], [25.8, 148.0], [25.9, 148.0], [26.0, 148.0], [26.1, 148.0], [26.2, 148.0], [26.3, 148.0], [26.4, 148.0], [26.5, 148.0], [26.6, 148.0], [26.7, 148.0], [26.8, 148.0], [26.9, 148.0], [27.0, 148.0], [27.1, 148.0], [27.2, 148.0], [27.3, 148.0], [27.4, 148.0], [27.5, 148.0], [27.6, 148.0], [27.7, 148.0], [27.8, 148.0], [27.9, 148.0], [28.0, 148.0], [28.1, 148.0], [28.2, 148.0], [28.3, 148.0], [28.4, 148.0], [28.5, 148.0], [28.6, 148.0], [28.7, 148.0], [28.8, 148.0], [28.9, 148.0], [29.0, 148.0], [29.1, 149.0], [29.2, 149.0], [29.3, 149.0], [29.4, 149.0], [29.5, 149.0], [29.6, 149.0], [29.7, 149.0], [29.8, 149.0], [29.9, 149.0], [30.0, 149.0], [30.1, 149.0], [30.2, 149.0], [30.3, 149.0], [30.4, 149.0], [30.5, 149.0], [30.6, 149.0], [30.7, 149.0], [30.8, 149.0], [30.9, 149.0], [31.0, 149.0], [31.1, 149.0], [31.2, 149.0], [31.3, 149.0], [31.4, 149.0], [31.5, 149.0], [31.6, 149.0], [31.7, 149.0], [31.8, 149.0], [31.9, 149.0], [32.0, 149.0], [32.1, 149.0], [32.2, 149.0], [32.3, 149.0], [32.4, 149.0], [32.5, 149.0], [32.6, 149.0], [32.7, 149.0], [32.8, 149.0], [32.9, 149.0], [33.0, 149.0], [33.1, 149.0], [33.2, 149.0], [33.3, 149.0], [33.4, 149.0], [33.5, 149.0], [33.6, 149.0], [33.7, 149.0], [33.8, 149.0], [33.9, 149.0], [34.0, 149.0], [34.1, 149.0], [34.2, 149.0], [34.3, 149.0], [34.4, 149.0], [34.5, 149.0], [34.6, 149.0], [34.7, 150.0], [34.8, 150.0], [34.9, 150.0], [35.0, 150.0], [35.1, 150.0], [35.2, 150.0], [35.3, 150.0], [35.4, 150.0], [35.5, 150.0], [35.6, 150.0], [35.7, 150.0], [35.8, 150.0], [35.9, 150.0], [36.0, 150.0], [36.1, 150.0], [36.2, 150.0], [36.3, 150.0], [36.4, 150.0], [36.5, 150.0], [36.6, 150.0], [36.7, 150.0], [36.8, 150.0], [36.9, 150.0], [37.0, 150.0], [37.1, 150.0], [37.2, 150.0], [37.3, 150.0], [37.4, 150.0], [37.5, 150.0], [37.6, 150.0], [37.7, 150.0], [37.8, 150.0], [37.9, 150.0], [38.0, 150.0], [38.1, 150.0], [38.2, 150.0], [38.3, 150.0], [38.4, 150.0], [38.5, 150.0], [38.6, 150.0], [38.7, 150.0], [38.8, 150.0], [38.9, 150.0], [39.0, 150.0], [39.1, 150.0], [39.2, 151.0], [39.3, 151.0], [39.4, 151.0], [39.5, 151.0], [39.6, 151.0], [39.7, 151.0], [39.8, 151.0], [39.9, 151.0], [40.0, 151.0], [40.1, 151.0], [40.2, 151.0], [40.3, 151.0], [40.4, 151.0], [40.5, 151.0], [40.6, 151.0], [40.7, 151.0], [40.8, 151.0], [40.9, 151.0], [41.0, 151.0], [41.1, 151.0], [41.2, 151.0], [41.3, 151.0], [41.4, 151.0], [41.5, 151.0], [41.6, 151.0], [41.7, 151.0], [41.8, 151.0], [41.9, 151.0], [42.0, 151.0], [42.1, 151.0], [42.2, 151.0], [42.3, 151.0], [42.4, 151.0], [42.5, 151.0], [42.6, 152.0], [42.7, 152.0], [42.8, 152.0], [42.9, 152.0], [43.0, 152.0], [43.1, 152.0], [43.2, 152.0], [43.3, 152.0], [43.4, 152.0], [43.5, 152.0], [43.6, 152.0], [43.7, 152.0], [43.8, 152.0], [43.9, 152.0], [44.0, 152.0], [44.1, 152.0], [44.2, 152.0], [44.3, 152.0], [44.4, 152.0], [44.5, 152.0], [44.6, 152.0], [44.7, 152.0], [44.8, 152.0], [44.9, 153.0], [45.0, 153.0], [45.1, 153.0], [45.2, 153.0], [45.3, 153.0], [45.4, 153.0], [45.5, 153.0], [45.6, 153.0], [45.7, 153.0], [45.8, 153.0], [45.9, 153.0], [46.0, 153.0], [46.1, 153.0], [46.2, 153.0], [46.3, 153.0], [46.4, 153.0], [46.5, 153.0], [46.6, 154.0], [46.7, 154.0], [46.8, 154.0], [46.9, 154.0], [47.0, 154.0], [47.1, 154.0], [47.2, 154.0], [47.3, 154.0], [47.4, 154.0], [47.5, 154.0], [47.6, 154.0], [47.7, 154.0], [47.8, 154.0], [47.9, 155.0], [48.0, 155.0], [48.1, 155.0], [48.2, 155.0], [48.3, 155.0], [48.4, 155.0], [48.5, 155.0], [48.6, 155.0], [48.7, 155.0], [48.8, 155.0], [48.9, 155.0], [49.0, 156.0], [49.1, 156.0], [49.2, 156.0], [49.3, 156.0], [49.4, 156.0], [49.5, 156.0], [49.6, 156.0], [49.7, 156.0], [49.8, 156.0], [49.9, 156.0], [50.0, 156.0], [50.1, 156.0], [50.2, 157.0], [50.3, 157.0], [50.4, 157.0], [50.5, 157.0], [50.6, 157.0], [50.7, 157.0], [50.8, 157.0], [50.9, 158.0], [51.0, 158.0], [51.1, 158.0], [51.2, 158.0], [51.3, 158.0], [51.4, 158.0], [51.5, 158.0], [51.6, 158.0], [51.7, 159.0], [51.8, 159.0], [51.9, 159.0], [52.0, 159.0], [52.1, 159.0], [52.2, 160.0], [52.3, 160.0], [52.4, 160.0], [52.5, 160.0], [52.6, 160.0], [52.7, 160.0], [52.8, 160.0], [52.9, 161.0], [53.0, 161.0], [53.1, 161.0], [53.2, 161.0], [53.3, 161.0], [53.4, 161.0], [53.5, 161.0], [53.6, 162.0], [53.7, 162.0], [53.8, 162.0], [53.9, 162.0], [54.0, 162.0], [54.1, 162.0], [54.2, 162.0], [54.3, 162.0], [54.4, 162.0], [54.5, 162.0], [54.6, 163.0], [54.7, 163.0], [54.8, 163.0], [54.9, 163.0], [55.0, 163.0], [55.1, 163.0], [55.2, 163.0], [55.3, 163.0], [55.4, 163.0], [55.5, 163.0], [55.6, 163.0], [55.7, 164.0], [55.8, 164.0], [55.9, 164.0], [56.0, 164.0], [56.1, 164.0], [56.2, 164.0], [56.3, 164.0], [56.4, 164.0], [56.5, 164.0], [56.6, 164.0], [56.7, 164.0], [56.8, 164.0], [56.9, 165.0], [57.0, 165.0], [57.1, 165.0], [57.2, 165.0], [57.3, 165.0], [57.4, 165.0], [57.5, 165.0], [57.6, 165.0], [57.7, 165.0], [57.8, 165.0], [57.9, 165.0], [58.0, 165.0], [58.1, 165.0], [58.2, 166.0], [58.3, 166.0], [58.4, 166.0], [58.5, 166.0], [58.6, 166.0], [58.7, 166.0], [58.8, 166.0], [58.9, 166.0], [59.0, 166.0], [59.1, 166.0], [59.2, 166.0], [59.3, 167.0], [59.4, 167.0], [59.5, 167.0], [59.6, 167.0], [59.7, 167.0], [59.8, 167.0], [59.9, 167.0], [60.0, 167.0], [60.1, 167.0], [60.2, 167.0], [60.3, 167.0], [60.4, 167.0], [60.5, 167.0], [60.6, 167.0], [60.7, 167.0], [60.8, 167.0], [60.9, 167.0], [61.0, 168.0], [61.1, 168.0], [61.2, 168.0], [61.3, 168.0], [61.4, 168.0], [61.5, 168.0], [61.6, 168.0], [61.7, 168.0], [61.8, 168.0], [61.9, 168.0], [62.0, 168.0], [62.1, 168.0], [62.2, 168.0], [62.3, 168.0], [62.4, 169.0], [62.5, 169.0], [62.6, 169.0], [62.7, 169.0], [62.8, 169.0], [62.9, 169.0], [63.0, 169.0], [63.1, 169.0], [63.2, 169.0], [63.3, 169.0], [63.4, 169.0], [63.5, 169.0], [63.6, 169.0], [63.7, 169.0], [63.8, 169.0], [63.9, 169.0], [64.0, 169.0], [64.1, 170.0], [64.2, 170.0], [64.3, 170.0], [64.4, 170.0], [64.5, 170.0], [64.6, 170.0], [64.7, 170.0], [64.8, 170.0], [64.9, 170.0], [65.0, 170.0], [65.1, 170.0], [65.2, 170.0], [65.3, 170.0], [65.4, 170.0], [65.5, 170.0], [65.6, 170.0], [65.7, 171.0], [65.8, 171.0], [65.9, 171.0], [66.0, 171.0], [66.1, 171.0], [66.2, 171.0], [66.3, 171.0], [66.4, 171.0], [66.5, 171.0], [66.6, 171.0], [66.7, 171.0], [66.8, 171.0], [66.9, 171.0], [67.0, 171.0], [67.1, 171.0], [67.2, 172.0], [67.3, 172.0], [67.4, 172.0], [67.5, 172.0], [67.6, 172.0], [67.7, 172.0], [67.8, 172.0], [67.9, 172.0], [68.0, 172.0], [68.1, 172.0], [68.2, 172.0], [68.3, 172.0], [68.4, 172.0], [68.5, 172.0], [68.6, 172.0], [68.7, 172.0], [68.8, 172.0], [68.9, 172.0], [69.0, 173.0], [69.1, 173.0], [69.2, 173.0], [69.3, 173.0], [69.4, 173.0], [69.5, 173.0], [69.6, 173.0], [69.7, 173.0], [69.8, 173.0], [69.9, 173.0], [70.0, 173.0], [70.1, 173.0], [70.2, 173.0], [70.3, 174.0], [70.4, 174.0], [70.5, 174.0], [70.6, 174.0], [70.7, 174.0], [70.8, 174.0], [70.9, 174.0], [71.0, 174.0], [71.1, 174.0], [71.2, 174.0], [71.3, 175.0], [71.4, 175.0], [71.5, 175.0], [71.6, 175.0], [71.7, 175.0], [71.8, 175.0], [71.9, 175.0], [72.0, 175.0], [72.1, 175.0], [72.2, 176.0], [72.3, 176.0], [72.4, 176.0], [72.5, 176.0], [72.6, 176.0], [72.7, 176.0], [72.8, 176.0], [72.9, 176.0], [73.0, 177.0], [73.1, 177.0], [73.2, 177.0], [73.3, 177.0], [73.4, 177.0], [73.5, 178.0], [73.6, 178.0], [73.7, 178.0], [73.8, 178.0], [73.9, 179.0], [74.0, 179.0], [74.1, 179.0], [74.2, 179.0], [74.3, 180.0], [74.4, 180.0], [74.5, 181.0], [74.6, 181.0], [74.7, 181.0], [74.8, 182.0], [74.9, 182.0], [75.0, 182.0], [75.1, 183.0], [75.2, 183.0], [75.3, 183.0], [75.4, 184.0], [75.5, 184.0], [75.6, 184.0], [75.7, 184.0], [75.8, 185.0], [75.9, 185.0], [76.0, 185.0], [76.1, 185.0], [76.2, 186.0], [76.3, 186.0], [76.4, 186.0], [76.5, 186.0], [76.6, 187.0], [76.7, 187.0], [76.8, 187.0], [76.9, 187.0], [77.0, 188.0], [77.1, 188.0], [77.2, 188.0], [77.3, 188.0], [77.4, 189.0], [77.5, 189.0], [77.6, 189.0], [77.7, 189.0], [77.8, 189.0], [77.9, 189.0], [78.0, 189.0], [78.1, 190.0], [78.2, 190.0], [78.3, 190.0], [78.4, 190.0], [78.5, 190.0], [78.6, 190.0], [78.7, 191.0], [78.8, 191.0], [78.9, 191.0], [79.0, 191.0], [79.1, 191.0], [79.2, 192.0], [79.3, 192.0], [79.4, 192.0], [79.5, 192.0], [79.6, 192.0], [79.7, 192.0], [79.8, 192.0], [79.9, 193.0], [80.0, 193.0], [80.1, 193.0], [80.2, 193.0], [80.3, 193.0], [80.4, 193.0], [80.5, 193.0], [80.6, 193.0], [80.7, 194.0], [80.8, 194.0], [80.9, 194.0], [81.0, 194.0], [81.1, 194.0], [81.2, 195.0], [81.3, 195.0], [81.4, 195.0], [81.5, 195.0], [81.6, 195.0], [81.7, 195.0], [81.8, 195.0], [81.9, 195.0], [82.0, 196.0], [82.1, 196.0], [82.2, 196.0], [82.3, 196.0], [82.4, 196.0], [82.5, 197.0], [82.6, 197.0], [82.7, 197.0], [82.8, 197.0], [82.9, 198.0], [83.0, 198.0], [83.1, 198.0], [83.2, 198.0], [83.3, 198.0], [83.4, 199.0], [83.5, 199.0], [83.6, 200.0], [83.7, 201.0], [83.8, 201.0], [83.9, 201.0], [84.0, 202.0], [84.1, 202.0], [84.2, 203.0], [84.3, 203.0], [84.4, 204.0], [84.5, 204.0], [84.6, 205.0], [84.7, 206.0], [84.8, 206.0], [84.9, 207.0], [85.0, 207.0], [85.1, 208.0], [85.2, 209.0], [85.3, 210.0], [85.4, 211.0], [85.5, 212.0], [85.6, 213.0], [85.7, 214.0], [85.8, 215.0], [85.9, 215.0], [86.0, 216.0], [86.1, 216.0], [86.2, 216.0], [86.3, 217.0], [86.4, 218.0], [86.5, 219.0], [86.6, 219.0], [86.7, 220.0], [86.8, 220.0], [86.9, 221.0], [87.0, 222.0], [87.1, 223.0], [87.2, 224.0], [87.3, 225.0], [87.4, 225.0], [87.5, 228.0], [87.6, 231.0], [87.7, 233.0], [87.8, 235.0], [87.9, 241.0], [88.0, 243.0], [88.1, 245.0], [88.2, 247.0], [88.3, 247.0], [88.4, 248.0], [88.5, 249.0], [88.6, 249.0], [88.7, 250.0], [88.8, 250.0], [88.9, 251.0], [89.0, 251.0], [89.1, 251.0], [89.2, 252.0], [89.3, 252.0], [89.4, 252.0], [89.5, 253.0], [89.6, 253.0], [89.7, 253.0], [89.8, 254.0], [89.9, 254.0], [90.0, 254.0], [90.1, 255.0], [90.2, 256.0], [90.3, 256.0], [90.4, 256.0], [90.5, 257.0], [90.6, 257.0], [90.7, 257.0], [90.8, 258.0], [90.9, 258.0], [91.0, 258.0], [91.1, 259.0], [91.2, 259.0], [91.3, 260.0], [91.4, 260.0], [91.5, 261.0], [91.6, 261.0], [91.7, 261.0], [91.8, 262.0], [91.9, 262.0], [92.0, 263.0], [92.1, 263.0], [92.2, 264.0], [92.3, 265.0], [92.4, 265.0], [92.5, 266.0], [92.6, 266.0], [92.7, 266.0], [92.8, 267.0], [92.9, 267.0], [93.0, 268.0], [93.1, 268.0], [93.2, 269.0], [93.3, 269.0], [93.4, 269.0], [93.5, 270.0], [93.6, 270.0], [93.7, 270.0], [93.8, 271.0], [93.9, 271.0], [94.0, 271.0], [94.1, 272.0], [94.2, 272.0], [94.3, 272.0], [94.4, 272.0], [94.5, 272.0], [94.6, 273.0], [94.7, 273.0], [94.8, 273.0], [94.9, 274.0], [95.0, 274.0], [95.1, 274.0], [95.2, 275.0], [95.3, 275.0], [95.4, 275.0], [95.5, 275.0], [95.6, 276.0], [95.7, 276.0], [95.8, 276.0], [95.9, 276.0], [96.0, 277.0], [96.1, 277.0], [96.2, 277.0], [96.3, 278.0], [96.4, 278.0], [96.5, 278.0], [96.6, 279.0], [96.7, 279.0], [96.8, 279.0], [96.9, 280.0], [97.0, 280.0], [97.1, 280.0], [97.2, 281.0], [97.3, 281.0], [97.4, 281.0], [97.5, 282.0], [97.6, 282.0], [97.7, 283.0], [97.8, 284.0], [97.9, 285.0], [98.0, 285.0], [98.1, 286.0], [98.2, 287.0], [98.3, 288.0], [98.4, 288.0], [98.5, 289.0], [98.6, 289.0], [98.7, 290.0], [98.8, 290.0], [98.9, 291.0], [99.0, 293.0], [99.1, 294.0], [99.2, 295.0], [99.3, 296.0], [99.4, 297.0], [99.5, 300.0], [99.6, 303.0], [99.7, 314.0], [99.8, 326.0], [99.9, 369.0]], "isOverall": false, "label": "POST /pedido", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 100.0, "maxY": 5049.0, "series": [{"data": [[300.0, 27.0], [200.0, 963.0], [100.0, 5049.0], [800.0, 1.0], [400.0, 1.0], [500.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "POST /pedido", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 1000.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 6044.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 2,000ms"], [1, "Requests having \nresponse time > 2,000ms and <= 4,000ms"], [2, "Requests having \nresponse time > 4,000ms"], [3, "Requests in error"]], "maxY": 6044.0, "series": [{"data": [[0.0, 6044.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 2,000ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 2,000ms and <= 4,000ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 4,000ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 4.9E-324, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 17.845161290322586, "minX": 1.75780206E12, "maxY": 50.0, "series": [{"data": [[1.75780266E12, 50.0], [1.75780296E12, 45.12267657992565], [1.75780206E12, 17.845161290322586], [1.75780236E12, 50.0], [1.7578029E12, 50.0], [1.75780224E12, 50.0], [1.7578023E12, 50.0], [1.7578026E12, 50.0], [1.75780218E12, 50.0], [1.75780248E12, 50.0], [1.75780254E12, 50.0], [1.75780284E12, 50.0], [1.75780242E12, 50.0], [1.75780272E12, 50.0], [1.75780278E12, 50.0], [1.75780212E12, 48.407142857142865]], "isOverall": false, "label": "Pedidos 400/min por 15m", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.75780296E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 168.5, "minX": 1.0, "maxY": 278.0, "series": [{"data": [[2.0, 269.2], [3.0, 195.8], [4.0, 199.2], [5.0, 210.83333333333331], [6.0, 201.14285714285714], [7.0, 226.4], [8.0, 205.4], [9.0, 205.33333333333331], [10.0, 182.83333333333334], [11.0, 192.99999999999997], [12.0, 187.0], [13.0, 278.0], [14.0, 207.62499999999997], [15.0, 190.125], [16.0, 190.33333333333334], [17.0, 187.66666666666669], [18.0, 197.4], [19.0, 194.27272727272725], [20.0, 182.0], [21.0, 176.0], [22.0, 180.2857142857143], [23.0, 183.4], [24.0, 206.42857142857142], [25.0, 207.2], [26.0, 173.2], [27.0, 188.5], [28.0, 187.83333333333331], [29.0, 208.8], [30.0, 175.11111111111111], [31.0, 178.33333333333334], [32.0, 208.25], [33.0, 169.2], [34.0, 174.83333333333334], [35.0, 199.74999999999997], [36.0, 180.33333333333331], [37.0, 183.00000000000003], [38.0, 226.5], [39.0, 181.57142857142858], [40.0, 170.2], [41.0, 168.5], [42.0, 178.85714285714286], [43.0, 176.0], [44.0, 198.25], [45.0, 172.42857142857144], [46.0, 181.83333333333334], [47.0, 179.5], [48.0, 218.25], [49.0, 185.85714285714286], [50.0, 173.6363794301597], [1.0, 229.0]], "isOverall": false, "label": "POST /pedido", "isController": false}, {"data": [[48.84761747187301, 174.49503639973508]], "isOverall": false, "label": "POST /pedido-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 50.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 692.4, "minX": 1.75780206E12, "maxY": 8372.116666666667, "series": [{"data": [[1.75780266E12, 1786.9333333333334], [1.75780296E12, 1201.8], [1.75780206E12, 692.4], [1.75780236E12, 1786.9333333333334], [1.7578029E12, 1787.0], [1.75780224E12, 1782.6], [1.7578023E12, 1787.0666666666666], [1.7578026E12, 1787.0], [1.75780218E12, 1786.8666666666666], [1.75780248E12, 1787.0666666666666], [1.75780254E12, 1786.9333333333334], [1.75780284E12, 1787.0666666666666], [1.75780242E12, 1791.4666666666667], [1.75780272E12, 1787.0666666666666], [1.75780278E12, 1787.0], [1.75780212E12, 1876.4]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.75780266E12, 7973.416666666667], [1.75780296E12, 5362.016666666666], [1.75780206E12, 3089.8166666666666], [1.75780236E12, 7973.35], [1.7578029E12, 7973.416666666667], [1.75780224E12, 7953.4], [1.7578023E12, 7973.4], [1.7578026E12, 7973.2], [1.75780218E12, 7973.333333333333], [1.75780248E12, 7973.233333333334], [1.75780254E12, 7973.35], [1.75780284E12, 7973.35], [1.75780242E12, 7993.333333333333], [1.75780272E12, 7973.183333333333], [1.75780278E12, 7973.6], [1.75780212E12, 8372.116666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.75780296E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 171.94749999999996, "minX": 1.75780206E12, "maxY": 195.00000000000014, "series": [{"data": [[1.75780266E12, 175.20749999999995], [1.75780296E12, 173.83271375464685], [1.75780206E12, 195.00000000000014], [1.75780236E12, 172.57500000000002], [1.7578029E12, 174.47000000000003], [1.75780224E12, 175.7268170426065], [1.7578023E12, 175.22999999999988], [1.7578026E12, 173.6999999999999], [1.75780218E12, 173.62500000000003], [1.75780248E12, 171.94749999999996], [1.75780254E12, 173.69750000000002], [1.75780284E12, 173.29749999999984], [1.75780242E12, 173.17206982543635], [1.75780272E12, 174.15749999999986], [1.75780278E12, 174.04500000000007], [1.75780212E12, 174.58095238095248]], "isOverall": false, "label": "POST /pedido", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.75780296E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 171.93999999999997, "minX": 1.75780206E12, "maxY": 194.98709677419367, "series": [{"data": [[1.75780266E12, 175.2025], [1.75780296E12, 173.82899628252778], [1.75780206E12, 194.98709677419367], [1.75780236E12, 172.56750000000014], [1.7578029E12, 174.47000000000003], [1.75780224E12, 175.7167919799497], [1.7578023E12, 175.22250000000003], [1.7578026E12, 173.6924999999999], [1.75780218E12, 173.6125], [1.75780248E12, 171.93999999999997], [1.75780254E12, 173.68499999999995], [1.75780284E12, 173.29], [1.75780242E12, 173.17206982543635], [1.75780272E12, 174.15749999999986], [1.75780278E12, 174.04000000000005], [1.75780212E12, 174.55714285714285]], "isOverall": false, "label": "POST /pedido", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.75780296E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 12.617500000000009, "minX": 1.75780206E12, "maxY": 27.33548387096775, "series": [{"data": [[1.75780266E12, 15.152499999999996], [1.75780296E12, 14.609665427509299], [1.75780206E12, 27.33548387096775], [1.75780236E12, 13.817500000000017], [1.7578029E12, 13.829999999999998], [1.75780224E12, 14.258145363408522], [1.7578023E12, 12.617500000000009], [1.7578026E12, 14.832500000000008], [1.75780218E12, 13.145000000000001], [1.75780248E12, 14.297500000000005], [1.75780254E12, 14.705000000000002], [1.75780284E12, 14.352500000000006], [1.75780242E12, 13.920199501246877], [1.75780272E12, 15.035000000000005], [1.75780278E12, 14.962500000000002], [1.75780212E12, 13.03095238095238]], "isOverall": false, "label": "POST /pedido", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.75780296E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 136.0, "minX": 1.75780206E12, "maxY": 1083.0, "series": [{"data": [[1.75780266E12, 402.0], [1.75780296E12, 301.0], [1.75780206E12, 512.0], [1.75780236E12, 299.0], [1.7578029E12, 1013.0], [1.75780224E12, 824.0], [1.7578023E12, 1083.0], [1.7578026E12, 362.0], [1.75780218E12, 329.0], [1.75780248E12, 305.0], [1.75780254E12, 303.0], [1.75780284E12, 326.0], [1.75780242E12, 310.0], [1.75780272E12, 315.0], [1.75780278E12, 294.0], [1.75780212E12, 369.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.75780266E12, 258.0], [1.75780296E12, 256.0], [1.75780206E12, 284.20000000000005], [1.75780236E12, 253.0], [1.7578029E12, 252.80000000000007], [1.75780224E12, 254.0], [1.7578023E12, 250.90000000000003], [1.7578026E12, 255.0], [1.75780218E12, 254.90000000000003], [1.75780248E12, 252.90000000000003], [1.75780254E12, 256.0], [1.75780284E12, 253.90000000000003], [1.75780242E12, 253.60000000000002], [1.75780272E12, 259.90000000000003], [1.75780278E12, 252.0], [1.75780212E12, 251.90000000000003]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.75780266E12, 299.97], [1.75780296E12, 291.6], [1.75780206E12, 403.91999999999956], [1.75780236E12, 286.99], [1.7578029E12, 294.94000000000005], [1.75780224E12, 303.0], [1.7578023E12, 294.95000000000005], [1.7578026E12, 288.97], [1.75780218E12, 294.0], [1.75780248E12, 287.99], [1.75780254E12, 289.98], [1.75780284E12, 293.97], [1.75780242E12, 293.94000000000005], [1.75780272E12, 293.96000000000004], [1.75780278E12, 291.98], [1.75780212E12, 294.58000000000004]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.75780266E12, 276.9], [1.75780296E12, 277.0], [1.75780206E12, 295.0], [1.75780236E12, 274.84999999999997], [1.7578029E12, 270.95], [1.75780224E12, 277.0], [1.7578023E12, 272.0], [1.7578026E12, 275.0], [1.75780218E12, 272.0], [1.75780248E12, 271.84999999999997], [1.75780254E12, 274.95], [1.75780284E12, 273.95], [1.75780242E12, 273.9], [1.75780272E12, 273.95], [1.75780278E12, 275.9], [1.75780212E12, 274.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.75780266E12, 137.0], [1.75780296E12, 137.0], [1.75780206E12, 136.0], [1.75780236E12, 136.0], [1.7578029E12, 137.0], [1.75780224E12, 138.0], [1.7578023E12, 138.0], [1.7578026E12, 137.0], [1.75780218E12, 138.0], [1.75780248E12, 137.0], [1.75780254E12, 138.0], [1.75780284E12, 137.0], [1.75780242E12, 137.0], [1.75780272E12, 138.0], [1.75780278E12, 137.0], [1.75780212E12, 139.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.75780266E12, 156.0], [1.75780296E12, 156.0], [1.75780206E12, 170.0], [1.75780236E12, 155.5], [1.7578029E12, 155.5], [1.75780224E12, 156.0], [1.7578023E12, 158.5], [1.7578026E12, 156.0], [1.75780218E12, 155.0], [1.75780248E12, 153.5], [1.75780254E12, 153.5], [1.75780284E12, 155.0], [1.75780242E12, 155.0], [1.75780272E12, 155.5], [1.75780278E12, 155.0], [1.75780212E12, 158.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.75780296E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 144.0, "minX": 1.0, "maxY": 172.0, "series": [{"data": [[8.0, 155.0], [2.0, 150.0], [9.0, 168.0], [10.0, 167.0], [11.0, 164.0], [12.0, 165.5], [3.0, 149.0], [13.0, 172.0], [4.0, 153.0], [1.0, 144.0], [5.0, 155.0], [6.0, 155.0], [7.0, 154.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 13.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 144.0, "minX": 1.0, "maxY": 172.0, "series": [{"data": [[8.0, 155.0], [2.0, 150.0], [9.0, 168.0], [10.0, 167.0], [11.0, 164.0], [12.0, 165.5], [3.0, 149.0], [13.0, 172.0], [4.0, 153.0], [1.0, 144.0], [5.0, 155.0], [6.0, 155.0], [7.0, 154.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 13.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 2.6166666666666667, "minX": 1.75780206E12, "maxY": 6.966666666666667, "series": [{"data": [[1.75780266E12, 6.666666666666667], [1.75780296E12, 4.483333333333333], [1.75780206E12, 2.6166666666666667], [1.75780236E12, 6.666666666666667], [1.7578029E12, 6.666666666666667], [1.75780224E12, 6.666666666666667], [1.7578023E12, 6.666666666666667], [1.7578026E12, 6.666666666666667], [1.75780218E12, 6.666666666666667], [1.75780248E12, 6.666666666666667], [1.75780254E12, 6.666666666666667], [1.75780284E12, 6.666666666666667], [1.75780242E12, 6.666666666666667], [1.75780272E12, 6.666666666666667], [1.75780278E12, 6.666666666666667], [1.75780212E12, 6.966666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.75780296E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 2.5833333333333335, "minX": 1.75780206E12, "maxY": 7.0, "series": [{"data": [[1.75780266E12, 6.666666666666667], [1.75780296E12, 4.483333333333333], [1.75780206E12, 2.5833333333333335], [1.75780236E12, 6.666666666666667], [1.7578029E12, 6.666666666666667], [1.75780224E12, 6.65], [1.7578023E12, 6.666666666666667], [1.7578026E12, 6.666666666666667], [1.75780218E12, 6.666666666666667], [1.75780248E12, 6.666666666666667], [1.75780254E12, 6.666666666666667], [1.75780284E12, 6.666666666666667], [1.75780242E12, 6.683333333333334], [1.75780272E12, 6.666666666666667], [1.75780278E12, 6.666666666666667], [1.75780212E12, 7.0]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.75780296E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 2.5833333333333335, "minX": 1.75780206E12, "maxY": 7.0, "series": [{"data": [[1.75780266E12, 6.666666666666667], [1.75780296E12, 4.483333333333333], [1.75780206E12, 2.5833333333333335], [1.75780236E12, 6.666666666666667], [1.7578029E12, 6.666666666666667], [1.75780224E12, 6.65], [1.7578023E12, 6.666666666666667], [1.7578026E12, 6.666666666666667], [1.75780218E12, 6.666666666666667], [1.75780248E12, 6.666666666666667], [1.75780254E12, 6.666666666666667], [1.75780284E12, 6.666666666666667], [1.75780242E12, 6.683333333333334], [1.75780272E12, 6.666666666666667], [1.75780278E12, 6.666666666666667], [1.75780212E12, 7.0]], "isOverall": false, "label": "POST /pedido-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.75780296E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 2.5833333333333335, "minX": 1.75780206E12, "maxY": 7.0, "series": [{"data": [[1.75780266E12, 6.666666666666667], [1.75780296E12, 4.483333333333333], [1.75780206E12, 2.5833333333333335], [1.75780236E12, 6.666666666666667], [1.7578029E12, 6.666666666666667], [1.75780224E12, 6.65], [1.7578023E12, 6.666666666666667], [1.7578026E12, 6.666666666666667], [1.75780218E12, 6.666666666666667], [1.75780248E12, 6.666666666666667], [1.75780254E12, 6.666666666666667], [1.75780284E12, 6.666666666666667], [1.75780242E12, 6.683333333333334], [1.75780272E12, 6.666666666666667], [1.75780278E12, 6.666666666666667], [1.75780212E12, 7.0]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.75780296E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

