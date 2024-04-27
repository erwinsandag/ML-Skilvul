// ----Kolom deklarasi variabel-----
const tglawal = new Date(document.getElementById('tanggalawal').value);
// Mengambil nilai dari elemen-elemen checkbox
const TV = document.getElementById('TV').checked ? 1 : 0;
const AC = document.getElementById('AC').checked ? 1 : 0;
const Lamp = document.getElementById('Lamp').checked ? 1 : 0;
const PC = document.getElementById('PC').checked ? 1 : 0;
const Refrigerator = document.getElementById('Refrigerator').checked ? 1 : 0;
const button = document.querySelector('button');
button.addEventListener('click', onClick);

console.log(Refrigerator);
let isModelLoaded = false;
let model;


var myVar;
// -----------------------------------

function myFunction() {
    myVar = setTimeout(showPage, 3000);
}

function showPage() {
    document.getElementById("loaderlabel").style.display = "none";
    document.getElementById("loader").style.display = "none";       
    document.getElementById("mainAPP").style.display = "block";
}

function detectWebGLContext () {
    // Create canvas element. The canvas is not added to the
    // document itself, so it is never displayed in the
    // browser window.
    var canvas = document.createElement("canvas");
    // Get WebGLRenderingContext from canvas element.
    var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    // Report the result.
    if (gl && gl instanceof WebGLRenderingContext) {
        console.log("Congratulations! Your browser supports WebGL.");
        init();
    } else {
        alert("Failed to get WebGL context. Your browser or device may not support WebGL.");
    }
}

detectWebGLContext();



// -----------------------------------

// ----Kolom fungsi `predict()`-----

// Fungsi untuk melakukan prediksi
async function predict(inputData) {
    try {
        // Melakukan prediksi dengan model
        const output = model.predict(inputData);

        // Mengambil nilai prediksi dari output
        const score = output.dataSync()[0];

        // Membersihkan tensor yang tidak digunakan lagi
        output.dispose();

        // Mengembalikan hasil prediksi
        return score;
    } catch (error) {
        // Tangani kesalahan jika terjadi saat melakukan prediksi
        console.error('Prediction failed:', error);
        return null;
    }
}

// Panggil fungsi init untuk memuat model
init().then(() => {
    // Setelah model dimuat, lakukan prediksi
    const input1 = 1;
    const input2 = 0;
    const input3 = 0;
    const input4 = 0;
    const input5 = 1;

    // Create a flat array with 60 values (5 features * 12 time steps)
    const flatInputData = new Float32Array([input1, input2, input3, input4, input5].flatMap(value => Array(12).fill(value)));

    // Reshape the flat array into a 3D tensor with the desired dimensions (1 sample, 12 time steps, 5 features)
    const inputData = tf.tensor3d(flatInputData, [1, 12, 5]);

    // Melakukan prediksi dengan input yang diberikan
    predict(inputData).then(prediction => {
        // Lakukan inversi normalisasi
        const wattMin = 0; // Nilai minimum dalam data asli
        const wattMax = 90; // Nilai maksimum dalam data asli

        const predictionInWatt = (prediction * (wattMax - wattMin)) + wattMin;

        console.log('Hasil prediksi dalam Watt:', predictionInWatt);
    }).catch(error => {
        console.error('Terjadi kesalahan saat melakukan prediksi:', error);
    });
}).catch(error => {
    console.error('Terjadi kesalahan saat memuat model:', error);
});



// ----Kolom fungsi `onClick()`-----

// Mendefinisikan nilai-nilai input



async function onClick() {
    button.removeEventListener('click', onClick);

    if (!isModelLoaded) {
        alert('Model belum dimuat');
        return;
    }

    // Mendapatkan nilai dari elemen input
    const tanggalAwal = new Date(document.getElementById('tanggalawal').value);
    const bulanAwal = new Date(tanggalAwal.getFullYear(), tanggalAwal.getMonth(), 1); // Mulai dari awal bulan
    const bulanBerikutnya = new Date(tanggalAwal.getFullYear(), tanggalAwal.getMonth() + 1, 0); // Akhir bulan
    
    // Mengambil nilai dari elemen-elemen checkbox
    const deviceTV = document.getElementById('TV').checked ? 1 : 0;
    const deviceAC = document.getElementById('AC').checked ? 1 : 0;
    const deviceLamp = document.getElementById('Lamp').checked ? 1 : 0;
    const devicePC = document.getElementById('PC').checked ? 1 : 0;
    const deviceRefrigerator = document.getElementById('Refrigerator').checked ? 1 : 0;

    console.log('Tanggal Awal Bulan:', bulanAwal);
    console.log('Tanggal Akhir Bulan:', bulanBerikutnya);

    const wattMin = 3.095;
    const wattMax = 119.82;

    const interval = 5 * 60 * 1000; // 5 menit dalam milidetik
    const numTimeSteps = 12;

    let currentDate = bulanAwal; // Mulai dari awal bulan
    const predictions = [];

    let totalWattPerIterasi = 0; // Inisialisasi total watt per iterasi

    for (let i = 0; i < numTimeSteps; i++) {
        const flatInputData = new Float32Array([deviceTV, deviceAC, deviceLamp, devicePC, deviceRefrigerator].flatMap(value => Array(numTimeSteps).fill(value)));
        const inputData = tf.tensor3d(flatInputData, [1, numTimeSteps, 5]);
    
        try {
            const prediction = await predict(inputData);
    
            // Denormalisasi nilai prediksi ke rentang wattMin - wattMax
            let predictionInWatt = prediction * (wattMax - wattMin) + wattMin;
    
            // Memastikan bahwa nilai berada dalam rentang yang diinginkan
            predictionInWatt = Math.max(Math.min(predictionInWatt, wattMax), wattMin);
    
            console.log('Prediksi untuk tanggal:', new Date(currentDate.getTime() + (i * interval)).toISOString(), 'Watt:', predictionInWatt);
            predictions.push(predictionInWatt);
    
            // Tambahkan hasil prediksi ke total watt per iterasi
            totalWattPerIterasi += predictionInWatt;
    
            // Jika ini iterasi terakhir, cetak total watt per iterasi
            if (i === numTimeSteps - 1) {
                console.log('Total Watt per Iterasi:', totalWattPerIterasi);
            }
        } catch (error) {
            console.error('Terjadi kesalahan saat melakukan prediksi:', error);
        }
    
        // Tambahkan interval waktu untuk iterasi selanjutnya
        currentDate = new Date(currentDate.getTime() + interval);
        
        // Memastikan tidak melebihi tanggal akhir bulan
        if (currentDate > bulanBerikutnya) {
            break;
        }
    }

    // Menampilkan informasi dalam alert
    alert(`Tanggal Awal Bulan: ${bulanAwal.toDateString()}\n
           Tanggal Akhir Bulan: ${bulanBerikutnya.toDateString()}\n
           Device TV: ${deviceTV}\n
           Device AC: ${deviceAC}\n
           Device Lamp: ${deviceLamp}\n
           Device PC: ${devicePC}\n
           Device Refrigerator: ${deviceRefrigerator}\n
           Total Watt per Iterasi: ${totalWattPerIterasi}`);
}

  
// ----Kolom fungsi `init()`-----
async function init(){

    // Memanggil model tfjs
    // model = await tf.loadLayersModel('http://127.0.0.1:5500/tfjs_model/model.json'); // Untuk VS Code Live Server
    model = await tf.loadLayersModel('http://127.0.0.1:3000/tfjs_model/model.json');
    isModelLoaded = true;

    

    console.log(model.summary()); 
    console.log('Model & Metadata Loaded Succesfully');
}
// -----------------------------------
