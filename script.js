
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    const csvUrl = 'https://raw.githubusercontent.com/EdisonFlores/Pruebas-d3chart/main/Parametrosfisio.csv';

    fetch(csvUrl)
        .then(response => response.text())
        .then(csvText => {
            const data = d3.csvParse(csvText);
            const filteredData = data.filter(d => d.RIO === 'RIO HUASAGA' && d.PUNTO === 'P1');

            if (filteredData.length === 0) {
                console.error("No se encontraron datos para el RIO HUASAGA en el PUNTO P1.");
                return;
            }

            // Convertir las fechas al formato YYYY
            filteredData.forEach(d => {
                const parseDate = d3.timeParse("%Y//%m/%d");
                const parsedDate = parseDate(d.FECHA);
                d.FECHA = parsedDate ? d3.timeFormat("%Y")(parsedDate) : 'Fecha no válida';
                d['CALIDAD AGUA NSF'] = +d['CALIDAD AGUA NSF'];
            });

            // Convertir los datos a formato para Google Charts
            const chartData = [['Fecha', 'Calidad Agua NSF']];
            filteredData.forEach(d => {
                chartData.push([d.FECHA, d['CALIDAD AGUA NSF']]);
            });

            // Crear el objeto DataTable
            const dataTable = google.visualization.arrayToDataTable(chartData);

            // Definir opciones para el gráfico
            const options = {
                title: 'Calidad del Agua en RIO HUASAGA (PUNTO P1)',
                hAxis: { title: 'Fecha' },
                vAxis: { title: 'Calidad Agua NSF' },
                legend: { position: 'none' }
            };

            // Crear y dibujar el gráfico
            const chart = new google.visualization.ColumnChart(document.getElementById('graficachart1'));
            chart.draw(dataTable, options);
        })
        .catch(error => {
            console.error("Error al cargar o procesar el CSV:", error);
        });
}
// Cargar la biblioteca de Google Charts
google.charts.load('current', {'packages':['corechart', 'line']});
google.charts.setOnLoadCallback(drawChart2);

function drawChart2() {
    const csvUrl = 'https://raw.githubusercontent.com/EdisonFlores/Pruebas-d3chart/main/Parametrosfisio.csv';

    // Cargar los datos del CSV
    fetch(csvUrl)
        .then(response => response.text())
        .then(text => {
            const data = d3.csvParse(text);
            let filteredData = data.filter(d => d.RIO === 'RIO HUASAGA' && d.PUNTO === 'P1');

            if (filteredData.length === 0) {
                console.error("No se encontraron datos para el RIO HUASAGA en el PUNTO P1.");
                return;
            }

            const parseDate = d3.timeParse("%Y//%m/%d");

            filteredData.forEach(d => {
                const parsedDate = parseDate(d.FECHA);
                if (parsedDate) {
                    d.FECHA = parsedDate;
                } else {
                    console.error(`Fecha no válida encontrada: ${d.FECHA}`);
                }
                d['Ph'] = +d['Ph'];
            });

            // Ordenar los datos cronológicamente
            filteredData.sort((a, b) => a.FECHA - b.FECHA);

            // Convertir los datos a un formato que Google Charts pueda usar
            const chartData = new google.visualization.DataTable();
            chartData.addColumn('date', 'Fecha');
            chartData.addColumn('number', 'Ph');

            filteredData.forEach(d => {
                chartData.addRow([d.FECHA, d['Ph']]);
            });

            const options = {
                title: 'pH a lo largo del tiempo',
                hAxis: {
                    title: 'Fecha',
                    format: 'yyyy'
                },
                vAxis: {
                    title: 'Ph'
                },
                series: {
                    0: {curveType: 'function'},
                },
                pointSize: 5, // Tamaño de los puntos
                legend: {position: 'none'}
            };

            const chart = new google.visualization.LineChart(document.getElementById('graficachart2'));
            chart.draw(chartData, options);
        })
        .catch(error => {
            console.error("Error al cargar o procesar el CSV:", error);
        });
}
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart3);

function drawChart3() {
    const csvUrl = 'https://raw.githubusercontent.com/EdisonFlores/Pruebas-d3chart/main/Parametrosfisio.csv';

    fetch(csvUrl)
        .then(response => response.text())
        .then(csvText => {
            // Parse CSV using D3
            const data = d3.csvParse(csvText);
            const filteredData = data.filter(d => d.RIO === 'RIO HUASAGA' && d.PUNTO === 'P1');

            if (filteredData.length === 0) {
                console.error("No se encontraron datos para el RIO HUASAGA en el PUNTO P1.");
                return;
            }

            // Agrupar y contar las clasificaciones
            const classificationCount = d3.rollup(
                filteredData,
                v => v.length,
                d => d['Clasificacion ']
            );

            // Convertir los datos a formato para Google Charts
            const chartData = [['Clasificacion ', 'Conteo']];
            classificationCount.forEach((value, key) => {
                chartData.push([key, value]);
            });

            // Crear el objeto DataTable
            const dataTable = google.visualization.arrayToDataTable(chartData);

            // Definir opciones para el gráfico
            const options = {
                title: 'Distribución de Clasificación del Agua',
                colors: ['orange', 'red', 'green'],
                legend: { position: 'top' }
            };

            // Crear y dibujar el gráfico
            const chart = new google.visualization.PieChart(document.getElementById('graficachart3'));
            chart.draw(dataTable, options);
        })
        .catch(error => {
            console.error("Error al cargar o procesar el CSV:", error);
        });
}