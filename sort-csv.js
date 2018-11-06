const data = `Beth,Charles,Danielle,Adam,Eric\n17945,10091,10088,3907,10132\n2,12,13,48,11`
console.log(sortCsvColumns(data))

function sortCsvColumns (csv_data) {
  // split it into array of array and switch cols and rows around
  const rows = csv_data.split('\n').map(v => v.split(','))
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
