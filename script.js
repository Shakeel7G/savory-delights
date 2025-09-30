// DOM Elements
const header = document.querySelector('header');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
let currentTestimonial = 0;

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Testimonial slider
function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    
    currentTestimonial = index;
    if (currentTestimonial < 0) {
        currentTestimonial = testimonials.length - 1;
    } else if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
    }
    
    testimonials[currentTestimonial].classList.add('active');
}

// Previous testimonial
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial - 1);
    });
}

// Next testimonial
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial + 1);
    });
}

// Initialize testimonial slider
if (testimonials.length > 0) {
    showTestimonial(0);
}

// Filter menu items on fullmenu page
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuCategories = document.querySelectorAll('.menu-category');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-category');
            
            // Show/hide menu items based on filter
            menuItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show/hide category titles based on visible items
            menuCategories.forEach(category => {
                // Check if any child item is visible
                const hasVisibleItems = category.querySelector('.menu-item[style*="display: block"]');
                if (hasVisibleItems) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });
    
    // Initialize menu - show all items by default
    const showAllButton = document.querySelector('[data-category="all"]');
    if (showAllButton) {
        showAllButton.click();
    }
});

const reservationForm = document.getElementById('reservationForm');
const previewBox = document.getElementById('previewBox');

if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const data = {
            name: reservationForm.name.value,
            email: reservationForm.email.value,
            phone: reservationForm.phone.value,
            date: reservationForm.date.value,
            time: reservationForm.time.value,
            party: reservationForm.party.value,
            notes: reservationForm.notes.value
        };

        previewBox.innerHTML = `
            <tr><th>Field</th><th>Details</th></tr>
            <tr><td>Name</td><td>${data.name}</td></tr>
            <tr><td>Email</td><td>${data.email}</td></tr>
            <tr><td>Phone</td><td>${data.phone}</td></tr>
            <tr><td>Date & Time</td><td>${data.date} at ${data.time}</td></tr>
            <tr><td>Party Size</td><td>${data.party}</td></tr>
            <tr><td>Special Requests</td><td>${data.notes || 'None'}</td></tr>
            <tr><td colspan="2">Your reservation has been booked (mock).</td></tr>
        `;

        reservationForm.reset();
    });
}