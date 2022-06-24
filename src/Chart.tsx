import { Card, CardContent } from '@mui/material';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);




interface IChart {
    labels: string[];
    data: number[];
}

const Chart = ({ labels, data }: IChart) => {



    const chartData = {
        labels: labels,
        datasets: [
            {
                label: '# of Votes',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.3)',
                    'rgba(54, 162, 235, 0.3)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',

                ],
                borderWidth: 1,
            },
        ],
    };



    return <Card>
        <CardContent>
            <Pie data={chartData} />
        </CardContent></Card>;
}


export default Chart;