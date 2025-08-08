class DateTime {
    constructor() {
        this.datetimeElement = document.getElementById('datetime');
        this.updateDateTime();
        setInterval(() => this.updateDateTime(), 1000);
    }

    updateDateTime() {
        const now = new Date();
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
                       'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        
        const month = months[now.getMonth()];
        const day = String(now.getDate()).padStart(2, '0');
        const year = now.getFullYear();
        
        // Fix AM/PM logic
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        // Convert to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 should be 12
        const displayHours = String(hours).padStart(2, '0');
        
        if (this.datetimeElement) {
            this.datetimeElement.textContent = `${month} / ${day} / ${year} | ${displayHours} : ${minutes} ${ampm}`;
        }
        
    }
}