import {
    Chart,
    Colors,
    BubbleController,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend
} from 'chart.js'

Chart.register(
    Colors,
    BubbleController,
    PointElement,
    CategoryScale,
    LinearScale,
    Legend
);

import { getDimensions } from "./api"

(async function() {
    const data = await getDimensions();

    new Chart(
        document.getElementById("dimensions"),
        {
        type: "bubble",
        data: {
            labels: data.map(x => x.year),
            datasets: [
                {
                    label: 'width = height',
                    data: data
                        .filter(row => row.width === row.height)
                        .map(row => ({
                        x: row.width,
                        y: row.height,
                        r: row.count
                        }))
                },
                {
                    label: 'width > height',
                    data: data
                        .filter(row => row.width > row.height)
                        .map(row => ({
                        x: row.width,
                        y: row.height,
                        r: row.count
                        }))
                },
                {
                    label: 'width < height',
                    data: data
                        .filter(row => row.width < row.height)
                        .map(row => ({
                        x: row.width,
                        y: row.height,
                        r: row.count
                        }))
                }
            ]

        },
        maintainAspectRatio: false
        }
    );
})();
