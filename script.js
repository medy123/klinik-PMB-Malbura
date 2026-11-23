/* ==========================================================
   PMB MARIBU - script.js

   File ini mengatur semua perilaku/sinteraksi di website:
   1. Navbar saat halaman di-scroll
   2. Menu hamburger di ponsel
   3. Menu aktif mengikuti posisi halaman
   4. Slide gambar di bagian hero
   5. Filter kartu layanan
   6. Buka/tutup detail fasilitas
   7. Formulir janji -> dikirim sebagai pesan WhatsApp
   8. Tombol kembali ke atas
   9. Animasi muncul saat di-scroll
   10. Animasi angka statistik
   11. Smooth scroll untuk tautan menu

   Semua kode dijalankan setelah halaman selesai dimuat (DOMContentLoaded).
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------
       1. NAVBAR SAAT DI-SCROLL
       Fungsi: menambah kelas "scrolled" saat halaman turun lebih
       dari 50px agar navbar berubah jadi putih dan ada bayangan.
       ---------------------------------------------------------- */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ----------------------------------------------------------
       2. MENU HAMBURGER (KHUSUS PONSEL)
       Fungsi: membuka/menutup daftar menu ketika ikon tiga garis
       diklik, lalu menutupnya lagi setelah salah satu tautan dipilih.
       ---------------------------------------------------------- */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* ----------------------------------------------------------
       3. MENU AKTIF MENGIKUTI SECTION
       Fungsi: memberi kelas "active" pada menu yang sesuai dengan
       section yang sedang terlihat pengguna.
       ---------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        // Tambah 120px supaya pergantian menu terjadi sebelum section mencapai puncak
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    /* ----------------------------------------------------------
       4. SLIDE GAMBAR HERO
       Fungsi: mengganti gambar latar hero setiap 5 detik secara
       bergilir. Jumlah slide mengikuti jumlah elemen .hero-slide.
       ---------------------------------------------------------- */
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
    }

    /* ----------------------------------------------------------
       5. FILTER KARTU LAYANAN
       Fungsi: saat tombol filter diklik, kartu yang kategorinya
       tidak cocok disembunyikan memakai kelas "hidden".
       Nilai data-filter tombol harus sama dengan data-category kartu.
       ---------------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const layananCards = document.querySelectorAll('.layanan-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Tandai tombol yang sedang dipilih
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            layananCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    // Animasi singkat saat kartu muncul kembali
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* ----------------------------------------------------------
       6. DETAIL FASILITAS
       Fungsi: membuka atau menutup paragraf tambahan di dalam
       kartu fasilitas saat tombol "Detail Fasilitas" diklik.
       ---------------------------------------------------------- */
    document.querySelectorAll('.fasilitas-link').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.fasilitas-card');
            card.classList.toggle('active');
        });
    });

    /* ----------------------------------------------------------
       7. FORMULIR PERMINTAAN JANJI -> WHATSAPP
       Fungsi: mencegah formulir terkirim ke server, lalu membuka
       WhatsApp dengan pesan yang sudah berisi data pasien.
       Ganti NOMOR_WA di bawah dengan nomor PMB sebenarnya.
       ---------------------------------------------------------- */
    const NOMOR_WA = '6281234567890'; // format: 62 diikuti nomor tanpa angka 0 di depan
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // jangan memuat ulang halaman

        // Ambil nilai dari setiap kolom formulir
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;

        // Susun pesan WhatsApp, lalu encode supaya aman di URL
        const waMessage = encodeURIComponent(
            `Halo PMB Maribu! 👋\n\n` +
            `Saya ingin membuat janji kunjungan:\n` +
            `Nama: ${name}\n` +
            `Email: ${email}\n` +
            `No. WA: ${phone}\n` +
            `Layanan: ${service}\n` +
            `Keluhan / Jadwal: ${message}\n\n` +
            `Terima kasih!`
        );

        // Buka WhatsApp di tab baru
        window.open(`https://wa.me/${NOMOR_WA}?text=${waMessage}`, '_blank');

        // Kosongkan formulir setelah dikirim
        contactForm.reset();

        // Beri umpan balik sementara pada tombol submit
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
        submitBtn.style.background = '#22c55e';
        submitBtn.disabled = true;

        // Kembalikan tombol ke keadaan semula setelah 3 detik
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });

    /* ----------------------------------------------------------
       8. TOMBOL KEMBALI KE ATAS
       Fungsi: tombol muncul setelah halaman digulir 500px dan
       menggulir halus ke posisi paling atas saat diklik.
       ---------------------------------------------------------- */
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ----------------------------------------------------------
       9. ANIMASI SAAT DI-SCROLL
       Fungsi: elemen yang terlihat akan diberi kelas
       "animate-on-scroll" + "animated" oleh IntersectionObserver
       sehingga muncul dengan efek naik perlahan (lihat style.css).
       ---------------------------------------------------------- */
    const animateElements = document.querySelectorAll(
        '.section-subtitle, .section-title, .section-desc, ' +
        '.about-images, .about-content, ' +
        '.layanan-card, .fasilitas-card, .dokter-card, ' +
        '.testimoni-card, .contact-info, .contact-form-wrapper, ' +
        '.cta-content'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Jeda 80ms per elemen agar animasi terasa berurutan
                setTimeout(() => {
                    entry.target.classList.add('animate-on-scroll', 'animated');
                }, index * 80);
                observer.unobserve(entry.target); // animasi hanya dijalankan sekali
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    /* ----------------------------------------------------------
       10. ANIMASI ANGKA STATISTIK
       Fungsi: angka di hero (12, 5000, 15) dihitung naik dari 0
       saat area statistik terlihat, lalu diakhiri tanda "+".
       ---------------------------------------------------------- */
    function animateCounter(el, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16); // ~60 frame per detik

        function updateCounter() {
            start += increment;
            if (start < target) {
                el.textContent = Math.floor(start).toLocaleString() + '+';
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target.toLocaleString() + '+';
            }
        }

        updateCounter();
    }

    const statNumbers = document.querySelectorAll('.stat-item h3');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                if (number) {
                    animateCounter(entry.target, number);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => statsObserver.observe(num));

    /* ----------------------------------------------------------
       11. SMOOTH SCROLL UNTUK TAUTAN "#"
       Fungsi: semua tautan seperti href="#layanan" menggulir halaman
       dengan halus ke section tujuan, bukan langsung melompat.
       ---------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

