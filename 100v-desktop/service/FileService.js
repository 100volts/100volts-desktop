
function saveMeterData(meter){
    const fs = require('fs');
    fs.writeFile('/meter_data/all_meters.txt', meter, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('File written successfully.');
        }
    });
}
