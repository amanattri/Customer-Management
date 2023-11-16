// Dummy data for customer list
const customers = [
    { first_name: 'John', last_name: 'Doe', email: 'john@example.com', phone: '1234567890' },
    { first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', phone: '9876543210' },
    // Add more dummy data as needed
  ];
  
  // Function to display customer list
  function displayCustomerList() {
    const customerTableBody = document.getElementById('customerTableBody');
    customerTableBody.innerHTML = '';
  
    customers.forEach(customer => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${customer.first_name}</td>
        <td>${customer.last_name}</td>
        <td>${customer.email}</td>
        <td>${customer.phone}</td>
      `;
      customerTableBody.appendChild(row);
    });
  }
  
  // Function to open login modal
  function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
  }
  
  // Function to close login modal
  function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
  }
  
  // Dummy function to simulate authentication
 // Function to authenticate user
function authenticateUser() {
    const loginId = document.getElementById('loginId').value;
    const password = document.getElementById('password').value;
  
    // Check if loginId and password are provided
    if (!loginId || !password) {
      alert('Please enter both username and password.');
      return;
    }
  
    // API endpoint for authentication
    const authenticationEndpoint = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp';
  
    // Request body
    const requestBody = {
      login_id: loginId,
      password: password
    };
  
    // Fetch options
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    };
  
    // Send the authentication request
    fetch(authenticationEndpoint, fetchOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Authentication failed.');
        }
        return response.json();
      })
      .then(data => {
        // Assuming the response contains a token
        const token = data.token;
  
        // You would typically store the token securely, maybe in a cookie or localStorage
        // For simplicity, let's just log it to the console
        console.log('Bearer Token:', token);
  
        // Now that the user is authenticated, you can perform other actions, such as displaying the customer list
        showCustomerList();
      })
      .catch(error => {
        console.error('Authentication error:', error);
        alert('Authentication failed. Please check your credentials.');
      });
  
  
   
    // For simplicity, just close the modal and show customer list
    closeModal();
    showCustomerList();
  }
  
  // Function to show customer list
  function showCustomerList() {
    document.getElementById('customerList').style.display = 'block';
    displayCustomerList();
  }
  
  // Function to show add customer form
  function showAddCustomerForm() {
    document.getElementById('addCustomerForm').style.display = 'block';
  }
  
  // Dummy function to simulate adding a customer
 // Function to add a new customer
function addCustomer() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
  
    // Check if mandatory parameters are provided
    if (!firstName || !lastName) {
      alert('First Name and Last Name are mandatory.');
      return;
    }
  
    // API endpoint for creating a customer
    const createCustomerEndpoint = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
  
    // Request parameters
    const cmd = 'create';
    const token = 'YOUR_BEARER_TOKEN'; // Replace with the actual token obtained during authentication
  
    // Request body
    const requestBody = {
      cmd: cmd,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone
    };
  
    // Fetch options
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(requestBody)
    };
  
    // Send the request to create a customer
    fetch(createCustomerEndpoint, fetchOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create customer.');
        }
        return response.json();
      })
      .then(data => {
        // Assuming the response contains success information
        if (data.success) {
          // Customer created successfully, you may want to display a success message or update the customer list
          displayCustomerList();
        } else {
          // Customer creation failed
          alert('Failed to create customer. Please try again.');
        }
      })
      .catch(error => {
        console.error('Customer creation error:', error);
        alert('Failed to create customer. Please try again.');
      });
  
  
    // For simplicity, just close the form and display the updated customer list
    document.getElementById('addCustomerForm').style.display = 'none';
    displayCustomerList();
  }
  document.getElementById('addCustomerButton').addEventListener('click', addCustomer);
  // Initial setup
  openLoginModal();
  