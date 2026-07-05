
function timeAgo(dateString: string) {
    const diff = Date.now() - new Date(dateString).getTime();

    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds} s`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} h`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} d`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} mo`;

    const years = Math.floor(days / 365);
    return `${years} yr`;
}

export default timeAgo