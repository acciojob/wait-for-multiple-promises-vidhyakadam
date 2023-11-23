//your JS code here. If required.
// Function to create a promise with a random time between 1 and 3 seconds
function createPromise() {
  const randomTime = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(randomTime);
    }, randomTime * 1000);
  });
}

// Create an array of three promises
const promises = Array.from({ length: 3 }, createPromise);

// Get the table and loading row elements
const resultTable = document.getElementById('resultTable');
const loadingRow = document.getElementById('loadingRow');

// Use Promise.all to wait for all promises to resolve
Promise.all(promises)
  .then((results) => {
    // Remove the loading text row
    loadingRow.remove();

    // Populate the table with the required values
    results.forEach((time, index) => {
      const row = resultTable.insertRow(index + 1);
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);

      cell1.innerText = `Promise ${index + 1}`;
      cell2.innerText = time.toFixed(3); // Format time to 3 decimal places
    });

    // Calculate and add the Total row
    const totalRow = resultTable.insertRow(promises.length + 1);
    const totalCell1 = totalRow.insertCell(0);
    const totalCell2 = totalRow.insertCell(1);

    totalCell1.innerText = 'Total';
    totalCell2.innerText = results.reduce((sum, time) => sum + time, 0).toFixed(3);
  })
  .catch((error) => {
    // Handle errors if Promise.all fails
    console.error(error);
  });
