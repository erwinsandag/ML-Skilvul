# ML-Skilvul - Test
 Technical test ini dikhususkan sebagai proses seleksi dan penilaian untuk posisi Mentor - AI & Data Science. Tujuan pokok dari test ini adalah ingin mengetahui technical skills dari kandidat dalam membuat aplikasi AI.

Konteks Bisnis :
Dalam konteks bisnis ini, sebuah sistem yang bertujuan untuk memprediksi tagihan listrik bulan mendatang dan mengidentifikasi perangkat elektronik yang paling berkontribusi pada biaya tersebut sedang dikembangkan. Sistem ini menggunakan data sensor real-time yang dikumpulkan dari berbagai perangkat rumah tangga seperti TV, AC, Lampu, PC, dan Kulkas.

Dengan memanfaatkan data sensor yang terkumpul, sistem ini mampu memberikan prediksi yang akurat mengenai tagihan listrik yang akan datang. Selain itu, sistem juga melakukan analisis terhadap kontribusi masing-masing perangkat terhadap biaya total, sehingga pengguna atau perusahaan dapat lebih efektif dalam mengelola konsumsi energi dan mengoptimalkan pengeluaran mereka terkait tagihan listrik.

Dengan demikian, sistem ini memberikan informasi berharga kepada pengguna atau perusahaan tentang pola penggunaan energi, sehingga mereka dapat mengambil langkah-langkah yang tepat untuk mengurangi biaya dan meningkatkan efisiensi energi. Ini akan membantu mereka mengontrol pengeluaran terkait tagihan listrik dengan cara yang lebih efisien dan cerdas.

Data yang dikumpulkan oleh mikrokontroler ESP32 terdiri dari empat atribut utama:

Voltage (V): Menyatakan tegangan listrik yang diukur oleh sensor pada saat tertentu. Tegangan listrik ini penting untuk mengetahui besarnya potensi energi listrik yang tersedia atau digunakan oleh setiap perangkat.
Ampere (A): Merupakan ukuran arus listrik yang mengalir melalui perangkat pada waktu tertentu. Data ini membantu untuk memahami seberapa besar beban listrik yang sedang digunakan oleh perangkat pada saat tertentu.
Timestamp: Menunjukkan waktu ketika data diukur atau dicatat. Informasi ini penting untuk memperoleh pemahaman tentang pola penggunaan energi dari waktu ke waktu dan untuk mengorganisir data dalam urutan waktu yang teratur.
Device ID: Merupakan identifikasi unik untuk setiap perangkat rumah tangga, seperti TV, AC, Lampu, PC, dan Kulkas. Informasi ini memungkinkan kita untuk mengidentifikasi dan membedakan kontribusi masing-masing perangkat terhadap penggunaan energi secara keseluruhan.

Pembangunan Model:

Dalam tahap ini, dilakukan pengembangan model prediksi berdasarkan data yang telah dikumpulkan. Model ini bertujuan untuk memprediksi tagihan listrik bulanan yang akan datang dan mengidentifikasi perangkat elektronik yang memberikan kontribusi terbesar terhadap biaya tersebut. Proses pembangunan model ini melibatkan beberapa langkah penting:

Data Preparation: Data dari sensor perlu dipersiapkan dengan melakukan berbagai tahap preprocessing, seperti penanganan missing values, penghapusan outlier, dan transformasi data jika diperlukan. Langkah ini penting untuk memastikan kualitas data yang digunakan dalam pelatihan model.
Model Selection: Pemilihan model yang sesuai dengan masalah prediksi tagihan listrik dilakukan dalam tahap ini. Model yang umum digunakan untuk tugas ini adalah model machine learning atau deep learning, seperti LSTM (Long Short-Term Memory) . Pemilihan model didasarkan pada evaluasi kinerja model menggunakan metrik yang relevan.
Model Training: Setelah pemilihan model, dilakukan pelatihan model menggunakan data historis yang telah dipersiapkan sebelumnya. Proses pelatihan ini bertujuan untuk mengajarkan model pola-pola dan hubungan dalam data sehingga dapat melakukan prediksi dengan akurat.
Model Evaluation: Setelah model dilatih, langkah selanjutnya adalah mengevaluasi kinerja model menggunakan data validasi atau data yang tidak digunakan dalam pelatihan. Evaluasi dilakukan dengan menggunakan metrik yang sesuai untuk tugas prediksi tagihan listrik, seperti mean absolute error (MAE), mean squared error (MSE), atau mean absolute percentage error (MAPE).
Hasil dari tahap pembangunan model ini adalah model prediksi yang siap digunakan untuk memprediksi tagihan listrik bulanan berdasarkan data sensor yang diperoleh dari perangkat rumah tangga. Model ini juga dapat digunakan untuk mengidentifikasi perangkat-perangkat tertentu yang memberikan kontribusi terbesar terhadap biaya listrik.

Hasil:

Model prediksi mencapai akurasi sebesar  pada data uji: 8.839804763738357e-07, yang diukur dengan MSE (Mean Squared Error) pada dataset holdout. Visualisasi dari konsumsi yang diprediksi dibandingkan dengan konsumsi aktual telah dibuat menggunakan Matplotlib.

Ini menunjukkan bahwa model prediksi yang dikembangkan memiliki tingkat akurasi yang tinggi dalam memprediksi permintaan energi listrik. Visualisasi yang dihasilkan juga memudahkan untuk memahami seberapa baik prediksi model dalam menangkap pola dan tren dari data aktual.

Dengan akurasi sebesar tersebut, model prediksi ini dapat menjadi alat yang sangat berguna bagi perusahaan distribusi listrik untuk merencanakan produksi energi secara efisien dan mengelola kebutuhan pasokan energi dengan lebih baik.

 Deploy Model ML Menggunakan TensorFlow.js :
 Memuat dan menjalankan model pada Web Browser dengan TensorFlow.js API.
 Menguji hasil deployment dengan membuat prediksi dari input yang diberikan.

Menguji Hasil Deployment
Pada tahap ini menguji hasil deployment dengan menjalankan Aplikasi di Webisite : Predictive Analytics using Real-time Sensor Data
http://www.cgdistrictm.com/ (Mozilla Browser rekomendasi)











