function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function calculateAge() {
    const dobInput = document.getElementById('dob').value;
    
    if (!dobInput) {
        document.getElementById('result').textContent = "Please enter a valid date.";
        return;
    }

    const dob = new Date(dobInput + "T00:00:00Z"); // Forces UTC
    const today = new Date(new Date().toISOString().split('T')[0]); // Removes time component

    if (dob > today) {
        document.getElementById('result').textContent = "Future dates are not allowed.";
        return;
    }

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    // Handle leap year birthdays
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

    document.getElementById('result').textContent = 
        `You are ${years} years, ${months} months, and ${days} days old.`;
}