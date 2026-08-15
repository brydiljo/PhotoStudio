document.addEventListener('DOMContentLoaded', () => {
    // 1. Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    // Trigger reflow for animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300); // Matches CSS transition time if added
                }
            });
        });
    });

    // 2. Form Submission via mailto
    const bookingForm = document.getElementById('bookingForm');

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent standard submission

        // Gather form data
        const name = document.getElementById('name').value;
        const type = document.getElementById('type').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const message = document.getElementById('message').value;

        // Target Email Address
        const targetEmail = 'bryandilbert91@gmail.com';

        // Construct Subject and Body
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

        // Open the default email client
        window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
        
        // Optional: clear the form
        bookingForm.reset();
        alert('Your email client has been opened to send the request!');
    });
});
