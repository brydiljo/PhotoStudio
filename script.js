document.addEventListener('DOMContentLoaded', () => {
    // 1. Carousel Logic
    const imagesData = {
        graduation: [
            { src: 'assets/images/graduation1.jpg', title: 'Graduation' },
            { src: 'assets/images/graduation2.jpg', title: 'Graduation' },
            { src: 'assets/images/graduation3.jpg', title: 'Graduation' },
            { src: 'assets/images/graduation4.jpg', title: 'Graduation' }
        ],
        birthday: [
            { src: 'assets/images/bday1.jpg', title: 'Birthday' },
            { src: 'assets/images/bday2.jpg', title: 'Birthday' },
            { src: 'assets/images/bday3.jpg', title: 'Birthday' },
            { src: 'assets/images/bday4.jpg', title: 'Birthday' },
            { src: 'assets/images/bday5.jpg', title: 'Birthday' }
        ],
        pregnancy: [
            { src: 'assets/images/maternity1.jpg', title: 'Maternity' },
            { src: 'assets/images/maternity2.jpg', title: 'Maternity' },
            { src: 'assets/images/maternity3.jpg', title: 'Maternity' },
            { src: 'assets/images/maternity4.jpg', title: 'Maternity' },
            { src: 'assets/images/maternity5.jpg', title: 'Maternity' }
        ]
    };

    // Create a mixed array for "All" category
    imagesData.all = [
        ...imagesData.graduation,
        ...imagesData.birthday,
        ...imagesData.pregnancy
    ].sort(() => 0.5 - Math.random()); // Shuffle the array

    let currentCategory = 'all';
    let currentIndex = 0;
    let slideshowInterval;
    const intervalTime = 4000; // 4 seconds

    const filterBtns = document.querySelectorAll('.filter-btn');
    const carouselImage = document.getElementById('carousel-image');
    const carouselTitle = document.getElementById('carousel-title');
    const carouselSlide = document.getElementById('carousel-slide');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Function to load image at currentIndex for currentCategory
    function updateCarousel() {
        const data = imagesData[currentCategory];
        
        // Fade out
        carouselSlide.style.opacity = '0';
        
        setTimeout(() => {
            // Update source and text
            carouselImage.src = data[currentIndex].src;
            carouselTitle.textContent = data[currentIndex].title;
            
            // Update dots
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
            
            // Fade in
            carouselSlide.style.opacity = '1';
        }, 300); // Matches CSS transition
    }

    // Function to generate dots based on category length
    function setupDots() {
        dotsContainer.innerHTML = '';
        const data = imagesData[currentCategory];
        
        data.forEach((_, idx) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (idx === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = idx;
                updateCarousel();
                resetSlideshow();
            });
            dotsContainer.appendChild(dot);
        });
    }

    // Go to next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % imagesData[currentCategory].length;
        updateCarousel();
    }

    // Go to previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + imagesData[currentCategory].length) % imagesData[currentCategory].length;
        updateCarousel();
    }

    // Start/Reset Auto Slideshow
    function startSlideshow() {
        slideshowInterval = setInterval(nextSlide, intervalTime);
    }

    function resetSlideshow() {
        clearInterval(slideshowInterval);
        startSlideshow();
    }

    // Filter Buttons Click Event
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentCategory = btn.getAttribute('data-filter');
            currentIndex = 0; // Reset to first image of new category
            
            setupDots();
            updateCarousel();
            resetSlideshow();
        });
    });

    // Arrow Buttons Click Events
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSlideshow();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSlideshow();
    });

    // Initialize the carousel
    setupDots();
    updateCarousel();
    startSlideshow();


    // 2. Form Submission via mailto
    const bookingForm = document.getElementById('bookingForm');

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const name = document.getElementById('name').value;
        const type = document.getElementById('type').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const message = document.getElementById('message').value;

        const targetEmail = 'bryandilbert91@gmail.com';

        const subject = encodeURIComponent(`Booking Request: ${type} Session - ${name}`);
        const body = encodeURIComponent(
`Hello Treblid Photostudio,

I would like to request a booking with the following details:

Name: ${name}
Type of Photoshoot: ${type}
Preferred Date: ${date}
Preferred Time: ${time}

Additional Details:
${message}

Thank you!`
        );

        window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
        
        bookingForm.reset();
    });
});
