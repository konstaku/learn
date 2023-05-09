'use strict';

async function getData(queryId) {
    const header = {
        'x-dune-api-key': 'o0T6Pl9KPv2fjRgqnhDegftHX5RSbg2z',
    };
    
    // Sending an execution request
    const request = await fetch(
        `https://api.dune.com/api/v1/query/${queryId}/execute`,
        {
            method: 'POST',
            headers: header,
        }
    );

    const requestData = await request.json();
    const executionId = requestData.execution_id;

    // Polling Dune for query status
    while (true) {
        const response = await fetch(
            `https://api.dune.com/api/v1/execution/${executionId}/status`,
            {
                method: 'GET',
                headers: header,
            }
        );
        const responseData = await response.json();

        await new Promise(resolve => setTimeout(resolve, 1000));

        switch (responseData.state) {
            case 'QUERY_STATE_COMPLETED':
                console.log('Query completed');
                break;
            case 'QUERY_STATE_EXECUTING':
                console.log('Query executing...');
                continue;
            case 'QUERY_STATE_PENDING':
                console.log('Query pending...');
                continue;
            case 'QUERY_STATE_FAILED':
                throw new Error('Error: query state failed');
            case 'QUERY_STATE_CANCELLED':
                throw new Error('Error: query state cancelled');
            case 'QUERY_STATE_EXPIRED':
                throw new Error('Error: query state expired');
        }

        break;
    }

    // Fetching results
    const result = await fetch(
        `https://api.dune.com/api/v1/execution/${executionId}/results`,
        {
            method: 'GET',
            headers: header,
        }
    );
    const data = await result.json();

    return data;
}

getData('2453036')
    .then(result => console.log('Query results:', result))
    .catch(e => console.log(e));
