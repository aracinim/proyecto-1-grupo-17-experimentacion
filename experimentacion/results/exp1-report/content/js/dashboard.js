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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [1.0, 2000, 4000, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 2000, 4000, "GET /inventario/MED-ANALG-ACETAM-650MG-10TAB/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-GI-PANTOP-40MG-28TAB/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-ANALG-ACETAM-500MG-24TAB/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-OTC-SUERO-ORAL-500ML/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-ANTIB-CEFAL-500MG-12CAP/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-RESP-BECLOM-50MCG-200D/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-CARD-ENALAP-10MG-30TAB/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-DERM-MUPIRO-2PCT-15G/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-ANALG-NAPROX-250MG-20TAB/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-GI-LOPERA-2MG-12CAP/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-OTC-ORALSOL-SALES-4SOB/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-LAX-SENNOS-8P6MG-20TAB/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-CARD-LOSART-50MG-30TAB/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-DERM-HYDROC-1PCT-30G/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-ALERG-LORATA-10MG-10TAB/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-ANTIB-AZITH-500MG-3TAB/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-GI-OMEPRA-20MG-14CAP/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-ALERG-CETIRI-10MG-20TAB/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-ANTITUSS-AMBROX-15MG5ML-120ML/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-CARD-ATORVA-20MG-30TAB/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-ANTITUSS-DEXTRO-120ML/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-ANTIB-AMOXI-500MG-12CAP/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-DERM-CLOT-CREMA-20G/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-RESP-SALBUT-100MCG-200D/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-DIAB-METFOR-850MG-60TAB/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-ANALG-IBUPRO-400MG-20CAP/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-RESP-BUDESO-200MCG-200D/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-ALERG-DIPHEN-25MG-24CAP/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-LAX-LACTUL-667-120ML/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-DIAB-GLIBEN-5MG-30TAB/disponibilidad"], "isController": false}, {"data": [1.0, 2000, 4000, "GET /inventario/MED-DIAB-INSUGL-100UML-10ML/disponibilidad"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 195671, 0, 0.0, 126.0705725426865, 111, 1601, 125.0, 132.0, 135.0, 162.0, 181.1939646151766, 64.0378287969674, 194.31089263609852], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GET /inventario/MED-ANALG-ACETAM-650MG-10TAB/disponibilidad", 6312, 0, 0.0, 126.42031051964511, 112, 1198, 125.0, 133.0, 137.0, 230.0, 5.847097294142713, 2.0784603662772927, 6.281061546442367], "isController": false}, {"data": ["GET /inventario/MED-GI-PANTOP-40MG-28TAB/disponibilidad", 6312, 0, 0.0, 126.42031051964506, 112, 1016, 125.0, 133.0, 136.0, 226.73999999999978, 5.851411959054949, 2.0571297744351145, 6.262839362426], "isController": false}, {"data": ["GET /inventario/MED-ANALG-ACETAM-500MG-24TAB/disponibilidad", 6313, 0, 0.0, 125.96626009821001, 113, 532, 125.0, 133.0, 136.0, 193.85999999999967, 5.84599286035087, 2.0837839865471786, 6.279875142955037], "isController": false}, {"data": ["GET /inventario/MED-OTC-SUERO-ORAL-500ML/disponibilidad", 6312, 0, 0.0, 125.91017110266152, 113, 588, 125.0, 133.0, 136.0, 195.0, 5.860822186443227, 2.0547290948223833, 6.272911246427517], "isController": false}, {"data": ["GET /inventario/MED-ANTIB-CEFAL-500MG-12CAP/disponibilidad", 6312, 0, 0.0, 126.23685044359942, 113, 720, 125.0, 133.0, 137.0, 232.0, 5.854782472384108, 2.0697534616679634, 6.283599547998178], "isController": false}, {"data": ["GET /inventario/MED-RESP-BECLOM-50MCG-200D/disponibilidad", 6311, 0, 0.0, 125.98542227856122, 113, 497, 125.0, 133.0, 136.0, 168.0, 5.855810298097952, 2.070134935438555, 6.278984089171437], "isController": false}, {"data": ["GET /inventario/MED-CARD-ENALAP-10MG-30TAB/disponibilidad", 6312, 0, 0.0, 126.31321292775615, 113, 715, 125.0, 133.0, 136.0, 203.95999999999913, 5.857303394767587, 2.070655520127985, 6.280585085405089], "isController": false}, {"data": ["GET /inventario/MED-DERM-MUPIRO-2PCT-15G/disponibilidad", 6312, 0, 0.0, 126.07398605830173, 113, 1002, 124.0, 133.0, 136.0, 218.08999999999924, 5.8598101688873045, 2.054363415223995, 6.271828071387194], "isController": false}, {"data": ["GET /inventario/MED-ANALG-NAPROX-250MG-20TAB/disponibilidad", 6313, 0, 0.0, 126.02882939965149, 113, 625, 125.0, 133.0, 136.29999999999927, 197.75999999999476, 5.850879948989002, 2.079804981867184, 6.285124945203029], "isController": false}, {"data": ["GET /inventario/MED-GI-LOPERA-2MG-12CAP/disponibilidad", 6312, 0, 0.0, 126.18773764258559, 113, 935, 125.0, 133.0, 136.0, 224.47999999999956, 5.852279997107238, 2.0517306910456035, 6.258053317219165], "isController": false}, {"data": ["GET /inventario/MED-OTC-ORALSOL-SALES-4SOB/disponibilidad", 6312, 0, 0.0, 125.7248098859317, 113, 743, 125.0, 132.69999999999982, 136.0, 159.8699999999999, 5.86137186931518, 2.072093794486113, 6.284947570808659], "isController": false}, {"data": ["GET /inventario/MED-LAX-SENNOS-8P6MG-20TAB/disponibilidad", 6312, 0, 0.0, 126.13323827629891, 112, 872, 125.0, 133.0, 136.0, 180.0, 5.860588194331608, 2.066097148394884, 6.2841072630626025], "isController": false}, {"data": ["GET /inventario/MED-CARD-LOSART-50MG-30TAB/disponibilidad", 6312, 0, 0.0, 126.072877059569, 113, 1601, 125.0, 133.0, 136.0, 177.21999999999935, 5.8571294683578605, 2.0705795352156198, 6.280398590094658], "isController": false}, {"data": ["GET /inventario/MED-DERM-HYDROC-1PCT-30G/disponibilidad", 6313, 0, 0.0, 126.26199904958048, 114, 841, 125.0, 133.0, 136.0, 223.85999999999967, 5.8595852902411405, 2.0542882023403997, 6.27158738096122], "isController": false}, {"data": ["GET /inventario/MED-ALERG-LORATA-10MG-10TAB/disponibilidad", 6312, 0, 0.0, 126.1506653992394, 113, 1413, 125.0, 133.0, 136.0, 220.34999999999945, 5.852285423154912, 2.074589461528548, 6.28091960942114], "isController": false}, {"data": ["GET /inventario/MED-ANTIB-AZITH-500MG-3TAB/disponibilidad", 6312, 0, 0.0, 125.67648922686968, 112, 739, 124.0, 133.0, 136.0, 168.0, 5.85405485115843, 2.063797500433582, 6.277101783761675], "isController": false}, {"data": ["GET /inventario/MED-GI-OMEPRA-20MG-14CAP/disponibilidad", 6312, 0, 0.0, 125.77740811153362, 113, 322, 125.0, 133.0, 136.0, 169.0, 5.8515746965747155, 2.0571978505753306, 6.2630135424276245], "isController": false}, {"data": ["GET /inventario/MED-ALERG-CETIRI-10MG-20TAB/disponibilidad", 6312, 0, 0.0, 126.22750316856785, 113, 1056, 125.0, 133.0, 137.0, 220.82999999999902, 5.853528253103891, 2.0750264125160895, 6.282253466954273], "isController": false}, {"data": ["GET /inventario/MED-ANTITUSS-AMBROX-15MG5ML-120ML/disponibilidad", 6312, 0, 0.0, 126.6796577946767, 113, 904, 125.0, 133.0, 137.0, 231.8699999999999, 5.859929851663562, 2.1116385046688193, 6.323459459070544], "isController": false}, {"data": ["GET /inventario/MED-CARD-ATORVA-20MG-30TAB/disponibilidad", 6312, 0, 0.0, 125.93678707224352, 112, 1222, 125.0, 133.0, 136.0, 165.60999999999967, 5.859086736204644, 2.0712787094785954, 6.282497301125684], "isController": false}, {"data": ["GET /inventario/MED-ANTITUSS-DEXTRO-120ML/disponibilidad", 6312, 0, 0.0, 125.79705323193897, 113, 787, 125.0, 133.0, 136.0, 154.0, 5.859685051211902, 2.0657678744995085, 6.277416505058063], "isController": false}, {"data": ["GET /inventario/MED-ANTIB-AMOXI-500MG-12CAP/disponibilidad", 6312, 0, 0.0, 125.86660329531061, 113, 766, 125.0, 133.0, 136.0, 215.65999999999804, 5.854000558318811, 2.069480666124423, 6.282760364836302], "isController": false}, {"data": ["GET /inventario/MED-DERM-CLOT-CREMA-20G/disponibilidad", 6312, 0, 0.0, 126.35884030418242, 113, 924, 125.0, 133.0, 137.0, 220.6999999999989, 5.85969593079766, 2.0543306177003293, 6.26598344162445], "isController": false}, {"data": ["GET /inventario/MED-RESP-SALBUT-100MCG-200D/disponibilidad", 6312, 0, 0.0, 125.95373891001259, 113, 999, 125.0, 133.0, 136.0, 200.21999999999935, 5.855743861302736, 2.0758226986147346, 6.284631351144245], "isController": false}, {"data": ["GET /inventario/MED-DIAB-METFOR-850MG-60TAB/disponibilidad", 6311, 0, 0.0, 125.9695769291715, 113, 922, 125.0, 133.0, 136.0, 180.5600000000013, 5.856826529911484, 2.08190793014869, 6.285793316770235], "isController": false}, {"data": ["GET /inventario/MED-ANALG-IBUPRO-400MG-20CAP/disponibilidad", 6312, 0, 0.0, 126.21039290240803, 113, 1148, 125.0, 133.0, 136.0, 190.21999999999935, 5.848999081692318, 2.079140012037151, 6.283104482286669], "isController": false}, {"data": ["GET /inventario/MED-RESP-BUDESO-200MCG-200D/disponibilidad", 6311, 0, 0.0, 125.80288385358877, 113, 444, 125.0, 133.0, 136.0, 152.0, 5.856261309330488, 2.0702798769312856, 6.2851866981974664], "isController": false}, {"data": ["GET /inventario/MED-ALERG-DIPHEN-25MG-24CAP/disponibilidad", 6312, 0, 0.0, 126.02677439797218, 113, 1505, 125.0, 133.0, 136.0, 183.0, 5.85396798309843, 2.0751822930916317, 6.282725403735522], "isController": false}, {"data": ["GET /inventario/MED-LAX-LACTUL-667-120ML/disponibilidad", 6312, 0, 0.0, 126.2707541191381, 111, 906, 125.0, 133.0, 136.0, 228.8699999999999, 5.860027777571467, 2.0601660155524693, 6.272060980681962], "isController": false}, {"data": ["GET /inventario/MED-DIAB-GLIBEN-5MG-30TAB/disponibilidad", 6311, 0, 0.0, 125.63048645222621, 112, 699, 125.0, 133.0, 136.0, 162.64000000000033, 5.85646781958627, 2.0646372995915967, 6.273969920005994], "isController": false}, {"data": ["GET /inventario/MED-DIAB-INSUGL-100UML-10ML/disponibilidad", 6312, 0, 0.0, 126.11596958174898, 112, 859, 125.0, 133.0, 136.0, 177.6999999999989, 5.857216430271564, 2.07061390230549, 6.286211774285595], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 195671, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
