const address = "Human Team Foundation, 47, navnath wadi, laldonger, Sion - Trombay Rd, behind poonam petrol pump, Chembur, Mumbai, Maharashtra 400071";


export default function GoogleMap() {
    return (
        <iframe
            width="1250"
            height="400"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
            allowFullScreen
        />
    );
}