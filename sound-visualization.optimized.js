
document.addEventListener("DOMContentLoaded", function () {
    try {
        initializeSoundVisualization();
    } catch (e) {
        console.warn("Sound visualization not supported:", e);
    }
});

function initializeSoundVisualization() {
    const toggle = document.getElementById("sound-toggle");
    const icon = document.getElementById("sound-icon");
    const visualizer = document.getElementById("sound-visualizer");

    if (!toggle || !icon || !visualizer) {
        console.warn("Missing sound visualization elements.");
        return;
    }

    let audioContext;
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        alert("AudioContext not supported in this browser.");
        return;
    }

    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(new Audio());
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    for (let i = 0; i < bufferLength; i++) {
        const bar = document.createElement("div");
        bar.className = "bar";
        visualizer.appendChild(bar);
    }

    function animate() {
        analyser.getByteFrequencyData(dataArray);
        const bars = visualizer.querySelectorAll(".bar");
        bars.forEach((bar, i) => {
            bar.style.height = `${dataArray[i]}px`;
            bar.style.backgroundColor = `rgba(255, 255, 255, ${dataArray[i] / 255})`;
        });
        requestAnimationFrame(animate);
    }

    toggle.addEventListener("click", () => {
        if (audioContext.state === "suspended") {
            audioContext.resume();
        }
        animate();
    });
}
