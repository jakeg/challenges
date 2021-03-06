// take a csv and sort by first row
// originally done as a a codementor.io challenge

function sortCsvColumns (csvData) {
  // split it into array of array and switch cols and rows around
  const rows = csvData.split('\n').map(v => v.split(','))
  const data = []
  for (let i = 0; i < rows[0].length; i++) {
    const record = []
    for (let j = 0; j < rows.length; j++) {
      record.push(rows[j][i])
    }
    data.push(record)
  }

  // sort alphabetically
  data.sort((a, b) => a[0].toLowerCase() > b[0].toLowerCase())

  // output as csv
  const output = []
  for (let row = 0; row < data[0].length; row++) {
    const rowData = []
    for (let col = 0; col < data.length; col++) {
      rowData.push(data[col][row])
    }
    output.push(rowData)
  }

  // piece it back together
  return output.map(v => v.join(',')).join('\n')
}
