const checkForm = async (docID: string, sheetID: number, columnName: string) => {
  try {
    const res = await fetch('/api/googleSheet', {
      method: 'POST',
      body: JSON.stringify({
        docID,
        sheetID,
        columnName // Send the columnName as part of the request body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json(); // Parse the response JSON

    console.log('Response from server:', data);

    if (data.result === '完全✅') {
      // Handle the case where the result is "finish"
      console.log('You have finished the task.');
      return true;
    } else if (data.result === '還沒❌') {
      // Handle the case where the result is "unfinish"
      console.log('You have not yet finished the task.');
      return false;
    } else {
      console.log('Unexpected response:', data);
      return false;
    }
  } catch (error: any) {
    console.log('Error in checkForm:', error);
    return false;
  }
};

export default checkForm;
