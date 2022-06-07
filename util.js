const path = require('path')

const fs = require('fs');



const readCSV = (fileName) => {
    const data = fs.readFileSync(path.join(__dirname, fileName));
    const table = ToTable(data);
    // console.log(table);
    return table;
}

const writeCSV = (fileName, data) => {
    fs.writeFileSync(path.join(__dirname, fileName), `\ufeff${fromTable(data)}`);
}
const fromTable = (data) => {
    let str = "";
    for (let r of data){   
        str+= r.join(",")+"\n";
    }
    return str;
}
const ToTable = (data) => {
    data = data.toString();
    var table = new Array();
    var rows = new Array();
    rows = data.split("\n");
    for (var i = 0; i < rows.length; i++) {
        let cols=rows[i].split("|").map(r => r.trim());
        // console.log(cols.length,cols[0].length)
        if (cols.length>1 && cols[0].length==44){
                table.push(cols);
        }
        
    }

    return table;
}


module.exports = {readCSV,writeCSV }