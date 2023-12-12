function toggleInfo() {
    var infoSection = document.getElementById('info');
    infoSection.style.display = (infoSection.style.display === 'none' || infoSection.style.display === '') ? 'block' : 'none';
}

document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Ambil data formulir
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // Kirim data ke backend (contoh: kirim melalui emailjs)
    sendEmail(name, email, message);
});

function sendEmail(name, email, message) {
    // Ganti dengan logika pengiriman email sesuai dengan backend Anda
    // Contoh penggunaan emailjs (butuh pendaftaran akun di emailjs.com)
    // Pastikan untuk menyertakan library emailjs di halaman HTML Anda
    // (https://www.emailjs.com/docs/tutorial/adding-emailjs-to-your-web-app/)

    emailjs.send("service_228llvl", "template_im4hcjn", {
        to_email: "mcpakelid@gmail.com",
        from_name: name,
        from_email: email,
        message: message
    }).then(
        function (response) {
            console.log("Email terkirim:", response);
            // Tambahkan logika atau tindakan lanjutan di sini jika diperlukan
            alert("Pesan terkirim!");
        },
        function (error) {
            console.error("Gagal mengirim email:", error);
            // Tambahkan logika atau tindakan lanjutan di sini jika diperlukan
            alert("Gagal mengirim pesan. Silakan coba lagi nanti.");
        }
    );
}
// script.js

function toggleFrame(element) {
    // Menghapus kelas aktif dari semua tombol
    document.querySelectorAll('.button-link').forEach(link => {
        link.classList.remove('active');
    });

    // Menambahkan kelas aktif ke tombol yang di klik
    element.classList.add('active');
}
