import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

export default function QuestionCard({ question, responses }) {
    // Calculate the average score
    const average = responses.length > 0
               ? responses.reduce((acc, score) => acc + score, 0) / responses.length
               : 0;
  
    // Count responses above 6
    const aboveSix = responses.filter(score => score > 6).length;
  
    // Count responses below 3
    const belowThree = responses.filter(score => score < 3).length;
  
    const chartData = {
        labels: ['Average Score', 'Responses > 6', 'Responses < 3'],
        datasets: [
          {
            data: [average.toFixed(2), aboveSix, belowThree],
            backgroundColor: [
              'rgba(54, 162, 235, 0.5)', // blue for average
              'rgba(75, 192, 192, 0.5)', // green for > 6
              'rgba(255, 99, 132, 0.5)', // red for < 3
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

    return (
    <div className="p-4 border rounded shadow-md bg-white flex flex-col md:flex-row items-center">
        
        <div style={{ width: '100%', maxWidth: '300px', height: 'auto' }} className="mx-auto md:mx-0">
          <Pie data={chartData} />
        </div>
        <div className="mt-4 md:mt-0 md:ml-4 p-3">
          <h2 className="text-lg font-bold mb-2">{question}</h2>
          <p className="mb-1">Average Score: {average.toFixed(2)}</p>
          <p className="mb-1">Responses above 6: {aboveSix}</p>
          <p className="mb-1">Responses below 3: {belowThree}</p>
        </div>
      </div>
    );
  }
  