const checkForm = async (docID: string, sheetID: number) => {
    try {
      const res = await fetch('/api/googleSheet', {
        method: 'POST',
        body: JSON.stringify({
          docID,
          sheetID
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('Response from server:', data);
      
        if (data === 'finish') {
          // handle the case where the result is "finish"
          console.log('You have finished the task.');
          return true;
        } else {
          // handle the case where the result is "unfinish"
          console.log('You have not yet finished the task.');
          return false;
        }
      })
      return res
    } catch (error: any) {
      console.log(error)
      return false
    }
  }

  export default checkForm;