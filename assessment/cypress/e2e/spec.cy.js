
describe('Hospital', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Adjust the URL to match your application
  });

  it('should display state and city dropdowns', () => {
    cy.get('div#state').should('be.visible'); // Verify the State dropdown is present
    cy.get('div#city').should('be.visible'); // Verify the City dropdown is present
  });

  it('should fetch hospitals when both state and city are selected', () => {
    cy.intercept('GET', 'https://meddata-backend.onrender.com/data?state=Alabama&city=DOTHAN', {
      fixture: 'hospitals.json',
    }).as('getHospitals');
  
    cy.get('div#state').click(); // Open state dropdown
    cy.contains('li', 'Alabama', { timeout: 5000 }).click(); // Wait for state options to load and select Alabama
  
    cy.get('div#city').click(); // Open city dropdown
    cy.contains('li', 'DOTHAN', { timeout: 5000 }).click(); // Wait for city options to load and select DOTHAN
  
    cy.get('button[type="submit"]').should('contain.text', 'Search').click({multiple: true});
    cy.wait('@getHospitals');
    cy.get('h1').should('contain.text', '2 medical centers available in dothan');
  });
  

  it('should open appointment booking section when a medical center is clicked', () => {
    cy.intercept('GET', 'https://meddata-backend.onrender.com/data?state=Alabama&city=DOTHAN', {
      fixture: 'hospitals.json', // Use a mock JSON response file
    }).as('getHospitals');

    cy.get('div#state') // Replace with the selector for the state dropdown
    .click();
    cy.contains('li', 'Alabama') // Replace with a valid state option
    .click();
    cy.get('div#city')
    .click();
    cy.contains('li', 'DOTHAN') // Replace with a valid city option
    .click();

    cy.get('button[type="submit"]').should('contain.text', 'Search').click({multiple: true});

    cy.wait('@getHospitals');
    cy.get('button').contains('Book FREE Center Visit').should('be.visible');
  });
  
  it('should allow user to select date and time and book appointment', () => {
    cy.intercept('GET', 'https://meddata-backend.onrender.com/data?state=Alabama&city=DOTHAN', {
      fixture: 'hospitals.json', // Use a mock JSON response file
    }).as('getHospitals');

    cy.get('div#state') // Replace with the selector for the state dropdown
    .click();
    cy.contains('li', 'Alabama') // Replace with a valid state option
    .click();
    cy.get('div#city')
    .click();
    cy.contains('li', 'DOTHAN') // Replace with a valid city option
    .click();

    cy.get('button[type="submit"]').should('contain.text', 'Search').click({multiple: true});

    cy.wait('@getHospitals');
    cy.get('button').contains('Book FREE Center Visit')
    .click();
    cy.get('p').contains('Today')
    cy.get('p').contains('Morning')
    cy.get('p').contains('Afternoon')
    cy.get('p').contains('Evening')
  });
  
  it('should display all booked slots on the My Bookings page', () => {
    // Navigate to the "My Bookings" page
    cy.visit('http://localhost:3000/my-bookings'); // Replace with the actual URL for the My Bookings page
    cy.get('h1').contains('My Bookings')
  });


  it('should persist bookings in localStorage after page reload', () => {
    const mockBookings = [
      {
        "Hospital Name": "southeast alabama medical center",
        "City": "DOTHAN",
        "State": "Alabama",
        "Hospital Type": "General",
        "Hospital overall rating": "4.5",
        bookingDate: "2024-12-15",
        bookingTime: "10:00 AM",
      },
    ];
  
    cy.window().then((win) => {
      win.localStorage.setItem('bookings', JSON.stringify(mockBookings));
    });
  
    cy.visit('http://localhost:3000/my-bookings'); // Replace with actual My Bookings URL
  
    cy.get('h3')
      .contains('southeast alabama medical center', { timeout: 5000 })
      .should('be.visible');
  
    cy.reload();
    cy.get('h3')
      .contains('southeast alabama medical center', { timeout: 5000 })
      .should('be.visible');
  });
  

  
});

