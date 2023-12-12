
  const itemsPerPage = 9;
  let currentPage = 1;
  const gallery = document.querySelector('.gallery');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const items = document.querySelectorAll('.item');
  const overlay = document.getElementById('overlay');
  const overlayImg = document.getElementById('overlay-img');
  const overlayTitle = document.getElementById('overlay-title');
  const overlayDescription = document.getElementById('overlay-description');
  const closeBtn = document.getElementById('closeBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const shareBtn = document.getElementById('shareBtn');
  const likeBtn = document.getElementById('likeBtn');
  const imageSound = document.getElementById('imageSound');
  const notFoundMessage = document.getElementById('notFoundMessage');
  const notFoundImage = document.getElementById('notFoundImage');

  function playImageSound() {
    imageSound.currentTime = 0;
    imageSound.play();
  }

  function showPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    items.forEach((item, index) => {
      if (index >= startIndex && index < endIndex) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  function updatePaginationButtons() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === Math.ceil(items.length / itemsPerPage);
  }

  function showLargeImage(imageSrc, title, description) {
    overlayImg.src = imageSrc;
    overlayTitle.textContent = title;
    overlayDescription.textContent = description;
    overlay.classList.add('active');
    playImageSound(); // Memainkan efek suara saat gambar diperbesar
  }

  function closeLargeImage() {
    overlay.classList.remove('active');
  }

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
      updatePaginationButtons();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(items.length / itemsPerPage)) {
      currentPage++;
      showPage(currentPage);
      updatePaginationButtons();
    }
  });

  closeBtn.addEventListener('click', closeLargeImage);

  // Fungsi untuk menangani pencarian
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');

  searchButton.addEventListener('click', () => {
    const searchKeyword = searchInput.value.toLowerCase();
    let found = false;

    items.forEach((item) => {
      const itemTitle = item.getAttribute('data-title').toLowerCase();
      if (itemTitle.includes(searchKeyword)) {
        item.style.display = 'block';
        found = true;
      } else {
        item.style.display = 'none';
      }
    });

    if (!found) {
      notFoundMessage.style.display = 'block';
      notFoundImage.style.display = 'block';
    } else {
      notFoundMessage.style.display = 'none';
      notFoundImage.style.display = 'none';
    }
  });

  showPage(currentPage);
  updatePaginationButtons();

  // Fungsi untuk menangani klik tombol "Download"
  function downloadImage() {
    const largeImageSrc = overlayImg.src;
    const a = document.createElement('a');
    a.href = largeImageSrc;
    a.download = 'gambar.jpg'; // Nama file yang akan diunduh
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

// Fungsi untuk berbagi gambar yang diperbesar
function shareImage() {
  const largeImageSrc = overlayImg.src;

  // Gantilah 'url_to_share' dengan URL gambar yang ingin Anda bagikan
  const url_to_share = 'https://chat.whatsapp.com/CtFTPr7U0PTL8gWwSBz1no';

  // Membuka jendela berbagi URL gambar
  const shareWindow = window.open(url_to_share, 'Bagikan Gambar', 'width=600,height=400');
  if (!shareWindow) {
    // Jika pemblokiran pop-up aktif, tampilkan pesan kesalahan
    alert('Tidak dapat membuka jendela berbagi. Pastikan pop-up dibolehkan untuk situs ini.');
  }
}

// Fungsi untuk menyimpan status "Like" di penyimpanan lokal
function setLikedStatus(imageSrc, liked) {
  // Anda dapat menggunakan localStorage atau sessionStorage untuk menyimpan status "Like"
  localStorage.setItem(imageSrc, liked);
}

// Fungsi untuk mendapatkan status "Like" dari penyimpanan lokal
function getLikedStatus(imageSrc) {
  // Menggunakan localStorage untuk mendapatkan status "Like"
  return localStorage.getItem(imageSrc);
}

// Fungsi untuk menangani klik tombol "Like"
function likeImage() {
  const largeImageSrc = overlayImg.src;

  // Mendapatkan status "Like" saat ini
  const currentLikedStatus = getLikedStatus(largeImageSrc);

  if (currentLikedStatus === 'liked') {
    // Jika sudah dilike, ubah statusnya menjadi "unliked"
    setLikedStatus(largeImageSrc, 'unliked');
    likeBtn.innerHTML = '<i class="fas fa-heart"></i> Like';
    // Di sini Anda dapat menambahkan logika untuk menghapus data "Like" dari server jika diperlukan.
  } else {
    // Jika belum dilike, ubah statusnya menjadi "liked"
    setLikedStatus(largeImageSrc, 'liked');
    likeBtn.innerHTML = '<i class="fas fa-heart"></i> Liked';
    // Di sini Anda dapat menambahkan logika untuk menyimpan data "Like" ke server jika diperlukan.
  }
}

// Menentukan status "Like" awal saat overlay ditampilkan
overlay.addEventListener('active', () => {
  const largeImageSrc = overlayImg.src;
  const currentLikedStatus = getLikedStatus(largeImageSrc);

  if (currentLikedStatus === 'liked') {
    likeBtn.innerHTML = '<i class="fas fa-heart"></i> Liked';
  } else {
    likeBtn.innerHTML = '<i class="fas fa-heart"></i> Like';
  }
});


  downloadBtn.addEventListener('click', downloadImage);
  shareBtn.addEventListener('click', shareImage);
  likeBtn.addEventListener('click', likeImage);
  
  //Untuk aplod dan lainya

  