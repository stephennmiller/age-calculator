function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function calculateAge() {
    const dobInput = document.getElementById('dob').value;
    const resultElement = document.getElementById('result');
    
    if (!dobInput) {
        resultElement.innerHTML = "Please enter a valid date.";
        return;
    }

    const dob = new Date(dobInput + "T00:00:00Z"); // Forces UTC to avoid time zone issues
    const today = new Date(new Date().toISOString().split('T')[0]); // Removes time component

    if (dob > today) {
        resultElement.innerHTML = "Future dates are not allowed.";
        return;
    }

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    // Handle leap year birthdays (Feb 29)
    if (dob.getMonth() === 1 && dob.getDate() === 29 && !isLeapYear(today.getFullYear())) {
        days += 1;
    }

    // Adjust for negative days (end-of-month issues)
    if (days < 0) {
        months -= 1;
        let lastMonth = today.getMonth() - 1;
        if (lastMonth < 0) lastMonth = 11; // Wrap around for January
        days += new Date(today.getFullYear(), lastMonth + 1, 0).getDate();
    }

    // Adjust for negative months
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    resultElement.innerHTML = 
        `You are <span class="bold-text">${years} years ${months} months</span> old`;
}