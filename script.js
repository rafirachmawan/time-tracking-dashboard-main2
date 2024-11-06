// Mengambil elemen pertama dari dokumen HTML yang merupakan daftar tidak terurut (<ul>), yang berfungsi sebagai menu.
let menu = document.querySelector("ul");
// Mengambil semua elemen yang memiliki kelas details, yang digunakan untuk menampilkan informasi waktu.
let dataDetail = document.querySelectorAll(".details");
// Mendeklarasikan variabel data yang akan menyimpan informasi yang diambil dari file JSON.
let data;

async function fetchData() {
  try {
    let response = await fetch("./data.json"); //Fungsi ini adalah fungsi asinkron yang bertugas untuk mengambil data dari file data.json.

    if (!response.ok) {
      throw new Error("HTTP error : " + response.status); //Menggunakan fetch untuk melakukan permintaan HTTP ke file JSON.
    } //jika respon tidak ok (misalnya, file tidak ditemukan), akan melemparkan kesalahan dengan status HTTP.

    data = await response.json(); //Jika berhasil, data JSON akan disimpan dalam variabel data.
  } catch (error) {
    console.error(`Could not get data: ${error}`); //Jika terjadi kesalahan selama pengambilan data, kesalahan tersebut akan dicetak di konsol.
  }
}

function handleClick(item) {
  //Fungsi ini menangani klik pada elemen menu.
  let activeElement = item.target; // let activeElement = item.target;: Menyimpan elemen yang diklik ke dalam variabel activeElement.

  if (activeElement.tagName !== "BUTTON") return; //Memeriksa apakah elemen yang diklik adalah tombol (BUTTON). Jika tidak, fungsi akan keluar.

  let target = activeElement.innerText.toLowerCase(); //Mengambil teks dari tombol yang diklik dan mengubahnya menjadi huruf kecil untuk menentukan periode waktu yang dipilih (daily, weekly, atau monthly).
  let targetLabel =
    target == "daily"
      ? "Yesterday"
      : target == "weekly" //Menentukan label untuk periode waktu sebelumnya (misalnya, "Kemarin", "Minggu Lalu", "Bulan Lalu").
      ? "Last Week"
      : "Last Month";

  menu.querySelectorAll("button").forEach((child) => {
    child.classList.remove("active"); // Menghapus kelas active dari semua tombol di menu.
  });

  if (data) {
    activeElement.classList.add("active"); //Jika data telah diambil, menambahkan kelas active pada tombol yang diklik dan memperbarui elemen detail dengan informasi waktu saat ini dan waktu sebelumnya berdasarkan data yang diambil.
    dataDetail.forEach((detail, i) => {
      const { current, previous } = data[i].timeframes[target];
      detail.firstElementChild.innerText = `${current}hrs`;
      detail.lastElementChild.innerText = `${targetLabel} - ${previous}hrs`;
    });
  }
}

menu.addEventListener("click", handleClick); // menu.addEventListener("click", handleClick);: Menambahkan pendengar acara untuk menangani klik pada menu.
fetchData(); // fetchData();: Memanggil fungsi fetchData untuk mengambil data saat halaman dimuat.

// Kesimpulan : Secara keseluruhan, kode ini bertujuan untuk menampilkan data waktu yang terkait dengan aktivitas
//  tertentu dan memperbarui tampilan berdasarkan interaksi pengguna dengan menu. Ketika pengguna mengklik tombol, informasi yang relevan akan ditampilkan,
//  menunjukkan berapa jam yang dihabiskan untuk aktivitas tersebut dalam periode waktu yang berbeda.
